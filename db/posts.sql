DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(20) NOT NULL,
    pseudonym  varchar(120) NOT NULL,
    body varchar(140) NOT NULL
);



