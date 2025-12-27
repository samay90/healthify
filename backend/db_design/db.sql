CREATE DATABASE IF NOT EXISTS healthify;

USE healthify;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    daily_calorie_limit INT DEFAULT 2000,
    daily_protein_limit INT DEFAULT 150,
    daily_carbs_limit INT DEFAULT 250,
    daily_fats_limit INT DEFAULT 65,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pic TEXT
);

CREATE TABLE food_logs (
    food_log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_name VARCHAR(100) NOT NULL,
    ingredients JSON,
    calories INT NOT NULL,
    protein INT NOT NULL,
    carbs INT NOT NULL,
    fats INT NOT NULL,
    warnings JSON,
    pic TEXT,
    created_at VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE daily_intake (
    user_id INT NOT NULL,
    intake_date DATE NOT NULL,
    total_calories INT DEFAULT 0,
    total_protein DECIMAL(6,2) DEFAULT 0,
    total_carbs DECIMAL(6,2) DEFAULT 0,
    total_fats DECIMAL(6,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE (user_id, intake_date)
);
