import "./patch.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatchProfile() {
  const toHome = useNavigate();
  const myAccount = JSON.parse(localStorage.getItem("myAccount"));
  const [showPassport, setShowPassport] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    ...myAccount,
  });

  const getPatchAcc = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());
    formData.role = "Legal_entities";

    formData.Constituent_documents = formData.Constituent_documents || null;
    formData.Rg_documents = formData.Rg_documents || null;
    formData.Certificates_and_declarations_of_conformity =
      formData.Certificates_and_declarations_of_conformity || null;
    formData.Documents_for_interaction_with_government_agencies =
      formData.Documents_for_interaction_with_government_agencies || null;
    console.log(formData);

    try {
      const response = await fetch(
        `https://azamat412.pythonanywhere.com/api/auth/users/${myAccount.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myAccount}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.token && data.username) {
        console.log(data);
        localStorage.setItem("myAccount", JSON.stringify(data));
        toHome("/myProfile");
        setTimeout(() => {
          const pushMessage = document.getElementById("pushMessage-container");
          pushMessage.classList.add("on");
          pushMessage.firstElementChild.textContent = `Изменено имя пользоваетля: ${data.username}!`;
        }, 300);
        setTimeout(() => {
          const pushMessage = document.getElementById("pushMessage-container");
          pushMessage.classList.remove("on");
        }, 1500);
      } else {
        setErrorMessage(Object.values(data).join(" , "));
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };



  return (
    <div className="patchProfile-container">
      <div className="inner">
        {myAccount.role === "individuals" ? (
          <>
            <p className="role">Физическое лицо</p>
            <form onSubmit={getPatchAcc}>
              <span>Имя пользоваетля</span>
              <input
                name="username"
                type="text"
                placeholder="Имя пользоваетля"
                defaultValue={values.username}
                required
              />
              <span>Имя</span>
              <input
                name="first_name"
                type="text"
                placeholder="Имя"
                defaultValue={values.first_name}
                required
              />
              <span>Фамилия</span>
              <input
                name="last_name"
                type="text"
                placeholder="Фамилия"
                defaultValue={values.last_name}
                required
              />
              <span>ID пасспорта</span>
              <input
                name="Idpassporta"
                maxLength={7}
                type="text"
                placeholder="ID пасспорта"
                defaultValue={values.Idpassporta}
                required
              />
              <span>Орган выдачи</span>
              <input
                name="organ_vidachi"
                maxLength={10}
                type="text"
                placeholder="Орган выдачи"
                defaultValue={values.organ_vidachi}
                required
              />
              <span>Персоналный номер</span>
              <input
                name="personal_number_passport"
                maxLength={14}
                type="text"
                placeholder="Персоналный номер"
                defaultValue={values.personal_number_passport}
                required
              />
              <span>Телефонный номер</span>
              <input
                name="phone"
                type="tel"
                placeholder="+996...Телефон"
                pattern="[0-9+]+"
                defaultValue={values.phone}
                required
              />
              <span>Электронная почта</span>
              <input
                name="email"
                type="email"
                placeholder="Электронная почта"
                defaultValue={values.email}
                required
              />
              <button>Изменить</button>
            </form>
          </>
        ) : (
          <>
            <p className="role">Юридическое лицо</p>
            <form onSubmit={(e) => getPatchAcc(e)}>
              <span>Имя пользоваетля</span>
              <input
                name="username"
                type="text"
                placeholder="Имя пользоваетля"
                defaultValue={values.username}
                required
              />
              <span>Имя</span>
              <input
                name="first_name"
                type="text"
                placeholder="Имя"
                defaultValue={values.first_name}
                required
              />
              <span>Фамилия</span>

              <input
                name="last_name"
                type="text"
                placeholder="Фамилия"
                defaultValue={values.last_name}
                required
              />
              <span>ID пасспорта</span>

              <input
                name="Idpassporta"
                maxLength={7}
                type="text"
                placeholder="ID пасспорта"
                defaultValue={values.Idpassporta}
                required
              />
              <span>Орган выдачи</span>

              <input
                name="organ_vidachi"
                maxLength={10}
                type="text"
                placeholder="Орган выдачи"
                defaultValue={values.organ_vidachi}
                required
              />
              <span>Персоналный номер</span>

              <input
                name="personal_number_passport"
                maxLength={14}
                type="text"
                placeholder="Персоналный номер"
                defaultValue={values.personal_number_passport}
                required
              />
              <span>Телефонный номер</span>

              <input
                name="phone"
                type="tel"
                placeholder="+996...Телефон"
                pattern="[0-9+]+"
                defaultValue={values.phone}
                required
              />
              <span>Электронная почта</span>

              <input
                name="email"
                type="email"
                placeholder="Электронная почта"
                defaultValue={values.email}
                required
              />

              <button>Изменить</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export { PatchProfile };
