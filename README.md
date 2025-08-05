# Permission Service Communication Contract

The **Permission Service** provides a simple REST API for storing and retrieving a user’s location‐permission setting. You can make standard HTTP requests (in JavaScript or any other language) against these endpoints to integrate this service into your application.

---

## Repository Setup & Running the Service

1. **Clone repository**
   ```bash
   git clone https://github.com/qife422/permission-service.git
   cd permission-service
   ```

2. **Install dependencies**
```bash
npm instal
```
3. **Start the service**
```bash
npm start
# → "Permission service running on http://localhost:3000"
```
## A. How to programmatically REQUEST data
Base URL: http://localhost:3000

Do not import or call our test harness—your teammate must write all of their own HTTP client code.

1) Query current choice
Retrieves the currently stored permission choice (if any):
```bash
curl -i -X GET http://localhost:3000/permission
```
If no choice has been set:
```http
HTTP/1.1 204 No Content
```

If a choice exists:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{"choice":"allow_once"}
```

2) Set or update choice
Stores a new permission choice. Valid values are:
```php
allow_while_visiting
allow_once
never
```

```bash
curl -i -X POST http://localhost:3000/permission \
     -H "Content-Type: application/json" \
     -d '{"choice":"allow_while_visiting"}'
```
Response:
```css
HTTP/1.1 200 OK
Content-Type: application/json

{"choice":"allow_while_visiting"}
```

B. How to RECEIVE Data
As JSON over HTTP:

GET /permission

204 No Content → no body

200 OK → {"choice": ...}

POST /permission

200 OK → {"choice": ...}

Example in JavaScript (using fetch)
```js
const BASE = 'http://localhost:3000';

// 1) Query
async function getChoice() {
  const res = await fetch(`${BASE}/permission`);
  if (res.status === 204) {
    console.log('No permission choice set');
  } else {
    const { choice } = await res.json();
    console.log('Current choice:', choice);
  }
}

// 2) Set
async function setChoice(newChoice) {
  const res = await fetch(`${BASE}/permission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ choice: newChoice })
  });
  const { choice } = await res.json();
  console.log('Permission updated to:', choice);
}

// Usage example:
getChoice();
setChoice('allow_once').then(() => getChoice());
```
C. UML Sequence Diagram
```
                Permission Service
+--------+   +---------------------------+
| Client |   |        Service            |
+--------+   +---------------------------+
     |  GET /permission            |
     |---------------------------->|
     | <---------------------------| 204 No Content
     |                              |
     |  POST /permission            |
     |  {"choice":"allow_once"}     |
     |---------------------------->|
     | <---------------------------| 200 OK {"choice":"allow_once"}
     |                              |
     |  GET /permission            |
     |---------------------------->|
     | <---------------------------| 200 OK {"choice":"allow_once"}
```

