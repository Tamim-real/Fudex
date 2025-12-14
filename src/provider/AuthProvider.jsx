import React,  { Children, createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword,updateProfile, signOut} from "firebase/auth"
import { app } from "../firebase/firebase.init";

export const AuthContext = createContext();

const auth = getAuth(app)



const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true);

    const createUser =(email, password)=>{

        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn=(email, password)=>{

        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        return signOut(auth)
    }


    const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }


    useEffect(()=>{
        const unSub= onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=>{
            unSub()
        }

    },[])


    const authData ={
        user,
        setUser,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        logOut,
    }
    
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
};

export default AuthProvider;