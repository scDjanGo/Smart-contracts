import './style.scss'


function Footer() {



    return (
        <div className="footer-container">
            <div className="year">
                <h2>© 2024 PROclub</h2>
                <p>Политика конфиденциальности</p>
            </div>

            <div className="contacts">
                <h2>Поддержка проекта</h2>
                <div>
                    <span>для поддержки проекта</span>
                    <h3>Спасибо за поддержку</h3>
                    <p>"MBANK" 0558212040</p>
                    <p>"ОПТИМА" 4169 5853 4987 2787 Эркинов.А</p>
                </div>
            </div>

            <div className="adress">
                <span>Адресс:</span>
                <p>316 Ленин Проспект, Ош</p>
            </div>

            <div className="rekvizits">
                <span>Реквизиты</span>
                <div>
                    <span>Frontend</span>
                    <h3>scDjanGo</h3>
                    <p>helloJS@email.com</p>
                </div>
                <div>
                    <span>Backend</span>
                    <h3>AE</h3>
                    <p>helloPY@email.com</p>
                </div>
            </div>
        </div>
    )
}

export { Footer }