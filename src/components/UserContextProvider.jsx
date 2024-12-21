import { createContext } from 'react'
import { useState, useEffect } from 'react'

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

	useEffect(() => {
		const id = localStorage.getItem('userId')
		if (id) {
			fetch(`http://localhost:5000/users?id=${id}`)
				.then(r => {
					if (!r.ok) throw new Error('Failed to fetch user')
					return r.json()
				})
				.then(users => users[0])
				.then(user => setUser(user))
				.catch(() => setUser(null))
				.finally(() => setLoading(false))
		} else {
			setUser(null) 
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (user?.id) {
			localStorage.setItem('userId', user.id)
		}
	}, [user?.id])
	return (
		<UserContext.Provider value={{ user, onChange: setUser, loading }}>
			{children}
		</UserContext.Provider>
	)
}
