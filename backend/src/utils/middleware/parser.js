const types = require("../../../integer_parser/types.json")

const parser = (req,res,next) =>{
    const body = req.body;
    if (!!!body) next();
    for (const field in body){
        const value = body[field];
        if (types[field]){
            body[field] = parseInt(value);
            if (isNaN(body[field])) body[field] = null;
        }
    }
    next();
}

module.exports = parser;