📝 Store API

A simple store API with CRUD operations, pagination, and filtering.

📌 API Endpoints

### Create a Task

Method: POST

URL: http://localhost:3000/api/tasks

Headers: Content-Type: application/json

Request Body:

{

  "title": "Buy Groceries",
  
  "description": "Get milk, eggs, and bread",
  
  "priority": "high",
  
  "status": "pending"
  
}

### Get All Tasks with Pagination & Filtering

Method: GET

URL: http://localhost:3000/api/tasks?page=1&limit=10&priority=high&status=pending

### Get a Single Task

Method: GET

URL: http://localhost:3000/api/tasks/{taskId}

### Update a Task

Method: PUT

URL: http://localhost:3000/api/tasks/{taskId}

Headers: Content-Type: application/json

Request Body:

{

  "title": "Buy Groceries and Fruits",
  
  "priority": "medium",
  
  "status": "completed"
  
}

### Delete a Task

Method: DELETE

URL: http://localhost:3000/api/tasks/{taskId}


 


