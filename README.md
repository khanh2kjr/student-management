# BÀI THI MÔN HỌC PHÁT TRIỂN PHẦN MỀM HƯỚNG DỊCH VỤ
# NGUYỄN VĂN KHÁNH - DH8C2
Student management


## Công nghệ sử dụng:

- Frontend: ReactJS, Axios
- Backend: NodeJS, MySQL

### Cài đặt và chạy ứng dụng:

DB_NAME: dh8c2
<br>
TB_NAME: students
<br>
COLUMS: studentCode, fullName, email, phoneNumber

- cd server

```bash
      npm install
      npm run dev
```

- cd client

```bash
      npm install
      npm start
```

Truy cập ứng dụng: http://localhost:3000/students

#### Cấu trúc API

baseUrl: http://localhost:8000/api/students

- [Get students] : `GET baseUrl` 
  - [Pagination]: `query params: ?limit={{number}}&page={{number}}&...`
  - [Search]: `query param: ?nameLike={{string}}&...`
   <br>
**Service response:**  { <br>`"data": [{student},...], `<br>`"pagination": {"limit": number, "page": number, "total": "number"}`<br>}
<br>
<br>

- [Get one student] : `GET baseUrl/:studentCode`
- [Create a new student] : `POST baseUrl`
  - [data-request]: `Student: {studentCode: string, fullName: string, email: string, phoneNumber: string}`
- [Edit an Student] : `PUT baseUrl/:studentCode`
  - [data-request]: `Student: {studentCode: string, fullName: string, email: string, phoneNumber: string}`
- [Delete all students] : `DELETE baseUrl`
- [Delete an student] : `DELETE baseUrl/:studentCode`
