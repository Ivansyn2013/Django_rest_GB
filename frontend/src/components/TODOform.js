import React from "react";

class TODOform extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        console.log(this.props.projects)
        this.state = {
            todo_text:"",
            project_name: props.projects[0] ? props.projects.id : undefined,
        }
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    handleSubmit(event){
        this.props.createTODO(
            this.state.todo_text,
            this.state.project_name,
            this.props.projects.filter((item)=> item.project_name == this.state.project_name)[0]
        )
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="todo_text"> Text</label>
                        <input type="text" className="form-control" name="todo_text" value={this.state.todo_text}
                        onChange={(event)=> this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project_name"> Project name</label>

                    <select name="author" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                            {this.props.projects.map((item)=> <option value={item.id}>{item.name}</option>)}
                    </select>
                    {/*<input type="text" className="form-control" name="project_name" value={this.state.project_name}*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TODOform