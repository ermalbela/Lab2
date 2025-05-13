import { useState, useMemo } from 'react'
import Routers from './Route'
import AuthContext from './_helper/AuthContext';
import CustomizerContext from './_helper/CustomizerContext';
import MovieContext from './_helper/MovieContext';

function App() {

  const [role, setRole] = useState([]);
  const roleValue = useMemo(() => ({role, setRole}), [role, setRole]);

  const [toggle, setToggle] = useState(false);
  const toggleValue = useMemo(() => ({toggle, setToggle}), [toggle, setToggle]);
  
  const [movieProps, setMovieProps] = useState([]);
  const moviePropsValue = useMemo(() => ({movieProps, setMovieProps}), [movieProps, setMovieProps]);

  return (
    <div className="App">
      <AuthContext.Provider value={roleValue}>
        <CustomizerContext.Provider value={toggleValue}>
          <MovieContext.Provider value={moviePropsValue}>
            <Routers />
          </MovieContext.Provider>
        </CustomizerContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
