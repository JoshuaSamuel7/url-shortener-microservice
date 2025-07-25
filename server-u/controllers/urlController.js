import Url from "../models/Url.js";
import generateCode from "../utils/generateCode.js";
import { Log } from "../middleware/loggerClient.js";

export const shortenUrl = async (req, res) => {
  const { url, shortcode, validity } = req.body;
  try {
    let code = shortcode || generateCode();
    let expiry = new Date(Date.now() + ((validity || 24) *60*60*1000));    
    if (shortcode) {
      const exists = await Url.findOne({ shortcode });
      if (exists) {
        await Log("backend", "error", "shorten", "Custom shortcode already exists");
        return res.status(409).json({ error: "Shortcode already exists" });
      }
    }
    const newUrl = new Url({ shortcode: code, url, expiry,user:req.user._id });
    await newUrl.save();
    await Log("backend", "info", "shorten", `Short URL created: ${code}`);
    res.json({ shortUrl: code, expiresAt: expiry });
  } catch (err) {
    await Log("backend", "fatal", "shorten", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const found = await Url.findOne({ shortcode: code });
    if (!found || new Date() > found.expiry) {
      await Log("backend", "warn", "redirect", "Expired or invalid link");
      return res.status(404).json({ error: "Link expired or invalid" });
    }
    const referrer = req.get("referer") || "unknown";
    const location = req.ip || "unknown";
    found.clicks.push({ referrer, location });
    await found.save();

    await Log("backend", "info", "redirect", `Redirected to: ${found.url}`);
    res.json({url:found.url});
  } catch (err) {
    await Log("backend", "error", "redirect", err.message);
    res.status(500).json({ error: "Redirection error" });
  }
};

export const getStats = async (req, res) => {
  try {
    const { code } = req.params;
    const found = await Url.findOne({ shortcode: code });
    if (!found) {
      await Log("backend", "warn", "stats", "Stats request for unknown code");
      return res.status(404).json({ error: "Shortcode not found" });
    }
    if(!found.user.equals(req.user._id)) return res.json({"message":"You are not the owner"})
    res.json({
      shortcode: code,
      url: found.url,
      createdAt: found.createdAt,
      expiry: found.expiry,
      totalClicks: found.clicks.length,
      clickDetails: found.clicks.map(click => ({
        timestamp: click.timestamp,
        referrer: click.referrer,
        location: click.location
      }))
    });
  } catch (err) {
    await Log("backend", "error", "stats", err.message);
    res.status(500).json({ error: "Stats fetch error" });
  }
};
export const getStatsList =async(req,res)=>{
  try {
    const shorturls=await Url.find({user:req.user._id}).select("shortcode")
    res.status(200).json({"message":shorturls});
  } catch (error) {
    console.log(error);
  }
}