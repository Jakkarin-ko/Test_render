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

    console.log('--- ข้อมูลที่ส่งมาจาก Client ---');
    console.log('เวลาที่ได้รับ:', new Date().toISOString());
    console.log('ข้อมูล (JSON):', receivedData); 
    console.log('---------------------------------');

    res.status(200).json({ 
        message: 'ได้รับข้อมูลและบันทึกใน Log ของ Server',
        yourData: receivedData 
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Web Service Server กำลังทำงานที่ Port ${PORT}`);
});
