
const { calcularIndiceIrrigacao } = require('./irrigacaoIndex');
const { calcularIndicePlantio } = require('./plantioIndex');

function gerarIndicesClimaticos(dadosClima) {

    return {
        plantio: calcularIndicePlantio(dadosClima),
        irrigacao: calcularIndiceIrrigacao(dadosClima)
    };
}

module.exports = {
    gerarIndicesClimaticos
};