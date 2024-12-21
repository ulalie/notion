import React, { useContext } from 'react'
import { UserContext } from '../../components/UserContextProvider'
import { Link } from 'react-router-dom'

export default function About() {
	const { user } = useContext(UserContext)

	const formattedDate = new Date(user.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='max-w-md w-full p-4 bg-gray-200 rounded-lg shadow-lg'>
				<h1 className='text-2xl font-bold mb-2'>About Me</h1>
				<h3 className='text-lg mb-1'>
					Email: <span className='font-semibold'>{user.email}</span>
				</h3>
				<h3 className='text-lg mb-2'>
					Sign up: <span className='font-semibold'>{formattedDate}</span>
				</h3>
				<Link to='/notes' className='text-blue-500 hover:underline text-md'>
					Go to notes
				</Link>
			</div>
		</div>
	)
}
