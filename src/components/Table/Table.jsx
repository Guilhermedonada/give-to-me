import { AiOutlineGift, AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoTrashOutline} from 'react-icons/io5';
import { Button } from '../Button/Button';


import './styles.scss'

export function Table({itens, click}){
    return(
        <>
        { itens &&
        <table className="table">
            <thead>
            <tr>
                <th style={{width: '10%'}}>Status</th>
                { "friend" in itens[0] && 
                    <th style={{width: '20%'}}>Amigo</th>
                }
                <th style={{width: '20%'}}>Nome</th>
                <th style={{width: '5%'}}>Quantidade</th>
                <th >Link</th>
                { "friend" in itens[0] && 
                <th style={{width: '5%'}}></th>
                }
            </tr> 
            </thead>
            <tbody>  
            {itens.map(item =>(
                <tr key={item.id} className={`${item.status == true ? 'done' :  '' } `}>                                        
                    { "friend" in item ?
                        <>
                        <td>{item.status == true ? <AiOutlineGift size={24}/> : <AiOutlineQuestionCircle size={24}/>}</td>
                        <td>{item.friend}</td>
                        </>
                        : 
                        <td>{item.status == true ? <AiOutlineGift size={24}/> : <Button value="Presentear" onclick={click} background="blue"/>}</td>
                    }
                    <td>{item.nome}</td>
                    <td>{item.qtd}</td>
                    <td>{item.link}</td>
                    { "friend" in item && 
                        <td><IoTrashOutline size={24} onClick={click}/></td>
                    }
                </tr>
            ))}   
            </tbody>             
        </table>
        }
        </>
    )
}