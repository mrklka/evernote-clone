const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const url = process.env.ATLAS_URL;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log("Connected to database!")
})

const noteRouter = require('./routes/notes');
const notebookRouter = require('./routes/notebook');
const trashRouter = require('./routes/trash');
const loginRouter = require('./routes/login');

app.use('/notes', noteRouter);
app.use('/notebooks', notebookRouter);
app.use('/trash', trashRouter);
app.use('/login',loginRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);

})