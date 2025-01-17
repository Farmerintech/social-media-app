# Social Media API

This README file provides documentation for the Social Media API, detailing the available routes, their purposes, and how to interact with them. This API enables functionalities for user authentication, profile management, posts, comments, likes, followers, chats, and notifications.

## Table of Contents
- [Setup](#setup)
- [Routes](#routes)
  - [Authentication Routes](#authentication-routes)
  - [Profile Routes](#profile-routes)
  - [Post Routes](#post-routes)
  - [Comment Routes](#comment-routes)
  - [Follow Routes](#follow-routes)
  - [Like Routes](#like-routes)
  - [Chat Routes](#chat-routes)
  - [Notification Routes](#notification-routes)
  - [User Routes](#user-routes)

## Setup

### Requirements
- Node.js
- npm or yarn

### Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```

## Routes

### Authentication Routes
**Base URL:** `/api/v1/auth`

| Method | Endpoint              | Description                                |
|--------|-----------------------|--------------------------------------------|
| POST   | `/register`           | Register a new user.                      |
| POST   | `/login`              | Login an existing user.                   |
| PATCH  | `/update_password`    | Update the password of a logged-in user.  |

### Profile Routes
**Base URL:** `/api/v1/profile`

| Method | Endpoint             | Description                           |
|--------|----------------------|---------------------------------------|
| GET    | `/:user`             | Get the profile of a specific user.  |
| PUT    | `/update`            | Update the profile of a user.        |

### Post Routes
**Base URL:** `/api/v1/posts`

| Method | Endpoint                    | Description                              |
|--------|-----------------------------|------------------------------------------|
| POST   | `/`                         | Create a new post.                      |
| GET    | `/`                         | Retrieve all posts.                     |
| GET    | `/user/:user`               | Retrieve all posts by a specific user.  |
| GET    | `/:id`                      | Retrieve a specific post.               |
| PUT    | `/:id`                      | Update a specific post.                 |
| DELETE | `/:id`                      | Delete a specific post.                 |

### Comment Routes
**Base URL:** `/api/v1/posts`

| Method | Endpoint                                | Description                               |
|--------|-----------------------------------------|-------------------------------------------|
| POST   | `/:id/comment`                         | Add a comment to a post.                 |
| PATCH  | `/:postId/comment/:commentId`          | Edit a specific comment on a post.       |

### Follow Routes
**Base URL:** `/api/v1/follow`

| Method | Endpoint          | Description                           |
|--------|-------------------|---------------------------------------|
| POST   | `/:username`      | Follow or unfollow a user by username.|

### Like Routes
**Base URL:** `/api/v1/like`

| Method | Endpoint          | Description                           |
|--------|-------------------|---------------------------------------|
| POST   | `/:postId`        | Like or unlike a post.               |

### Chat Routes
**Base URL:** `/api/v1/chats`

| Method | Endpoint           | Description                                |
|--------|--------------------|--------------------------------------------|
| POST   | `/:receiverId`     | Send a chat message to a user.            |
| GET    | `/`                | Retrieve all chats for the logged-in user.|

### Notification Routes
**Base URL:** `/api/v1/notifications`

| Method | Endpoint | Description                            |
|--------|----------|----------------------------------------|
| GET    | `/`      | Retrieve notifications for a user.     |

### User Routes
**Base URL:** `/api/v1/users`

| Method | Endpoint          | Description                               |
|--------|-------------------|-------------------------------------------|
| GET    | `/`               | Retrieve all users.                      |
| GET    | `/:id`            | Retrieve a specific user by their ID.    |

---

## Middleware
- **`authMiddleWare`**: Protects routes by ensuring only authenticated users can access them.
- **Validation Middleware**:
  - `validMiddleware(schema)`: Validates incoming requests against a defined schema.

---

## Notes
- Ensure all requests requiring authentication include a valid token in the `Authorization` header.
- This API is designed to work seamlessly with a frontend application for a complete social media platform experience.

