var editIndex = null; // Variável para verificar se está editando ou criando nova peça

// Função para carregar a tabela de peças do Firebase
function loadPecas() {
    var pecaTableBody = document.getElementById('pecaTableBody');
    pecaTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

    // Lê os dados do Firebase Realtime Database
    firebase.database().ref('pecas').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var peca = childSnapshot.val();
            var key = childSnapshot.key;

            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${peca.nome}</td>
                <td>${peca.tempo}</td>
                <td>${peca.valor}</td>
                <td>${peca.linha}</td>
                <td>${peca.tecido}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editPeca('${key}')">Editar</button>
                    <button class="delete-btn" onclick="deletePeca('${key}')">Excluir</button>
                </td>
            `;
            pecaTableBody.appendChild(row);
        });
    });
}

// Função para abrir o modal de adição/edição de peças
function openModal() {
    document.getElementById('addPecaModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = editIndex ? 'Editar Peça' : 'Adicionar Peça';
    document.getElementById('addPecaForm').reset(); // Reseta o formulário
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('addPecaModal').style.display = 'none';
    editIndex = null; // Reseta a variável de edição ao fechar o modal
}

// Função para salvar peça
function salvarPeca() {
    var nome = document.getElementById('nomePeca').value;
    var tempo = document.getElementById('tempoPeca').value;
    var valor = document.getElementById('valorPeca').value;
    var linha = document.getElementById('linhaPeca').value;
    var tecido = document.getElementById('tecidoPeca').value;

    var data = {
        nome: nome,
        tempo: tempo,
        valor: valor,
        linha: linha,
        tecido: tecido
    };

    if (editIndex === null) {
        // Criar nova peça
        return firebase.database().ref('pecas').push(data)
            .then(() => {
                loadPecas(); // Recarregar as peças após a criação
                closeModal(); // Fecha o modal
            });
    } else {
        // Atualizar peça existente
        return firebase.database().ref('pecas/' + editIndex).update(data)
            .then(() => {
                loadPecas(); // Recarregar as peças após a atualização
                closeModal(); // Fecha o modal
            });
    }
}

// Função para editar uma peça
function editPeca(key) {
    editIndex = key; // Armazena o ID da peça a ser editada
    document.getElementById('modalTitle').textContent = 'Editar Peça';

    // Carregar dados da peça no formulário
    firebase.database().ref('pecas/' + key).once('value', function(snapshot) {
        var peca = snapshot.val();
        document.getElementById('nomePeca').value = peca.nome;
        document.getElementById('tempoPeca').value = peca.tempo;
        document.getElementById('valorPeca').value = peca.valor;
        document.getElementById('linhaPeca').value = peca.linha;
        document.getElementById('tecidoPeca').value = peca.tecido;
    });

    openModal(); // Abre o modal para edição
}

// Função para excluir uma peça
function deletePeca(key) {
    if (confirm('Você tem certeza que deseja excluir esta peça?')) {
        firebase.database().ref('pecas/' + key).remove()
            .then(() => loadPecas()); // Recarregar as peças após a exclusão
    }
}

// Chamada inicial para carregar peças
window.onload = loadPecas;
