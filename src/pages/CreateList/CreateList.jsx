import React, {useEffect, useState, useContext} from 'react'
import Modal from 'react-modal';
import { useParams, useHistory } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

import './styles.scss'
import Logo from '../../assets/images/icone.png'
import { Button } from '../../components/Button/Button';
import { Table } from '../../components/Table/Table';

import { AuthContext } from '../../contexts/AuthContext'


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

export function CreateList(){
    const { user, signInWithGoogle, stillLogged, signOut } = useContext(AuthContext)
    const history = useHistory()

    const params = useParams()
    const listId = params.id
       
    const [modalIsOpen, setIsOpen] = useState(false);
    const [list, setList] = useState()

    useEffect(() => {
        
        stillLogged()

        if(listId){
            getList()
        }
    },[])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const getList = async () => {
        //para parametro id aqui quando for fazer a chamada da lista
        const response = await fetch('/mock/lista.json')
        const data = await response.json()
        console.log(data.list)
        setList(data.list)
    }

    //quando esconde o input linUrl ele para de  copiar (pensar em outro jeito)
    const handleShareList = () => {
        var copyText = document.getElementById("linkUrl");
        copyText.type = 'text';
        copyText.select();
        document.execCommand("copy");
        copyText.setSelectionRange(0, 99999);
        copyText.type = 'hidden';

        console.log(copyText.value)

        alert("Link copiado! Compartilhe com seus amigos.")
    }

    const deleteItem = () => {
        alert('delete')
    }

    return(
        <div className="create_list_area">
             <header>
                <button className="sign-out" type="button" onClick={signOut}>Sair</button>
                <input type="hidden" value={`www.localhost:3000/list/${listId}`} id="linkUrl"/>
                <Button value="Compartilhar lista" onclick={handleShareList} background="pink" width={300}/>
            </header>
            <main>
                <section>
                    <form>                        
                        <div className="form-input">
                            <label>Nome do evento:</label>
                            <input placeholder="Informe o nome" name="name" defaultValue={ list && list.name }  />
                        </div>
                        <div className="form-input">
                            <label>Data:</label>
                            <input placeholder="Informe o nome" name="date" defaultValue={ list && list.date }/>
                        </div>
                    </form>
                    <div className="itens">
                        <h1>Lista de itens:</h1>
                        <Button value="Adicionar item"  background="blue" width={300} onclick={openModal}/>
                        { list && 
                        <Table itens={ list.itens} click={deleteItem}/>
                        }
                        <p>As linhas em verde já foram aceitas por alguns de seus amigos.</p>
                    </div>
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
                        <label>Nome do item:</label>
                        <input placeholder="ex: Xícara" />
                    </div>
                    <div className="form-input">
                        <label>Quantidade:</label>
                        <input placeholder="ex: 6" />
                    </div>
                    <div className="form-input">
                        <label>Link de referência</label>
                        <input placeholder="ex: link da loja" />
                    </div>
                    <Button value="Adicionar"  background="pink"/>
                </form>
            </Modal>
            
        </div>
    )
}