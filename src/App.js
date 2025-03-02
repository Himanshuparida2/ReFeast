import './App.css';
import {Routes,Route, Link} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import {AWSlogin} from './components/AWSlogin';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<AWSlogin/>}></Route>
      </Routes>
      <Link to='/'><Home/></Link>
    </div>
  );
}

export default App;
