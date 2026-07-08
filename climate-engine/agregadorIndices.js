
const { calcularIndicePlantio } = require('./plantioIndex');

function gerarIndicesClimaticos(dadosClima) {

    return {
        plantio: calcularIndicePlantio(dadosClima)
    };
}

module.exports = {
    gerarIndicesClimaticos
};