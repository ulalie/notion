import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function Note() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [note, setNote] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch(`http://localhost:5000/notes/${id}`)
			.then(res => {
				if (!res.ok) {
					throw new Error('Note not found')
				}
				return res.json()
			})
			.then(data => setNote(data))
			.catch(err => setError(err.message))
	}, [id])

	const deleteNote = () => {
		fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' })
			.then(() => {
				navigate('/notes')
			})
			.catch(err => setError(err.message))
	}

	if (error) {
		return (
			<div className='p-4 max-w-lg mx-auto bg-white shadow-md rounded-md'>
				<h1 className='text-2xl font-bold text-red-500'>Error</h1>
				<p className='mb-6'>{error}</p>
				<Link
					to='/notes'
					className='mt-8 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300'
				>
					Return to Notes List
				</Link>
			</div>
		)
	}

	if (!note) {
		return (
			<div className='p-4 max-w-lg mx-auto bg-white shadow-md rounded-md'>
				<h1 className='text-2xl font-bold'>Loading note...</h1>
			</div>
		)
	}

	return (
		<div className='p-4 max-w-lg mx-auto bg-white shadow-md rounded-md'>
			<h1 className='text-2xl font-bold mb-4 text-gray-800'>{note.title}</h1>
			<pre className='text-gray-700 mb-4 whitespace-pre-wrap border border-gray-300 rounded-md p-2'>
				{note.body}
			</pre>
			<p className='text-sm text-gray-500'>
				Created: {new Date(note.createdAt).toLocaleString()}
			</p>
			<div className='flex justify-between mt-4'>
				<Link
					to='/notes'
					className='py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 transition'
				>
					Return to Notes List
				</Link>
				<div className='flex space-x-2'>
					<Link to={`/notes/${note.id}/edit`} className='py-2 px-4 '>
						✍️
					</Link>
					<button onClick={deleteNote} className='py-2 px-4 '>
						🗑
					</button>
				</div>
			</div>
		</div>
	)
}
