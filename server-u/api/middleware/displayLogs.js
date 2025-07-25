import axios from"axios";
export const displayLogs =async(req,res)=>{
    try {        
            const logs=await axios.get(process.env.LOGGER_URL+"/display")
            return res.status(200).json({"message":logs.data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"message":"Server error"})
    }
}