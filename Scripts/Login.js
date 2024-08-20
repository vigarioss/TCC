document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    const deleteAccountButton = document.getElementById("deleteAccount");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simulação de autenticação
        if (username === "admin" && password === "admin") {
            // Autenticação bem-sucedida, redirecionar para a página do menu principal
            window.location.href = "PósLogin.html";
        } else {
            // Autenticação falhou, exibir uma mensagem de erro
            alert("Nome de usuário ou senha incorretos.");
        }
    });

    deleteAccountButton.addEventListener("click", function() {
        const confirmation = confirm("Tem certeza de que deseja excluir sua conta?");
        if (confirmation) {
            // Lógica para excluir a conta (a ser implementada)
            alert("Conta excluída com sucesso!");
            // Redirecionar ou limpar o formulário
        }
    });
});
