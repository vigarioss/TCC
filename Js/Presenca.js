// Função para carregar os anos de 2024 a 2050
function carregarAnos() {
    const yearContainer = document.getElementById("yearContainer");
    for (let ano = 2024; ano <= 2050; ano++) {
        const button = document.createElement("button");
        button.textContent = ano;
        button.onclick = function() {
            carregarMeses(ano);
            document.getElementById("yearSection").style.display = "none";
            document.getElementById("monthSection").style.display = "block";
        };
        yearContainer.appendChild(button);
    }
}

// Função para carregar os meses ao selecionar o ano
function carregarMeses(ano) {
    const monthContainer = document.getElementById("monthContainer");
    monthContainer.innerHTML = ''; // Limpa meses anteriores
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    meses.forEach((mes, index) => {
        const button = document.createElement("button");
        button.textContent = mes;
        button.onclick = function() {
            carregarDias(ano, index + 1);
            document.getElementById("monthSection").style.display = "none";
            document.getElementById("daySection").style.display = "block";
        };
        monthContainer.appendChild(button);
    });
}

// Função para carregar os dias ao selecionar o mês
function carregarDias(ano, mes) {
    const dayContainer = document.getElementById("dayContainer");
    dayContainer.innerHTML = ''; // Limpa dias anteriores
    const diasNoMes = new Date(ano, mes, 0).getDate(); // Calcula os dias do mês

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const button = document.createElement("button");
        button.textContent = dia;
        button.onclick = function() {
            carregarTabelaPresenca(ano, mes, dia);
            document.getElementById("daySection").style.display = "none";
            document.getElementById("presenceTableSection").style.display = "block";
        };
        dayContainer.appendChild(button);
    }
}

// Simulação de funcionários
const funcionarios = [
    { nome: "João Silva", grupo: "Grupo 1" },
    { nome: "Maria Oliveira", grupo: "Grupo 2" },
    { nome: "Carlos Pereira", grupo: "Grupo 3" }
];

// Função para carregar a tabela de presença ao selecionar o dia
function carregarTabelaPresenca(ano, mes, dia) {
    const presenceTableBody = document.getElementById("presenceTableBody");
    presenceTableBody.innerHTML = ''; // Limpa a tabela

    funcionarios.forEach((funcionario, index) => {
        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.textContent = funcionario.nome;
        tr.appendChild(tdNome);

        const tdGrupo = document.createElement("td");
        tdGrupo.textContent = funcionario.grupo;
        tr.appendChild(tdGrupo);

        const tdPresenca = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `presenca-${index}`;
        tdPresenca.appendChild(checkbox);
        tr.appendChild(tdPresenca);

        presenceTableBody.appendChild(tr);
    });
}

// Função para confirmar presença
function confirmarPresenca() {
    const presencas = [];

    funcionarios.forEach((funcionario, index) => {
        const checkbox = document.getElementById(`presenca-${index}`);
        presencas.push({
            nome: funcionario.nome,
            grupo: funcionario.grupo,
            presente: checkbox.checked
        });
    });

    console.log(presencas); // Você pode salvar os dados ou redirecionar para outra página
    alert("Presenças confirmadas!");

    // Exemplo: redirecionar para outra tela (exemplo "Data.html")
    window.location.href = "Data.html"; // Ajuste conforme necessário
}

// Inicia carregando os anos
carregarAnos();
