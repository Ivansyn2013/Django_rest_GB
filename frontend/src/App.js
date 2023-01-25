import React from 'react';
import './logo.svg';
import './App.css';
import AuthorList from './components/Author';
import Menu from './components/menu';
import footer from "./components/footer";
import TODOList from "./components/TODO";
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import axios from 'axios';
import {BrowserRouter, HashRouter, Link, Route, Router, Routes} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'menu': [],
            'todo': [],
            'users': [],
            'projects': [],

        }
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/authors')
            .then(response => {
                    const authors = response.data
                    this.setState({
                            'authors': authors
                        }
                    )
                }
            ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                    const todo = response.data
                    this.setState({
                            'todo': todo
                        }
                    )
                }
            ).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                    const users = response.data
                    this.setState({
                            'users': users
                        }
                    )
                }
            ).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                    const projects = response.data


                    this.setState({
                            'projects': projects,
                                                    }
                    )
                }
            ).catch(error => console.log(error))


    }


    render() {

        return (

            <div className="App">
                <Menu menu={this.state.menu}/>
                <BrowserRouter>

                    <nav>
                        <ul>
                            <li>
                                <Link to='/todo'>Todo</Link>
                            </li>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/'  component={() => <AuthorList authors={this.state.authors}/>} exact ></Route>
                        <Route exact path='todo'  component={() => <TODOList todo = {this.state.todo}/>}></Route>
                        <Route exact path='users'  component={() => <UserList
                            users={this.state.users}/>}></Route>
                        <Route  exact path='projects'  component={() => <ProjectList
                            projects={this.state.projects}/>}> </Route>
                    </Routes>


                    <footer footer_l={this.state.menu}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
