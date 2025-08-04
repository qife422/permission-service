# Permission Service Communication Contract

The **Permission Service** exposes a simple REST API for storing and retrieving a user’s location‐permission choice. Your teammate can embed HTTP calls into their own JavaScript code (or any other language) to integrate this microservice into the main application.

---

## A. How to programmatically **REQUEST** data

Base URL: `http://localhost:3000`

> **Do not** import or call our test harness—your teammate must write all of their own HTTP client code.

### 1) Query current choice  
Retrieves the currently stored permission choice (if any).  
```bash
curl -i -X GET http://localhost:3000/permission
