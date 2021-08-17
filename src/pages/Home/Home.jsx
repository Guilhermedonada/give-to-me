import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

import './styles.scss'
import Logo from '../../assets/images/icone.png'


import { AuthContext } from '../../contexts/AuthContext'

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useContext(AuthContext)

    const handleCreateList = async () => {
     
        await signInWithGoogle()
        history.push('/lists')
    }

    return(
        <div className="home_area">
            <section className="banner">
                <div>
                    <img src={Logo} alt="Logo" />
                    <div>
                        <h1>Organize seus eventos.</h1>
                        <p>Crie suas listas de presentes e convide seus amigos para participar.</p>
                    </div>
                </div>
            </section>
            <section className="login">
                <div>
                    <h1>Moovie</h1>                    
                    <Button value="Criar Lista"  onclick={handleCreateList} background="pink" width={400}/>
                    <p>ou encontre uma lista</p>
                    <input placeholder="Informe o código da lista" />
                    <Button value="Entrar" background="blue" width={400}/>
                </div>
            </section>
        </div>
    )
}