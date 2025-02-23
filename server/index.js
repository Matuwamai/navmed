import express from 'express';
import cors from 'cors';
import { productRouter, userRouter } from './routes/index.js';


const app = express();

// middleware
app.use(express.json());
app.use(cors())


// routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
})