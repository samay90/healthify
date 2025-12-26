CREATE DATABASE IF NOT EXISTS healthify;

USE healthify;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    daily_calorie_limit INT DEFAULT -1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pic TEXT
);

CREATE TABLE food_logs (
    food_log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_name VARCHAR(100) NOT NULL,
    ingredients JSON,
    calories INT NOT NULL,
    protein DECIMAL(6,2),
    carbs DECIMAL(6,2),
    fats DECIMAL(6,2),

    pic TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE food_warnings (
    warning_id INT AUTO_INCREMENT PRIMARY KEY,
    food_log_id INT NOT NULL,
    warning_text VARCHAR(50) NOT NULL,
    warning_level VARCHAR(20) CHECK (warning_level IN ('INFO', 'WARNING')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (food_log_id) REFERENCES food_logs(food_log_id) ON DELETE CASCADE
);
CREATE TABLE daily_intake (
    intake_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    intake_date DATE NOT NULL,
    total_calories INT DEFAULT 0,
    total_protein DECIMAL(6,2) DEFAULT 0,
    total_carbs DECIMAL(6,2) DEFAULT 0,
    total_fats DECIMAL(6,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE (user_id, intake_date)
);
