import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { UserContext } from '../../components/UserContextProvider'
import { NoteScheme } from '../../utils/validation'

export default function CreateEditNote() {
	const navigate = useNavigate()
	const { id } = useParams()
	const { user } = useContext(UserContext)
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [errors, setErrors] = useState([])
	const [note, setNote] = useState(null)
	const [existingNotes, setExistingNotes] = useState([]) // Store existing notes
	const mode = id ? 'edit' : 'create' 

	useEffect(() => {

		fetch('http://localhost:5000/notes')
			.then(res => res.json())
			.then(data => {
				const userNotes = data.filter(note => note.authorId === user.id)
				setExistingNotes(userNotes)
			})
			.catch(err => console.error('Error fetching notes', err))

		if (mode === 'edit' && id) {
			fetch(`http://localhost:5000/notes/${id}`)
				.then(res => res.json())
				.then(data => {
					if (data && data.authorId === user.id) {
						setNote(data)
						setTitle(data.title)
						setBody(data.body)
					} else {
						navigate('/404')
					}
				})
				.catch(() => navigate('/404'))
		}
	}, [id, mode, user.id, navigate])

	const handleSave = async () => {
		try {
			NoteScheme.parse({ title, body })

			const duplicateNote = existingNotes.find(
				note => note.title === title && note.body === body && note.id !== id // Exclude the note being edited
			)

			if (duplicateNote) {
				setErrors(['A note with the same title and body already exists.'])
				return
			}

			const noteData = {
				title,
				body,
				createdAt: Date.now(),
				authorId: user.id,
			}

			const response = await fetch(
				mode === 'edit'
					? `http://localhost:5000/notes/${id}`
					: `http://localhost:5000/notes`,
				{
					method: mode === 'edit' ? 'PUT' : 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(noteData),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to save note')
			}

			navigate('/notes') 
		} catch (err) {
			if (err instanceof z.ZodError) {
				setErrors(err.errors.map(error => error.message))
			} else {
				setErrors([err.message])
			}
		}
	}

	return (
		<div className='p-4 max-w-lg mx-auto bg-white shadow-md rounded-md'>
			<h1 className='text-2xl font-bold mb-4 text-gray-800'>
				{mode === 'edit' ? 'Edit Note' : 'Create New Note'}
			</h1>
			<div className='mb-4'>
				<input
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder='Note Title'
					className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400'
					required
				/>
			</div>
			<div className='mb-4'>
				<textarea
					value={body}
					onChange={e => setBody(e.target.value)}
					placeholder='Note Body'
					className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400'
					rows='6'
					required
				/>
			</div>
			{errors.length > 0 && (
				<div className='text-black-500'>
					{errors.map((error, index) => (
						<p key={index}>{error}</p>
					))}
				</div>
			)}
			<div className='flex justify-between mt-4'>
				<Link
					to='/notes'
					className='py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 transition'
				>
					Back
				</Link>
				<button
					onClick={handleSave}
					className='py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition'
				>
					{mode === 'edit' ? 'Save Changes' : 'Create Note'}
				</button>
			</div>
		</div>
	)
}
