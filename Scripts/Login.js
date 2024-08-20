document.addEventListener("DOMContentLoaded", function() {
    const roleButtons = document.querySelectorAll(".role-btn");
    const loginForm = document.getElementById("loginForm");
    const roleSelection = document.getElementById("roleSelection");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const deleteAccountButton = document.getElementById("deleteAccount");

    roleButtons.forEach(button => {
        button.addEventListener("click", function() {
            const role = this.getAttribute("data-role");
            loginForm.style.display = "block";
            loginForm.setAttribute("data-role", role);
            roleSelection.style.display = "none";
            welcomeMessage.style.display = "none";
        });
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const role = this.getAttribute("data-role");
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simulação de autenticação
        if (username === "admin" && password === "admin") {
            welcomeMessage.textContent = `Bem-vindo, ${role === "employee" ? "Funcionário" : "Gerente"}`;
            welcomeMessage.style.display = "block";
            loginForm.style.display = "none";
            deleteAccountButton.style.display = "block";

            // Redirecionar após um tempo para a página apropriada
            setTimeout(() => {
                if (role === "employee") {
                    window.location.href = "perfil_funcionario.html";
                } else if (role === "manager") {
                    window.location.href = "menu_principal.html";
                }
            }, 2000); // Delay de 2 segundos para visualizar a mensagem de boas-vindas
        } else {
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
