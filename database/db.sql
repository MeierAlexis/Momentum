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
    target INT NOT NULL,
    id_user CHAR(36) NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE habit (
    id CHAR(36) PRIMARY KEY, 
    id_goal CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    days VARCHAR(50) NOT NULL,
    title VARCHAR(120) NOT NULL,
    state BOOLEAN NOT NULL,
    goal_per_week INT NOT NULL,
    completed INT DEFAULT 0,
    
    CONSTRAINT fk_goal_id FOREIGN KEY (id_goal) REFERENCES goal(id)
);


CREATE TABLE goal_update(
    id CHAR(36) PRIMARY KEY,
    id_goal CHAR(36) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress DECIMAL(5,2) NOT NULL,
    constraint fk_goal_updates FOREIGN KEY (id_goal) REFERENCES goal(id)
);

CREATE TABLE notes (
    id CHAR (36) PRIMARY KEY,
    id_goal CHAR(36) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(120) NOT NULL,
    note VARCHAR(255) NOT NULL,
    CONSTRAINT fk_goal_notes FOREIGN KEY (id_goal) REFERENCES goal(id)
);          