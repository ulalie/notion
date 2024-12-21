import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../components/UserContextProvider'

export default function Notes() {
	const { user } = useContext(UserContext)
	const [notes, setNotes] = useState([])
	const [refreshNotes, setRefreshNotes] = useState(false)

	useEffect(() => {
		fetch('http://localhost:5000/notes')
			.then(res => res.json())
			.then(data => {
				const userNotes = data.filter(note => note.authorId === user.id)
				setNotes(userNotes.reverse())
			})
			.catch(err => console.error('Error loading notes', err))
	}, [user.id, refreshNotes])

	const deleteNote = noteId => {
		fetch(`http://localhost:5000/notes/${noteId}`, { method: 'DELETE' })
			.then(() => {
				setRefreshNotes(prev => !prev)
			})
			.catch(err => console.error('Error deleting note', err))
	}

	return (
		<>
			<h1 className='text-2xl font-bold text-center mb-6'>Your Notes</h1>
			<Link
				to='/notes/new'
				className='inline-block mb-4 px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none transition'
			>
				Add new notes
			</Link>
			<div className='max-w-2xl mx-auto'>
				{notes.length === 0 ? (
					<p className='text-center text-gray-500'>No notes found.</p>
				) : (
					notes.map(note => (
						<div
							key={note.id}
							className='bg-gray-100 shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-200 transition'
							onClick={() => (window.location.href = `/notes/${note.id}`)}
						>
							<div className='flex justify-between items-start'>
								<div>
									<h2 className='text-xl font-semibold'>{note.title}</h2>
									<p className='text-gray-600 text-sm'>
										{new Date(note.createdAt).toLocaleString()}
									</p>
								</div>
								<div className='mt-2 flex space-x-2'>
									<Link
										to={`/notes/${note.id}/edit`}
										className='flex items-center p-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition'
										onClick={e => e.stopPropagation()} // Prevents opening the note
									>
										✍️
									</Link>
									<button
										onClick={e => {
											e.stopPropagation()
											deleteNote(note.id)
										}}
										className='flex items-center p-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition'
									>
										🗑
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</>
	)
}
