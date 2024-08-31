import ViaCepService from './ViaCepService.js';

async function carregarEstados() {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = await response.json();

        const estadoSelect = document.getElementById('uf');
        estados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.sigla;
            option.textContent = estado.nome;
            estadoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar os estados:', error);
    }
}

// Chama a função para carregar os estados assim que a página é carregada
carregarEstados();

async function buscaCep() {
    const cep = document.getElementById('cep').value;
    const viaCepService = new ViaCepService();

    try {
        const result = await viaCepService.operation(cep);
        document.getElementById('uf').value = result.data.uf || '';
        document.getElementById('bairro').value = result.data.bairro || '';
        document.getElementById('cidade').value = result.data.localidade || '';
        document.getElementById('logradouro').value = result.data.logradouro || '';
    } catch (error) {
        document.getElementById('output').innerText = 'Erro ao buscar o CEP. Tente novamente.';
        console.error(error);
    }
}

cep.addEventListener("blur", async (event) => {
    await buscaCep();
}, true);
