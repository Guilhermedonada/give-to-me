import { createContext, useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import firebase from "firebase"
import { auth } from "../services/firebase"

export const AuthContext = createContext()

export function AuthContextProvider(props){
    const history = useHistory()
    const [user, setUser] = useState()

    // useEffect(async () => {
        


    // }, [])


    const stillLogged = async () => {
        const unsubscribre = await firebase.auth().onAuthStateChanged(user => {
            if(user){         
                const {displayName, photoURL, uid} = user
    
                if(!displayName || !photoURL){
                  throw new Error('Missing information from google')
                }
          
                setUser({
                  id: uid,
                  name: displayName,
                  avatar: photoURL
                })             
    
            }   else {
                history.push('/')
            }
        })

        return () => {
            unsubscribre()
        }
    }

  


    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if(result.user){
            const {displayName, photoURL, uid} = result.user

            if(!displayName || !photoURL){
              throw new Error('Missing information from google')
            }
      
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })          
        }
    }

    const signOut = async () => {
        await firebase.auth().signOut().then(() => {
            setUser(null)
            history.push('/')
        })        
    }

    return(
        <AuthContext.Provider value={{user, signInWithGoogle, stillLogged, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}