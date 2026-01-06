const toJSON = require("../generators/json_conv")
require("dotenv").config();

const analyseImage = async (url) => {
  try{  
      // return require("./demo.json");    
      const data = await fetch(process.env.GEN_AI_LINK,{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl:url
          })
      })
      const apiResponse = await data.json();
      if (apiResponse.error){
        return apiResponse;
      }
      
    return toJSON(apiResponse.data);
  }catch (error) {
    return {error:true,message:error.message}
  }
};

module.exports = analyseImage;