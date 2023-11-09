import React, { ReactNode, FC, useState } from "react";
import style from "./Modal.module.css";
import { useAppDispatch } from "../../hooks";
import { useLazyGetProxiesQuery } from "../../redux/services/argus.service";
import { setProxy } from "../../redux/slices/credential.slice";

type Props = {
  children?: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProxy?: boolean;
};

const countries = ["GE", "US", "RU", "KZ"];

const Modal: FC<Props> = ({ children, setIsOpen, isProxy }) => {
  const [proxies, setProxies] = useState<string[]>([]);
  const [fetchProxies, { isLoading }] = useLazyGetProxiesQuery();
  const dispatch = useAppDispatch();

  const handleChangeCountry = async (country: string) => {
    await fetchProxies(country!)
      .then((res) => setProxies(res.data!))
      .catch(console.log);
  };
  return (
    <div className={style.container}>
      <div className={style.modal_container}>
        <div className={style.model_title}>
          <div></div>
          Proxy:
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </div>
        </div>
        <div className={style.model_content}>
          {isProxy ? (
            <div>
              <select
                onChange={(e) => handleChangeCountry(e.target.value)}
                defaultValue={""}
              >
                <option value="" selected disabled>
                  Выберите страну
                </option>
                {countries.map((count) => (
                  <option value={count}>{count}</option>
                ))}
              </select>
              {isLoading ? (
                "Loading..."
              ) : (
                <div>
                  {proxies?.map((proxy, idx) => (
                    <div
                      className={style.proxy}
                      key={idx}
                      onClick={() => {
                        navigator.clipboard.writeText(proxy);
                        dispatch(setProxy(proxy));
                        alert("Прокси скопирован в буфер обмена");
                      }}
                    >
                      {proxy}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
