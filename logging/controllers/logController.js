import Log from "../models/Log.js";

export const createLog = async (req, res) => {
  try {
    const { stack, level, package: pkg, message } = req.body;
    const newLog = await Log.create({ stack, level, package: pkg, message });
    res.status(200).json({ logID: newLog._id, message: "log created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create log" });
  }
};

export const displayLogs=async(req,res)=>{
  try{
    const logs=await Log.find();
    if(!logs) return res.status(500).json({"message":"Error"})
    res.status(200).json({"message":logs});
  }catch(err){
    console.log(err);
    
  }
  
}