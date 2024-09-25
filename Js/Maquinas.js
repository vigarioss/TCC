var editIndex = null; // Variável para verificar se está editando ou criando nova máquina

var Botao = document.getElementById('salvarMachine');

// Função para carregar a tabela de máquinas do Firebase
function loadMachines() {
    var machineTableBody = document.getElementById('machineTableBody');
    machineTableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

    // Lê os dados do Firebase Realtime Database
    firebase.database().ref('maquinas').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var machine = childSnapshot.val();
            var key = childSnapshot.key;

            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${machine.nome}</td>
                <td>${machine.dataEntrada}</td>
                <td>${machine.dataSaida || 'N/A'}</td>
                <td>${machine.emprestada}</td>
                <td>${machine.estoque}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editMachine('${key}')">Editar</button>
                    <button class="delete-btn" onclick="deleteMachine('${key}')">Excluir</button>
                </td>
            `;
            machineTableBody.appendChild(row);
        });
    });
}

// Função para abrir o modal de adição/edição de máquinas
function openMachineModal() {
    document.getElementById('addMachineModal').style.display = 'block';
    document.getElementById('machineModalTitle').textContent = 'Adicionar Máquina';
    document.getElementById('addMachineForm').reset(); // Reseta o formulário
    editIndex = null; // Define que é uma nova máquina
}

// Função para fechar o modal
function closeMachineModal() {
    document.getElementById('addMachineModal').style.display = 'none';
}

// Função para salvar máquina
Botao.addEventListener('click', function () {
    salvarMachine();
});

// Função para criar ou atualizar uma máquina no Firebase
function salvarMachine() {
    var nome = document.getElementById('nomeMachine').value;
    var dataEntrada = document.getElementById('dataEntradaMachine').value;
    var dataSaida = document.getElementById('dataSaidaMachine').value;
    var emprestada = document.getElementById('emprestadaMachine').value;
    var estoque = document.getElementById('estoqueMachine').value;

    var data = {
        nome: nome,
        dataEntrada: dataEntrada,
        dataSaida: dataSaida,
        emprestada: emprestada,
        estoque: estoque
    };

    if (editIndex === null) {
        // Criar nova máquina
        return firebase.database().ref().child('maquinas').push(data)
            .then(() => {
                loadMachines(); // Recarregar as máquinas após a criação
                closeMachineModal(); // Fecha o modal
            });
    } else {
        // Atualizar máquina existente
        return firebase.database().ref('maquinas/' + editIndex).update(data)
            .then(() => {
                loadMachines(); // Recarregar as máquinas após a atualização
                closeMachineModal(); // Fecha o modal
            });
    }
}

// Função para editar uma máquina
function editMachine(key) {
    editIndex = key; // Armazena o ID da máquina a ser editada
    document.getElementById('machineModalTitle').textContent = 'Editar Máquina';

    // Carregar dados da máquina no formulário
    firebase.database().ref('maquinas/' + key).once('value', function(snapshot) {
        var machine = snapshot.val();
        document.getElementById('nomeMachine').value = machine.nome;
        document.getElementById('dataEntradaMachine').value = machine.dataEntrada;
        document.getElementById('dataSaidaMachine').value = machine.dataSaida || ''; // Atribui valor ou string vazia
        document.getElementById('emprestadaMachine').value = machine.emprestada;
        document.getElementById('estoqueMachine').value = machine.estoque;
    });

    openMachineModal(); // Abre o modal para edição
}

// Função para excluir uma máquina
function deleteMachine(key) {
    if (confirm('Você tem certeza que deseja excluir esta máquina?')) {
        firebase.database().ref('maquinas/' + key).remove()
            .then(() => loadMachines()); // Recarregar as máquinas após a exclusão
    }
}

// Chamada inicial para carregar máquinas
loadMachines();
