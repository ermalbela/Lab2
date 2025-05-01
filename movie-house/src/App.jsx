import { useState, useMemo } from 'react'
import Routers from './Route'
import AuthContext from './_helper/AuthContext';

function App() {

  const [role, setRole] = useState([]);
  const roleValue = useMemo(() => ({role, setRole}), [role, setRole]);

  return (
    <div className="App">
      <AuthContext.Provider value={roleValue}>
        <Routers />
      </AuthContext.Provider>
    </div>
  )
}

export default App
