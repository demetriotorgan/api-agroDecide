const {Router} = require('express');
const { buscarClima } = require('../controllers/weatherController');
const { testeGroq } = require('../controllers/indicesController');

const router = Router();

router.get('/weather', buscarClima);
router.get('/indice-groq', testeGroq);

module.exports = router;