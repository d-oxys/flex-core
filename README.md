# Backend for Flex-Core

> Tugas UAS Desain Kreatif Aplikasi Dan Game

Teknologi yang digunakan :

1. Next JS
2. Firebase

## Cara install

1. Buka Git Bash
2. Clone project di https://github.com/d-oxys/flex-core
3. Install Package Yang Di Butuhkan : npm install
4. Jalankan Lokal Server : npm run dev
   > server berjalan di port 3000, pastikan port tidak terpakai

## API

### Register

#### User Register

- URL : /register
- Method : POST
- Request Body:
  - name as string
  - email as string
  - password as string
- Response :

```json
{
  "status": "ok",
  "message": "register successfuly"
}
```

### Login

#### User Login

- URL : /login
- Method : POST
- Request Body:
  - email as string
  - password as string
- Response:

```json
{
  "status": "ok",
  "message": "logged in successfully",
  "user": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "role": "role"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9obiIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImN1c3RvbWVyX2lkIjozLCJpYXQiOjE3MDA2MzQxNDR9.sgoDeu8lNRm_SfoXbb7MkpMEn4ghG0g4Le0GFyN2bn8"
}
```

### WorkoutPlan

#### Menambahkan WorkoutPlan

- URL : /api/workout
- Method : POST
- Request Body:
  - nama as string
  - fotoWO as string
  - Waktu Latihan as string
  - Kategori as string
  - funFacts as string
  - energi Yang digunakan as array of string
  - alat as array of string
  - tutorial as array of string
- Response:

```json
{
  "status": "ok",
  "message": "Workout plan submitted successfully!",
  "reportId": "123456"
}
```
