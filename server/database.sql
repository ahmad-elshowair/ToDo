
CREATE DATABASE PERN_TODO;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE todo (
  todo_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  description VARCHAR(255)
);
