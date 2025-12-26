import db from "../utils/db/db.js";

export const checkUnique = (email) =>{
    return new Promise((resolve,reject)=>{
        const q = `SELECT count(*) as flag from users where email=?`;
        db.execute(q,[email],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result[0]);
            }
        })
    })
}
export const createUser = (email,name,password) =>{
    return new Promise((resolve,reject)=>{
        const q = `INSERT INTO users(email,name,password) VALUES(?,?,?)`;
        db.execute(q,[email,name,password],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}
export const forceDelete = (email) =>{
    return new Promise((resolve,reject)=>{
        const q = `DELETE FROM users WHERE email=?`;
        db.execute(q,[email],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result);
            }
        })
    });
}
export const getUser = (email) =>{
    return new Promise((resolve,reject)=>{
        const q = `SELECT password,user_id from users where email=?`;
        db.execute(q,[email],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}
export const findUser = (email) =>{
    return new Promise((resolve,reject)=>{
        const q = `select name from users where email=?`;
        db.execute(q,[email],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}
export const updatePassword = (email,password) =>{
    return new Promise((resolve,reject)=>{
        const q = `UPDATE users SET password=? WHERE email=?`;
        db.execute(q,[password,email],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}
export const getUserById = (id,email) => {
  return new Promise((resolve, reject) => {
    const q = `SELECT u.user_id, u.email, u.name,u.pic FROM users as u WHERE u.user_id = ? AND u.email = ?`;
    db.execute(q, [id, email], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const updateName = (id,name) =>{
    return new Promise((resolve,reject)=>{
        const q = `UPDATE users SET name=? WHERE user_id=?`;
        db.execute(q,[name,id],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}
export const updateCalorieLimit = (id,limit) =>{
    return new Promise((resolve,reject)=>{
        const q = `UPDATE users SET daily_calorie_limit=? WHERE user_id=?`;
        db.execute(q,[limit,id],(err,result)=>{
            if (err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}
export const deletePic = (id) => {
  return new Promise((resolve, reject) => {
    const q = `UPDATE users SET pic = NULL WHERE user_id = ?`;
    db.execute(q, [id], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
}
export const updateProfile = (id, url) => {
  return new Promise((resolve, reject) => {
    const q = `UPDATE users SET pic = ? WHERE user_id = ?`;
    db.execute(q, [url, id], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
}