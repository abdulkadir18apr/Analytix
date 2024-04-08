import  { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
 import "./login.scss";
import { loginUser } from '../../reducers/reducer';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { Loader } from '../../component/Loader';


export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async() => {
        try{
            setIsLoading(true);
            dispatch(loginUser({email:credentials.email,password:credentials.password})).then(res=>{
               if(res.payload.success){
                navigate("/dashboard")
               }else{
                setCredentials({email:"",password:""})
               }
            })
        }catch(err){
            console.log(err);
            toast.error("Invalid Id or Password")
        }finally{
            setIsLoading(false)
        } 
    };
    const handleTestLogin = async() => {
        try{
            setIsLoading(true);
            dispatch(loginUser({email:"1@gmail.com",password:"123456789"})).then(res=>{
               if(res.payload.success){
                navigate("/dashboard");
                setIsLoading(false)
               }else{
                setCredentials({email:"",password:""});
                setIsLoading(false)
               }
            })
        }catch(err){
            console.log(err);
            setIsLoading(false)
            
        }
    };

    if(isLoading){
        console.log("loadinf...")
        return <Loader/>
    }

    return (
        <div className="loginContainer">
            <div className="login">
                <h1>Login</h1>
                <div className="loginHeader">
                    <h2>Welcome Back To Ecommerce</h2>
                    <h4>The next gen business marketplace</h4>
                </div>
                <div className="form">
                    <div className="feild">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="feild">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? "hide" : "show"}
                        </span>
                    </div>
                    <button className="loginBtn" onClick={handleLogin}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                    <button className="loginBtn" onClick={handleTestLogin}>
                       Test Login
                    </button>
                    <div className="line"></div>
                    <p>Dont Have an Account? <Link to="/signup">SignUp</Link></p>
                </div>
            </div>
        </div>
    );
};


