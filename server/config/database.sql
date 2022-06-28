CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE todo (
    todo_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    description VARCHAR(255)
);

INSERT INTO todo(description) VALUES('deploy todo project');