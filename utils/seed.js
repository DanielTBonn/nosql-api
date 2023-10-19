const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users')
    };

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts')
    };

    await User.collection.insertMany(userData);
    console.log(`------ USER DATA SEEDED ------`)
    console.table(userData);

    console.info('Seeding complete! 🌱');
    process.exit(0)
})


