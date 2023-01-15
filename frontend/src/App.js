import React from 'react';
import './logo.svg';
import './App.css';
import AuthorList from './components/Author';
import Menu from './components/menu';
import footer from "./components/footer";
import TODOList from "./components/TODO";
import axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'menu':[],
            'TODO':[],

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
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))

        const menu = [
            {'name':'First'},
            {'name':'Second'},
            {'name': 'Thid'},
        ]

        this.setState(
            {
                    'menu':menu,
            })
    }

        axios.get('http://127.0.0.1:8000/api/TODO')
            .then(response => {
                const TODO = response.data
                this.setState(
                    {
                        'TODO': TODO
                    }
                )
            }).catch(error => console.log(error))




    render() {
        return (
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
