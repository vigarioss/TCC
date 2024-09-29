var editKey = null; // Variável para verificar se está editando um tecido

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
                    <button class="edit-btn" onclick="editTecido('${key}', '${tecido.nome}', '${tecido.cor}', '${tecido.tamanho}', '${tecido.quantidade}', '${tecido.dataEntrada}')">Editar</button>
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
    document.getElementById('modalTitle').textContent = editKey ? 'Editar Tecido' : 'Adicionar Tecido';
    document.getElementById('addTecidoForm').reset(); // Reseta o formulário
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('addTecidoModal').style.display = 'none';
    editKey = null; // Reseta a variável de edição ao fechar o modal
}

// Função para criar ou editar um registro no Firebase
function saveTecido() {
    const nome = document.getElementById('nomeTecido').value;
    const cor = document.getElementById('corTecido').value;
    const tamanho = document.getElementById('tamanhoTecido').value;
    const quantidade = document.getElementById('quantidadeTecido').value;
    const dataEntrada = document.getElementById('dataEntradaTecido').value;

    // Verifica se todos os campos necessários estão preenchidos
    if (!nome || !cor || !tamanho || !quantidade || !dataEntrada) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    if (editKey) {
        // Atualiza os dados do tecido
        firebase.database().ref('tecidos/' + editKey).once('value').then((snapshot) => {
            const existingData = snapshot.val();

            // Atualiza apenas os campos que foram alterados
            var updatedData = {};
            if (nome) updatedData.nome = nome;
            else updatedData.nome = existingData.nome;
            if (cor) updatedData.cor = cor;
            else updatedData.cor = existingData.cor;
            if (tamanho) updatedData.tamanho = tamanho;
            else updatedData.tamanho = existingData.tamanho;
            if (quantidade) updatedData.quantidade = quantidade;
            else updatedData.quantidade = existingData.quantidade;
            if (dataEntrada) updatedData.dataEntrada = dataEntrada;
            else updatedData.dataEntrada = existingData.dataEntrada;

            return firebase.database().ref('tecidos/' + editKey).update(updatedData);
        }).then(() => {
            loadTecidos(); // Carrega a tabela novamente após a atualização
            closeModal(); // Fecha o modal após salvar
            editKey = null; // Reseta o editKey após salvar
        });
    } else {
        // Cria um novo tecido
        var data = {
            nome: nome,
            cor: cor,
            tamanho: tamanho,
            quantidade: quantidade,
            dataEntrada: dataEntrada
        };
        return firebase.database().ref('tecidos').push(data).then(() => {
            loadTecidos(); // Carrega a tabela novamente após a criação
            closeModal(); // Fecha o modal após salvar
        });
    }
}

// Função para editar um tecido
function editTecido(key, nome, cor, tamanho, quantidade, dataEntrada) {
    editKey = key; // Define o key do tecido que será editado
    document.getElementById('nomeTecido').value = nome;
    document.getElementById('corTecido').value = cor;
    document.getElementById('tamanhoTecido').value = tamanho;
    document.getElementById('quantidadeTecido').value = quantidade;
    document.getElementById('dataEntradaTecido').value = dataEntrada;
    openModal(); // Abre o modal com os dados preenchidos
}

// Função para excluir um tecido do Firebase
function deleteTecido(key) {
    if (confirm("Tem certeza que deseja excluir este tecido?")) {
        firebase.database().ref('tecidos/' + key).remove()
            .then(() => {
                loadTecidos(); // Recarrega a tabela após a exclusão
                alert("Tecido excluído com sucesso.");
            })
            .catch((error) => {
                console.error("Erro ao excluir o tecido: ", error);
                alert("Erro ao excluir o tecido. Tente novamente.");
            });
    }
}

// Chama a função de carregar tecidos ao abrir a página
window.onload = function() {
    loadTecidos();
};
