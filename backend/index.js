const express = require("express");
const cors = require('cors');
const { control } = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("Backend Home Route is Working ✅!");
});

app.use('/control', control);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
})