import './style.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Contracts() {
    const [fetching, setFetching] = useState(true);
    const [contracts, setContracts] = useState([]);
    const [titles, setTitles] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [contractsPerPage] = useState(24);

    useEffect(() => {
        axios.get('https://azamat412.pythonanywhere.com/api/title/')
            .then(res => res.data)
            .then(data => setTitles(data))
            .catch(err => console.error(err));

        axios.get(`https://azamat412.pythonanywhere.com/api/contracts/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setContracts(res.data);
            setFilteredContracts(res.data);
        })
            .catch(err => console.log(err))
            .finally(() => setFetching(false));
    }, []);

    const handleFilter = (e) => {
        const value = e.target.value;
        setFilterType(value);
        filterAndSearchContracts(value, searchQuery);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchQuery(value);
        filterAndSearchContracts(filterType, value);
    };

    const filterAndSearchContracts = (filter, search) => {
        let filtered = contracts;

        switch (filter) {
            case 'hash':
                filtered = contracts.filter(contract => contract.hash.length > 20);
                break;
            case 'drafts':
                filtered = contracts.filter(contract => contract.status === 'черновик');
                break;
            case 'signed':
                filtered = contracts.filter(contract => contract.status === 'ожидается подпись');
                break;
            default:
                filtered = contracts;
        }

        if (search) {
            filtered = filtered.filter(contract => {
                const titleName = titles.find(title => title.id === contract.title)?.name
                return (
                    (titleName && titleName.toLowerCase().includes(search.toLowerCase())) ||
                    contract.description.toLowerCase().includes(search)
                );
            });
        }

        setFilteredContracts(filtered);
        setCurrentPage(1);
    };

    const indexOfLastContract = currentPage * contractsPerPage;
    const indexOfFirstContract = indexOfLastContract - contractsPerPage;
    const currentContracts = filteredContracts.slice(indexOfFirstContract, indexOfLastContract);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPageNumbers = Math.ceil(filteredContracts.length / contractsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPageNumbers; i++) {
        if (i >= currentPage - 2 && i <= currentPage + 2) {
            pageNumbers.push(i);
        }
    }

    const nextPage = () => {
        if (currentPage < totalPageNumbers) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="contracts-container">
            <h2>Смарт-контракты</h2>

            <div className={`contracts-sort ${fetching && 'block'}`}>
                <div className='sort'>
                    <img src="/header/arrow.svg" alt="arrow" />
                    <select onChange={handleFilter}>
                        <option value="all">Все</option>
                        <option value="hash">Подписанные</option>
                        <option value="signed">В ожидании</option>
                        <option value="drafts">Черновики</option>
                    </select>
                </div>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Поиск контрактов..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <img src="/header/search.svg" alt="search" />
                </div>
            </div>

            <div className={`contracts ${fetching && 'loading'}`}>
                {fetching ? (
                    <div className="loading">
                        <div className="loading-inner">
                            <h2>Loading...</h2>
                            <img src="/header/loading.svg" alt="load" />
                        </div>
                    </div>
                ) : (
                    <>
                        {titles.length > 0 &&
                            currentContracts.map((contract) => (
                                <Link to={`/contract/${contract.id}`} key={contract.id} className={`contract ${contract.status === 'черновик' ? '' : contract.status === 'хэшированный' ? 'green' : 'grab'}`}>
                                    <div><img src="/contracts/item.card.jpg" alt="item" /></div>

                                    <div className='about'>
                                        <h3>{contract.title}</h3>
                                        <p>{contract.description}</p>
                                    </div>

                                    <button>Просмотр</button>
                                </Link>
                            ))
                        }
                    </>
                )}
            </div>

            <div className={`pagination ${fetching && 'block'}`}>
            <button onClick={prevPage} className={currentPage === 1 ? 'none' : ''}>Предыдущая страница</button>
                <div className="inner">
                    {pageNumbers.map(number => (
                        <button key={number} onClick={() => paginate(number)} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                    ))}
                </div>
                <button onClick={nextPage} className={currentPage === totalPageNumbers ? 'none' : ''}>Следующая страница</button>
            </div>
        </div>
    );
}

export { Contracts };
