CREATE TABLE users (
    id char(36) PRIMARY KEY,  
    name VARCHAR(120) NOT NULL,
    lastname VARCHAR(120) NOT NULL,
    username VARCHAR(120) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goal (
    id CHAR(36) PRIMARY KEY, 
    title VARCHAR(120) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    state BOOLEAN NOT NULL,
    id_user CHAR(36) NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE habit (
    id CHAR(36) PRIMARY KEY, 
    id_goal CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    frequency VARCHAR(120) NOT NULL,
    title VARCHAR(120) NOT NULL,
    state BOOLEAN NOT NULL,
    CONSTRAINT fk_goal_id FOREIGN KEY (id_goal) REFERENCES goal(id)
);
