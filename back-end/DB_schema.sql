CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'moderator', 'user')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ADD COLUMN username VARCHAR(255) UNIQUE NOT NULL;





CREATE TABLE forums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    photo TEXT DEFAULT 'default.png',
    topic VARCHAR(100),
    visibility VARCHAR(10) CHECK (visibility IN ('public', 'private', 'restricted')) NOT NULL DEFAULT 'public',
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    forum_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    photo TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) CHECK (entity_type IN ('post', 'project', 'event', 'nlp_tool', 'corpus', 'course')),
    entity_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    image TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE evaluations (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) CHECK (entity_type IN ('post', 'project', 'event', 'nlp_tool', 'corpus', 'course')),
    entity_id INT NOT NULL,
    user_id INT NOT NULL,
    vote INT CHECK (vote IN (-1, 1)), -- Upvote = 1, Downvote = -1
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (entity_type, entity_id, user_id) -- A user can only vote once per entity
);


CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    deadline TIMESTAMP NOT NULL,
    visibility VARCHAR(10) CHECK (visibility IN ('public', 'private')) NOT NULL DEFAULT 'public',
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

 CREATE TABLE event_interest (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    notify_before INTERVAL NOT NULL, -- How long before the event the user wants to be notified
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE (user_id, event_id) -- A user can only mark interest once per event
);
 CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    visibility VARCHAR(10) CHECK (visibility IN ('public', 'private')) NOT NULL DEFAULT 'public',
    status VARCHAR(10) CHECK (status IN ('finished', 'ongoing')) NOT NULL DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE project_files (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL, -- Stores the uploaded file location
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE project_owners (
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 CREATE TABLE project_requests (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(10) CHECK (status IN ('pending', 'accepted', 'rejected')) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (project_id, user_id) -- A user can only request once per project
);
 CREATE TABLE project_participants (
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(50) DEFAULT 'member', -- Can be extended for roles like 'lead', 'researcher', etc.
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--add column certified to users table
ALTER TABLE users ADD COLUMN certified BOOLEAN DEFAULT FALSE; 

CREATE TABLE nlp_tools (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    link TEXT NOT NULL CHECK (link ~ '^https?://'), -- Ensures it's a valid URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE corpus (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE corpus_files (
    id SERIAL PRIMARY KEY,
    corpus_id INT NOT NULL,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL, -- Stores the file location
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (corpus_id) REFERENCES corpus(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE annotation_files (
    id SERIAL PRIMARY KEY,
    corpus_id INT NOT NULL,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL, -- Stores the file location
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (corpus_id) REFERENCES corpus(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE publication (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    publication_type VARCHAR(50)  NOT NULL,
    file_path TEXT NOT NULL, -- Stores the file location (PDF, DOCX, etc.)
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE course_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    category_id INT NOT NULL,
    link TEXT CHECK (link ~ '^https?://') DEFAULT NULL, -- Optional external course link
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES course_categories(id) ON DELETE CASCADE
);
CREATE TABLE course_files (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL, -- Stores uploaded course files (PDF, videos, etc.)
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);



-- Index on users table for quick lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Indexing for faster search in posts and forums
CREATE INDEX idx_posts_forum_id ON posts(forum_id);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_forums_name ON forums(name);

-- Indexing for events (faster queries on time-based data)
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_deadline ON events(deadline);

-- Index on projects for filtering based on status
CREATE INDEX idx_projects_status ON projects(status);

-- Index for project participants & requests
CREATE INDEX idx_project_participants_project_id ON project_participants(project_id);
CREATE INDEX idx_project_requests_project_id ON project_requests(project_id);

-- Index for NLP tools (since it relies on external links)
CREATE INDEX idx_nlp_tools_name ON nlp_tools(title);

-- Index for corpus and publications (frequently searched by title)
CREATE INDEX idx_corpus_title ON corpus(title);
CREATE INDEX idx_publication_title ON publication(title);

-- Index for course categories
CREATE INDEX idx_course_categories_name ON course_categories(name);

-- Indexing evaluations for faster calculations of upvotes/downvotes
CREATE INDEX idx_evaluations_target ON evaluations(entity_id, entity_type);
CREATE INDEX idx_evaluations_user ON evaluations(user_id);

-- Trigger to prevent project owners from being participants in their own projects


CREATE OR REPLACE FUNCTION prevent_owner_as_participant()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM projects 
        WHERE id = NEW.project_id AND owner_id = NEW.participant_id
    ) THEN
        RAISE EXCEPTION 'Project owner cannot be a participant in their own project';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_no_owner_as_participant
BEFORE INSERT OR UPDATE ON project_participants
FOR EACH ROW EXECUTE FUNCTION prevent_owner_as_participant();


