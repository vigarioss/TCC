var authEmailPassButton = document.getElementById('authEmailPassButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');

var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var displayName = document.getElementById('displayName');

function validateInputs() {
    if (!emailInput.value || !passwordInput.value) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    return true;
}

// Criar usuário
createUserButton.addEventListener('click', function () {
    if (!validateInputs()) return;

    createUserButton.disabled = true; // Desabilita o botão
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function () {
            alert('Bem-vindo, ' + emailInput.value);
            emailInput.value = ''; // Limpa o campo de e-mail
            passwordInput.value = ''; // Limpa o campo de senha
        })
        .catch(function (error) {
            console.error(error.code);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('Este e-mail já está em uso.');
                    break;
                case 'auth/invalid-email':
                    alert('E-mail inválido. Por favor, verifique.');
                    break;
                case 'auth/weak-password':
                    alert('A senha deve ter pelo menos 6 caracteres.');
                    break;
                default:
                    alert('Falha ao cadastrar. Verifique o erro no console.');
            }
        })
        .finally(() => {
            createUserButton.disabled = false; // Reativa o botão
        });
});

// Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', function () {
    if (!validateInputs()) return;

    authEmailPassButton.disabled = true; // Desabilita o botão
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem-vindo, ' + emailInput.value;
            alert('Autenticado ' + emailInput.value);
            window.location.href = 'Gerente.html'; // Redirecionamento
        })
        .catch(function (error) {
            console.error(error.code);
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Senha incorreta. Tente novamente.');
                    break;
                case 'auth/user-not-found':
                    alert('Usuário não encontrado. Verifique o e-mail.');
                    break;
                default:
                    alert('Falha ao autenticar. Verifique o erro no console.');
            }
        })
        .finally(() => {
            authEmailPassButton.disabled = false; // Reativa o botão
        });
});

// Logout
logOutButton.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        })
        .catch(function (error) {
            console.error(error);
        });
});
