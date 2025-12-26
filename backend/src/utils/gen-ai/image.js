const model = require("./config");
const toJSON = require("../generators/json_conv")
const prompt = `
Analyze the food image and IMMEDIATELY return ONLY valid JSON.

Do NOT explain.
Do NOT acknowledge.
Do NOT add text before or after.
the warnings are the health concerns of the food and its ingredients of some usefull info about the food Ex: "High protein".
If food cannot be identified, return:
{ "error": true ,"message":(reason for failure)}

Otherwise return exactly this format:

{
  "error": false,
  "dish": string,
  "ingredients": string[],
  "calories": number,
  "protein_g": number,
  "carbs_g": number,
  "fat_g": number,
  "warnings": {warning_text:string,warning_type:string from ("WARNING","INFO")}[]
}
`;
const analyseImage = async (url) => {
  try{  
      return require("./demo.json");    
      const apiResponse = await model.chat.completions.create({
      model: 'google/gemma-3-27b-it:free',
      messages: [
        {
          role: 'user',
          content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                imageUrl: {
                  url
                }
              }
            ]
        },
      ],
      stream: false,
      temperature: 1
    });
    return toJSON(apiResponse.choices[0].message.content)
  }catch (error) {
    return {error:true,message:error.message}
  }
};

module.exports = analyseImage;