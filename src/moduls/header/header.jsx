import './style.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PushMessage } from '../componentAcc/pushMessage';


function Header() {
    const myAccount = JSON.parse(localStorage.getItem('myAccount'));
    const [was, setWas] = useState(false);
    const [burgerMenu, setBurgerMenu] = useState(false);

    useEffect(() => {
        if (myAccount) setWas(true);
        else setWas(false);
    }, [myAccount]);

    const handleBurgerMenu = () => setBurgerMenu(prev => !prev);

    return (
        <div className="header-container">
            <PushMessage />
            <Link id='toHome' to={'/'} className="logo"><img src="/header/logo.svg" alt="logo" /></Link>

            <div className='routes'>

                <Link to={'/'}>Главная</Link>
                <Link to={'/contracts'}>Контракты</Link>
                {was ?
                    <>
                        <Link to={'/myProfile'}>Мой профиль</Link>
                        <Link to={'/exit'}>Выйти с аккаунта</Link>
                    </>

                    :
                    <>
                        <Link to={'/singIn'}>Вход</Link>
                        <Link to={'/chooseRole'}>Регистрация</Link>
                    </>

                }
            </div>

            <div id='burgerMenu' onClick={handleBurgerMenu} className={`burger-menu ${burgerMenu && 'on'}`}>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </div>

            <div onClick={handleBurgerMenu} className={`sidebar  ${burgerMenu && 'on'}`}>
                <div className='inner' onClick={(e) => e.stopPropagation()}>
                    <Link onClick={handleBurgerMenu} to={'/'}>Главная</Link>
                    <Link onClick={handleBurgerMenu} to={'/contracts'}>Контракты</Link>
                    {was ?
                        <>
                            <Link onClick={handleBurgerMenu} to={'/myProfile'}>Мой профиль</Link>
                            <Link onClick={handleBurgerMenu} to={'/exit'}>Выйти с аккаунта</Link>
                        </>
                        :
                        <>
                            <Link onClick={handleBurgerMenu} to={'/singIn'}>Вход</Link>
                            <Link onClick={handleBurgerMenu} to={'/chooseRole'}>Регистрация</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}


export { Header }


// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function Header() {
//     const myAccount = JSON.parse(localStorage.getItem('myAccount'));
//     const [was, setWas] = useState(false);
//     const [burgerMenu, setBurgerMenu] = useState(false);

//     useEffect(() => {
//         if (myAccount) setWas(true);
//         else setWas(false);
//     }, [myAccount]);

//     const handleBurgerMenu = () => setBurgerMenu(prev => !prev);

//     return (
//         <div className="header-container">
//             <Link id='toHome' to={'/'} className="logo"><img src="/header/logo.svg" alt="logo" /></Link>

//             <div className='routes'>
//                 <Link onClick={handleBurgerMenu} to={'/'}>Главная</Link>
//                 {was ?
//                     <Link onClick={handleBurgerMenu} to={'/myProfile'}>Мой профиль</Link>
//                     :
//                     <>
//                         <Link onClick={handleBurgerMenu} to={'/singIn'}>Вход</Link>
//                         <Link onClick={handleBurgerMenu} to={'/singUp'}>Регистрация</Link>
//                     </>
//                 }
//                 <Link onClick={handleBurgerMenu} to={'/contracts'}>Контракты</Link>
//             </div>

//             <div id='burgerMenu' onClick={handleBurgerMenu} className={`burger-menu ${burgerMenu && 'on'}`}>
//                 <div className="one"></div>
//                 <div className="two"></div>
//                 <div className="three"></div>
//             </div>

//             <div onClick={handleBurgerMenu} className={`sidebar  ${burgerMenu && 'on'}`}>
//                 <div className='inner' onClick={(e) => e.stopPropagation()}>
//                     <Link onClick={handleBurgerMenu} to={'/'}>Главная</Link>
//                     {was ?
//                         <Link onClick={handleBurgerMenu} to={'/myProfile'}>Мой профиль</Link>
//                         :
//                         <>
//                             <Link onClick={handleBurgerMenu} to={'/singIn'}>Вход</Link>
//                             <Link onClick={handleBurgerMenu} to={'/singUp'}>Регистрация</Link>
//                         </>
//                     }
//                     <Link onClick={handleBurgerMenu} to={'/contracts'}>Контракты</Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export { Header };
