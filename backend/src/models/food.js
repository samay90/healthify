import db from "../utils/db/db.js";

export const addFood = (food_name, ingredients, calories, protein, carbs, fats,warnings, food_url, user_id) => {
    return new Promise((resolve, reject) => {
        const q = `INSERT INTO food_logs (food_name, ingredients, calories, protein, carbs, fats, warnings, pic, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(q, [food_name, JSON.stringify(ingredients), calories, protein, carbs, fats,JSON.stringify(warnings), food_url, user_id], (err, result) => {
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