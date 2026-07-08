// climate-engine/classificacoes.js

function classificarIndice(valor) {

    if (valor < 40) {
        return 'Baixa';
    }

    if (valor < 70) {
        return 'Moderada';
    }

    return 'Alta';
}

module.exports = {
    classificarIndice
};