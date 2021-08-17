import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import Modal from 'react-modal';
import { Table } from '../../components/Table/Table';

import './styles.scss'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export function List(){
   
    const history = useHistory()

    const params = useParams()
    const listId = params.id

    const[list, setList] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getList()
    }, [])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const getList = async () => {
        const response = await fetch("/mock/lista_compartilhada.json");
        const data = await response.json()

        console.log(data)
        setList(data.list)
    }

    const handleCreateList = () => {
        history.push('/')
    }

    const handleGiveGift = () => {
        alert('presente dado')
    }

    return(
        <div className="share_list_area">
            <header>         
                <Button value="Criar Lista" onclick={handleCreateList}  background="blue" width={230}/>
                { list &&
                    <div className="list_info_area">                
                        <h1>{list.name} - {list.date}</h1>      
                    </div>
                  } 
            </header>
            <main>
                <section>
                    { list ? 
                       <Table itens={list.itens} click={openModal}/>   
                    :  <h1>Lista não encontrada.</h1>                    
                    }              
                </section>
            </main>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >             
                <AiOutlineClose className="close-modal" size={24} onClick={closeModal} />
                <form className="form-create">
                    <div className="form-input">
                        <label>Seu nome:</label>
                        <input placeholder="ex: Guilherme" />
                    </div>
                    <Button value="Dar presente"  background="pink"/>
                </form>
            </Modal>
        </div>
    )
}