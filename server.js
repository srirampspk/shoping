const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the base path for images
const imagePath = 'C:\\Users\\91868\\OneDrive\\Documents\\Desktop\\imagedatabase';

// MySQL connection configuration
let db;
(async () => {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Sriram@92',
            database: 'sys'
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
})();

// Endpoint to insert an image
app.post('/insert_image', async (req, res) => {
    const { id, price, color, imageFile, name, des } = req.body;

    const imagePathWithFilename = path.join(imagePath, imageFile);
    let imageBuffer;

    try {
        imageBuffer = fs.readFileSync(imagePathWithFilename);
    } catch (error) {
        console.error('Error reading image file:', error);
        return res.status(400).send({ error: 'Image file not found or cannot be read' });
    }

    const sql = 'INSERT INTO sys.shoping (id, image, price, color, name, des) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        await db.execute(sql, [id, imageBuffer, price, color, name, des]);
        res.status(201).send({ message: 'Item inserted successfully' });
    } catch (err) {
        console.error('Error inserting item:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


// Endpoint to delete an image
app.post('/delete_image', async (req, res) => {
    const { id } = req.body;

    const sql = 'SELECT image FROM sys.shoping WHERE id = ?';
    try {
        const [rows] = await db.execute(sql, [id]);
        if (rows.length === 0) {
            res.status(404).send({ message: 'No matching record found' });
            return;
        }

        const deleteSql = 'DELETE FROM sys.shoping WHERE id = ?';
        await db.execute(deleteSql, [id]);
        res.status(200).send({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Endpoint to retrieve shoping data
app.get('/shoping', async (req, res) => {
    const sql = 'SELECT * FROM shoping';
    try {
        const [rows] = await db.execute(sql);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});