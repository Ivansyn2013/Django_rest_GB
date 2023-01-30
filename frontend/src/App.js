import React from 'react';
import './logo.svg';
import './App.css';
import AuthorList from './components/Author';
import Menu from './components/menu';
import footer from "./components/footer";
import TODOList from "./components/TODO";
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import LoginForm from "./components/Auth";
import axios from 'axios';
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
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
        this.setState({'token': token}, ()=>this.load_data())
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
        this.setState({'token': token}, ()=>this.load_data())
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api/api-token-auth', {
            username: username,
            password: password,
        }).then(response => {
            console.log(response.data)
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логшин или пароль'))
    }

    get_headers() {
        let headers = {
        'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
        headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
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


        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                    const users = response.data['results']
                    this.setState({
                            'users': users,
                        }
                    )
                }
            ).catch(error => console.log(error))


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
        this.get_token_from_storage()
        this.load_data()

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
                                <Link to='/login'>Login</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/' element={<AuthorList authors={this.state.authors}/>}></Route>
                        <Route path='todo' element={<TODOList todo={this.state.todo}/>}></Route>
                        <Route path='users' element={<UserList
                            users={this.state.users}/>}></Route>
                        <Route path='projects' element={<ProjectList projects={this.state.projects}/>}>
                        </Route>
                        <Route path='login' element={<LoginForm
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
