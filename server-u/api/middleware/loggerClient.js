const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(process.env.LOGGER_URL, {
      stack,
      level,
      package: pkg,
      message
    });
  } catch (err) {
    console.error("Log error:", err.response?.data || err.message);
  }
};

module.exports = { Log };
