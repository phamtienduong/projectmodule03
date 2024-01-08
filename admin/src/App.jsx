import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import LayoutAdmin from './components/LayoutAdmin/LayoutAdmin'
import AdminProduct from './components/AdminProduct/AdminProduct'
import AdminUser from './components/AdminUser/AdminUser'
import AdminCategory from './components/AdminCategory/AdminCategory'
import AdminBill from './components/AdminBill/AdminBill'
import Login from './components/Login/Login'
import PrivateRouter from './components/privateRouter/PrivateRouter'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/admin' element={<LayoutAdmin> <Outlet /> </LayoutAdmin>}>
        <Route path='/admin' element={<PrivateRouter />} >
          <Route index path='user' element={<AdminUser />} />
          <Route path='category' element={<AdminCategory />} />
          <Route path='product' element={<AdminProduct />} />
          <Route path='bill' element={<AdminBill />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
