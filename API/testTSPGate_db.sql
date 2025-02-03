CREATE DATABASE testTSPGate_db;
USE testTSPGate_db;


/* Таблица Пользователи */
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password CHAR(64) NOT NULL
);

/* Таблица дни недели */
CREATE TABLE dates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day CHAR(2),
    start_time BIGINT,
    end_time BIGINT
);



/* Основные ветви */
INSERT users(email, password) 
VALUES
	('user1@some.com', 'e4369ceea3a0000e235813f732a51dc7fd43f7be63594147f37575d262579e53'),
	('user2@some.com', '75435e5bded298650a0630a1fe6f477c7149753c4366e0c6be9c820e9b2a4b0a');


/* Второстепенные ветви */
INSERT dates(day, start_time, end_time) 
VALUES
	('Пн', 0, 0),
	('Вт', 0, 0),
	('Ср', 0, 0),
	('Чт', 0, 0),
	('Пт', 0, 0),
	('Сб', 0, 0),
	('Вс', 0, 0);



