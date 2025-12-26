const generateInfo = (email) =>{
    let name = email.split("@")[0];
    // remove number and special chars from name
    name = name.replace(/[^a-zA-Z]/g, ' ');
    const password = Date.now().toString(36) + Math.random().toString(36).substring(13);
    return {
        name,
        password
    }
} 
module.exports = generateInfo;