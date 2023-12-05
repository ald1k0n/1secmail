import { useState } from 'react';
import { useGetAllDomainsQuery } from '../redux/services/baseApi';
import { useSubmitFormMutation } from '../redux/services/submit.service';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import Mails from '../components/Mails';
import Modal from '../components/Modal/Modal';

const Home = () => {
	const [login, setLogin] = useState<string | null>(null);
	const [domain, setDomain] = useState<string | null>(null);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { data: domains, isLoading: isDomainsLoad } = useGetAllDomainsQuery();
	const [submitSkypeData] = useSubmitFormMutation();
	const [skypeData, setSkypeData] = useState({
		login: '',
		password: '',
	});

	const generateRandomString = () => {
		const randomNumbs = Math.random() * Date.now();
		return setLogin(randomNumbs.toString(32));
	};

	const { proxy } = useAppSelector((state) => state.credentialSlice);

	const submitSkype = async () => {
		const data = {
			resource: 'skype',
			shared: false,
			department: 'webint',
			env: 'runover',
			status: 1,
			created_by: 'a.seylkhanov',
			proxy: proxy!,
			login: skypeData.login,
			password: skypeData.password,
			token: '123',
			counter: '1',
		};

		await submitSkypeData(data);
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
				<button onClick={() => setIsOpenModal(true)}>Получить прокси</button>
				<button onClick={() => setIsOpen(true)}>Загрузить skype</button>
				<button onClick={generateRandomString}>Рандомная почта</button>
				<select
					defaultValue={domain as string}
					onChange={(e) => setDomain(e.target.value)}>
					<option
						selected
						disabled>
						Выберите домен
					</option>
					{domains?.map((domain, idx) => (
						<option
							value={domain}
							key={idx}>
							{domain}
						</option>
					))}
				</select>
				{proxy && proxy.length > 0 && <span>Прокси: {proxy}</span>}
				<Mails
					domain={domain!}
					login={login!}
				/>

				<Outlet />
			</div>
			{isOpenModal && (
				<Modal
					isProxy
					setIsOpen={setIsOpenModal}
				/>
			)}
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div>
						<div>Skype</div>
						<input
							type='text'
							defaultValue={skypeData.login}
							onChange={(e) =>
								setSkypeData((prev) => ({ ...prev, login: e.target.value }))
							}
						/>
						<input
							type='text'
							defaultValue={skypeData.password}
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
