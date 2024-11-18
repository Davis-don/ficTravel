import './App.css'
import Homepage from './pages/Homepage'
import Layout from './layouts/Layout'
import {Route,Routes,BrowserRouter} from 'react-router-dom'

function App() {
  

  return (
  <div className="app">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={
      <Layout>
        <Homepage/>
      </Layout>
    }/>
  
  </Routes>
  </BrowserRouter>

  </div>
  )
}

export default App
