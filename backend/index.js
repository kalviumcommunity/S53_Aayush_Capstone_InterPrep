const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const { control } = require("./routes/routes");

app.use(express.json());
app.use(cors());

main()
    .then(() => {
        console.log("Connection Successful with Database 📊!");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_KEY);
};

app.get('/', (req, res) => {
    res.json("Backend Home Route is Working ✅!");
});

app.use('/control', control);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
})