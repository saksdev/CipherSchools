const mongoose = require('mongoose');
const Assignment = require('./models/Assignment');
require('dotenv').config();

const sampleAssignments = [
    {
        title: 'Basic SELECT',
        description: 'Easy',
        workspaceId: 'basic_select',
        question: 'Select all columns from the products table.',
        sampleTables: [{
            tableName: 'products',
            columns: [
                { columnName: 'id', dataType: 'INTEGER' },
                { columnName: 'name', dataType: 'TEXT' },
                { columnName: 'price', dataType: 'REAL' }
            ],
            rows: [
                { id: 1, name: 'Laptop', price: 999.99 },
                { id: 2, name: 'Mouse', price: 25.50 }
            ]
        }],
        expectedOutput: {
            type: 'table',
            value: [
                { id: 1, name: 'Laptop', price: 999.99 },
                { id: 2, name: 'Mouse', price: 25.50 }
            ]
        }
    },
    {
        title: 'Filtering with WHERE',
        description: 'Medium',
        workspaceId: 'filtering_with_where',
        question: 'Select names of products where price is greater than 100.',
        sampleTables: [{
            tableName: 'products',
            columns: [
                { columnName: 'id', dataType: 'INTEGER' },
                { columnName: 'name', dataType: 'TEXT' },
                { columnName: 'price', dataType: 'REAL' }
            ],
            rows: [
                { id: 1, name: 'Laptop', price: 999.99 },
                { id: 2, name: 'Mouse', price: 25.50 },
                { id: 3, name: 'Keyboard', price: 150.00 }
            ]
        }],
        expectedOutput: {
            type: 'column',
            value: ['Laptop', 'Keyboard']
        }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Assignment.deleteMany();
        await Assignment.insertMany(sampleAssignments);
        console.log('Database seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
