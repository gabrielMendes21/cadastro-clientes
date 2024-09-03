const express  = require('express');
const router = express.Router();

// Cache para os CEPs

// Cache simples
const cache = {};

// Cache com node-cache
// ...

// Armazenar as informações do CEP em cache
router.post("/cacheCEP", async (req, res) => {
    try {
        const { CEP } = req.body;

        const cachedCEP = cache[CEP];

        // Verifica se o CEP fornecido já está em cache
        // Caso ele não esteja, uma nova requisição (cujos dados da resposta serão armazenados em cache) 
        // é feita para a API o ViaCEP para a obtenção do novo CEP
        if (cachedCEP) {
            console.log(cache);
            res.json(cachedCEP);
        } else {
            const response = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
            const CEPData = await response.json();

            // Armazenamento dos dados do CEP em cache
            cache[CEP] = CEPData;

            console.log(cache);

            res.json(CEPData);
        }
    } catch(err) {
        console.log({
            msg: "Erro ao buscar dados do CEP",
            err
        })
    }
})

module.exports = router;