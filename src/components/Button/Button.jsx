


import './styles.scss'

export function Button({value, width, background, onclick}){
    return(
        <button className={`button ${background}`} onClick={onclick} type="button" style={{maxWidth: width}}>{value}</button>
    )
}