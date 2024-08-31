import ViaCepService from './ViaCepService.js';

//carregando a lista dos estados existentes
async function carregarEstados() {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = await response.json();

        //inserindo no campo todos os estados
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


// quando o campo 'cep' perder o foco, preenche o campo de acordo com o cep inserido
cep.addEventListener("blur", async (event) => {
    await buscaCep();
}, true);


//busca dados do endereco
async function buscaCep() {
    const cep = document.getElementById('cep').value;//valor do cep inserido
    const viaCepService = new ViaCepService();

    try {
        const result = await viaCepService.operation(cep);
        //preenchendo o campo com o dados retornado do arquivo viacepservice
        document.getElementById('uf').value = result.data.uf || '';
        document.getElementById('bairro').value = result.data.bairro || '';
        document.getElementById('cidade').value = result.data.localidade || '';
        document.getElementById('logradouro').value = result.data.logradouro || '';
    } catch (error) {
        document.getElementById('output').innerText = 'Erro ao buscar o CEP. Tente novamente.';
        console.error(error);
    }
}

