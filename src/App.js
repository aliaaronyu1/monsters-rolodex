import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState(''); //[value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([monsters]);
  console.log('render')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => setMonsters(users))

  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])


  const onSearchChange = (event) => {
    const searchFieldString = (event.target.value.toLowerCase());
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange} placeholder="search monsters" className="monsters-search-box" />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then((users) => this.setState(() => {
//         return { monsters: users }
//       }
//       ));
//   }
//   // async componentDidMount() {
//   //   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   //   const users = await response.json();

//   //   this.setState(() => {
//   //     return {monster: users}
//   //   })
//   // }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState(() => {
//       return { searchField }
//     })
//   }

//   render() {
//     console.log('render from appjs')
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField)
//     })
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder="search monsters" className="monsters-search-box" />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
