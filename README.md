# Number Classification API

This project is a Node.js and Express-based API that accepts a number via a query parameter and returns interesting mathematical properties of that number along with a fun fact from an external API. The API checks if the number is prime, perfect, an Armstrong number (narcissistic), calculates the sum of its digits, and determines its parity (odd or even).

## Features

- **Mathematical Classification:**
  - Checks if the number is prime.
  - Checks if the number is perfect.
  - Checks if the number is an Armstrong number.
  - Calculates the sum of its digits.
  - Determines if the number is odd or even.
- **Fun Fact:**  
  Retrieves a fun fact about the number from the [Numbers API](http://numbersapi.com).
- **CORS Enabled:**  
  Allows cross-origin requests.
- **Error Handling:**  
  Returns clear error messages for invalid inputs.

## API Endpoint

**GET** `/api/classify-number?number=<value>`

### Example Successful Response (200 OK)
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is a narcissistic number."
}

### Example Error Response (400 Bad Request)

{
    "number": "invalid_input",
    "error": true,
    "message": "Invalid input. Please provide a valid integer."
}

### Deployment
The API is currently deployed using Render, as it is a platform that supports Node.js. Follow the platform-specific instructions to deploy your application.

