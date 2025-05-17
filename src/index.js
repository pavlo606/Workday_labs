// In src/index.js
import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';
import UserRouter from './routes/userRoutes.js'
import reportRouter from './routes/reportRoutes.js'
import reportDetailsRouter from './routes/reportDetailsRoutes.js'
import writeToDB from './csv/import_csv.js'
import './database/connect.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', UserRouter);
app.use('/api/report', reportRouter);
app.use('/api/reportdetails', reportDetailsRouter);

app.get('/api/database/generatedata', (req, res) => {
    writeToDB()
    res.status(201).send({
        status: 'OK',
        data: "Generating data",
    });
})

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});