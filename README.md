# Bookshelf API Description and Documentation

## Introduction

This repository houses the code for a Bookshelf API, providing various endpoints to manage a collection of books. Below are the available routes and their functionalities, along with instructions on how to test them.

## Routes and Features

### 1. Add a Book

- **Route:** `POST /books`
- **Description:** Creates a new book entry in the bookshelf.
- **Usage:** Provide book details in the request payload.

### 2. Get All Books

- **Route:** `GET /books`
- **Description:** Retrieves all books from the bookshelf.
- **Optional Query Parameters:** `name`, `reading`, `finished`.
- **Usage:** Use query parameters for filtering based on book name, reading status, or finished status.

### 3. Get Book by ID

- **Route:** `GET /books/{id}`
- **Description:** Retrieves a specific book by its unique ID.
- **Usage:** Replace `{id}` in the route with the book's ID.

### 4. Edit Book by ID

- **Route:** `PUT /books/{id}`
- **Description:** Modifies an existing book by its unique ID.
- **Usage:** Replace `{id}` in the route with the book's ID and provide updated book details in the request payload.

### 5. Delete Book by ID

- **Route:** `DELETE /books/{id}`
- **Description:** Removes a specific book by its unique ID.
- **Usage:** Replace `{id}` in the route with the book's ID.

## Testing the API

To test the functionalities of the Bookshelf API, follow these steps:

1. **Run the Server:** Ensure the server is running.
2. **API Testing Tools:** Utilize tools like Postman or a web browser to interact with the API endpoints.
3. **Endpoint Usage:** Use the provided routes with respective methods (GET, POST, PUT, DELETE) and payloads/query parameters if needed.

## Usage

To run the Bookshelf API, ensure you have the required dependencies and configurations in place. Run the application and start testing the routes using the provided instructions.

