var editKey = null; 

// Função para carregar os tecidos do Firebase
function loadTecidos() {
    var tecidoTableBody = document.getElementById('linhaTableBody');
    tecidoTableBody.innerHTML = ''; 

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
                    <button class="edit-btn" onclick="editLinha('${key}', '${linha.nome}', '${linha.tipo}', '${linha.tamanho}', '${linha.quantidade}', '${linha.estoque}')">Editar</button>
                    <button class="delete-btn" onclick="deleteLinha('${key}')">Excluir</button>
                </td>
            `;
            tecidoTableBody.appendChild(row);
        });
    });
}

// Função para abrir o modal de adição/edição de linhas
function openModal() {
    document.getElementById('addLinhaModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = editKey ? 'Editar Linha' : 'Adicionar Linha';
    document.getElementById('addLinhaForm').reset(); // Reseta o formulário

    // Se estiver editando, preenche o formulário
    if (editKey) {
        firebase.database().ref('linhas/' + editKey).once('value').then(snapshot => {
            const linha = snapshot.val();
            document.getElementById('nomeLinha').value = linha.nome;
            document.getElementById('tipoLinha').value = linha.tipo;
            document.getElementById('tamanhoLinha').value = linha.tamanho;
            document.getElementById('quantidadeLinha').value = linha.quantidade;
            document.getElementById('estoqueLinha').value = linha.estoque;
        });
    }
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('addLinhaModal').style.display = 'none';
    editKey = null; // Reseta a variável de edição ao fechar o modal
}

// Função para criar ou editar um registro no Firebase
function saveLinha() {
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
        // Atualiza os dados da linha
        firebase.database().ref('linhas/' + editKey).update({
            nome: nome,
            tipo: tipo,
            tamanho: Number(tamanho),
            quantidade: Number(quantidade),
            estoque: Number(estoque)
        }).then(() => {
            loadTecidos(); // Carrega a tabela novamente após a atualização
            closeModal(); // Fecha o modal após salvar
            editKey = null; // Reseta o editKey após salvar
        }).catch((error) => {
            console.error("Erro ao atualizar a linha: ", error);
            alert("Erro ao atualizar a linha. Tente novamente.");
        });
    } else {
        // Cria uma nova linha
        var data = {
            nome: nome,
            tipo: tipo,
            tamanho: Number(tamanho),
            quantidade: Number(quantidade),
            estoque: Number(estoque)
        };
        firebase.database().ref('linhas').push(data).then(() => {
            loadTecidos(); // Carrega a tabela novamente após a criação
            closeModal(); // Fecha o modal após salvar
        }).catch((error) => {
            console.error("Erro ao salvar a linha: ", error);
            alert("Erro ao salvar a linha. Tente novamente.");
        });
    }
}

// Função para editar uma linha
function editLinha(key, nome, tipo, tamanho, quantidade, estoque) {
    editKey = key; // Define o key da linha que será editada
    openModal(); // Abre o modal com os dados preenchidos
}

// Função para excluir uma linha do Firebase
function deleteLinha(key) {
    if (confirm("Tem certeza que deseja excluir esta linha?")) {
        firebase.database().ref('linhas/' + key).remove()
            .then(() => {
                loadTecidos(); // Recarrega a tabela após a exclusão
                alert("Linha excluída com sucesso.");
            })
            .catch((error) => {
                console.error("Erro ao excluir a linha: ", error);
                alert("Erro ao excluir a linha. Tente novamente.");
            });
    }
}

// Chama a função de carregar linhas ao abrir a página
window.onload = function() {
    loadTecidos();
};
