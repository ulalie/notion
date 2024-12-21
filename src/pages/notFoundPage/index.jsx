import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
			<h4 className='text-xl font-semibold text-gray-700 mb-2'>
				Page Not Found
			</h4>
			<h4 className='text-md text-gray-600 mb-6'>
				Sorry, the page you're looking for doesn't exist.
			</h4>
			<Link
				to='/'
				className='px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition'
			>
				Back to Users
			</Link>
		</div>
	)
}
