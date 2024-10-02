

const database = firebase.database(); // Certifique-se de que isso está aqui

// Chama a função para buscar todos os dados ao carregar a página
window.onload = fetchAllData;

function fetchAllData() {
    const employeesRef = database.ref('employees');
    const managersRef = database.ref('managers');

    const fetchData = (ref) => {
        ref.once('value')
            .then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    addRowToTable(data); // Adiciona diretamente à tabela
                });
            })
            .catch(error => {
                console.error("Erro ao buscar dados: ", error);
            });
    };

    fetchData(employeesRef);
    fetchData(managersRef);
}

function filterList() {
    const name = document.getElementById('searchName').value.toLowerCase();
    const position = document.getElementById('searchPosition').value.toLowerCase();
    const department = document.getElementById('searchDepartment').value.toLowerCase();
    const hireDate = document.getElementById('searchHireDate').value;
    const salary = parseFloat(document.getElementById('searchSalary').value);
    const email = document.getElementById('searchEmail').value.toLowerCase();
    const address = document.getElementById('searchAddress').value.toLowerCase();
    const group = document.getElementById('searchGroup').value;

    const tableBody = document.querySelector('#peopleTable tbody');
    tableBody.innerHTML = ''; // Limpa a tabela

    const employeesRef = database.ref('employees');
    const managersRef = database.ref('managers');

    const fetchData = (ref) => {
        ref.once('value')
            .then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    if (matchesFilter(data, name, position, department, hireDate, salary, email, address, group)) {
                        addRowToTable(data);
                    }
                });
            })
            .catch(error => {
                console.error("Erro ao buscar dados: ", error);
            });
    };

    fetchData(employeesRef);
    fetchData(managersRef);
}

function matchesFilter(data, name, position, department, hireDate, salary, email, address, group) {
    return (name === '' || data.name.toLowerCase().includes(name)) &&
           (position === '' || data.position.toLowerCase().includes(position)) &&
           (department === '' || data.department.toLowerCase().includes(department)) &&
           (hireDate === '' || data.hireDate === hireDate) &&
           (isNaN(salary) || data.salary === salary) &&
           (email === '' || data.email.toLowerCase().includes(email)) &&
           (address === '' || data.address.toLowerCase().includes(address)) &&
           (group === '' || data.group === group);
}

function addRowToTable(data) {
    const tableBody = document.querySelector('#peopleTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.position}</td>
        <td>${data.department}</td>
        <td>${data.hireDate}</td>
        <td>${data.salary}</td>
        <td>${data.email}</td>
        <td>${data.address}</td>
        <td>${data.group}</td>
    `;
    tableBody.appendChild(row);
}
