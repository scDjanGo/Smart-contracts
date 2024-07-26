import { useEffect } from "react"
import { useLocation } from "react-router-dom"


function ScrollTop() {
    const {pathname} = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [pathname])
}

export  {ScrollTop}