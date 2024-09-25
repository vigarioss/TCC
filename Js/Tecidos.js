var editIndex = -1; // Variável para verificar se está editando ou criando novo tecido

var nome = document.getElementById('nomeTecido').value;
var cor = document.getElementById('corTecido').value;
var tamanho = document.getElementById('tamanhoTecido').value;
var quantidade = document.getElementById('quantidadeTecido').value;
var dataEntrada = document.getElementById('dataEntradaTecido').value;

var Botao = document.getElementById('salvarTecido');

// Função para carregar a tabela de tecidos do Firebase
function loadTecidos() {
    var tecidoTableBody = document.getElementById('tecidoTableBody');
    tecidoTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

    // Lê os dados do Firebase Realtime Database
    firebase.database().ref('tecidos').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var tecido = childSnapshot.val();
            var key = childSnapshot.key;
            
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${tecido.nome}</td>
                <td>${tecido.cor}</td>
                <td>${tecido.tamanho}</td>
                <td>${tecido.quantidade}</td>
                <td>${tecido.dataEntrada}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editTecido('${key}')">Editar</button>
                    <button class="delete-btn" onclick="deleteTecido('${key}')">Excluir</button>
                </td>
            `;
            tecidoTableBody.appendChild(row);
        });
    });
}

// Função para abrir o modal de adição/edição de tecidos
function openModal() {
    document.getElementById('addTecidoModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Adicionar Tecido';
    document.getElementById('addTecidoForm').reset(); // Reseta o formulário
    editIndex = -1; // Define que é um novo tecido
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('addTecidoModal').style.display = 'none';
}

Botao.addEventListener('click', function () {
    create(nomeTecido.value, corTecido.value, tamanhoTecido.value, quantidadeTecido.value, dataEntradaTecido.value);
});

// Função para criar um registro no Firebase
function create(nome, cor, tamanho, quantidade, dataEntrada) {
    var data = {
        nome: nome,
        cor: cor,
        tamanho: tamanho,
        quantidade: quantidade,
        dataEntrada: dataEntrada
    };

    return firebase.database().ref().child('tecidos').push(data);
}

