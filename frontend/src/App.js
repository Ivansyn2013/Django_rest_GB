import React from 'react';
import './logo.svg';
import './App.css';
import AuthorList from './components/Author';
import Menu from './components/menu';
import footer from "./components/footer";
import TODOList from "./components/TODO";
import axios from 'axios';
import {HashRouter, Route} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'menu': [],
            'TODO': [],

        }
    }


    // componentDidMount() {
    //     const authors = [
    //         {
    //             'first_name': 'Фёдор',
    //             'last_name': 'Достоевский',
    //             'birthday_year': 1821
    //         },
    //         {
    //             'first_name': 'Александр',
    //             'last_name': 'Грин',
    //             'birthday_year': 1880
    //         },
    //     ]
    //     this.setState(
    //         {
    //             'authors': authors
    //         }
    //     )
    // }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/authors')
            .then(response => {
                const authors = response.data
                const menu = [
                    {'name': 'First'},
                    {'name': 'Second'},
                    {'name': 'Thid'},
                ]


                this.setState(
                    {
                        'authors': authors,
                        'menu': menu
                    }
                )
            }).catch(error => console.log(error))


    render() {
        return (
            <div className="App">
                <HashRouter>
                    <Route exact path='/' component={() => <AuthorList
                        items={this.state.authors}/>}/>
                    <Route exact path='/books' component={() => <BookList
                        items={this.state.books}/>}/>
                </HashRouter>
            </div>
            <div>
                <Menu menu={this.state.menu}/>
            </div>,
            <div>
                <Menu menu={this.state.menu}/>
                <AuthorList authors={this.state.authors}/>
            <footer footer_l={this.state.menu}/>
            </div>
    )
    }
    }

export default App;
