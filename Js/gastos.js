// Variável global para armazenar o ID do gasto em edição
let editId = null;

// Função para carregar os gastos do Firebase
function loadGastos() {
    const tabelaGastos = document.getElementById('tabelaGastos');
    tabelaGastos.innerHTML = ''; // Limpa a tabela antes de carregar os dados

    firebase.database().ref('gastos').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const gasto = childSnapshot.val();
            const key = childSnapshot.key;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${gasto.descricao}</td>
                <td>${gasto.categoria}</td>
                <td>${gasto.valor.toFixed(2)}</td>
                <td>${gasto.data}</td>
                <td>
                    <button onclick="editGasto('${key}')">Editar</button>
                    <button onclick="deleteGasto('${key}')">Excluir</button>
                </td>
            `;
            tabelaGastos.appendChild(row);
        });
    });
}

// Função para salvar ou editar um gasto
function saveGasto() {
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    // Validação básica
    if (!descricao || !categoria || isNaN(valor) || !data) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    const gastoData = { descricao, categoria, valor, data };

    if (editId) {
        // Edita um gasto existente
        firebase.database().ref('gastos/' + editId).update(gastoData)
            .then(() => {
                alert('Gasto atualizado com sucesso!');
                editId = null; // Reseta o ID de edição
                document.getElementById('formTitle').textContent = 'Adicionar Gasto';
                document.getElementById('gastoForm').reset(); // Reseta o formulário
                loadGastos(); // Atualiza a tabela
            })
            .catch((error) => console.error('Erro ao atualizar o gasto:', error));
    } else {
        // Adiciona um novo gasto
        firebase.database().ref('gastos').push(gastoData)
            .then(() => {
                alert('Gasto adicionado com sucesso!');
                document.getElementById('gastoForm').reset(); // Reseta o formulário
                loadGastos(); // Atualiza a tabela
            })
            .catch((error) => console.error('Erro ao salvar o gasto:', error));
    }
}

// Função para carregar os dados de um gasto para edição
function editGasto(key) {
    editId = key; // Define o ID do gasto em edição
    document.getElementById('formTitle').textContent = 'Editar Gasto';

    firebase.database().ref('gastos/' + key).once('value', (snapshot) => {
        const gasto = snapshot.val();
        document.getElementById('descricao').value = gasto.descricao;
        document.getElementById('categoria').value = gasto.categoria;
        document.getElementById('valor').value = gasto.valor;
        document.getElementById('data').value = gasto.data;
    });
}

// Função para excluir um gasto
function deleteGasto(key) {
    if (confirm('Tem certeza que deseja excluir este gasto?')) {
        firebase.database().ref('gastos/' + key).remove()
            .then(() => {
                alert('Gasto excluído com sucesso!');
                loadGastos(); // Atualiza a tabela
            })
            .catch((error) => console.error('Erro ao excluir o gasto:', error));
    }
}

// Chama a função para carregar os gastos ao abrir a página
window.onload = function () {
    loadGastos();
};
