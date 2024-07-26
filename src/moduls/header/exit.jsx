import './style.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'



function Exit() {
    const [modal, setModal] = useState(false)


    const handleExit = () => {
        localStorage.removeItem('myAccount')
        setTimeout(() => {
            const pushMessage = document.getElementById('pushMessage-container')
            pushMessage.classList.add('on')
            pushMessage.firstElementChild.textContent = `Вы вышли с аккаунта`
        }, 100)
        setTimeout(() => {
            const pushMessage = document.getElementById('pushMessage-container')
            pushMessage.classList.remove('on')
        }, 1500)
    }

    const handleModal = () => {
        setModal(prev => !prev)
    }


    return (
        <div className="exit-container">

            <div className={`modal ${modal && 'on'}`} onClick={handleModal}>
                <div className="elems" onClick={(e) => e.stopPropagation()}>
                    <h2>Вы точно хотите выйти из профиля?</h2>
                    <div>
                        <Link onClick={handleExit} to={'/'}>Да</Link>
                        <Link onClick={handleModal}>Нет</Link>
                    </div>
                </div>
            </div>

            <div className="inner">
                <Link onClick={handleModal}>Выйти из профилья</Link>

                <Link to={'/myProfile'}>Вернутся обратно</Link>
            </div>
        </div>
    )
}
export {Exit}