DROP TABLE IF EXISTS tasks; 

CREATE TABLE IF NOT EXISTS tasks(
    id            INT PRIMARY KEY auto_increment,
    task_desc     VARCHAR(100) NOT NULL,
    completed     BOOLEAN NOT NULL,
    created       DATETIME,
    user_id       INT
);

INSERT INTO tasks (task_desc,completed,created,user_id) VALUES("create database tables",FALSE,NOW(),1);

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
    id          INT PRIMARY KEY auto_increment,
    name        VARCHAR(20) NOT NULL
);