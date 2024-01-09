import Signin from './pages/user/signin'
import Signup from './pages/user/signup'
import ForgotPassword from './pages/user/forgotPassword'
import ResetPassword from './pages/user/resetPassword'
import Home from './pages/house/home'
import HostHome from './pages/house/hostHome'
import HomeDetails from './pages/house/homeDetails'
import SearchHomes from './pages/house/searchHomes'

// this toastr container will be used to show the toast messages
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import the required components from react-router-dom
// these are needed to configure client side routing
// Route: represents a route for a component
// Routes: collection of routes
// BrowserRouter: container for routes collection
// Link: used to jump to another component using its path
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import MyHomes from './pages/house/myHomes'
import Wishlist from './pages/house/wishlist'
import EditHome from './pages/house/editHome'
import UploadImage from './pages/house/uploadImage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/home' element={<Home />} />
        <Route path='/host' element={<HostHome />} />
        <Route path='/details' element={<HomeDetails />} />
        <Route path='/search' element={<SearchHomes />} />
        <Route path='/my-homes' element={<MyHomes />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/edit-home' element={<EditHome />} />
        <Route path='/upload-image' element={<UploadImage />} />
      </Routes>

      {/* this container is used to show toast messages */}
      <ToastContainer position='top-center' autoClose={1000} />
    </BrowserRouter>
  )
}

export default App
