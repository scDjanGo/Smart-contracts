import './style.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SingIn() {
    const toHome = useNavigate()
    const [fetching, setFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassport, setShowPassport] = useState(false)
    const [values, setValues] = useState({
        username: ''
    })

    const handleLogIn = (e) => {
        e.preventDefault()
        setFetching(prev => !prev)

        const formData = Object.fromEntries(new FormData(e.target).entries())

        sessionStorage.setItem('singIn', JSON.stringify(formData))

        fetch('https://azamat412.pythonanywhere.com/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.token && data.username) {
                    localStorage.setItem('myAccount', JSON.stringify(data))
                    toHome('/')
                    setTimeout(() => {
                        const pushMessage = document.getElementById('pushMessage-container')
                        pushMessage.classList.add('on')
                        pushMessage.firstElementChild.textContent = `Добро пожаловать ${data.username}!`
                    }, 100)
                    setTimeout(() => {
                        const pushMessage = document.getElementById('pushMessage-container')
                        pushMessage.classList.remove('on')
                    }, 1500)
                } else {
                    setErrorMessage(data.detail)
                }

            })
            .catch(() => {
                setValues({
                    ...JSON.parse(sessionStorage.getItem('singIn'))
                })
            })
            .finally(() => setFetching(prev => !prev))
    }


    const handleShow = () => {
        setShowPassport(prev => !prev)
    }

    const handleValues = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    return (
        <div style={{paddingTop: '120px'}} className='singUp-container'>

            {
                fetching ?
                    <div className="loading">
                        <div className="loading-inner">
                            <h2>Loading...</h2>
                            <img src="/header/loading.svg" alt="load" />
                        </div>
                    </div>
                    :
                    <div className="inner in">
                        <form onSubmit={(e) => handleLogIn(e)}>
                            <span>Имя пользователя</span>
                            <input name='username' type="text" placeholder='Имя пользоваетля' value={(values.username) || ''} onChange={(e) => handleValues(e)} required />
                            <span>Пароль</span>
                            <div>
                                <input name='password' type={showPassport ? 'text' : 'password'} placeholder='Пароль' required value={values.password || ''} onChange={handleValues}/>
                                <img className={`not ${showPassport && 'on'}`} onClick={handleShow} src="sing/eyeNot.svg" alt="eye" />
                                <img className={`on ${showPassport && 'on'}`} onClick={handleShow} src="sing/eye.svg" alt="eye" />
                                {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
                            </div>
                            <button>Вход</button>
                        </form>
                    </div>
            }
        </div>
    )
}

export { SingIn }