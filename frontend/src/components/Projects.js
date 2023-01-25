import React from 'react';

const ProjectIteam = ({project}) => {
    return (

        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <thead><h1>Projects</h1></thead>
            <th>
            Project name
            </th>
            <th>
            Link
            </th>
            <th>
            Users
            </th>
            {projects.map((project) => <ProjectIteam project={project} />)}
        </table>
)
}

export default ProjectList