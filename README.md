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

#
