import './App.css'

import {Route,Routes} from 'react-router-dom'

import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import ProductsDetails from './pages/ProductsDetails'
import CheckOut from './pages/CheckOut'

function App() {

  return (
    <>
      <Routes>
        
        <Route path='/' element={<Login />}/>

        <Route path='/*' element={<NotFound />}/>

        <Route path='/products' element={<Products />}/>
        <Route path='/products/:id' element={<ProductsDetails />}/>

        <Route path='/checkout' element={<CheckOut />} />

      </Routes>
    </>
  )
}

export default App
