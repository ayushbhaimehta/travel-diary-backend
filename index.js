import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('App is running');
});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);