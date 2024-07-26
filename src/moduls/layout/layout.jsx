import { Outlet } from 'react-router-dom'

import { Header } from '../header/header'
import { Footer } from '../footer/footer'

function Layout() {


    return (
        <>
            <Header />
            <div style={{paddingTop: '48px'}}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export { Layout }