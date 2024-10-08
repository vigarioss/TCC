// Função para enviar os dados do formulário para o Firebase
function submitForm() {
    // Obtém os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const hireDate = document.getElementById('hireDate').value;
    const salary = parseFloat(document.getElementById('salary').value);
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const group = document.getElementById('group').value;

    // Cria um objeto com os dados do funcionário
    const employeeData = {
        name: name,
        position: position,
        department: department,
        hireDate: hireDate,
        salary: salary,
        email: email,
        address: address,
        password: password,
        group: group
    };

    // Envia os dados para o Firebase
    firebase.database().ref('employees').push(employeeData)
        .then(() => {
            alert('Funcionário cadastrado com sucesso!'); // Mensagem de sucesso
            document.getElementById('employeeForm').reset(); // Limpa o formulário
        })
        .catch((error) => {
            console.error('Erro ao cadastrar funcionário:', error);
            alert('Ocorreu um erro ao cadastrar o funcionário.'); // Mensagem de erro
        });
}
