var editKey = null; // Variável para armazenar a chave do pedido sendo editado

// Função para abrir o modal
function openModal() {
    document.getElementById('addPedidoModal').style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('addPedidoModal').style.display = 'none';
    editKey = null; // Reseta a chave de edição ao fechar o modal
}

// Função para salvar um pedido no Firebase
function salvarPedido() {
    const nomeContratante = document.getElementById('nomeContratante').value;
    const peca = document.getElementById('peca').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);
    const dataRecebido = document.getElementById('dataRecebido').value;
    const dataVencimento = document.getElementById('dataVencimento').value;

    const pedidoData = {
        nomeContratante,
        peca,
        quantidade,
        preco,
        dataRecebido,
        dataVencimento
    };

    if (editKey) {
        // Atualiza o pedido existente
        firebase.database().ref('pedidos/' + editKey).update(pedidoData)
            .then(() => {
                alert('Pedido atualizado com sucesso!'); // Mensagem de sucesso
                document.getElementById('addPedidoForm').reset(); // Limpa o formulário
                closeModal(); // Fecha o modal
                loadPedidos(); // Atualiza a tabela de pedidos
            })
            .catch((error) => {
                console.error('Erro ao atualizar pedido:', error);
                alert('Ocorreu um erro ao atualizar o pedido.'); // Mensagem de erro
            });
    } else {
        // Envia os dados para o Firebase
        firebase.database().ref('pedidos').push(pedidoData)
            .then(() => {
                alert('Pedido cadastrado com sucesso!'); // Mensagem de sucesso
                document.getElementById('addPedidoForm').reset(); // Limpa o formulário
                closeModal(); // Fecha o modal
                loadPedidos(); // Atualiza a tabela de pedidos
            })
            .catch((error) => {
                console.error('Erro ao cadastrar pedido:', error);
                alert('Ocorreu um erro ao cadastrar o pedido.'); // Mensagem de erro
            });
    }
}

// Função para carregar os pedidos do Firebase
function loadPedidos() {
    const pedidoTableBody = document.getElementById('pedidoTableBody');
    pedidoTableBody.innerHTML = ''; // Limpa a tabela

    firebase.database().ref('pedidos').on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const pedido = childSnapshot.val();
            const row = document.createElement('tr');

            // Cria as células da tabela
            row.innerHTML = `
                <td>${pedido.nomeContratante}</td>
                <td>${pedido.peca}</td>
                <td>${pedido.quantidade}</td>
                <td>${pedido.preco.toFixed(2)}</td>
                <td>${pedido.dataRecebido}</td>
                <td>${pedido.dataVencimento}</td>
                <td>
                    <button onclick="editarPedido('${childSnapshot.key}')">Editar</button>
                    <button onclick="deletarPedido('${childSnapshot.key}')">Deletar</button>
                </td>
            `;
            pedidoTableBody.appendChild(row);
        });
    });
}

// Função para editar um pedido
function editarPedido(id) {
    editKey = id; // Armazena a chave do pedido que está sendo editado

    // Obtém os dados do pedido para preencher o formulário
    firebase.database().ref('pedidos/' + editKey).once('value').then((snapshot) => {
        const pedido = snapshot.val();
        document.getElementById('nomeContratante').value = pedido.nomeContratante;
        document.getElementById('peca').value = pedido.peca;
        document.getElementById('quantidade').value = pedido.quantidade;
        document.getElementById('preco').value = pedido.preco;
        document.getElementById('dataRecebido').value = pedido.dataRecebido;
        document.getElementById('dataVencimento').value = pedido.dataVencimento;

        openModal(); // Abre o modal com os dados do pedido preenchidos
    });
}

// Função para deletar um pedido
function deletarPedido(id) {
    if (confirm('Você tem certeza que deseja deletar este pedido?')) {
        firebase.database().ref('pedidos/' + id).remove()
            .then(() => {
                alert('Pedido deletado com sucesso!');
                loadPedidos(); // Atualiza a tabela de pedidos
            })
            .catch((error) => {
                console.error('Erro ao deletar pedido:', error);
                alert('Ocorreu um erro ao deletar o pedido.');
            });
    }
}

// Carrega os pedidos ao inicializar a página
window.onload = loadPedidos;
