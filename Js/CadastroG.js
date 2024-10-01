
function submitForm() {
 
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const hireDate = document.getElementById('hireDate').value;
    const salary = parseFloat(document.getElementById('salary').value);
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const group = document.getElementById('group').value;

    
    const managerData = {
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

    
    firebase.database().ref('managers').push(managerData)
        .then(() => {
            alert('Gerente cadastrado com sucesso!');
            document.getElementById('managerForm').reset(); 
        })
        .catch((error) => {
            console.error('Erro ao cadastrar gerente:', error);
            alert('Ocorreu um erro ao cadastrar o gerente.');
        });
}
