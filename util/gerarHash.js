const crypto = require('crypto');

function gerarHash(data) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
}

module.exports = gerarHash;