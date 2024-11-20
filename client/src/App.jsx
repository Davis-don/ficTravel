import './App.css'
import Homepage from './pages/Homepage'
import Layout from './layouts/Layout'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from "react-query"
import Dashboard from './pages/Dashboard'

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
    <Route path='/account/dashboard'
    element={<Dashboard/>}
    />
  
  </Routes>
  </BrowserRouter>

  </div>
  </QueryClientProvider>
  )
}

export default App
