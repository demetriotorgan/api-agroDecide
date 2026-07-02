const {Router} = require('express');
const { buscarClima } = require('../controllers/weatherController');

const router = Router();

router.get('/weather', buscarClima);

module.exports = router;