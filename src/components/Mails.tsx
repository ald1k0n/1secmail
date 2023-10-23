import { useLazyGetMailsByCredentntialsQuery } from "../redux/services/baseApi";
import { FC, useState, useEffect } from "react";
import { IMail } from "../types";

import { useAppDispatch } from "../hooks";

import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slices/credential.slice";

type ICred = {
  login: string;
  domain: string;
};

const Mails: FC<ICred> = ({ login, domain }) => {
  const [fetchMails, { isLoading }] = useLazyGetMailsByCredentntialsQuery();
  const [mails, setMails] = useState<IMail[] | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCredentials({ login, domain }));
  }, [login, domain, dispatch]);

  const handleClick = async () => {
    await fetchMails({ login, domain })
      .then((res) => setMails(res.data!))
      .catch(console.log)
      .then(() => navigate("/"));
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleClick}>Fetch Mails</button>

      <section>
        <div
          onClick={() => {
            navigator.clipboard.writeText(`${login}@${domain}`);
            alert("Скоипирован адрес!");
          }}
        >
          Mail: {login}@{domain}
        </div>
        {mails?.map((mail) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/${mail.id}`)}
            key={mail.id}
          >
            <p>
              subject: {mail.subject}, from: {mail.from}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Mails;
