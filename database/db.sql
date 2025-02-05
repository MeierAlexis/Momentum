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
    CREATE TABLE wheel_of_life (
        id CHAR(36) PRIMARY KEY,
        id_user CHAR(36) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        friends INT NOT NULL CHECK (friends >= 0 AND friends <= 10),
        health INT NOT NULL CHECK (health >= 0 AND health <= 10),
        fun INT NOT NULL CHECK (fun >= 0 AND fun <= 10),
        career INT NOT NULL CHECK (career >= 0 AND career <= 10),
        money INT NOT NULL CHECK (money >= 0 AND money <= 10),
        love INT NOT NULL CHECK (love >= 0 AND love <= 10),
        family INT NOT NULL CHECK (family >= 0 AND family <= 10),
        spirituality INT NOT NULL CHECK (spirituality >= 0 AND spirituality <= 10),
        CONSTRAINT fk_user_wheel FOREIGN KEY (id_user) REFERENCES users(id)
    );

CREATE TABLE habit_progress (
    id CHAR(36) PRIMARY KEY,
    id_habit CHAR(36) NOT NULL,
    week_start DATE NOT NULL,
    week_end DATE NOT NULL,
    completed INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_habit_progress FOREIGN KEY (id_habit) REFERENCES habit(id)
);

CREATE TABLE habit_log (
    id CHAR(36) PRIMARY KEY,
    id_habit CHAR(36) NOT NULL,
    date DATE NOT NULL,
    completed BOOLEAN NOT NULL,  -- TRUE si completado, FALSE si fallado

    CONSTRAINT fk_habit_log FOREIGN KEY (id_habit) REFERENCES habit(id)
);
    
CREATE TABLE habits_completed (
    id CHAR(36) PRIMARY KEY,
    id_user CHAR(36) NOT NULL,       
    date DATE NOT NULL UNIQUE,   
    total_completed INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_user_completed FOREIGN KEY (id_user) REFERENCES users(id)
);



