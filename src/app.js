const express = require('express');
require('dotenv').config();

// model start




const app = express();
const PORT = 5000 || process.env.PORT
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const emailRouter = require('./routes/email')
const cors = require('cors')
app.use(cors({
    origin: '*'
}))

// app use

app.use(express.json());
app.use(userRouter);
app.use(blogRouter);
app.use(emailRouter);






app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})
