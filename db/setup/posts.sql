-- DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    pname VARCHAR(120) NOT NULL,
    body VARCHAR(140) NOT NULL
);



