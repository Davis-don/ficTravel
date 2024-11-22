import './App.css'
import Homepage from './pages/Homepage'
import Layout from './layouts/Layout'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from "react-query"
import Useraccount from './pages/Useraccount'
import Adminaccount from './pages/Adminaccount'
import Agentaccount from './pages/Agentaccount'
import Recommendedreadpg from './pages/Recommendedreadpg'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
  <div className="app">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={
      <Layout>
        <Homepage/>
       </Layout>
    }/>
    <Route path='/recommended' element={
      <Layout>
        <Recommendedreadpg/>
       </Layout>
    }/>
    <Route path='/user/account'
    element={<Useraccount/>}
    />
  
  <Route path='/admin/account'
    element={<Adminaccount/>}
    />
  
  <Route path='/agent/account'
    element={<Agentaccount/>}
    />


  </Routes>
  </BrowserRouter>

  </div>
  </QueryClientProvider>
  )
}

export default App
