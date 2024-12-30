import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYEmTNCfhU-dNjHlEA7u_rZydR7NwfoYo",
  authDomain: "javachrist-b02f3.firebaseapp.com",
  projectId: "javachrist-b02f3",
  storageBucket: "javachrist-b02f3.firebasestorage.app",
  messagingSenderId: "987983540724",
  appId: "1:987983540724:web:fa97255d9ae41f03ad89a1",
  measurementId: "G-9C8Y48XBHR"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Création de compte client
document.getElementById("client-creation-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const clientName = document.getElementById("client-name").value;
  const clientEmail = document.getElementById("client-email").value;
  const clientPassword = document.getElementById("client-password").value;
  console.log("Tentative de création avec :", { clientName, clientEmail });
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, clientEmail, clientPassword);
    const user = userCredential.user;
    console.log("Compte créé avec succès :", userCredential.user);

    // Mise à jour du profil utilisateur avec le nom
    await updateProfile(user, { displayName: clientName });
    console.log("Profil mis à jour avec succès");

    alert(`Compte client créé avec succès pour ${clientName}`);
    document.getElementById("client-creation-form").reset();
  } catch (error) {
    alert("Erreur lors de la création du compte client : " + error.message);
  }
});

// Téléversement de fichiers
document.getElementById("file-upload-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("target-client-email").value;
  const file = document.getElementById("upload-file").files[0];
  const category = document.getElementById("category-select").value;

  if (!email || !file || !category) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  try {
    // Chemin dynamique basé sur email, catégorie, et nom du fichier
    const filePath = `user_files/${email}/${category}/${file.name}`;
    const fileRef = ref(storage, filePath);
    console.log("Chemin du fichier :", filePath);

    // Téléversement du fichier
    await uploadBytes(fileRef, file);
    console.log("Fichier téléversé avec succès :", filePath);

    // Récupération de l'URL de téléchargement
    const fileURL = await getDownloadURL(fileRef);
    alert(`Fichier téléversé avec succès`);
    document.getElementById("file-upload-form").reset();
  } catch (error) {
    console.error("Erreur lors du téléversement :", error);
    alert("Erreur lors du téléversement du fichier : " + error.message);
  }
});

// Gérer la visibilité du mot de passe pour la création de compte client
document.getElementById('client-login-eye').addEventListener('click', function () {
  const passwordInput = document.getElementById('client-password');
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.classList.replace('ri-eye-off-line', 'ri-eye-line');
  } else {
      passwordInput.type = 'password';
      this.classList.replace('ri-eye-line', 'ri-eye-off-line');
  }
});