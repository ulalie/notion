import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../components/UserContextProvider'
import { User } from '../../utils/validation'
import { z } from 'zod'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({ email: '', password: '', general: '' })

	const userContext = useContext(UserContext)
	const navigate = useNavigate()

	function handleLogin() {
		setError({ email: '', password: '', general: '' })

		try {
			User.parse({ email, password, date: Date.now() })
		} catch (err) {
			if (err instanceof z.ZodError) {
				const formattedErrors = err.format()
				setError({
					email: formattedErrors.email?._errors[0] || '',
					password: formattedErrors.password?._errors[0] || '',
					general: '',
				})
				return
			}
		}

		const query = new URLSearchParams({ email, password }).toString()

		fetch(`http://localhost:5000/users?${query}`)
			.then(r => r.json())
			.then(users => {
				if (users.length > 0) {
					const user = users[0]
					userContext.onChange(user)
					navigate('/')
				} else {
					setError(prev => ({ ...prev, general: 'User not found' }))
				}
			})
			.catch(err => {
				console.error('Error during login:', err)
				setError(prev => ({ ...prev, general: 'Something went wrong' }))
			})
	}

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='max-w-md w-full p-6 bg-gray-200 rounded-lg shadow-xl'>
				<h1 className='text-2xl font-bold mb-4 text-center'>Log In</h1>
				<input
					type='text'
					placeholder='example@mail.com'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-500'
				/>
				{error.email && <div className='text-black mb-4'>{error.email}</div>}
				<input
					type='password'
					placeholder='YourPassword123!'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='w-full p-2 mb-4 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-500'
				/>
				{error.password && (
					<div className='text-black mb-4'>{error.password}</div>
				)}
				<button
					onClick={handleLogin}
					className='w-full py-2 mb-4 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none'
				>
					Login
				</button>
				{error.general && (
					<div className='text-black mb-4'>{error.general}</div>
				)}
				<div className='text-center'>
					<p className='text-gray-700 mb-4'>
						Don't have an account?{' '}
						<Link
							to='/signup'
							className='text-blue-500 hover:text-blue-700 font-semibold'
						>
							Register here
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
