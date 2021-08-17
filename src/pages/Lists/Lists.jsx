
import { Button } from '../../components/Button/Button';
import React, {useEffect, useState, useContext} from 'react'

import { Link, useHistory } from 'react-router-dom';

import './styles.scss'


import { AuthContext } from '../../contexts/AuthContext'

export function Lists(){

    const { user, signInWithGoogle, signOut } = useContext(AuthContext)
    const history = useHistory()

    const [lists, setLists] = useState()

    useEffect(() => {
       
        if(!user){
            console.log('aqui')
            history.push('/')
        }

        getListFromUser()       
        
    },[])

    const handleCreateList = () => {
        history.push('/createlist')
    }

    const getListFromUser = async () => {
        const response = await fetch("./mock/lists.json");
        let json = await response.json();

        setLists(json.lists)
    }

    return(
        <div className="list_area">
            <header>
                <button className="sign-out" type="button" onClick={signOut}>Sair</button>                
                <Button value="Criar Lista"  onclick={handleCreateList} background="blue" width={230}/>
            </header>
            <main>
                <section>
                    { lists ? 
                        <div className="my_lists_area">

                            <label>Listas já criadas:</label>
                       
                            <ul className="my_lists">
                            {lists.map(list => (                            
                                <li key={list.id}><Link to={`/createlist/${list.id}`}>{list.name} - {list.date}</Link></li>
                            ))}
                            </ul>         
                        </div>     
                    :  <h1>Aguardando você criar a primeira lista...</h1>
                    
                    }              
                </section>
            </main>
        </div>
    )
}