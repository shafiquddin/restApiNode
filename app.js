const express = require('express');
const { connectToDb, getDb } = require('./db');
const app = express();

app.use(express.json())

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('server is running on port 3001')
        });
        db = getDb();
    }

});

app.get('/api/students', (req, res) => {
    const page = req.query.p || 0;
    const studentsPerPage = 10;
    let students = [];
    db.collection('students')
        .find()
        .sort({ id: 1 })
        .skip(page * studentsPerPage)
        .limit(studentsPerPage)
        .forEach(student => students.push(student))
        .then(() => {
            res.status(200).json(students)
        }).catch(() => {
            res.status(500).json({ msg: 'Error getting students' })
        })
})
