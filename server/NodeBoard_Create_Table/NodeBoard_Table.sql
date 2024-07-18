-- Create User table
CREATE TABLE [User] (
    [user_id] INT IDENTITY(1,1) PRIMARY KEY,
    [username] VARCHAR(50) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [password] VARCHAR(100) NOT NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- Create Board table
CREATE TABLE [Board] (
    [board_id] INT IDENTITY(1,1) PRIMARY KEY,
    [title] VARCHAR(100) NOT NULL,
    [content] TEXT NOT NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [user_id] INT NOT NULL,
    FOREIGN KEY ([user_id]) REFERENCES [User]([user_id])
);

-- Create Comment table
CREATE TABLE [Comment] (
    [comment_id] INT IDENTITY(1,1) PRIMARY KEY,
    [content] TEXT NOT NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [user_id] INT NOT NULL,
    [board_id] INT NOT NULL,
    FOREIGN KEY ([user_id]) REFERENCES [User]([user_id]),
    FOREIGN KEY ([board_id]) REFERENCES [Board]([board_id])
);

-- Create Attachment table
CREATE TABLE [file] (
    [file_id] INT IDENTITY(1,1) PRIMARY KEY,
    [filename] VARCHAR(100) NOT NULL,
    [file_path] VARCHAR(200) NOT NULL,
    [board_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY ([board_id]) REFERENCES [Board]([board_id])
);

-- Create Reply table
CREATE TABLE [Reply] (
    [reply_id] INT IDENTITY(1,1) PRIMARY KEY,
    [content] TEXT NOT NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [user_id] INT NOT NULL,
    [comment_id] INT NOT NULL,
    FOREIGN KEY ([user_id]) REFERENCES [User]([user_id]),
    FOREIGN KEY ([comment_id]) REFERENCES [Comment]([comment_id])
);

-- Create Chat table
CREATE TABLE [Chat] (
    [chat_id] INT IDENTITY(1,1) PRIMARY KEY,
    [message] TEXT NOT NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [from_user_id] INT NOT NULL,
    [to_user_id] INT NOT NULL,
    FOREIGN KEY ([from_user_id]) REFERENCES [User]([user_id]),
    FOREIGN KEY ([to_user_id]) REFERENCES [User]([user_id])
);