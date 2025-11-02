// server.cjs (ใช้ CommonJS: require())
const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser'); 
const app = express();
const PORT = process.env.PORT || 3000; 

// 1. กำหนด __dirname สำหรับ CommonJS
// __dirname จะชี้ไปที่ไดเรกทอรีที่ไฟล์ server.cjs อยู่
const buildPath = path.join(__dirname, 'dist');

// 2. ให้บริการไฟล์ Static จากโฟลเดอร์ 'dist' (Frontend)
app.use(express.static(buildPath));

// 3. ใช้ middleware เพื่ออ่านข้อมูล JSON สำหรับ API
app.use(bodyParser.json());

// 4. กำหนด API Endpoint สำหรับรับข้อมูล (HTTP POST)
app.post('/api/logdata', (req, res) => {
    const receivedData = req.body; 

    // **แสดงข้อมูลใน Log ของ Render**
    console.log('--- ข้อมูลที่ส่งมาจาก Client ---');
    console.log('เวลาที่ได้รับ:', new Date().toISOString());
    console.log('ข้อมูล (JSON):', receivedData); 
    console.log('---------------------------------');

    // ส่งการตอบกลับ
    res.status(200).json({ 
        message: 'ได้รับข้อมูลและบันทึกใน Log ของ Server',
        yourData: receivedData 
    });
});

// 5. กำหนด Route สำหรับทุก Request ที่ไม่ได้เป็น API (Fallback Route)
// ทุก Request ที่เข้าถึง Server จะถูกส่งไปยัง index.html เพื่อให้ React Router จัดการ
app.get('*', (req, res) => {
    // ถ้าไฟล์ index.html ไม่ได้อยู่ที่ Root ของ dist อาจจะต้องเปลี่ยน path นี้
    res.sendFile(path.join(buildPath, 'index.html')); 
});

// 6. Start Server
app.listen(PORT, () => {
    console.log(`✅ Web Service Server กำลังทำงานที่ Port ${PORT}`);
});
