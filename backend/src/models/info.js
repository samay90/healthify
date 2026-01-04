import db from '../utils/db/db.js';

export const getNutritionInfoByDate = async (user_id, start_date, end_date) => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT total_calories, total_protein, total_carbs, total_fats,intake_date FROM daily_intake WHERE user_id = ? AND (intake_date BETWEEN ? AND ?)';
        db.query(q, [user_id, start_date, end_date], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    })
}

export const getFoodItemsByDate = async (user_id, start_time,end_time) => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT food_log_id,food_name, created_at, pic, calories, protein, carbs, fats FROM food_logs WHERE user_id = ? AND (created_at BETWEEN ? AND ?)';
        db.query(q, [user_id, start_time, end_time], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    })
}

export const getFoodDetails = async (user_id,food_log_id) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT food_name,pic,calories,protein,carbs,fats,warnings,ingredients,created_at FROM food_logs WHERE food_log_id = ? AND user_id = ?`;
        db.query(q, [food_log_id,user_id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    })
}

export const getNutritionInsights = async (user_id,start_time,end_time) => {
    return new Promise((resolve, reject) => {
        const q = `SELECT warnings FROM food_logs WHERE user_id = ? AND (created_at BETWEEN ? AND ?) AND warnings IS NOT NULL`;
        db.query(q, [user_id,start_time,end_time], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}