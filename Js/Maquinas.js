var editKey = null; 

// Função para carregar as máquinas do Firebase
function loadMachines() {
    var machineTableBody = document.getElementById('machineTableBody');
    machineTableBody.innerHTML = ''; 

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
                    <button class="edit-btn" onclick="editMachine('${key}', '${machine.nome}', '${machine.dataEntrada}', '${machine.dataSaida}', '${machine.emprestada}', '${machine.estoque}')">Editar</button>
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
    document.getElementById('machineModalTitle').textContent = editKey ? 'Editar Máquina' : 'Adicionar Máquina';
    document.getElementById('addMachineForm').reset();
}

// Função para fechar o modal
function closeMachineModal() {
    document.getElementById('addMachineModal').style.display = 'none';
    editKey = null; // Reseta a variável de edição ao fechar o modal
}

// Função para criar ou editar um registro no Firebase
function salvarMachine() {
    const nome = document.getElementById('nomeMachine').value;
    const dataEntrada = document.getElementById('dataEntradaMachine').value;
    const dataSaida = document.getElementById('dataSaidaMachine').value;
    const emprestada = document.getElementById('emprestadaMachine').value;
    const estoque = document.getElementById('estoqueMachine').value;

    // Verifica se todos os campos necessários estão preenchidos
    if (!nome || !dataEntrada || !emprestada || !estoque) {
        alert("Todos os campos obrigatórios devem ser preenchidos.");
        return;
    }

    if (editKey) {
        // Atualiza os dados da máquina
        firebase.database().ref('maquinas/' + editKey).update({
            nome: nome,
            dataEntrada: dataEntrada,
            dataSaida: dataSaida,
            emprestada: emprestada,
            estoque: Number(estoque)
        }).then(() => {
            loadMachines();
            closeMachineModal();
            editKey = null;
        });
    } else {
        // Cria uma nova máquina
        var data = {
            nome: nome,
            dataEntrada: dataEntrada,
            dataSaida: dataSaida,
            emprestada: emprestada,
            estoque: Number(estoque)
        };
        firebase.database().ref('maquinas').push(data).then(() => {
            loadMachines();
            closeMachineModal();
        });
    }
}

// Função para editar uma máquina
function editMachine(key, nome, dataEntrada, dataSaida, emprestada, estoque) {
    editKey = key; // Define o key da máquina que será editada
    document.getElementById('nomeMachine').value = nome;
    document.getElementById('dataEntradaMachine').value = dataEntrada;
    document.getElementById('dataSaidaMachine').value = dataSaida || '';
    document.getElementById('emprestadaMachine').value = emprestada;
    document.getElementById('estoqueMachine').value = estoque;
    openMachineModal(); // Abre o modal com os dados preenchidos
}

// Função para excluir uma máquina do Firebase
function deleteMachine(key) {
    if (confirm("Tem certeza que deseja excluir esta máquina?")) {
        firebase.database().ref('maquinas/' + key).remove()
            .then(() => {
                loadMachines();
                alert("Máquina excluída com sucesso.");
            })
            .catch((error) => {
                console.error("Erro ao excluir a máquina: ", error);
                alert("Erro ao excluir a máquina. Tente novamente.");
            });
    }
}

// Chama a função de carregar máquinas ao abrir a página
window.onload = function() {
    loadMachines();
};
