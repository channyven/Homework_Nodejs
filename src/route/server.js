import express from 'express';  //យក Express Framework មកប្រើ.Express is ✅ Node.js framework, ✅ សម្រាប់បង្កើត API / Web Server
import userRouter from './routes/userRoute.js';  //យក Routes របស់ User មកប្រើ

const app = express();   //បង្កើត Express Application
const PORT = 3000;   //កំណត់ port number.Server will run to localhost3000

app.use(express.json());  //នេះគឺជា Middleware ✅
app.use('/api', userRouter);  //routes ទាំងអស់ក្នុង userRouterនឹងចាប់ផ្តើមដោយ /api

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});