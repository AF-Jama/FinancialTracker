import logo from './logo.svg';
import Header from './Components/Header';
import LandingPage from './Pages/LandingPage';
import DashBoardPage from './Pages/DashboardPage';
import ErrorPage from './Pages/Error';
import SideBar from './Components/SideBar';
import CreateAccount from './Components/CreateAccount';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import { Routes,Route } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const { loginWithRedirect } = useAuth0();
  console.log(process.env);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboard' element={<DashBoardPage/>}/>
        <Route path='/error' element={<ErrorPage/>}/>
        <Route path='/side' element={<SideBar/>}/>
        <Route path='/create' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
