import React from 'react';
import {Link} from "react-router-dom";

const TODOIteam = ({TODO, deleteTODO}) => {
    return (

        <tr>
            <td>
                {TODO.project.name}
            </td>
            <td>
                {TODO.todo_text}
            </td>
            <td>
                {TODO.create_data}
            </td>
            <td>
                <button onClick={()=>deleteTODO(TODO.id)}
                        type='button'>Delete</button>
            </td>


        </tr>
    )
}

const TODOList = ({todo, deleteTODO}) => {
    return (
        <div>
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
                <th></th>
                {todo.map((TODO) => <TODOIteam TODO={TODO} deleteTODO={deleteTODO}/>)}
            </table>
            <Link to={'/todo/create'}>Create TODO</Link>
        </div>

)
}

export default TODOList