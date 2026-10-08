# Assignment: Application Programming Interfaces (APIs)

## 1. Introduction
Application Programming Interfaces (APIs) allow different software applications and services to communicate. Modern applications use APIs for payments, maps, authentication, notifications, databases, shipping, and many other services. APIs help developers reuse existing functionality instead of building every feature from scratch.

## 2. What is an API?
API stands for Application Programming Interface. It is a set of rules and methods that allows one software application to request data or functionality from another application.

Example:

```text
Weather App
    |
    | Request
    v
Weather API
    |
    | Response
    v
Weather Data
```

Example request:
```http
GET /weather?city=Mumbai
```

Example response:
```json
{
  "city": "Mumbai",
  "temperature": 29,
  "condition": "Cloudy"
}
```

## 3. Importance of APIs
APIs are important because they provide:
- Integration between different applications
- Reusable services
- Faster application development
- Scalability
- Controlled access and security
- Automation of business processes

## 4. Types of APIs

### 4.1 REST API
REST (Representational State Transfer) is one of the most common approaches for web APIs. REST APIs commonly use HTTP methods.

| Method | Purpose |
|---|---|
| GET | Retrieve data |
| POST | Create data |
| PUT | Update data |
| PATCH | Partially update data |
| DELETE | Delete data |

Example endpoints:
```text
GET    /students
GET    /students/101
POST   /students
PUT    /students/101
DELETE /students/101
```

Advantages:
- Simple and widely supported
- Uses standard HTTP
- Works well with web and mobile applications
- Usually lightweight
- Easy to test

Disadvantages:
- Clients may receive more data than required
- Multiple requests may sometimes be necessary
- Versioning can become complicated in large systems

### 4.2 SOAP API
SOAP (Simple Object Access Protocol) is a protocol commonly used in enterprise applications. SOAP normally uses XML.

Example:
```xml
<soap:Envelope>
  <soap:Body>
    <GetCustomer>
      <CustomerID>101</CustomerID>
    </GetCustomer>
  </soap:Body>
</soap:Envelope>
```

Advantages:
- Strong standards
- Enterprise-level support
- Security features
- Strict contracts through WSDL

Disadvantages:
- More complex than REST
- XML messages can be large
- More processing is usually required

### 4.3 GraphQL API
GraphQL is an API query language and runtime that lets clients request exactly the data they need.

Example:
```graphql
query {
  student {
    name
    course
    email
  }
}
```

Advantages:
- Clients request only required data
- Reduces unnecessary data transfer
- Useful for complex applications
- Often uses a single endpoint

Disadvantages:
- More complicated than a simple REST API
- Caching can be more complex
- Requires GraphQL-specific knowledge

## 5. REST vs SOAP vs GraphQL

| Feature | REST | SOAP | GraphQL |
|---|---|---|---|
| Type | Architectural style | Protocol | Query language/runtime |
| Common format | JSON | XML | JSON |
| Complexity | Low/Medium | High | Medium |
| Flexibility | High | Lower | Very high |
| Common use | Web/mobile | Enterprise | Complex applications |

## 6. Benefits of APIs
APIs provide:
1. Faster development
2. Reduced development costs
3. Better user experiences
4. Business system integration
5. Automation
6. Access to specialized external services

Example:
```text
E-Commerce Website
       |
       +---- Payment API
       +---- Shipping API
       +---- SMS API
       +---- Email API
```

## 7. Steps to Integrate an API

### Step 1: Identify the Requirement
Determine what functionality the application needs, such as online payments or maps.

### Step 2: Select an API
Consider documentation, pricing, security, reliability, rate limits, and authentication.

### Step 3: Read the Documentation
Documentation explains endpoints, HTTP methods, parameters, authentication, request formats, response formats, and errors.

### Step 4: Obtain Authentication Credentials
Common methods include API keys, bearer tokens, and OAuth.

Example:
```http
Authorization: Bearer YOUR_TOKEN
```

Secrets should be stored in environment variables:
```env
API_KEY=your_api_key
```

### Step 5: Send an API Request
Example JavaScript:
```javascript
async function getProducts() {
    try {
        const response = await fetch("https://api.example.com/products");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
getProducts();
```

### Step 6: Handle Responses
Common HTTP status codes:

| Status | Meaning |
|---|---|
| 200 | Successful |
| 201 | Created |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 500 | Server error |

### Step 7: Handle Errors
```javascript
async function getUser() {
    try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Unable to retrieve user");
        const user = await response.json();
        console.log(user);
    } catch (error) {
        console.error(error.message);
    }
}
```

### Step 8: Test the API
Tools include Postman, Insomnia, cURL, and automated testing frameworks.

Example:
```bash
curl https://api.example.com/products
```

## 8. Real-World Use Case: Uber
Uber is an example of a large application that combines multiple services. A ride-booking workflow may involve location services, driver matching, ride management, payments, and notifications.

```text
Passenger requests ride
          |
          v
      Ride API
          |
          v
Driver matching system
          |
          v
Location/Map services
          |
          v
Payment system
          |
          v
Notification service
```

APIs allow specialized systems to communicate while keeping their responsibilities separate.

## 9. Real-World Use Case: Amazon
Amazon's e-commerce services can involve product, customer, inventory, order, payment, shipping, and notification services.

```text
Customer
   |
   v
Amazon Website/App
   |
   v
Product API
   |
   v
Inventory API
   |
   v
Order API
   |
   v
Payment API
   |
   v
Shipping/Delivery System
```

This service-based approach allows different components to communicate efficiently.

## 10. Other API Applications

### Banking
APIs connect mobile banking applications, payment systems, account services, and fraud detection systems.

### Travel
Travel applications can integrate airline, hotel, map, and payment APIs.

### Social Media
APIs can provide social login, user profiles, content sharing, and notifications.

### Food Delivery
```text
Restaurant API
      |
      v
Order API
      |
      v
Payment API
      |
      v
Map API
      |
      v
Delivery Tracking API
```

## 11. API Best Practices
- Never publish API keys or secrets in public repositories.
- Use HTTPS.
- Validate input.
- Handle errors and timeouts.
- Respect API rate limits.
- Keep API documentation updated.
- Store credentials in environment variables.

## 12. Example API Architecture

```text
                 USER
                   |
                   v
             Web/Mobile App
                   |
                   v
              Backend API
                   |
        +----------+----------+
        |          |          |
        v          v          v
    Database   Payment API   Map API
        |          |          |
        v          v          v
    User Data   Payments   Location
```

## 13. Conclusion
APIs are a fundamental part of modern software development. They allow applications and services to communicate efficiently and let developers combine existing technologies into complete solutions.

REST, SOAP, and GraphQL provide different approaches to API communication. REST is widely used for web and mobile applications, SOAP is useful in many enterprise environments, and GraphQL provides flexible data querying.

Companies such as Uber and Amazon demonstrate how large applications can depend on multiple services and APIs to deliver complex functionality. Understanding API design, integration, authentication, testing, and security is therefore an essential skill for modern software developers.
