import React from 'react';

const UserIteam = ({user}) => {
    return (

        <tr>
            <td>
                {user.name}
            </td>
            <td>
                {user.id}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <thead><h1>Users</h1></thead>
            <th>
            Name
            </th>
            <th>
            ID
            </th>

            {users.map((user) => <UserIteam user={user} />)}
        </table>
)
}

export default UserList