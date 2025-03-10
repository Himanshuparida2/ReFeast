import './App.css';
import {Routes,Route, Link} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
