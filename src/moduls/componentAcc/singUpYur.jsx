// import { render } from "@testing-library/react";
// import "./style.scss";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function SingUpYur() {
//   const toHome = useNavigate();
//   const [fetching, setFetching] = useState(false);
//   const [showPassport, setShowPassport] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const [baseImage64, setBaseImage64] = useState("");
//   const [img, setImg] = useState(null);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);

//     const reader = new FileReader();
//     reader.onload = (loadEvent) => {
//       setBaseImage64(loadEvent.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const getSubmitAcc = (e) => {
//     e.preventDefault();
//     setFetching((prev) => !prev);

//     const formData = new FormData(e.target);
//     formData.append("role", "Legal_entities");

//     if (baseImage64) {
//       formData.append("avatar", baseImage64);
//     }

//     console.log(formData);

//     fetch("https://azamat412.pythonanywhere.com/api/auth/register/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.token && data.username) {
//           localStorage.setItem("myAccount", JSON.stringify(data));
//           toHome("/");
//           setTimeout(() => {
//             const pushMessage = document.getElementById(
//               "pushMessage-container"
//             );
//             pushMessage.classList.add("on");
//             pushMessage.firstElementChild.textContent = `Добро пожаловать ${data.username}!`;
//           }, 500);
//           setTimeout(() => {
//             const pushMessage = document.getElementById(
//               "pushMessage-container"
//             );
//             pushMessage.classList.remove("on");
//           }, 3000);
//         } else {
//           console.log(data);
//           setErrorMessage(Object.values(data).join(" , "));
//         }
//       })
//       .catch((error) => console.error(error))
//       .finally(() => setFetching((prev) => !prev));
//   };

//   const handleShow = () => {
//     setShowPassport((prev) => !prev);
//   };

//   function updateFileName(input) {
//     const fileName = input.files[0] ? input.files[0].name : "Выберите файл";
//     const label = input.previousElementSibling;
//     label.textContent = fileName;
//   }

//   return (
//     <div className="singUp-container">
//       {fetching ? (
//         <div className="loading">
//           <div className="loading-inner">
//             <h2>Loading...</h2>
//             <img src="/header/loading.svg" alt="load" />
//           </div>
//         </div>
//       ) : (
//         <div className="inner">
//           <p className="role">Юридическое лицо</p>
//           <form onSubmit={(e) => getSubmitAcc(e)}>
//             <span>Имя пользоваетля</span>
//             <input
//               name="username"
//               type="text"
//               placeholder="Имя пользоваетля"
//               required
//             />
//             <span>Имя</span>
//             <input name="first_name" type="text" placeholder="Имя" required />
//             <span>Фамилия</span>
//             <input
//               name="last_name"
//               type="text"
//               placeholder="Фамилия"
//               required
//             />
//             <span>ID пасспорта</span>
//             <input
//               name="Idpassporta"
//               minLength={7}
//               maxLength={7}
//               type="text"
//               placeholder="ID пасспорта"
//               required
//             />
//             <span>Орган выдачи</span>
//             <input
//               name="organ_vidachi"
//               maxLength={10}
//               type="text"
//               placeholder="Орган выдачи"
//               required
//             />
//             <span>Персоналный номер</span>
//             <input
//               name="personal_number_passport"
//               minLength={10}
//               maxLength={14}
//               type="text"
//               placeholder="Персоналный номер"
//               required
//             />
//             <span>Номер телефона</span>
//             <input
//               name="phone"
//               type="tel"
//               placeholder="+996...Телефон"
//               pattern="[0-9+]+"
//               required
//             />
//             <span>Электронная почта</span>
//             <input
//               name="email"
//               type="email"
//               placeholder="Электронная почта"
//               required
//             />

//             <span>Фото профиля</span>
//             <div className="custom-file-input">
//               <label className="custom-file-label" htmlFor="avatar">
//                 Выберите файл
//               </label>
//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={(e) => {
//                   handleAvatarChange(e);
//                 }}
//               />
//             </div>

//             <span>Подпись</span>
//             <div className="custom-file-input">
//               <label className="custom-file-label" htmlFor="podpis">
//                 Подпись
//               </label>
//               <input
//                 type="file"
//                 name="podpis"
//                 onChange={(e) => updateFileName(e.target)}
//                 required
//               />
//             </div>

//             <span>Учредительные документы</span>
//             <div className="custom-file-input">
//               <label
//                 className="custom-file-label"
//                 htmlFor="Constituent_documents"
//               >
//                 Учредительные документы
//               </label>
//               <input
//                 type="file"
//                 name="Constituent_documents"
//                 onChange={(e) => updateFileName(e.target)}
//                 required
//               />
//             </div>
//             <span>Регистрационные документы</span>
//             <div className="custom-file-input">
//               <label className="custom-file-label" htmlFor="Rg_documents">
//                 Регистрационные документы
//               </label>
//               <input
//                 type="file"
//                 name="Rg_documents"
//                 onChange={(e) => updateFileName(e.target)}
//                 required
//               />
//             </div>
//             <span>Сертификаты и декларации соответствия</span>
//             <div className="custom-file-input">
//               <label
//                 className="custom-file-label"
//                 htmlFor="Certificates_and_declarations_of_conformity"
//               >
//                 Сертификаты и декларации соответствия
//               </label>
//               <input
//                 type="file"
//                 name="Certificates_and_declarations_of_conformity"
//                 onChange={(e) => updateFileName(e.target)}
//                 required
//               />
//             </div>
//             <span>Гос.документы</span>
//             <div className="custom-file-input">
//               <label
//                 className="custom-file-label"
//                 htmlFor="Documents_for_interaction_with_government_agencies"
//               >
//                 Гос.документы
//               </label>
//               <input
//                 type="file"
//                 name="Documents_for_interaction_with_government_agencies"
//                 onChange={(e) => updateFileName(e.target)}
//                 required
//               />
//             </div>

//             <span>Пароль</span>
//             <div>
//               <input
//                 name="password"
//                 type={showPassport ? "text" : "password"}
//                 placeholder="Пароль"
//                 required
//               />
//               <img
//                 className={`not ${showPassport && "on"}`}
//                 onClick={handleShow}
//                 src="sing/eyeNot.svg"
//                 alt="eye"
//               />
//               <img
//                 className={`on ${showPassport && "on"}`}
//                 onClick={handleShow}
//                 src="sing/eye.svg"
//                 alt="eye"
//               />
//               {errorMessage && <p className="errorMessage">{errorMessage}</p>}
//             </div>
//             <button>Регистрация</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export { SingUpYur };



import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SingUpYur() {
  const toHome = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [showPassport, setShowPassport] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [baseImage64, setBaseImage64] = useState("");
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
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setBaseImage64(loadEvent.target.result);
    };
    reader.readAsDataURL(file);

    updateFileName(e.target);
  };

  const getSubmitAcc = (e) => {
    e.preventDefault();
    setFetching((prev) => !prev);

    const formData = new FormData(e.target);
    formData.append("role", "Legal_entities");

    if (baseImage64) {
      formData.append("avatar", baseImage64);
    }

    fetch("https://azamat412.pythonanywhere.com/api/auth/register/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.username) {
          localStorage.setItem("myAccount", JSON.stringify(data));
          toHome("/");
          setTimeout(() => {
            const pushMessage = document.getElementById(
              "pushMessage-container"
            );
            pushMessage.classList.add("on");
            pushMessage.firstElementChild.textContent = `Добро пожаловать ${data.username}!`;
          }, 500);
          setTimeout(() => {
            const pushMessage = document.getElementById(
              "pushMessage-container"
            );
            pushMessage.classList.remove("on");
          }, 3000);
        } else {
          setErrorMessage(Object.values(data).join(" , "));
        }
      })
      .catch(() => {
        setValues({
            ...JSON.parse(sessionStorage.getItem('signin'))
        })
      })
      .finally(() => setFetching((prev) => !prev));
  };

  const handleShow = () => {
    setShowPassport((prev) => !prev);
  };

  function updateFileName(input) {
    const fileName = input.files[0] ? input.files[0].name : "Выберите файл";
    const label = input.previousElementSibling;
    label.textContent = fileName;
  }

  const handleValues = (e) => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })

    console.log(e.target);
  }

  return (
    <div className="singUp-container">
      {fetching ? (
        <div className="loading">
          <div className="loading-inner">
            <h2>Loading...</h2>
            <img src="/header/loading.svg" alt="load" />
          </div>
        </div>
      ) : (
        <div className="inner">
          <p className="role">Юридическое лицо</p>
          <form onSubmit={getSubmitAcc}>
            <span>Имя пользоваетля</span>
            <input
              name="username"
              type="text"
              placeholder="Имя пользоваетля"
              value={values.username || ''}
              onChange={handleValues}
              required
            />
            <span>Имя</span>
            <input name="first_name" type="text" placeholder="Имя" defaultValue={values.first_name || ''} onChange={handleValues} required />
            <span>Фамилия</span>
            <input
              name="last_name"
              type="text"
              placeholder="Фамилия"
              value={values.last_name || ''}
              onChange={handleValues}
              required
            />
            <span>ID пасспорта</span>
            <input
              name="Idpassporta"
              minLength={7}
              maxLength={7}
              type="text"
              placeholder="ID пасспорта"
              defaultValue={values.Idpassporta || ''}
              onChange={handleValues}
              required
            />
            <span>Орган выдачи</span>
            <input
              name="organ_vidachi"
              maxLength={10}
              type="text"
              placeholder="Орган выдачи"
              defaultValue={values.organ_vidachi || ''}
              onChange={handleValues}
              required
            />
            <span>Персоналный номер</span>
            <input
              name="personal_number_passport"
              minLength={10}
              maxLength={14}
              type="text"
              placeholder="Персоналный номер"
              defaultValue={values.personal_number_passport || ''}
              onChange={handleValues}
              required
            />
            <span>Номер телефона</span>
            <input
              name="phone"
              type="tel"
              placeholder="+996...Телефон"
              pattern="[0-9+]+"
              defaultValue={values.phone || ''}
              onChange={handleValues}
              required
            />
            <span>Электронная почта</span>
            <input
              name="email"
              type="email"
              placeholder="Электронная почта"
              defaultValue={values.email || ''}
              onChange={handleValues}
              required
            />

            <span>Фото профиля</span>
            <div className="custom-file-input">
              <label className="custom-file-label" htmlFor="avatar">
                Выберите файл
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <span>Подпись</span>
            <div className="custom-file-input">
              <label className="custom-file-label" htmlFor="podpis">
                Подпись
              </label>
              <input
                type="file"
                name="podpis"
                onChange={(e) => updateFileName(e.target)}
                required
              />
            </div>

            <span>Учредительные документы</span>
            <div className="custom-file-input">
              <label
                className="custom-file-label"
                htmlFor="Constituent_documents"
              >
                Учредительные документы
              </label>
              <input
                type="file"
                name="Constituent_documents"
                onChange={(e) => updateFileName(e.target)}
                required
              />
            </div>
            <span>Регистрационные документы</span>
            <div className="custom-file-input">
              <label className="custom-file-label" htmlFor="Rg_documents">
                Регистрационные документы
              </label>
              <input
                type="file"
                name="Rg_documents"
                onChange={(e) => updateFileName(e.target)}
                required
              />
            </div>
            <span>Сертификаты и декларации соответствия</span>
            <div className="custom-file-input">
              <label
                className="custom-file-label"
                htmlFor="Certificates_and_declarations_of_conformity"
              >
                Сертификаты и декларации соответствия
              </label>
              <input
                type="file"
                name="Certificates_and_declarations_of_conformity"
                onChange={(e) => updateFileName(e.target)}
                required
              />
            </div>
            <span>Гос.документы</span>
            <div className="custom-file-input">
              <label
                className="custom-file-label"
                htmlFor="Documents_for_interaction_with_government_agencies"
              >
                Гос.документы
              </label>
              <input
                type="file"
                name="Documents_for_interaction_with_government_agencies"
                onChange={(e) => updateFileName(e.target)}
                required
              />
            </div>

            <span>Пароль</span>
            <div>
              <input
                name="password"
                type={showPassport ? "text" : "password"}
                placeholder="Пароль"
                required
                defaultValue={values.password || ''}
                onChange={handleValues}
              />
              <img
                className={`not ${showPassport && "on"}`}
                onClick={handleShow}
                src="sing/eyeNot.svg"
                alt="eye"
              />
              <img
                className={`on ${showPassport && "on"}`}
                onClick={handleShow}
                src="sing/eye.svg"
                alt="eye"
              />
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </div>
            <button>Регистрация</button>
          </form>
        </div>
      )}
    </div>
  );
}

export { SingUpYur };
