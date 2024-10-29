// Array para armazenar os gastos
const gastos = [];

// Função para adicionar um gasto
function adicionarGasto() {
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    // Validação simples
    if (!descricao || !categoria || !valor || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Adiciona o gasto ao array
    gastos.push({ descricao, categoria, valor, data });

    // Limpa o formulário
    document.getElementById('gastoForm').reset();

    // Atualiza a tabela
    atualizarTabela(gastos);
}

// Função para atualizar a tabela de gastos
function atualizarTabela(gastos) {
    const tbody = document.getElementById('gastosTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    gastos.forEach(gasto => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = gasto.descricao;
        row.insertCell(1).innerText = gasto.categoria;
        row.insertCell(2).innerText = gasto.valor.toFixed(2);
        row.insertCell(3).innerText = gasto.data;
    });
}

// Função para gerar relatório com filtros
function gerarRelatorio() {
    const categoriaFiltro = document.getElementById('categoriaFiltro').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    // Filtra os gastos com base nos critérios selecionados
    const gastosFiltrados = gastos.filter(gasto => {
        const dataGasto = new Date(gasto.data);
        const inicio = dataInicio ? new Date(dataInicio) : null;
        const fim = dataFim ? new Date(dataFim) : null;

        return (
            (categoriaFiltro === 'Todas' || gasto.categoria === categoriaFiltro) &&
            (!inicio || dataGasto >= inicio) &&
            (!fim || dataGasto <= fim)
        );
    });

    atualizarTabela(gastosFiltrados);
}
