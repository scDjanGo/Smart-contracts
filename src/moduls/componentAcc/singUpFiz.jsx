import './style.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SingUpFiz() {
    const toHome = useNavigate()
    const [fetching, setFetching] = useState(false)
    const [showPassport, setShowPassport] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [baseImage64, setBaseImage64] = useState('')
    const [values, setValues] = useState({
        username: '',
        first_name: '',
        last_name: '',
        Idpassporta: '',
        organ_vidachi: '',
        personal_number_passport: '',
        phone: '',
        email: '',
        password: '',
        avatar: null,
        podpis: null,
    })

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)

        const reader = new FileReader()
        reader.onload = (loadEvent) => {
            setBaseImage64(loadEvent.target.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFetching(true)

        const formData = new FormData(e.target)
        formData.append('role', 'individuals')

        if (baseImage64) {
            formData.append('avatar', baseImage64)
        }

        sessionStorage.setItem('signin', JSON.stringify(formData))

        fetch('https://azamat412.pythonanywhere.com/api/auth/register/', {
            method: 'POST',
            body: formData
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
                    }, 500)
                    setTimeout(() => {
                        const pushMessage = document.getElementById('pushMessage-container')
                        pushMessage.classList.remove('on')
                    }, 3000)
                } else {
                    setErrorMessage(Object.values(data).join(' , '))
                }
            })
            .catch(() => {
                setValues({
                    ...JSON.parse(sessionStorage.getItem('signin'))
                })
            })
            .finally(() => setFetching(false))
    }

    const handleShow = () => {
        setShowPassport(prev => !prev)
    }

    const updateFileName = (e) => {
        const input = e.target
        const fileName = input.files[0] ? input.files[0].name : 'Выберите файл'
        const label = input.previousElementSibling
        label.textContent = fileName
        setValues({
            ...values,
            [input.name]: input.files[0]
        })
    }

    const handleValues = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div className='singUp-container'>
            {fetching ?
                <div className="loading">
                    <div className="loading-inner">
                        <h2>Loading...</h2>
                        <img src="/header/loading.svg" alt="load" />
                    </div>
                </div>
                :
                <div className="inner">
                    <p className='role'>Физическое лицо</p>
                    <form onSubmit={handleSubmit}>
                        <span>Имя пользователя</span>
                        <input name='username' type="text" placeholder='Имя пользователя' value={values.username || ''} onChange={handleValues} required />
                        <span>Имя</span>
                        <input name='first_name' type="text" placeholder='Имя' required value={values.first_name || ''} onChange={handleValues} />
                        <span>Фамилия</span>
                        <input name='last_name' type="text" placeholder='Фамилия' value={values.last_name || ''} onChange={handleValues} required />
                        <span>ID паспорта</span>
                        <input name='Idpassporta' minLength={7} maxLength={7} type="text" placeholder='ID паспорта' value={values.Idpassporta || ''} onChange={handleValues} required />
                        <span>Орган выдачи</span>
                        <input name='organ_vidachi' maxLength={10} type="text" placeholder='Орган выдачи' value={values.organ_vidachi || ''} onChange={handleValues} required />
                        <span>Персональный номер</span>
                        <input name='personal_number_passport' minLength={10} maxLength={14} type="text" placeholder='Персональный номер' value={values.personal_number_passport || ''} onChange={handleValues} required />
                        <span>Номер телефона</span>
                        <input name='phone' type="tel" placeholder='+996...Телефон' pattern='[0-9+]+' value={values.phone || ''} onChange={handleValues} required />
                        <span>Электронная почта</span>
                        <input name='email' type="email" placeholder='Электронная почта' value={values.email || ''} onChange={handleValues} required />

                        <span>Фото профиля</span>
                        <div className="custom-file-input">
                            <label className="custom-file-label" htmlFor="avatar">Фото профиля</label>
                            <input
                                type="file"
                                id="file4"
                                name="avatar"
                                onChange={(e) => { handleAvatarChange(e); updateFileName(e) }}
                            />
                        </div>

                        <span>Подпись</span>
                        <div className="custom-file-input">
                            <label className="custom-file-label" htmlFor="podpis">Подпись</label>
                            <input type="file" id="file1" name="podpis" onChange={updateFileName} />
                        </div>

                        <span>Пароль</span>
                        <div>
                            <input name='password' type={showPassport ? 'text' : 'password'} value={values.password || ''} onChange={handleValues} placeholder='Пароль' required />
                            <img className={`not ${showPassport && 'on'}`} onClick={handleShow} src="sing/eyeNot.svg" alt="eye" />
                            <img className={`on ${showPassport && 'on'}`} onClick={handleShow} src="sing/eye.svg" alt="eye" />
                            {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
                        </div>
                        <button>Регистрация</button>
                    </form>
                </div>
            }
        </div>
    )
}

export { SingUpFiz }
