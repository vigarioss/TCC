// Inicialize o Firebase Auth
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function () {
    const roleSelection = document.getElementById('roleSelection');
    const loginForm = document.getElementById('loginForm');
    const loginFormElement = document.getElementById('loginFormElement');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const deleteAccountBtn = document.getElementById('deleteAccount');
    
    // Mostrar o formulário de login quando um botão de função for clicado
    roleSelection.addEventListener('click', function (event) {
        if (event.target.classList.contains('role-btn')) {
            loginForm.style.display = 'block';
        }
    });

    // Manipular o envio do formulário de login
    loginFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Autenticar o usuário
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Usuário logado com sucesso
                const user = userCredential.user;
                welcomeMessage.textContent = `Bem-vindo, ${user.email}`;
                welcomeMessage.style.display = 'block';
                deleteAccountBtn.style.display = 'block';
                loginForm.style.display = 'none';
            })
            .catch((error) => {
                // Mostrar erro
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });

    // Excluir conta
    deleteAccountBtn.addEventListener('click', function () {
        const user = auth.currentUser;
        if (user) {
            user.delete().then(() => {
                // Conta excluída com sucesso
                alert('Conta excluída com sucesso.');
                welcomeMessage.style.display = 'none';
                deleteAccountBtn.style.display = 'none';
                loginForm.style.display = 'block';
            }).catch((error) => {
                // Mostrar erro
                alert('Erro ao excluir conta: ' + error.message);
            });
        }
    });
});
