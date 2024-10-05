const path = require('path')
const express = require("express")
require('dotenv').config()
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000

// Page Home
app.get("/", (req, res) => {
    res.send('SERVER ON')
})

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url
    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        res.json(response.data) // Send the response from the target URL back to the client
    } catch (error) {
        console.error('Error fetching data from target URL:', error)
        res.status(500).send('Error fetching data')
    }
})

// ZingMp3Router
const ZingMp3Router = require("./src/routes/ZingRouter")
app.use("/api", cors({ origin: '*' }), ZingMp3Router)

// Page Error
app.get("*", (req, res) => {
    res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại!")
});

app.listen(port, () => {
    console.log(`Start server listen at http://localhost:${port}`)
});
