
import { Link, useNavigate } from "react-router-dom";
import signUpBG from "../../assets/others/authentication.png"
import signUp from "../../assets/others/authentication2.png"
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
const SingUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { userSignUp, updateUserInFo } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data)
        userSignUp(data.email, data.password).then((loggedInUser) => {
            // Signed in 
            const user = loggedInUser.user;
            console.log(user);
            updateUserInFo(data.name, data.photoUrl).then(() => {
                const saveUser ={name:data.name, email:data.email}
                fetch("http://localhost:5000/users",{
                    method:"POST",
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(saveUser)
                }).then(res => res.json()).then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        reset();
                        Swal.fire({
                            icon: 'success',
                            title: 'Account created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate("/", { replace: true })
                    }
                })


            }).catch((error) => {
                Swal.fire({
                    icon: `${error}`,
                    title: 'Oops...',
                    text: 'Did not update user profile!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            });

            // ...
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error Message: ", errorMessage, "Error Code: ", errorCode);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            });

    };


    return (
        <div className="h-[100vh] flex items-center justify-center" style={{ backgroundImage: `url("${signUpBG}")` }}>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="md:w-[80%] bg-base-200" style={{ backgroundImage: `url("${signUpBG}")` }}>
                <div className="hero-content flex-col lg:flex-row-reverse shadow-2xl">
                    <div className="text-center lg:text-left w-1/2">
                        <img src={signUp} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm  ">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("photoUrl", { required: true })} name="photoUrl" placeholder="Photo URL" className="input input-bordered" />
                                    {errors.photoUrl && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).+$/
                                    })} type="text" placeholder="password" name="password" className="input input-bordered" />

                                    {errors.password?.type === 'minLength' && <p className="text-red-500">Password Must be 6 Charecter Long</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one uppercase lowercase symbol and number</p>}
                                    {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn bg-[#D1A054] border-none">Sign Up</button>
                                </div>
                            </form>
                            <p className="text-center">Already have an account <Link className="text-blue-600 underline" to="/login">Login</Link></p>
                            <SocialLogin/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUp;