// Simulação de um banco de dados com dias e presenças
const savedPresenceData = {
    '2024-10-12': [
        { nome: 'João Silva', grupo: 'Grupo 1', presenca: true },
        { nome: 'Maria Souza', grupo: 'Grupo 2', presenca: false },
    ],
    '2024-10-13': [
        { nome: 'Pedro Oliveira', grupo: 'Grupo 3', presenca: true },
        { nome: 'Ana Pereira', grupo: 'Grupo 4', presenca: true },
    ],
};

// Função para carregar a lista de dias
function loadDays() {
    const daysList = document.getElementById('daysList');
    daysList.innerHTML = '';

    // Para cada dia salvo, cria um botão na lista
    Object.keys(savedPresenceData).forEach(day => {
        const dayButton = document.createElement('button');
        dayButton.textContent = `Dia ${day}`;
        dayButton.onclick = () => loadPresenceForDay(day);
        daysList.appendChild(dayButton);
    });
}

// Função para carregar as presenças de um dia específico
function loadPresenceForDay(day) {
    const presenceTableBody = document.getElementById('presenceTableBody');
    presenceTableBody.innerHTML = '';

    const presences = savedPresenceData[day];

    // Para cada presença, cria uma linha na tabela
    presences.forEach(presenca => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = presenca.nome;
        row.appendChild(nameCell);
        
        const groupCell = document.createElement('td');
        groupCell.textContent = presenca.grupo;
        row.appendChild(groupCell);
        
        const presenceCell = document.createElement('td');
        presenceCell.textContent = presenca.presenca ? 'Presente' : 'Ausente';
        row.appendChild(presenceCell);
        
        presenceTableBody.appendChild(row);
    });
}

// Carrega os dias salvos quando a página for aberta
window.onload = loadDays;
