const admin = require('./firebaseConfig'); // Importe o Firebase Admin SDK e a configuração

// Obtém uma referência para a coleção "usuarios"
const usuariosCollection = admin.firestore().collection('usuarios');

// Dados que você deseja salvar
const dadosUsuario = {
  nome: 'João',
  idade: 30,
  email: 'joao@example.com'
};

// Adiciona um documento com um ID gerado automaticamente
usuariosCollection.add(dadosUsuario)
  .then((docRef) => {
    console.log('Documento adicionado com ID:', docRef.id);
  })
  .catch((error) => {
    console.error('Erro ao adicionar documento:', error);
  });
