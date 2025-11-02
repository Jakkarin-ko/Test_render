const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser'); 
const app = express();
const PORT = process.env.PORT || 3000; 
const buildPath = path.join(__dirname, 'dist');

app.use(express.static(buildPath));

app.use(bodyParser.json());

app.post('/api/logdata', (req, res) => {
    const receivedData = req.body; 

    console.log('--- Data received from Client ---');
    console.log'Time received:', new Date().toISOString());
    console.log('Data (JSON):', receivedData); 
    console.log('---------------------------------');

    res.status(200).json({ 
        message: 'Data received and logged in Server console',
        yourData: receivedData 
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html')); 
});

app.listen(PORT, () => {
    console.log(`✅ Web Service Server กำลังทำงานที่ Port ${PORT}`);
});
