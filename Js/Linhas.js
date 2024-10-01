var editKey = null; // Variável para identificar se estamos editando uma linha

// Função para carregar a tabela de linhas do Firebase
function loadLinhas() {
    const linhaTableBody = document.getElementById('linhaTableBody');
    linhaTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

    // Lê os dados do Firebase Realtime Database
    firebase.database().ref('linhas').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const linha = childSnapshot.val();
            const key = childSnapshot.key;

            const row = document.createElement('tr');
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
    document.getElementById('modalTitle').textContent = 'Adicionar Linha';
    document.getElementById('addLinhaForm').reset(); // Reseta o formulário
    editKey = null; // Define que é uma nova linha
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('addLinhaModal').style.display = 'none';
}

// Função para criar ou editar um registro no Firebase
function salvarLinha() {
    const nome = document.getElementById('nomeLinha').value;
    const tipo = document.getElementById('tipoLinha').value;
    const tamanho = document.getElementById('tamanhoLinha').value;
    const quantidade = document.getElementById('quantidadeLinha').value;
    const estoque = document.getElementById('estoqueLinha').value;

    // Verifica se todos os campos necessários estão preenchidos
    if (!nome || !tipo || !tamanho || !quantidade || !estoque) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    if (editKey) {
        // Exclui a linha antiga antes de criar uma nova
        firebase.database().ref('linhas/' + editKey).remove().then(() => {
            const data = {
                nome,
                tipo,
                tamanho,
                quantidade,
                estoque
            };
            return firebase.database().ref('linhas').push(data); // Cria uma nova linha
        }).then(() => {
            loadLinhas(); // Carrega a tabela novamente após a criação
            closeModal(); // Fecha o modal após salvar
            editKey = null; // Reseta o editKey após salvar
        }).catch((error) => {
            console.error("Erro ao atualizar a linha:", error);
        });
    } else {
        // Cria uma nova linha
        const data = {
            nome,
            tipo,
            tamanho,
            quantidade,
            estoque
        };
        return firebase.database().ref('linhas').push(data).then(() => {
            loadLinhas(); // Carrega a tabela novamente após a criação
            closeModal(); // Fecha o modal após salvar
        }).catch((error) => {
            console.error("Erro ao adicionar a linha:", error);
        });
    }
}

// Função para editar uma linha
function editLinha(key) {
    editKey = key; // Armazena o ID da linha a ser editada
    document.getElementById('modalTitle').textContent = 'Editar Linha';

    // Carregar dados da linha no formulário
    firebase.database().ref('linhas/' + key).once('value', function(snapshot) {
        const linha = snapshot.val();
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
