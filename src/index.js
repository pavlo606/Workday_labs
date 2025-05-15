// In src/index.js
import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';
import UserRouter from './routes/userRoutes.js'
import reportRouter from './routes/reportRoutes.js'
import reportDetailsRouter from './routes/reportDetailsRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/reportdetails', reportDetailsRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});