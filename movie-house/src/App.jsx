import { useState, useMemo } from 'react'
import Routers from './Route'
import AuthContext from './_helper/AuthContext';
import CustomizerContext from './_helper/CustomizerContext';

function App() {

  const [role, setRole] = useState([]);
  const roleValue = useMemo(() => ({role, setRole}), [role, setRole]);

  const [toggle, setToggle] = useState(false);
  const toggleValue = useMemo(() => ({toggle, setToggle}), [toggle, setToggle]);

  return (
    <div className="App">
      <AuthContext.Provider value={roleValue}>
        <CustomizerContext.Provider value={toggleValue}>
          <Routers />
        </CustomizerContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
