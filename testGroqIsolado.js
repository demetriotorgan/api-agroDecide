
require('dotenv').config();

const Groq = require('groq-sdk');

async function testarGroq() {
    console.log('Iniciando teste isolado do Groq...\n');

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.error('ERRO: variável GROQ_API_KEY não encontrada.');
        process.exitCode = 1;
        return;
    }

    console.log('Chave encontrada:', `${apiKey.slice(0, 4)}...`);
    console.log('Modelo: llama-3.3-70b-versatile');

    const groq = new Groq({
        apiKey
    });

    try {
        const inicio = Date.now();

        const resposta = await groq.chat.completions.create({
            model: 'openai/gpt-oss-120b',
            messages: [
                {
                    role: 'user',
                    content: 'Responda apenas: Conexão com Groq OK!'
                }
            ],
            temperature: 0.2
        });

        console.log('\nConexão com Groq: SUCESSO');
        console.log('Tempo:', Date.now() - inicio, 'ms');
        console.log('Resposta:', resposta.choices[0].message.content);
        console.log('Modelo retornado:', resposta.model);

    } catch (error) {
        console.error('\nFalha na comunicação com Groq.');
        console.error('Tipo:', error.name);
        console.error('Status HTTP:', error.status);
        console.error('Mensagem:', error.message);
        console.error('Causa interna:', error.cause);
        console.error('Stack da causa:', error.cause?.stack);

        if (error.error) {
            console.error(
                'Detalhes:',
                JSON.stringify(error.error, null, 2)
            );
        }

        process.exitCode = 1;
    }
}

testarGroq();