# Controller Endpoints Documentation

This document provides an overview of the endpoints implemented in the **iandai** backend service, categorized by their respective controllers.

## Activity Controller

### Activities

#### 1. Get All Activities

- **Endpoint**: `GET /activities`
- **Description**: Retrieves all activities along with related exercises.
- **Controller Method**: `getAllActivities`

#### 2. Get Activity by ID

- **Endpoint**: `GET /activities/:id`
- **Description**: Retrieves a specific activity by its ID along with related exercises.
- **Controller Method**: `getActivityById`

#### 3. Create New Activity

- **Endpoint**: `POST /activities`
- **Description**: Creates a new activity.
- **Controller Method**: `createActivity`

#### 4. Update Activity

- **Endpoint**: `PUT /activities/:id`
- **Description**: Updates an existing activity by its ID.
- **Controller Method**: `updateActivity`

#### 5. Delete Activity

- **Endpoint**: `DELETE /activities/:id`
- **Description**: Deletes an activity by its ID.
- **Controller Method**: `deleteActivity`

## Chat Controller

### Chats

#### 1. Get All Chats

- **Endpoint**: `GET /chats`
- **Description**: Retrieves all chat conversations.
- **Controller Method**: `getAllChats`

#### 2. Get Chat by ID

- **Endpoint**: `GET /chats/:chatId`
- **Description**: Retrieves a specific chat conversation by its ID.
- **Controller Method**: `getChatById`

#### 3. Create New Chat

- **Endpoint**: `POST /chats`
- **Description**: Creates a new chat conversation.
- **Controller Method**: `createChat`

#### 4. Update Chat

- **Endpoint**: `PUT /chats/:chatId`
- **Description**: Updates an existing chat conversation by its ID.
- **Controller Method**: `updateChat`

#### 5. Delete Chat

- **Endpoint**: `DELETE /chats/:chatId`
- **Description**: Deletes a chat conversation by its ID.
- **Controller Method**: `deleteChat`

## Exercise Controller

### Exercises

#### 1. Create New Exercise

- **Endpoint**: `POST /exercises`
- **Description**: Creates a new exercise.
- **Controller Method**: `createExercise`

#### 2. Get All Exercises

- **Endpoint**: `GET /exercises`
- **Description**: Retrieves all exercises along with related activity data.
- **Controller Method**: `getAllExercises`

#### 3. Get Exercise by ID

- **Endpoint**: `GET /exercises/:exerciseId`
- **Description**: Retrieves a specific exercise by its ID along with related activity data.
- **Controller Method**: `getExerciseById`

#### 4. Update Exercise

- **Endpoint**: `PUT /exercises/:id`
- **Description**: Updates an existing exercise by its ID.
- **Controller Method**: `updateExercise`

#### 5. Delete Exercise

- **Endpoint**: `DELETE /exercises/:id`
- **Description**: Deletes an exercise by its ID.
- **Controller Method**: `deleteExercise`

## Language Controller

### Languages

#### 1. Get All Languages

- **Endpoint**: `GET /languages`
- **Description**: Retrieves all supported languages.
- **Controller Method**: `getAllLanguages`

#### 2. Get Language by ID

- **Endpoint**: `GET /languages/:languageId`
- **Description**: Retrieves a specific language by its ID.
- **Controller Method**: `getLanguageById`

#### 3. Create New Language

- **Endpoint**: `POST /languages`
- **Description**: Creates a new language.
- **Controller Method**: `createLanguage`

#### 4. Update Language

- **Endpoint**: `PUT /languages/:languageId`
- **Description**: Updates an existing language by its ID.
- **Controller Method**: `updateLanguage`

#### 5. Delete Language

- **Endpoint**: `DELETE /languages/:languageId`
- **Description**: Deletes a language by its ID.
- **Controller Method**: `deleteLanguage`

## OpenAI Controller

### OpenAI

#### 1. Create OpenAI Chat

- **Endpoint**: `POST /openai`
- **Description**: Initiates a chat with the OpenAI GPT-3.5 Turbo model.
- **Controller Method**: `createOpenAIChat`

#### 2. Update OpenAI Chat

- **Endpoint**: `PUT /openai/:chatId`
- **Description**: Updates an existing chat with additional messages using the OpenAI GPT-3.5 Turbo model.
- **Controller Method**: `updateOpenAIChat`

#### 3. Get Help from OpenAI

- **Endpoint**: `POST /openai/help`
- **Description**: Gets assistance on a given message from the OpenAI GPT-3.5 Turbo model.
- **Controller Method**: `getHelp`

## User Controller

### Users

#### 1. Get All Users

- **Endpoint**: `GET /users`
- **Description**: Retrieves all user profiles.
- **Controller Method**: `getAllUsers`

#### 2. Get User by ID

- **Endpoint**: `GET /users/:userId`
- **Description**: Retrieves a specific user profile by its ID.
- **Controller Method**: `getUserById`

#### 3. Create New User

- **Endpoint**: `POST /users`
- **Description**: Creates a new user profile.
- **Controller Method**: `createUser`

#### 4. Update User

- **Endpoint**: `PUT /users/:userId`
- **Description**: Updates an existing user profile by its ID.
- **Controller Method**: `updateUser`

#### 5. Delete User

- **Endpoint**: `DELETE /users/:userId`
- **Description**: Deletes a user profile by its ID.
- **Controller Method**: `deleteUser`


