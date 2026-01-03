import db from "../utils/db/db.js";

export const addFood = (food_name, ingredients, calories, protein, carbs, fats,warnings, food_url, user_id,created_at) => {
    return new Promise((resolve, reject) => {
        const q = `INSERT INTO food_logs (food_name, ingredients, calories, protein, carbs, fats, warnings, pic, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(q, [food_name, JSON.stringify(ingredients), calories, protein, carbs, fats,JSON.stringify(warnings), food_url, user_id,created_at], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

export const updateDailyLogWithFood = (user_id, total_calories, total_protein, total_carbs, total_fats,intake_date) => {
    return new Promise((resolve, reject) => {
        const q = `INSERT INTO daily_intake (user_id, intake_date, total_calories, total_protein, total_carbs, total_fats) VALUES (?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE total_calories = total_calories + VALUES(total_calories), total_protein = total_protein + VALUES(total_protein), total_carbs = total_carbs + VALUES(total_carbs), total_fats = total_fats + VALUES(total_fats)`;

        db.query(q, [user_id, intake_date, total_calories, total_protein, total_carbs, total_fats], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

export const getFoodDetail = (food_log_id, user_id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT calories, protein, carbs, fats, created_at FROM food_logs WHERE food_log_id = ? AND user_id = ?`;
        db.query(q, [food_log_id, user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

export const reduceDailyLogWithFood = (user_id, calories, protein, carbs, fats, intake_date) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE daily_intake SET total_calories = total_calories - ?, total_protein = total_protein - ?, total_carbs = total_carbs - ?, total_fats = total_fats - ? 
        WHERE user_id = ? AND intake_date = ?`;
        db.query(q, [calories, protein, carbs, fats, user_id, intake_date], (err, result) => {
            if (err) {
                return reject(err);
            }``
            resolve(result);
        });
    });
}

export const deleteFoodLog = (food_log_id, user_id) => {
    return new Promise((resolve, reject) => {
        const q = `DELETE FROM food_logs WHERE food_log_id = ? AND user_id = ?`;
        db.query(q, [food_log_id, user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

export const addFoodImage = (food_log_id, food_url) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE food_logs SET pic = ? WHERE food_log_id = ?`;
        db.query(q, [food_url, food_log_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}