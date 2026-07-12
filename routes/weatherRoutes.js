const {Router} = require('express');
const { buscarClima, limparCache } = require('../controllers/weatherController');
const { testeGroq } = require('../controllers/indicesController');

const router = Router();

router.get('/weather', buscarClima);
router.get('/indice-groq', testeGroq);
router.delete('/limparCache', limparCache);

module.exports = router;