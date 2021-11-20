CREATE TABLE users (
  id SERIAL,
  username VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- FIXME: how to store image (post_data)
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  post_data TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  username VARCHAR(255) NOT NULL REFERENCES users on DELETE CASCADE
);

