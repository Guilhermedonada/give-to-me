import { createContext, useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import firebase from "firebase"
import { auth } from "../services/firebase"

export const AuthContext = createContext()

export function AuthContextProvider(props){
    const history = useHistory()
    const [user, setUser] = useState()

    useEffect(async () => {
       
        
        const unsubscribre = await firebase.auth().onAuthStateChanged(user => {
            console.log('aqui context')
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

            }   
        })

        return () => {
            unsubscribre()
        }
    }, [])


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
        <AuthContext.Provider value={{user, signInWithGoogle, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}