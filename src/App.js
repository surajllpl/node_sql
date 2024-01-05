//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import Update_user from './components/Update';
import Add_user from './components/AddUser';
import Searchuser from './components/Searchuser';



function App() {
  return (
    <div className="App">
      <BrowserRouter>           
        <Nav />
        <Routes>

          <Route >
            <Route path='/' element={<Users />} />
            <Route path='/update' element={<Update_user />} />
            <Route path='/search' element={<Searchuser />} />
           
            <Route path='/add' element={<Add_user />} />
          </Route>

          
        </Routes>
      </BrowserRouter>

     

    </div>

  );
}




export default App;
