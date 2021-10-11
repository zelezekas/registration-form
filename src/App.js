import React, { useState, useEffect } from 'react';

function App() {
	const initialFormValues = {
		username: '',
		password: '',
		hasLowercaseLetter: false,
		hasUppercaseLetter: false,
		hasDigit: false,
		hasSixCharacters: false,
		isRegisterButtonEnabled: false,
	};

	const [stateValuesObject, setStateValuesObject] = useState({
		...initialFormValues,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setStateValuesObject((previousState) => ({
			...previousState,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		alert(
			`Username: ${stateValuesObject.username}, Password: ${stateValuesObject.password}`,
		);
		setStateValuesObject({ ...initialFormValues });
	};

	useEffect(() => {
		const regexForLowerCase = new RegExp(/[a-z]/);
		const regexForUpperCase = new RegExp(/[A-Z]/);
		const regexForDigit = new RegExp(/\d/);
		const regexForSixCharacters = new RegExp(/.{6,}/);
		if (
			regexForLowerCase.test(stateValuesObject.password) !==
			stateValuesObject.hasLowercaseLetter
		) {
			setStateValuesObject((previousState) => ({
				...previousState,
				hasLowercaseLetter: !stateValuesObject.hasLowercaseLetter,
			}));
		}
		if (
			regexForUpperCase.test(stateValuesObject.password) !==
			stateValuesObject.hasUppercaseLetter
		) {
			setStateValuesObject((previousState) => ({
				...previousState,
				hasUppercaseLetter: !stateValuesObject.hasUppercaseLetter,
			}));
		}
		if (
			regexForDigit.test(stateValuesObject.password) !==
			stateValuesObject.hasDigit
		) {
			setStateValuesObject((previousState) => ({
				...previousState,
				hasDigit: !stateValuesObject.hasDigit,
			}));
		}
		if (
			regexForSixCharacters.test(stateValuesObject.password) !==
			stateValuesObject.hasSixCharacters
		) {
			setStateValuesObject((previousState) => ({
				...previousState,
				hasSixCharacters: !stateValuesObject.hasSixCharacters,
			}));
		}
		console.log(stateValuesObject);
	}, [stateValuesObject]);

	/* Ovaj UseEffect se izvrsava najcesce dva puta -
	Kad se promjenom passworda ispuni uslov i za promjenu neke boolean vrijednosti iz state-a.
	Osim toga, izvrsav se i kad se mijenja username. */

	return (
		<div className="App flex h-screen justify-center items-center bg-gray-100">
			<div className="rounded md:w-2/3 max-w-md p-10 bg-gray-100 shadow-2xl">
				<form onSubmit={handleSubmit}>
					<label className="flex flex-col font-semibold mb-2">
						Username:
						<input
							className="font-light"
							type="text"
							placeholder=" Enter username"
							name="username"
							value={stateValuesObject.username}
							onChange={handleChange}
						/>
					</label>
					<label className="flex flex-col font-semibold my-2">
						Password:
						<input
							className="font-light"
							type="text"
							placeholder=" Enter password"
							name="password"
							value={stateValuesObject.password}
							onChange={handleChange}
						/>
					</label>
					<div className="flex flex-col text-xs md:text-sm">
						<span className="my-2">Your password must contain:</span>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={stateValuesObject.hasLowercaseLetter}
							/>
							<span>one lowercase letter,</span>
						</div>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={stateValuesObject.hasUppercaseLetter}
							/>
							<span>one uppercase letter,</span>
						</div>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={stateValuesObject.hasDigit}
							/>
							<span>one digit and</span>
						</div>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={stateValuesObject.hasSixCharacters}
							/>
							<span>must have at least six characters.</span>
						</div>
						<button
							className="mt-2 bg-blue-300 rounded w-20 p-1.5 font-bold"
							type="submit"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;
