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

// Proxy Route
app.get('/api/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    // Check if the target URL is provided
    if (!targetUrl) {
        return res.status(400).send('No target URL specified');
    }

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        // Check if the response status is 200
        if (response.status === 200) {
            res.json(response.data); // Send the response from the target URL back to the client
        } else {
            console.error('Error fetching data:', response.status);
            res.status(response.status).send('Error fetching data from target URL');
        }
    } catch (error) {
        console.error('Error fetching data from target URL:', error);
        res.status(500).send('Error fetching data');
    }
});

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
