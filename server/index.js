import express from 'express';
import cors from 'cors';
import { orderRouter, productRouter, userRouter } from './routes/index.js';


const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use("/api/orders", orderRouter);
app.get('/', (req, res)=>{
    res.send({
        message:'success'
    })
})

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
})