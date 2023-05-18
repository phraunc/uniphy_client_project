
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE DATABASE "uniphy_balance_score";

CREATE TABLE balance_score (
    id SERIAL PRIMARY KEY,
    user_id INT,
    date DATE default current_date,
    balance_score INT,
    score_m INT,
    score_sa INT,
    score_o INT,
    score_f INT,
    score_s INT
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    "password" VARCHAR
);

CREATE TABLE movement (
    id SERIAL PRIMARY KEY,
    user_id INT,
    score_m INT,
    date DATE default current_date,
    title VARCHAR(255),
    duration INT,
    intensity INT,
    total_points NUMERIC(5,2)   
);

CREATE TABLE social_activity (
    id SERIAL PRIMARY KEY,
    user_id INT,
    score_sa INT,
    date DATE default current_date,
    whom VARCHAR (255),
    description VARCHAR(255),
    duration INT,
    online BOOLEAN,
    total_points NUMERIC(5,2)  
);

CREATE TABLE occupation (
    id SERIAL PRIMARY KEY,
    user_id INT,
    score_o INT,
    date DATE default current_date,
    title VARCHAR(255),
    duration INT,
    description VARCHAR(255),
    total_points NUMERIC(5,2) 
);

CREATE TABLE food (
	id SERIAL PRIMARY KEY,
    user_id INT,
    score_f INT,
    date DATE DEFAULT current_date,
    quality INT,
    quantity INT,
    snack INT,
    water INT,
    fasting INT,
    total_points NUMERIC(5,2)  
);

CREATE TABLE sleep (
	id SERIAL PRIMARY KEY,
    user_id INT,
    score_s INT,
    date DATE DEFAULT current_date,
    duration INT,
    quality INT,
    screen_time INT,
    start_sleep INT,
    end_sleep INT,
    total_points NUMERIC(5,2)  
);

CREATE TABLE work_school (
	id SERIAL PRIMARY KEY,
    user_id INT,
    score_w INT,
    date DATE DEFAULT current_date,
    note VARCHAR(255),
    workload INT,
    fullfillment INT,
    total_points NUMERIC(5,2) 
);

INSERT INTO user (username)
VALUES ('sarahMgellar');

INSERT INTO movement (user_id, title, duration, intensity)
VALUES ('1', 'biking', '28', '3');

INSERT INTO social_activity (user_id, whom, description, duration, online)
VALUES ('1', 'Friends', 'Quick hang before dinner', '45', 'false');

INSERT INTO occupation (user_id, title, duration, description)
VALUES ('1', 'Relaxing', '45', 'Teen murder mystery The Naturals');

INSERT INTO food (user_id, quality, quantity, snack, water, fasting)
VALUES ('1', '79', '2', '5', '8', '0');

INSERT INTO sleep (user_id, quality, duration, screen_time)
VALUES ('1', '11', '8', '9');

INSERT INTO work_school (user_id, note, workload, fullfillment)
VALUES ('1', 'Worked From Home', '-2', '3');