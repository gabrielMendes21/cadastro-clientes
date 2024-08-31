export default class ViaCepService {
    async operation(cep) {
        const startTime = performance.now();
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        const endTime = performance.now();
        return { data, time: endTime - startTime, source: 'network' };
    }
}
