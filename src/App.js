import React, { useState, useEffect } from 'react';

function App() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [hasLowercaseLetter, setHasLowercaseLetter] = useState(false);
	const [hasUppercaseLetter, setHasUppercaseLetter] = useState(false);
	const [hasDigit, setHasDigit] = useState(false);
	const [hasSixCharacters, setHasSixCharacters] = useState(false);
	const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);

	const resetToDefaultValues = () => {
		setUsername('');
		setPassword('');
		setHasLowercaseLetter(false);
		setHasUppercaseLetter(false);
		setHasDigit(false);
		setHasSixCharacters(false);
		setRegisterButtonDisabled(true);
	};

	const handleUsername = (event) => {
		setUsername(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		alert(`Username: ${username}, Password: ${password}`);
		resetToDefaultValues();
	};

	useEffect(() => {
		/[a-z]/.test(password) !== hasLowercaseLetter &&
			setHasLowercaseLetter(!hasLowercaseLetter);
		/[A-Z]/.test(password) !== hasUppercaseLetter &&
			setHasUppercaseLetter(!hasUppercaseLetter);
		/\d/.test(password) !== hasDigit && setHasDigit(!hasDigit);
		/.{6,}/.test(password) !== hasSixCharacters &&
			setHasSixCharacters(!hasSixCharacters);
		(username &&
			hasLowercaseLetter &&
			hasUppercaseLetter &&
			hasDigit &&
			hasSixCharacters) === registerButtonDisabled &&
			setRegisterButtonDisabled(!registerButtonDisabled);
	}, [
		password,
		hasLowercaseLetter,
		hasUppercaseLetter,
		hasDigit,
		hasSixCharacters,
		registerButtonDisabled,
		username,
	]);

	return (
		<div className="App flex h-screen justify-center items-center bg-gray-100">
			<div className="rounded md:w-2/3 max-w-md p-10 bg-gray-100 shadow-2xl">
				<form onSubmit={handleSubmit}>
					<label className="flex flex-col font-semibold mb-2">
						Username:
						<input
							className="font-light text-sm md:text-base"
							type="text"
							placeholder=" Enter username"
							name="username"
							value={username}
							onChange={handleUsername}
						/>
					</label>
					<label className="flex flex-col font-semibold my-2">
						Password:
						<input
							className="font-light text-sm md:text-base"
							type="text"
							placeholder=" Enter password"
							name="password"
							value={password}
							onChange={handlePassword}
						/>
					</label>
					<div className="flex flex-col text-xs md:text-sm">
						<span className="my-2">Your password must contain:</span>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={hasLowercaseLetter}
							/>
							<span>one lowercase letter,</span>
						</div>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={hasUppercaseLetter}
							/>
							<span>one uppercase letter,</span>
						</div>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={hasDigit}
							/>
							<span>one digit and</span>
						</div>
						<div className="flex items-center">
							<input
								className="-ml-5 mr-2 mt-1"
								type="checkbox"
								readOnly={true}
								checked={hasSixCharacters}
							/>
							<span>must have at least six characters.</span>
						</div>
						<button
							disabled={registerButtonDisabled}
							className={`${
								registerButtonDisabled && 'cursor-not-allowed'
							} mt-2 bg-blue-300 rounded w-20 p-1.5 font-bold`}
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
