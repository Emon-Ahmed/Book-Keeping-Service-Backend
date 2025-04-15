# 📂 Project Setup

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Emon-Ahmed/Book-Keeping-Service-Backend.git
cd Book-Keeping-Service-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (.env file):

```bash
NODE_ENV=development
PORT=8000
MONGO_URI=
JWT_SECRET=1234

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

4. Start the server:

```bash
npm run dev
```

## Server Details

1. Postman Collection Link

```bash
https://documenter.getpostman.com/view/21619722/2sB2ca7fMy
```

2. Postman Import File Drive Link

```bash
https://drive.google.com/file/d/1esnRfkDtMZ67mAUqUIbBoeY1lYDkPAxm/view?usp=sharing
```

3. Server Live Link

```bash
https://book-keeping-service-backend.onrender.com/
```

## API Endpoints

Books

```
GET ~ /api/books - https://book-keeping-service-backend.onrender.com/api/books
```

```
GET ~ /api/books/:id - https://book-keeping-service-backend.onrender.com/api/books/67fdd82a01c5e423d678c66b
```

```
POST ~ /api/books - https://book-keeping-service-backend.onrender.com/api/books
```

```
PUT ~ /api/books/:id - https://book-keeping-service-backend.onrender.com/api/books/67fdd86401c5e423d678c671
```

```
DELETE ~ /api/books/:id - https://book-keeping-service-backend.onrender.com/api/books/67fdd82a01c5e423d678c66b
```

Users:

```
POST ~ /api/users/register - https://book-keeping-service-backend.onrender.com/api/users/register
```

```
POST ~ /api/users/login - https://book-keeping-service-backend.onrender.com/api/users/login
```

```
POST ~ /api/users/login - https://book-keeping-service-backend.onrender.com/api/users/logout
```

Borrowing:

```
POST ~ /api/borrow - https://book-keeping-service-backend.onrender.com/api/borrow
```

```
PUT ~ /api/return/:id - https://book-keeping-service-backend.onrender.com/api/return/67fdd82a01c5e423d678c66b
```

Libraries:

```
GET ~ /api/libraries - https://book-keeping-service-backend.onrender.com/api/library
```

```
GET ~ /api/libraries/:id - https://book-keeping-service-backend.onrender.com/api/library/67fddb5b01c5e423d678c6a0
```

```
POST ~ /api/libraries - https://book-keeping-service-backend.onrender.com/api/library
```

```
PUT ~ /api/libraries/:id - https://book-keeping-service-backend.onrender.com/api/library/67fddb3f01c5e423d678c697
```

```
DELETE ~ /api/libraries/:id - https://book-keeping-service-backend.onrender.com/api/library/67fddb3f01c5e423d678c697
```

Library Inventory:

```
GET /api/libraries/:id/inventory - https://book-keeping-service-backend.onrender.com/api/library/67fddb6201c5e423d678c6a3/inventory
```

```
POST ~ /api/libraries/:id/inventory - https://book-keeping-service-backend.onrender.com/api/library/67fddb5b01c5e423d678c6a0/inventory
```

```
DELETE ~ /api/libraries/:id/inventory/:bookId - https://book-keeping-service-backend.onrender.com/api/library/67fddb5b01c5e423d678c6a0/inventory/67fdd84d01c5e423d678c66e
```
