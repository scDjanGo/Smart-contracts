import "./index.scss";
import { Routes, Route } from "react-router-dom";
import { ScrollTop } from "./moduls/functions/scrollTop";

import { Layout } from "./moduls/layout/layout";
import { Main } from "./moduls/main/main";
import { SingIn } from "./moduls/componentAcc/singIn";
import { ChooseRole } from "./moduls/componentAcc/chooseRole";
import { SingUpFiz } from "./moduls/componentAcc/singUpFiz";
import { SingUpYur } from "./moduls/componentAcc//singUpYur";
import { Contracts } from "./moduls/contracts/contracts";
import { AboutContract } from "./moduls/contracts/aboutContract/aboutContract";
import { MyProfile } from "./moduls/myProfile/myProfile";
import { Messages } from "./moduls/myProfile/messages";
import { Exit } from "./moduls/header/exit";
import { PatchProfile } from "./moduls/myProfile/patchProfile";
import { ChooseAddContract } from "./moduls/componentAcc/chooseAddContract";
import { AddContract } from "./moduls/componentAcc/addContract";
import { AddDraft } from "./moduls/componentAcc/addDraft";

function App() {
  ScrollTop();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="singIn" element={<SingIn />} />
          <Route path="chooseRole" element={<ChooseRole />} />
          <Route path="singUpFiz" element={<SingUpFiz />} />
          <Route path="singUpYur" element={<SingUpYur />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="contract" element={<AboutContract />}>
            <Route path=":id" element={<AboutContract />} />
          </Route>
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="message" element={<Messages />}>
            <Route path=":id" element={<Messages />}/>
          </Route>
          <Route path="exit" element={<Exit />} />
          <Route path="patchProfile" element={<PatchProfile />} />
          <Route path="chooseAddContract" element={<ChooseAddContract />} />
          <Route path="addContract" element={<AddContract />} />
          <Route path="addDraft" element={<AddDraft />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
