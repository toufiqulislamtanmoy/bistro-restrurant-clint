import { useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useCart from "../../../hooks/useCart";
const FoodCard = ({ item }) => {
    const { name, image, recipe,price,_id } = item;
    const [,refetch] = useCart();
    const {user} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const handelAddToCart = (data) =>{
        console.log(data);
        if(user && user.email){
            const orderItem = {menuItemId:_id,name,image,price,email:user.email}
            fetch('http://localhost:5000/carts',{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(orderItem)
            }).then(res => res.json()).then(data => {
                if(data.insertedId){
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully added item into cart',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }else{
            navigate('/login',{state:{from:location}});
        }
    }

    return (
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-0 bg-black text-white px-2">${price}</p>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={()=> handelAddToCart(item)} className="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>
    );
};

export default FoodCard;