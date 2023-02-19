import React from 'react';
import './logo.svg';
import './App.css';
import AuthorList from './components/Author';
import Menu from './components/menu';
import TODOform from "./components/TODOform";
import footer from "./components/footer";
import TODOList from "./components/TODO";
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import LoginForm from "./components/Auth";
import axios from 'axios';
import {BrowserRouter, Link, Route, RedirectFunction, Routes} from "react-router-dom";
import Cookies from 'universal-cookie';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.setState = this.setState.bind(this);
        this.state = {
            'authors': [],
            'menu': [],
            'todo': [],
            'users': [],
            'projects': [],

        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password,
        }).then(response => {
            console.log(response.data)
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    createTODO(todo_text, project_name, project) {
        const headers = this.get_headers()
        const data = {
            todo_text: todo_text,
            project_name: project_name,
            project: project,

        }

        axios.post('http://127.0.0.1:8000/api/todo/', data,{headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((iteam) => iteam.id === new_todo.project.id)[0]
                new_todo.project_name = project
                this.setState({
                    todo: [...this.state.todo, new_todo]
                })
            }).catch(error => console.log(error))
    }


    deleteTODO(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({
                    todo: this.state.todo.filter((TODO) => TODO.id !==
                        id)
                })
            }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/authors', {headers})
            .then(response => {
                    const authors = response.data.results
                    this.setState({
                            'authors': authors
                        }
                    )
                }
            ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                    const todo = response.data.results
                    this.setState({
                            'todo': todo,
                        }
                    )

                }
            ).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                    const users = response.data['results']
                    this.setState({
                            'users': users,
                        }
                    )
                }
            ).catch(error => console.log(error))
        this.setState({users: []})


        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                    const projects = response.data['results']


                    this.setState({
                            'projects': projects,
                        }
                    )
                }
            ).catch(error => console.log(error))


        console.log('Это this' + this);
    }


    componentDidMount() {
        this.get_token_from_storage() //здесь прокидывается loaddata
        // this.load_data()

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
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button>
                                    : <Link to='/login'>Login</Link>}

                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/' element={<AuthorList authors={this.state.authors}/>}></Route>
                        <Route path='todo/create' element={<TODOform projects={this.state.projects} todo={this.state.todo} createTODO=
                            {(todo_text, project_name, project) => this.createTODO(todo_text, project_name, project)}/>}></Route>
                        <Route path='todo' element={<TODOList todo={this.state.todo}
                                                              deleteTODO={(id) => this.deleteTODO(id)
                                                              }/>}></Route>
                        <Route path='users' element={<UserList
                            users={this.state.users}/>}></Route>
                        <Route path='projects' element={<ProjectList projects={this.state.projects}/>}>
                        </Route>
                        <Route path='login' element={
                            this.is_authenticated()
                                ? <Link to='/'></Link>

                                : <LoginForm
                                    get_token={(username, password) => this.get_token(username, password)}/>}>
                        </Route>

                    </Routes>


                    <footer footer_l={this.state.menu}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
