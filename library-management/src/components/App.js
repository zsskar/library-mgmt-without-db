import { Route, Routes } from 'react-router-dom';
import '../css/App.css';
import ResponsiveAppBar from './ResponsiveAppBar';
import AddBook from '../components/AddBook';
import ViewBooks from '../components/ViewBooks';
import Home from '../components/Home';


function App() {

  return (
    <>
    <ResponsiveAppBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/addBook' element={<AddBook />} />
        <Route exact path='/viewBooks' element={<ViewBooks />} />
        <Route exact path='/addBook/:action/:id' element={<AddBook />} />
        <Route path="*" element={<h1 style={{color:'red',textAlign:'center'}}>Path not resolved !</h1>} />
      </Routes>

    </>
  );
}

export default App;
