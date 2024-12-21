import React, { useContext, useState } from 'react'
import { z } from 'zod'
import { UserSingUp } from '../../utils/validation'
import { UserContext } from '../../components/UserContextProvider'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPass, setRepeatPass] = useState('')
	const [errors, setErrors] = useState([])
	const [successMess, setSuccessMess] = useState('')

	const userContext = useContext(UserContext)
	const navigate = useNavigate()

	const handleSignUp = async () => {
		try {
			UserSingUp.parse({ email, password, repeatPass })

			const userData = {
				id: Math.random().toString(36).substring(2),
				email,
				password,
				date: Date.now(),
			}

			const response = await fetch('http://localhost:5000/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})

			if (!response.ok) {
				throw new Error('Error during registration')
			}

			userContext.onChange(userData)
			setSuccessMess('Registration was successful!')
			setErrors([])
			navigate('/')
		} catch (err) {
			if (err instanceof z.ZodError) {
				setErrors(err.errors.map(error => error.message))
			} else {
				setErrors([err.message])
			}
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen overflow-hidden'>
			<div className='max-w-md w-full p-6 bg-gray-200 rounded-lg shadow-xl'>
				<h1 className='text-2xl font-bold mb-4 text-center'>Sign Up</h1>
				<input
					type='text'
					placeholder='example@mail.com'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					className='w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-500'
				/>
				<input
					type='password'
					placeholder='YourPassword123!'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					className='w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-500'
				/>
				<input
					type='password'
					placeholder='Repeat your password'
					value={repeatPass}
					onChange={e => setRepeatPass(e.target.value)}
					required
					className='w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-500'
				/>
				<button
					onClick={handleSignUp}
					className='w-full py-2 mb-4 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none'
				>
					Sign Up
				</button>
				{errors.length > 0 && (
					<div className='text-black mb-4'>
						{errors.map((error, index) => (
							<p key={index}>{error}</p>
						))}
					</div>
				)}
				{successMess && (
					<div className='text-green-600 mb-4'>
						<p>{successMess}</p>
					</div>
				)}
			</div>
		</div>
	)
}
