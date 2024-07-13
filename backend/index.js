const express = require('express');
const connectToMongo = require('./db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

connectToMongo();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
