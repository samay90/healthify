const jwt = require("jsonwebtoken");
const lang = require("../../../lang/lang.json");
const auth = require("../../models/auth");
require("dotenv").config();
const getTokenFromHeaderOrCookie = (req) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) return authHeader.split(" ")[1];

  const cookieHeader = req.headers && req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const c of cookies) {
      const [name, ...v] = c.split("=");
      if (name === "token") return v.join("=");
    }
  }

  return null;
};

module.exports = async (req, res, next) => {
  try {
    const token = getTokenFromHeaderOrCookie(req);
    if (!token) {
      return res.status(401).json({ error: true, message: lang["UNAUTHORIZED"] });
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (!payload || !payload.user_id || !payload.email) {
      return res.status(401).json({ error: true, message: lang["UNAUTHORIZED"] });
    }

    const userRows = await auth.getUserById(payload.user_id,payload.email);
    if (!userRows || !userRows.length) {
      return res.status(401).json({ error: true, message: lang["UNAUTHORIZED"] });
    }
    
    req.user = userRows[0];
    next();
  } catch (err) {
    console.error("Authorize middleware error:", err);
    return res.status(401).json({ error: true, message: lang["UNAUTHORIZED"] });
  }
};