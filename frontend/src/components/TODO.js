import React from 'react';

const TODOIteam = ({TODO}) => {
    return (

        <tr>
            <td>
                {TODO.project1.project_name}
            </td>
            <td>
                {TODO.todo_text}
            </td>
            <td>
                {TODO.create_data}
            </td>
        </tr>
    )
}

const TODOList = ({todo}) => {
    return (
        <table>
            <thead><h1>TODO project</h1></thead>
            <th>
            Project name
            </th>
            <th>
            Text
            </th>
            <th>
            Create date
            </th>
            {todo.map((TODO) => <TODOIteam TODO={TODO} />)}
        </table>
)
}

export default TODOList