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
import {HashRouter, Route, Routes} from "react-router-dom";

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
                const menu = [
                    {'name': 'First'},
                    {'name': 'Second'},
                    {'name': 'Thid'},
                ]
            })


        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todo = response.data

            })

       axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
            })

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
            })


                    this.setState(
                    {
                        'todo': todo,
                        'users': users,
                        'authors': authors,
                        'menu': menu,

                    }
                )}).catch(error => console.log(error))
    render() {
        return (
            <div className="App">
                <Menu menu={this.state.menu}/>
                <HashRouter>
                    <Routes>
                        <Route exact path='/' component={() => <AuthorList
                            items={this.state.authors}/>}/>
                        <Route exact path='/todo' component={() => <TODOList
                            items={this.state.todo}/>}/>
                        <Route exact path='/users' component={() => <UserList
                            items={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList
                            items={this.state.projects}/>}/>


                    </Routes>
                    <footer footer_l={this.state.menu}/>
                </HashRouter>
            </div>
        )
    }
}

export default App;
