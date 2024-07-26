import "./messages.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Messages() {
  const toHome = useNavigate();
  const { id } = useParams();
  const myAccount = JSON.parse(localStorage.getItem("myAccount"));
  const [fetching, setFetching] = useState(true);
  const [contract, setContract] = useState(null);
  const [created_at, setCreated_at] = useState("");
  const [update_at, setUpdate_at] = useState("");
  const [confirm, setConfirm] = useState(false)
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    setFetching(true);
    axios
      .get(`https://azamat412.pythonanywhere.com/api/contracts/${id}/`)
      .then((res) => {
        console.log(res.data);
        setContract(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    if (contract) {
      setCreated_at(() => {
        let result = "";
        const time = new Date(contract.created_at);
        result += `${time.getHours()}:`;
        result += `${time.getMinutes()}   `;
        result += `${time.getDate()}.`;
        result += `${time.getMonth() + 1}.`;
        result += `${time.getFullYear()}`;

        return result;
      });

      setUpdate_at(() => {
        let result = "";
        const time = new Date(contract.created_at);
        result += `${time.getHours()}:`;
        result += `${time.getMinutes()}   `;
        result += `${time.getDate()}.`;
        result += `${time.getMonth() + 1}.`;
        result += `${time.getFullYear()}`;

        return result;
      });
    }
  }, [contract]);

  const handlePostContract = () => {
    console.log(contract);
    axios
      .post(`https://azamat412.pythonanywhere.com/api/heshirovan/`, contract)
      .then((res) => {
        toHome("/myProfile");
        setTimeout(() => {
          const pushMessage = document.getElementById("pushMessage-container");
          pushMessage.classList.add("on");
          pushMessage.firstElementChild.textContent = `Контракт ${contract.title} подписан`;
        }, 100);
        setTimeout(() => {
          const pushMessage = document.getElementById("pushMessage-container");
          pushMessage.classList.remove("on");
        }, 1500);
      })
      .catch((err) => console.error(err));
  };


  const handleRefusal = () => {

    axios.post(`https://azamat412.pythonanywhere.com/api/otkaz/`, {
      id: contract.id,
      title: contract.title,
      creator: contract.creator,
      content: contract.content,
    }).then(() => {
      toHome("/myProfile");
      setTimeout(() => {
        const pushMessage = document.getElementById("pushMessage-container");
        pushMessage.classList.add("on");
        pushMessage.firstElementChild.textContent = `Контракт ${contract.title} подписан`;
      }, 100);
      setTimeout(() => {
        const pushMessage = document.getElementById("pushMessage-container");
        pushMessage.classList.remove("on");
      }, 1500);
    }).catch(err => console.error(err))
  }

  const handleConfirm = () => {
    setConfirm(prev => !prev)
  }

  const handleDisabled = () => {
    setDisable(prev => !prev)
  }

  return (
    <div className="aboutContract-container">
      {fetching ? (
        <div className="loading">
          <div className="loading-inner">
            <h2>Loading...</h2>
            <img src="/header/loading.svg" alt="load" />
          </div>
        </div>
      ) : (
        <>

        <div className={`confirm ${confirm && 'none'}`} onClick={handleConfirm}>
            <div className="inner" onClick={(e) => e.stopPropagation()}>
            <img src="/myProfile/exit.svg" alt="exit" onClick={handleConfirm}/>
                <h2>Вы готовы подписать?</h2>
                <div className="buttons">
                    <button onClick={handlePostContract}>Да</button>
                    <button onClick={handleConfirm}>Нет</button>
                </div>
            </div>
        </div>

        <div className={`disable ${disable && 'none'}`} onClick={handleDisabled}>
            <div className="inner" onClick={(e) => e.stopPropagation()}>
            <img src="/myProfile/exit.svg" alt="exit" onClick={handleDisabled}/>
                <h2>Хотите отклонить?</h2>
                <div className="buttons">
                    <button onClick={handleRefusal}>Да</button>
                    <button onClick={handleDisabled}>Нет</button>
                </div>
            </div>
        </div>

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
                <p>{created_at || "..."}</p>
              </div>
              <div>
                <span>Дата обновление:</span>
                <p>{update_at || "..."}</p>
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
            {myAccount && contract.status === "ожидается подпись" && (
              <div className="buttons">
                <button onClick={handleConfirm}>Подписать договор</button>
                {myAccount.username &&
                contract.status === "ожидается подпись" ? (
                  <Link onClick={handleDisabled} style={{ backgroundColor: "white", color: "black" }}>
                    Отклонить
                  </Link>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export { Messages };
