import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, User } from './types/types';
import { UserList } from './components/userList';

function App() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ showColors, setShowColors ] = useState<boolean>(false);
  const [ sortBy, setSortBy ] = useState<SortBy>(SortBy.NONE);
  const [ filterCountry, setFilterCountry ] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  
  const toggleSortByCountry = () => {
    const newSortBy = sortBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSortBy(newSortBy)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => {
      return user.login.uuid !== uuid
    })
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleSortBy = (newSortBy : SortBy) => {
    setSortBy(newSortBy)
  }

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
    }, [users, filterCountry])

  const sortedUsers = useMemo(() => {   
    if (sortBy === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user : User) => any> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.SURNAME]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country
    }

    return filteredUsers.toSorted((a, b) => {
      const compareProperty = compareProperties[sortBy]
      return compareProperty(a).localeCompare(compareProperty(b))
    })
  }, [filteredUsers, sortBy])

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h1>Table Of Users</h1>
      <header>
        <button onClick={toggleColors}>Color rows</button>
        <button onClick={toggleSortByCountry}>{sortBy === SortBy.NONE ? "Order By Country" : "Default Order"}</button>
        <button onClick={handleReset}>Restore Users</button>
        <input type="text" placeholder='Filter By Country' onChange={(e) => {
          setFilterCountry(e.target.value)
        }}/>
      </header>
      <main>
        <UserList deleteUser={handleDelete} sortUsersBy={handleSortBy} users={sortedUsers} showColors={showColors}/>
      </main>
    </div>
  )
}

export default App
