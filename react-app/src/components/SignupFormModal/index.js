import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="whole-sign-in-container">
			<h3>Create your account</h3>
			<h4>Registration is easy.</h4>
			<form onSubmit={handleSubmit}>
				<ul className="errors-map">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="label-tag-container" >
					<label>
						Email
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							maxLength="50"
							required
						/>
					</label>
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							maxLength="20"
							required
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							maxLength="20"
							required
						/>
					</label>
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							maxLength="20"
							required
						/>
					</label>
				</div>
					<button className="log-in-demo-button" type="submit">Register</button>
					<div className="agreement-div">By clicking Register, you agree to Plantsy's <span className="underline-span">Terms of Use</span> and <span className="underline-span">Privacy Policy</span>. Plantsy may send you communications; you may change your preferences in your account settings. We'll never post without your permission.</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
