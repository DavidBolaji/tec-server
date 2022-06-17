const express = require('express');
require('dotenv').config();

// model start




const app = express();
const PORT = process.env.PORT || 5000 
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const emailRouter = require('./routes/email')
const galleryRouter = require('./routes/gallery')
const cors = require('cors')
app.use(cors({
    origin: '*'
}))

// app use

app.use(express.json());
app.use(userRouter);
app.use(blogRouter);
app.use(emailRouter);
app.use(galleryRouter);






app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})
