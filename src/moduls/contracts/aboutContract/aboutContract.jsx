import './style.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'


function AboutContract() {
    const { id } = useParams()
    const myProfile = useNavigate()
    const myAccount = JSON.parse(localStorage.getItem('myAccount'))
    const [fetching, setFetching] = useState(true)
    const [contract, setContract] = useState(null)
    const [created_at, setCreated_at] = useState('')
    const [update_at, setUpdate_at] = useState('')
    const [titles, setTitles] = useState(null)

    useEffect(() => {
        setFetching(true)
        axios.get(`https://azamat412.pythonanywhere.com/api/contracts/${id}/`)
            .then(res => {
                setContract(res.data)
            })
            .catch(err => console.error(err))
            .finally(() => setFetching(false))
    }, [])

    useEffect(() => {
        if (contract) {
            setCreated_at(() => {
                let result = ''
                const time = new Date(contract.created_at)
                result += `${time.getHours()}:`
                result += `${time.getMinutes()}   `
                result += `${time.getDate()}.`
                result += `${time.getMonth() + 1}.`
                result += `${time.getFullYear()}`

                return result
            })

            setUpdate_at(() => {
                let result = ''
                const time = new Date(contract.created_at)
                result += `${time.getHours()}:`
                result += `${time.getMinutes()}   `
                result += `${time.getDate()}.`
                result += `${time.getMonth() + 1}.`
                result += `${time.getFullYear()}`

                return result
            })
        }
    }, [contract])


    useEffect(() => {
        if (contract) {
            axios.get(`https://azamat412.pythonanywhere.com/api/title/`)
                .then(res => {
                    setTitles(res.data)
                }).catch(err => console.error(err))
        }

    }, [contract])


    const handlePostContract = () => {
        const copyContract = { ...contract }
        copyContract.creator = myAccount.id
        copyContract.title = titles.find(t => t.name === copyContract.title)?.id
        delete copyContract.id
        delete copyContract.created_at
        delete copyContract.updated_at
        delete copyContract.second_face
        delete copyContract.podpis1

        console.log(myAccount);
        console.log(copyContract);

        axios.post(`https://azamat412.pythonanywhere.com/api/contracts/`, copyContract, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${myAccount.token}`
            }
        })
            .then(res => {
                setTimeout(() => {
                    const pushMessage = document.getElementById('pushMessage-container')
                    pushMessage.classList.add('on')
                    pushMessage.firstElementChild.textContent = `Черновик скопирован`
                }, 100)
                setTimeout(() => {
                    const pushMessage = document.getElementById('pushMessage-container')
                    pushMessage.classList.remove('on')
                }, 1500)
            })
            .catch(err => console.error(err))
    }



    return (
        <div className="aboutContract-container">
            {fetching ?
                <div className="loading">
                    <div className="loading-inner">
                        <h2>Loading...</h2>
                        <img src="/header/loading.svg" alt="load" />
                    </div>
                </div>
                :
                <>
                    <div className="contract">

                        <div className="title">
                            <h2>{contract.title}</h2>
                        </div>

                        <div className="creator">
                            <div>
                                <span>Договор составил:</span>
                                <p>{contract.creator}</p>
                            </div>
                            <div>
                                <span>Статус:</span>
                                <p>{contract.status}</p>
                            </div>
                        </div>

                        <div className="time">
                            <div>
                                <span>Дата создание:</span>
                                <p>{created_at || '...'}</p>
                            </div>
                            <div>
                                <span>Дата обновление:</span>
                                <p>{update_at || '...'}</p>
                            </div>
                        </div>

                        <div className="descrition">
                            <span>Описание</span>
                            <h3>{contract.description}</h3>
                        </div>

                        <div className="content">
                            <span>Договор</span>
                            <h4>{contract.content}</h4>
                        </div>
                        {(myAccount && contract.status === 'черновик') &&
                            <div className="buttons">
                                <button onClick={handlePostContract}>Копировать черновик</button>
                                {(myAccount.username === contract.creator) && (contract.status === 'черновик') ? <Link>Изменить</Link> : ''}
                            </div>
                        }

                    </div>
                </>
            }
        </div>
    )
}


export { AboutContract }