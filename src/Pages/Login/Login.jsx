import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha }
    from 'react-simple-captcha';
import { useContext, useEffect, useState } from 'react'
import loginBG from "../../assets/others/authentication.png"
import login from "../../assets/others/authentication2.png"
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Login = () => {
    const {userLogin} = useContext(AuthContext);
    const [disabled,setDeisabled] = useState(true);
    const location = useLocation();
    const destination = location.state?.from?.pathname || "/"
    const navigate = useNavigate();
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const handelLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        userLogin(email,password).then((loggedInUser) => {
            // Signed in 
            const user = loggedInUser.user;
            console.log(user);
            navigate(destination,{replace:true})
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
              })
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Message: ",errorMessage ,"Error Code: ", errorCode);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
          });
    }

    const handelValidate = (e) => {
        const value = e.target.value;
        if(validateCaptcha(value)){
            setDeisabled(false);
        }else{
            setDeisabled(true);
        }
    }
    return (
        <div className="h-[100vh] flex items-center justify-center" style={{ backgroundImage: `url("${loginBG}")` }}>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="md:w-[80%] bg-base-200" style={{ backgroundImage: `url("${loginBG}")` }}>
                <div className="hero-content flex-col lg:flex-row shadow-2xl">
                    <div className="text-center lg:text-left w-1/2">
                        <img src={login} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm  ">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-center">Login</h1>
                            <form onSubmit={handelLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" name="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="text" placeholder="password" name="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input onBlur={handelValidate} type="text"  placeholder="captcha" name="captcha" className="input input-bordered" />
                                    
                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={false} className="btn bg-[#D1A054] border-none">Login</button>
                                </div>
                            </form>
                            <p className="text-center">Don't have an account <Link className="text-blue-600 underline" to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;