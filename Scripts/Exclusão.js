document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('deleteAccount');

    deleteButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (confirm(`Tem certeza de que deseja excluir a conta de "${username}"?`)) {
            // Aqui você faria uma requisição para o servidor para realmente excluir o usuário
            alert(`Conta de "${username}" excluída com sucesso!`);
            // Simulação de redirecionamento para a página inicial após a exclusão
            window.location.href = '/'; // redireciona para a página inicial
        } else {
            alert('Exclusão cancelada.');
        }
    });
});