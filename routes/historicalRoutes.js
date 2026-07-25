const {Router} = require('express');
const { buscarHistorico } = require('../controllers/historicalController');
const router = Router();

router.get('/historical', buscarHistorico);

module.exports = router;