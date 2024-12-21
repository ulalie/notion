import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import UserContextProvider from './components/UserContextProvider'
import RequireAuth from './components/RequireAuth'
import Login from './pages/login'
import About from './pages/about'
import SignUp from './pages/signup'
import Notes from './pages/notes'
import CreateEditNote from './pages/createEditNote'
import Note from './pages/note'
import NotFoundPage from './pages/notFoundPage'
import Layout from './pages/layout'

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				index: true,
				element: <About />,
			},
			{
				path: 'notes',
				element: <Notes />,
			},
			{
				path: 'notes/new',
				element: <CreateEditNote />,
			},
			{
				path: 'notes/:id/edit',
				element: <CreateEditNote />,
			},
			{
				path: 'notes/:id',
				element: <Note />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])

function App() {
	return (
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	)
}


export default App
