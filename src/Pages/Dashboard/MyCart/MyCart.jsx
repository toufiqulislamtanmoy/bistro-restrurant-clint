import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
const MyCart = () => {
    const [cart,refetch] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0)

    const handelDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${id}`,{
                    method:"DELETE"
                }).then(res => res.json()).then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            }
        })
    }
    return (
        <div className="w-full ">

            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className="flex justify-between gap-5 my-5 uppercase font-semibold">
                <div className="text-3xl">Total Items: {cart.length}</div>
                <div className="text-3xl">Total Price: {total}</div>
                <button className="btn btn-sm btn-warning">Pay Now</button>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <div>No.</div>
                            </th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((row, index) => <tr
                                key={row._id}
                            >
                                <th>
                                    <label>
                                        <div>{index + 1}</div>
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={row.image} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {row.name}
                                </td>
                                <td>${row.price}</td>
                                <th>
                                    <button onClick={() => handelDelete(row._id)} className="btn btn-error "><FaTrashAlt className="text-white" /></button>
                                </th>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyCart;