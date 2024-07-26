import './style.scss'
import { Link } from 'react-router-dom'


function ChooseRole() {



    return (
        <div className="chooseRole-container">
            <div className="inner">
                <Link to={'/singUpFiz'}>Физическое лицо</Link>
                <Link to={'/singUpYur'}>Юридическле лицо</Link>
            </div>
        </div>
    )
}


export {ChooseRole}