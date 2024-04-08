
import { Route, Routes,Navigate  } from 'react-router-dom'
import './App.css'
import { Login } from './Authentication/Login/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Signup } from './Authentication/signup/Signup';
import { Dashboard } from './Dashboard/Dashboard';
import  { RequiresAuth } from './component/SecuredRoute';
import {useSelector} from "react-redux"
import { PreviewDashboard } from './Dashboard/PreviewDashboard';


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RedirectComponent/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

        <Route path='/dashboard' element={<RequiresAuth>
          <Dashboard/>
        </RequiresAuth>}/>

        <Route path='/previewDashboard/*' element={<RequiresAuth>
          <PreviewDashboard/>
        </RequiresAuth>}/>
      </Routes>

      <ToastContainer position="top-right"
        autoClose={4996}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce />
    </div>
  )
}

export default App

const RedirectComponent = () => {
  const {isAuthenticated}=useSelector((state=>state.auth));
  console.log(isAuthenticated)
  return !isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard" />;
};

