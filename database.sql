
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE DATABASE "uniphy_balance_score";

CREATE TABLE balance_score (
    id SERIAL PRIMARY KEY,
    user_id INT,
    date DATE default current_date,
    balance_score NUMERIC(5,2),
    score_m NUMERIC(5,2),
    score_sa NUMERIC(5,2),
    score_o NUMERIC(5,2),
    score_f NUMERIC(5,2),
    score_s NUMERIC(5,2),
    score_w NUMERIC(5,2)
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    "password" VARCHAR,
    is_started BOOLEAN DEFAULT false
);

CREATE TABLE movement (
    id SERIAL PRIMARY KEY,
    user_id INT,
    score_m NUMERIC(5,2),
    date DATE default current_date,
    title VARCHAR(255),
    duration VARCHAR(255),
    intensity INT,
    total_points NUMERIC(5,2)   
);

CREATE TABLE social_activity (
    id SERIAL PRIMARY KEY,
    user_id INT,
    score_sa NUMERIC(5,2),
    date DATE default current_date,
    whom VARCHAR (255),
    rating INT,
    description VARCHAR(255),
    duration INT,
    online BOOLEAN,
    total_points NUMERIC(5,2)  
);

CREATE TABLE occupation (
    id SERIAL PRIMARY KEY,
    user_id INT,
    score_o NUMERIC(5,2),
    date DATE default current_date,
    title VARCHAR(255),
    duration INT,
    description VARCHAR(255),
    total_points NUMERIC(5,2) 
);

CREATE TABLE food (
	id SERIAL PRIMARY KEY,
    user_id INT,
    score_f NUMERIC(5,2),
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
    score_s NUMERIC(5,2),
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
    score_w NUMERIC(5,2),
    date DATE DEFAULT current_date,
    note VARCHAR(255),
    workload INT,
    fullfillment INT,
    total_points NUMERIC(5,2) 
);

INSERT INTO "user" (username)
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

INSERT INTO balance_score (user_id, balance_score, score_m, score_sa, score_o, score_f, score_s)
VALUES ('1', '100', '20', '20', '20', '20', '20');