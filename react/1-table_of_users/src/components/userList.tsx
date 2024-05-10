import { SortBy, User } from '../types/types';

interface Props {
  deleteUser: (uuid : string) => void
  sortUsersBy: (sortBy : SortBy) => void
  users : User[],
  showColors: boolean,
}

export function UserList (
  { deleteUser, sortUsersBy, users, showColors } : Props
) {
  return(
    <table width="100%">
      <thead>
        <tr>
          <th>Photo</th>
          <th className='header' onClick={() => sortUsersBy(SortBy.NAME)}>Name</th>
          <th className='header' onClick={() => sortUsersBy(SortBy.SURNAME)}>Surname</th>
          <th className='header' onClick={() => sortUsersBy(SortBy.COUNTRY)}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? "#333" : "#555"
            const color = showColors ? backgroundColor : "transparent"

            return (
              <tr key={user.login.uuid} style={{backgroundColor : color}}>
                <td><img src={user.picture.thumbnail} alt="Profile photo" /></td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td><button onClick={() => {deleteUser(user.login.uuid)}}>Delete</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}