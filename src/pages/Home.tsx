import { useState } from "react";
import { useGetAllDomainsQuery } from "../redux/services/baseApi";
import { useSubmitFormMutation } from "../redux/services/submit.service";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import Mails from "../components/Mails";
import Modal from "../components/Modal/Modal";

// {
//     "created_at": "2023-11-09T05:21:18.032Z",
//     "created_by": "a.seylkhanov",
//     "department": "webint",
//     "email": "fiTDnKsDje@1secmail.com",
//     "env": "runover",
//     "id": "654c6c4eeca47f55c5e4ee40",
//     "password": "strongPASS",
//     "proxy": "er1DKn6z:FiZfMgnV@193.107.22.6:45347",
//     "resource": "twitter",
//     "shared": false,
//     "status": 1,
//     "updated_at": "2023-11-09T05:21:18.032Z",
//     "usable_at": "2023-11-09T05:21:18.032Z",
//     "username": "Erik87194943729"
// }

const Home = () => {
  const [login, setLogin] = useState<string | null>(null);
  const [domain, setDomain] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: domains, isLoading: isDomainsLoad } = useGetAllDomainsQuery();
  const [submitToAv] = useSubmitFormMutation();
  const [skypeData, setSkypeData] = useState({
    login: "",
    password: "",
  });
  const [twitterData, setTwitterData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { proxy } = useAppSelector((state) => state.credentialSlice);

  const getRandomLogin = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let counter = 0;
    let result = "";
    while (counter < 10) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      counter += 1;
    }
    setLogin(result);
  };

  const submitTwitter = async () => {
    const data = {
      department: "webint",
      env: "runover",
      resource: "twitter",
      created_by: "a.seylkhanov",
      shared: false,
      status: 1,
      ...twitterData,
      proxy: proxy!,
    };
    await submitToAv(data);
  };

  const submitSkype = async () => {
    const data = {
      resource: "skype",
      shared: false,
      department: "webint",
      env: "runover",
      status: 1,
      created_by: "a.seylkhanov",
      proxy: proxy!,
      login: skypeData.login,
      password: skypeData.password,
      token: "123",
      counter: "1",
    };

    await submitToAv(data);
  };

  if (isDomainsLoad) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <label>Придумайте логин:</label>
        <input
          defaultValue={login as string}
          onChange={(e) => setLogin(e.target.value)}
        />
        <button onClick={getRandomLogin}>Получить рандомный логин</button>
        <button onClick={() => setIsOpenModal(true)}>Получить прокси</button>
        <button onClick={() => setIsOpen(true)}>Загрузить в аватар</button>
        <select
          defaultValue={domain as string}
          onChange={(e) => setDomain(e.target.value)}
        >
          <option selected disabled>
            Выберите домен
          </option>
          {domains?.map((domain, idx) => (
            <option value={domain} key={idx}>
              {domain}
            </option>
          ))}
        </select>
        {proxy && proxy.length > 0 && <span>Прокси: {proxy}</span>}
        <Mails domain={domain!} login={login!} />

        <Outlet />
      </div>
      {isOpenModal && <Modal isProxy setIsOpen={setIsOpenModal} />}
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div>
            <div>Twitter</div>
            <input
              type="text"
              defaultValue={twitterData.username}
              placeholder="username"
              onChange={(e) =>
                setTwitterData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
            <input
              type="email"
              defaultValue={twitterData.email}
              placeholder="email"
              onChange={(e) =>
                setTwitterData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="text"
              defaultValue={twitterData.password}
              placeholder="password"
              onChange={(e) =>
                setTwitterData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <button onClick={submitTwitter}>Submit form</button>
          </div>
          <div>
            <div>Skype</div>
            <input
              type="text"
              defaultValue={skypeData.login}
              placeholder="login"
              onChange={(e) =>
                setSkypeData((prev) => ({ ...prev, login: e.target.value }))
              }
            />
            <input
              type="text"
              defaultValue={skypeData.password}
              placeholder="password"
              onChange={(e) =>
                setSkypeData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button onClick={submitSkype}>Submit form</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Home;
