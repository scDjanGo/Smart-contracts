import "./style.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function MyProfile() {
  const [myAccount, setMyAccount] = useState(null);
  const [myContracts, setMyContracts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("myAccount"));
    if (account) {
      setMyAccount(account);
      setFetching(true);
      axios
        .get(
          `https://azamat412.pythonanywhere.com/api/auth/detail_by_token/?token=${account.token}`
        )
        .then((res) => {
          localStorage.setItem("myAccount", JSON.stringify(res.data));
          setMyAccount(res.data);
          setFetching(false);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage(
            "Failed to fetch account details. Please try again later."
          );
          setFetching(false);
        });
    }
  }, []);

  useEffect(() => {
    if (myAccount) {
      setFetching(true);
      axios
        .get(
          `https://azamat412.pythonanywhere.com/api/contracts/?creator=${myAccount.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${myAccount.token}`,
            },
          }
        )
        .then((res) => {
          setMyContracts(res.data);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Failed to fetch contracts. Please try again later.");
        })
        .finally(() => setFetching(false));
    }
  }, [myAccount]);

  const handleToggleMessage = (e) => {
    e.stopPropagation()
    setMessage(prev => !prev);
}

  return (
    <div className="myProfile-container">
      {fetching ? (
        <div className="loading">
          <div className="loading-inner">
            <h2>Loading...</h2>
            <img src="/header/loading.svg" alt="load" />
          </div>
        </div>
      ) : errorMessage ? (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <>
          {myAccount && (
            <>
            <div className={`pushs ${message ? "block" : ""}`} onClick={handleToggleMessage}>
                <main onClick={(e) => e.stopPropagation()}>
                    <div className="img" onClick={handleToggleMessage}>
                        <img src="/myProfile/exit.svg" alt="img" />
                    </div>
                    {myAccount.contracts.length > 0 ? (
                        <div className="messages">
                            {myAccount.contracts.map((elem, index) => (
                                <Link key={index} to={`/message/${elem.id}`}>
                                    <div>
                                        <span>От:</span>
                                        <h2>{elem.creator}</h2>
                                    </div>
                                    <div>
                                        <span>Тип контракта</span>
                                        <p>{elem.title}</p>
                                    </div>
                                    <img src="/myProfile/emailon.svg" alt="img" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-message">
                            <p>Нет сообщений</p>
                        </div>
                    )}
                </main>
            </div>

              <div className="email">
                <div className="on">
                  <div
                    className="icons"
                    onClick={handleToggleMessage}
                  >
                    <img src="/myProfile/email.svg" alt="img" />
                    {myAccount.contracts.length > 0 && <div className="point"></div>}
                  </div>
                  <div className="email.inner">
                    <span>Электронная почта:</span>
                    <p>{myAccount.email}</p>
                  </div>
                </div>
                <Link to={"/patchProfile"}>Изменить профиль</Link>
              </div>
              <div className="myProfile-header">
                <div className="myProfile-img">
                  <img
                    src={
                      (myAccount.avatar &&
                        `https://azamat412.pythonanywhere.com${myAccount.avatar}`) ||
                      "/header/static.jpeg"
                    }
                    alt="img"
                  />
                </div>
                <div className="myProfile-about">
                  <div className="left">
                    <span>Имя пользователя:</span>
                    <h2>{myAccount.username}</h2>
                    <span>Имя:</span>
                    <p className="first_name">{myAccount.first_name}</p>
                    <span>Фамилия:</span>
                    <p className="last_name">{myAccount.last_name}</p>
                    <span>Статус:</span>
                    <p className="role">{myAccount.role}</p>
                  </div>

                  <div className="right">
                    <span>Орган выдачи:</span>
                    <h2>{myAccount.organ_vidachi}</h2>
                    <span>ID пасспорта:</span>
                    <p className="first_name">{myAccount.Idpassporta}</p>
                    <span>Перс-номер пасспорта:</span>
                    <p className="last_name">
                      {myAccount.personal_number_passport}
                    </p>
                    <span>Номер телефона:</span>
                    <p className="first_name">{myAccount.phone}</p>
                  </div>
                </div>
              </div>

              <div className="myContracts">
                <h2>Мои контракты</h2>
                <Link to={"/chooseAddContract"}>Добавить контракт</Link>
              </div>

              {myContracts.length > 0 ? (
                <div className="myProfile-contracts">
                  {myContracts.map((contract) => (
                    <Link
                      to={`/contract/${contract.id}`}
                      key={contract.id}
                      className={`contract ${
                        contract.status === "черновик" || "grab"
                      }`}
                    >
                      <div>
                        <img src="/contracts/item.card.jpg" alt="item" />
                      </div>
                      <div className="about">
                        <h3>{contract.title}</h3>
                        <p>{contract.description}</p>
                      </div>
                      <button>Просмотр</button>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="emptyPage">
                  <h2>У вас нет контрактов</h2>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export { MyProfile };
