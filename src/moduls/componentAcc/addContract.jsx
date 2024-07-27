import './style.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddContract() {
    const toHome = useNavigate();
    const [fetching, setFetching] = useState(false);
    const myAccount = JSON.parse(localStorage.getItem('myAccount'));
    const [errorMessage, setErrorMessage] = useState(null);
    const [titles, setTitles] = useState([]);
    const [users, setUsers] = useState([]);
    const [inputUsers, setInputUsers] = useState([]);
    const [target, setTarget] = useState('')

    useEffect(() => {
        setFetching(true);
        axios.get('https://azamat412.pythonanywhere.com/api/title/')
            .then(res => {
                setTitles(res.data);
            })
            .catch(err => {
                console.error('Error fetching titles:', err);
                setErrorMessage('Failed to fetch titles. Please try again later.');
            })
            .finally(() => setFetching(false));
    }, []);

    useEffect(() => {
        axios.get('https://azamat412.pythonanywhere.com/api/auth/users/')
            .then(res => {
                setUsers(res.data.filter(user => user.username !== myAccount.username));
            })
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const handleAddContract = (e) => {
        setFetching(true);
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target).entries());
        formData.creator = myAccount.id;
        formData.status = "ожидается подпись";

        const inputSearch = document.getElementById('inputSearch').value
        let signature = null

        console.log(inputSearch);

        if (inputSearch) {
            users.some(user => {
                if (user.username === inputSearch) {
                    return signature = user.id
                }
            })
        }

        if (signature) {
            formData.second_face = signature
            console.log(formData);
            setFetching(false);
            axios.post('https://azamat412.pythonanywhere.com/api/contracts/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${myAccount.token}`
                }
            }).then(res => {
                const data = res.data;
                console.log(data);
                toHome('/myProfile');
                setTimeout(() => {
                    const pushMessage = document.getElementById('pushMessage-container');
                    if (pushMessage) {
                        pushMessage.classList.add('on');
                        pushMessage.firstElementChild.textContent = `Контракт "${data.title}" добавлен!`;
                        setTimeout(() => {
                            pushMessage.classList.remove('on');
                        }, 1500);
                    }
                }, 500);
            }).catch(err => {
                console.error('Error adding contract:', err);
                setErrorMessage('Failed to add contract. Please try again.');
            }).finally(() => setFetching(false));
        }
    };

    const handleSearchUsers = (e) => {
        const searchValue = e.target.value;
        if (searchValue.length <= 0) {
            setInputUsers(null);
        } else {
            const filteredUsers = users.filter(user =>
                user.username.includes(searchValue)
            );
            setInputUsers(filteredUsers);
        }
    };

    const handleTarget = (e) => {
        setTarget(e)
    } 

    const handleSt = (e) => {
        setTarget(e.target.value)
    }

    return (
        <div className='singUp-container'>
            {fetching ? (
                <div className="loading">
                    <div className="loading-inner">
                        <h2>Loading...</h2>
                        <img src="/header/loading.svg" alt="load" />
                    </div>
                </div>
            ) : (
                <div className="inner in">
                    <p className='role'>Статус: {myAccount.role}</p>
                    <form onSubmit={handleAddContract}>
                        <span>Тип контракта</span>
                        <select name="title">
                            {titles.map((tit, index) => (
                                <option key={index} value={tit.id}>{tit.name}</option>
                            ))}
                        </select>
                        <span>Содержимое контракта</span>
                        <textarea name="content" placeholder='Контент' required></textarea>

                        <span>Описание</span>
                        <input name='description' maxLength={1000} type="text" placeholder='Описание' />

                        <span>Приг-е второго лица</span>
                        <input
                            id='inputSearch'
                            type="text"
                            placeholder='Имя пользователя'
                            value={target}
                            onChange={(e) => {handleSearchUsers(e); handleSt(e)}}
                        />

                        {inputUsers && inputUsers.length > 0 ? (
                            <div>
                                {inputUsers.map((user, index) => (
                                    <p style={{ margin: '5px 0', borderBottom: '1px solid black', fontSize: '22px', cursor: 'pointer' }} key={index} onClick={() => handleTarget(user.username)}>{user.username}</p>
                                ))}
                            </div>
                        ) : 
                            <p>{target && 'Такого пользователя нету'}</p>
                        }

                        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
                        <button type="submit">Добавить</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export { AddContract };
