import './style.scss'
import { Link } from 'react-router-dom'


function ChooseAddContract() {



    return (
        <div className="chooseRole-container">
            <div className="inner">
                <Link to={'/addDraft'}>Черновик контракта</Link>
                <Link to={'/addContract'}>Пописанный контракт</Link>
            </div>
        </div>
    )
}


export {ChooseAddContract}