const express  = require('express');
const axios = require('axios');
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
            res.json({ cep: cachedCEP, cached: true});
        } else {
            const response = await axios(`https://viacep.com.br/ws/${CEP.trim()}/json/`);
            const CEPData = await response.data;

            // Armazenamento dos dados do CEP em cache
            cache[CEP] = CEPData;

            res.json({ cep: CEPData, cached: false});
        }
    } catch(err) {
        console.log({
            msg: "Erro ao buscar dados do CEP",
            err
        })
    }
})


module.exports = router;