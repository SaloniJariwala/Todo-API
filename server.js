const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8080;
const cors = require('cors');
const UserRoutes = require('./Routes/userRoutes');
const { DBConnect } = require('./config/dbConnect');

const app = express();
DBConnect();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Todo Backend!')
});

app.use('/api/user', UserRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});