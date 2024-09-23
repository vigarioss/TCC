import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAeCoLJn1HbNTmkgH5E4QEszbzIqlBuvVE",
    authDomain: "tcc-if-fc12c.firebaseapp.com",
    projectId: "tcc-if-fc12c",
    storageBucket: "tcc-if-fc12c.appspot.com",
    messagingSenderId: "699868556462",
    appId: "1:699868556462:web:2816fa93175d8c5611113f",
    measurementId: "G-06ZFNG0GBZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário criado com sucesso:', user);
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
      });
  };
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login realizado com sucesso:', user);
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  };
  import { sendEmailVerification } from 'firebase/auth';

  const sendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email de verificação enviado.');
      });
  };
  const logout = () => {
    auth.signOut().then(() => {
      console.log('Logout realizado com sucesso.');
    });
  };
        