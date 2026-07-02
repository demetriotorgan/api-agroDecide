const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(express.json());
app.use(cors());

//conexão com o banco
connectDB();
app.get('/', (req,res)=>{
    res.json({
        mensagem:'API AgroDecide rodando'
    })
});

app.use('/api', weatherRoutes);

//rodar localmente
if(process.env.NODE_ENV !== 'production'){
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));

};

module.exports = app;