function adicionarCusto() {
    // Obtém os valores dos campos do formulário
    const descricao = document.getElementById('descricao').value;
    const operacao = document.getElementById('operacao').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const data = document.getElementById('data').value;

    if (descricao && operacao && valor && data) {
        // Cria uma nova linha na tabela
        const tabela = document.getElementById('tabelaCustos');
        const novaLinha = tabela.insertRow();

        const colunaDescricao = novaLinha.insertCell(0);
        const colunaOperacao = novaLinha.insertCell(1);
        const colunaValor = novaLinha.insertCell(2);
        const colunaData = novaLinha.insertCell(3);

        colunaDescricao.textContent = descricao;
        colunaOperacao.textContent = operacao;
        colunaValor.textContent = `R$ ${valor}`;
        colunaData.textContent = data;

        // Limpa os campos do formulário após adicionar
        document.getElementById('custoForm').reset();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}
