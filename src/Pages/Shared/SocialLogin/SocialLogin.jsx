import { FaGoogle } from "react-icons/fa";
import {useContext} from "react"
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
const SocialLogin = () => {
     const {LoginWithGoogle} = useContext(AuthContext);
     const location = useLocation();
    const destination = location.state?.from?.pathname || "/"
    const navigate = useNavigate();
     const handelGoogleLogin = () =>{
        LoginWithGoogle().then((loggedInUser) => {
            // Signed in 
            const user = loggedInUser.user;
            console.log(user);
            
            const saveUser ={name:user.displayName, email:user.email}
                fetch("http://localhost:5000/users",{
                    method:"POST",
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(saveUser)
                }).then(res => res.json()).then(data => {
                    console.log(data);
                    if (data.insertedId || data.message) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Account created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate(destination, { replace: true })
                    }
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
              })
          });
     }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center ">
                <button onClick={handelGoogleLogin} className="btn btn-outline btn-circle hover:bg-gray-400">
                    <FaGoogle/>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;