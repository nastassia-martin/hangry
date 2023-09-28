import React, { useRef } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginCredentials } from "../types/user.types"

interface IFormProps {
	onLogin: SubmitHandler<LoginCredentials>
	loading: boolean
}

const LoginForm: React.FC<IFormProps> = ({ onLogin: onSignup, loading }) => {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<LoginCredentials>()
	const passwordRef = useRef("")
	passwordRef.current = watch("password")

	return (
		<Form onSubmit={handleSubmit(onSignup)}>
			<Form.Group controlId="email" className="mb-3">
				<Form.Label>Email</Form.Label>
				<Form.Control
					placeholder="Your email here"
					type="email"
					{...register("email", {
						required: "You have to enter a registered email",
					})}
				/>
				{errors.email && (
					<p>{errors.email.message ?? "This is an invalid value"}</p>
				)}
			</Form.Group>

			<Form.Group controlId="password" className="mb-3">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					autoComplete="new-password"
					{...register("password", {
						required: "You need to enter your password",
						minLength: {
							value: 6,
							message: "Your password is at least 6 characters",
						},
					})}
				/>
				{errors.password && (
					<p className="invalid">
						{errors.password.message ?? "Invalid value"}
					</p>
				)}
				<Form.Text>Enter your password</Form.Text>
			</Form.Group>

			<Button variant="secondary" type="submit" disabled={loading}>
				{loading ? "Logging In" : "Login"}
			</Button>
		</Form>
	)
}

export default LoginForm
