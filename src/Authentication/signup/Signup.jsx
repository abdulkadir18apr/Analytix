import { useState } from 'react';
import { Link } from 'react-router-dom'; 
 import "../Login/login.scss";
 import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../reducers/reducer';
import {toast} from "react-toastify"
import { Loader } from '../../component/Loader';

export const Signup = () => {
    const [credentials, setCredentials] = useState({ firstName:"",lastName:"", email: '', password: '' });
    const [isLoading,setIsLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const navigate=useNavigate();
    const dispatch=useDispatch();


    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSignup = () => {
        setIsLoading(true);
        dispatch(signupUser({firstName:credentials.firstName,lastName:credentials.lastName,email:credentials.email,password:credentials.password})).then((res)=>{
            if(res.payload?.success){
                navigate("/dashboard")
                setIsLoading(false)
            }else{
                toast.error("Email Already Exist")
                setIsLoading(false)
                console.log("Signup failed")
                
                setCredentials({ firstName:"",lastName:"", email: '', password: '' })
            }
        })
    };

    if(isLoading){return <Loader/>}

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
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="firstName"
                            value={credentials.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="feild">
                        <label htmlFor="lastName">last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="lastName"
                            value={credentials.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
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
                    <button className="loginBtn" onClick={handleSignup}>
                        Signup
                    </button>
                    <div className="line"></div>
                    <p>Dont Have an Account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};


