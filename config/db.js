const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return
    };

    try {
        const db = await mongoose.connect(process.env.DATABASE_URL);
        isConnected = db.connections[0].readyState;
        console.log(`MongoDB conectado ao banco: ${db.connection.name}`);
    } catch (error) {
        console.error('Nome do erro:', error.name);
        console.error('Código:', error.code);
        console.error('Mensagem:', error.message);

        if (error.reason) {
            console.error('Motivos da falha:', error.reason);
        }

        process.exit(1);
    }
};

module.exports = connectDB;