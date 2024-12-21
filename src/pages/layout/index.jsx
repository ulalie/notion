import React, { useContext } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../components/UserContextProvider'

export default function Layout() {
	const { user, onChange} = useContext(UserContext)
	const navigate = useNavigate()

const handleLogout = () => {
	if (localStorage.getItem('userId')) {
		localStorage.removeItem('userId')
	}
	onChange(null)
	navigate('/login') 
}

	return (
		<div className='flex flex-col h-screen'>
			<header className='text-black py-4'>
				<div className='container mx-auto px-4 flex justify-between items-center'>
					<div className='text-lg font-semibold'>
						Hello, {user?.email || 'Guest'}
					</div>

					<div className='flex items-center space-x-4'>
						<nav className='space-x-4'>
							<Link
								to='/'
								className='font-semibold hover:text-gray-600 transition'
							>
								About
							</Link>
							<Link
								to='/notes'
								className='font-semibold hover:text-gray-600 transition'
							>
								Notes
							</Link>
						</nav>

						<button
							onClick={handleLogout}
							className='py-2 px-6 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none transition'
						>
							Log Out
						</button>
					</div>
				</div>
			</header>

			<main className='flex-grow container mx-auto px-4 py-6'>
				<Outlet />
			</main>

			<footer className='text-black py-4'>
				<div className='container mx-auto px-4 text-left'>
					<p>
						© 2024 May your day be filled with joy, laughter, and endless
						possibilities!
					</p>
				</div>
			</footer>
		</div>
	)
}
