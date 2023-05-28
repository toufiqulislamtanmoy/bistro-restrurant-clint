import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebse.config";
export const  AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const userSignUp = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const userLogin =(email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const updateUserInFo = (name,photoURL) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL:photoURL 
          })
          
    }

    const userLogOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log("Current User From Auth Provider",currentUser);
            setLoading(false)
        });
        return () =>{
            return unsubscribe();
        }
    }, [])


    const authInfo ={
        user,
        loading,
        userSignUp,
        userLogin,
        userLogOut,
        updateUserInFo
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;