import { useState, createContext, useEffect, useCallback } from "react";
import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  /////  registrar usuarios nuevos y guarda los datos del usuario en Firestore /////////
  const registerUser = useCallback(async (user) => {
    try {
      const { email, password } = user;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        photoURL: userCredential.user.photoURL,
        displayName: userCredential.user.displayName,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ingresar usuario a la cuenta
  const loginUser = async (user) => {
    const { email, password } = user;
    await signInWithEmailAndPassword(auth, email, password);
  };

  // cerrar sesion
  const userOut = () => {
    signOut(auth);
    localStorage.removeItem("user");
  };

  // obtener usuario de sesion activa
  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUserAuth({ email, photoURL, displayName, uid });
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUserAuth(null);
      }
    });
  }, [userAuth?.displayName, userAuth?.photoURL]);

  // actualizar nombre de usuario respaldado en la base de datos Firestore, currentUser
  const updateUserName = async (userName) => {
    setLoading(true)
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });

    const userRef = doc(db, "users", userAuth.uid);
    await updateDoc(userRef, {
      displayName: userName,
    });
    setUserAuth({...userAuth, displayName: userName});
    setLoading(false)
  };

  //cargar la foto en Storage, actualizar la imagen de perfil en Firestore, currentUser
  const updateImageProfile = async (file) => {
    setLoading(true)
    const filename = userAuth.uid;
    const imageRef = ref(storage, `users/${filename}`);
    const resUploadImage = await uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(imageRef);
    console.log(imageURL);

    const userRef = doc(db, "users", userAuth.uid);
    await updateDoc(userRef, {
      photoURL: imageURL,
    });

    await updateProfile(auth.currentUser, {
      photoURL: imageURL,
    });

    setUserAuth({...userAuth, photoURL: imageURL});
    setLoading(false)
  };

  /* const getUserCurrent = () => {
    const user = auth.currentUser;
    const { email, photoURL, displayName, uid } = user;
    setUserAuth({ email, photoURL, displayName, uid });
  } */

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userAuth,
        userOut,
        loginUser,
        updateUserName,
        updateImageProfile,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
