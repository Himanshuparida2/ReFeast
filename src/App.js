import './App.css';
import {Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import CurrentPage from './context/currentpage';

function App() {
  return (
    <div className="App">
      <CurrentPage>
        <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      </CurrentPage>
    </div>
  );
}

export default App;
