var editIndex = null; // Variável para verificar se está editando ou criando nova linha
var Botao = document.querySelector('.add-button'); // Botão de salvar

// Função para carregar a tabela de linhas do Firebase
function loadLinhas() {
    var linhaTableBody = document.getElementById('linhaTableBody');
    linhaTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

    // Lê os dados do Firebase Realtime Database
    firebase.database().ref('linhas').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var linha = childSnapshot.val();
            var key = childSnapshot.key;
            
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${linha.nome}</td>
                <td>${linha.tipo}</td>
                <td>${linha.tamanho}</td>
                <td>${linha.quantidade}</td>
                <td>${linha.estoque}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editLinha('${key}')">Editar</button>
                    <button class="delete-btn" onclick="deleteLinha('${key}')">Excluir</button>
                </td>
            `;
            linhaTableBody.appendChild(row);
        });
    });
}

// Função para abrir o modal de adição/edição de linhas
function openModal() {
    document.getElementById('addLinhaModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = editIndex === null ? 'Adicionar Linha' : 'Editar Linha';
    document.getElementById('addLinhaForm').reset(); // Reseta o formulário
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('addLinhaModal').style.display = 'none';
}

// Função para salvar linha
Botao.addEventListener('click', function () {
    salvarLinha();
});

// Função para criar ou atualizar uma linha no Firebase
function salvarLinha() {
    var nome = document.getElementById('nomeLinha').value;
    var tipo = document.getElementById('tipoLinha').value;
    var tamanho = document.getElementById('tamanhoLinha').value;
    var quantidade = document.getElementById('quantidadeLinha').value;
    var estoque = document.getElementById('estoqueLinha').value;

    var data = {
        nome: nome,
        tipo: tipo,
        tamanho: tamanho,
        quantidade: quantidade,
        estoque: estoque
    };

    if (editIndex === null) {
        // Criar nova linha
        firebase.database().ref('linhas').push(data)
            .then(() => {
                loadLinhas(); // Recarregar as linhas após a criação
                closeModal(); // Fechar o modal após salvar
            });
    } else {
        // Atualizar linha existente
        firebase.database().ref('linhas/' + editIndex).update(data)
            .then(() => {
                loadLinhas(); // Recarregar as linhas após a atualização
                closeModal(); // Fechar o modal após atualizar
                editIndex = null; // Resetar editIndex
            });
    }
}

// Função para editar uma linha
function editLinha(key) {
    editIndex = key; // Armazena o ID da linha a ser editada

    // Carregar dados da linha no formulário
    firebase.database().ref('linhas/' + key).once('value', function(snapshot) {
        var linha = snapshot.val();
        document.getElementById('nomeLinha').value = linha.nome;
        document.getElementById('tipoLinha').value = linha.tipo;
        document.getElementById('tamanhoLinha').value = linha.tamanho;
        document.getElementById('quantidadeLinha').value = linha.quantidade;
        document.getElementById('estoqueLinha').value = linha.estoque;
    });

    openModal(); // Abre o modal para edição
}

// Função para excluir uma linha
function deleteLinha(key) {
    if (confirm('Você tem certeza que deseja excluir esta linha?')) {
        firebase.database().ref('linhas/' + key).remove()
            .then(() => loadLinhas()); // Recarregar as linhas após a exclusão
    }
}

// Função para filtrar linhas
function filterLinhas() {
    const filter = document.getElementById('filterInput').value.toLowerCase();
    const tableBody = document.getElementById('linhaTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }
        rows[i].style.display = found ? '' : 'none'; // Mostra ou oculta a linha
    }
}

// Chamada inicial para carregar linhas
loadLinhas();
