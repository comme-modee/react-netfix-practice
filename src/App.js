import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './AppLayout.style.css';

//페이지구성: 홈페이지, 영화전체페이지(서치기능), 영화디테일페이지
function App() {
  return (
    <Routes>

      <Route path='/' element={<AppLayout/>}>

        <Route index element={<Homepage/>}/>

        <Route path='movies'>
          <Route index element={<MoviePage/>}/>
          <Route path=':id' element={<MovieDetailPage/>}/>
        </Route>

      </Route>

      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
