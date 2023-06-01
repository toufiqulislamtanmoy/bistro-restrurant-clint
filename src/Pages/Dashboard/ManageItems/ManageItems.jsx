import { Helmet } from "react-helmet-async";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
    const [menu,,refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

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
                axiosSecure.delete(`/menu/${id}`).then(res =>{
                    console.log(res.data);
                    if(res.data.deletedCount > 0){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        refetch();
                    }

                })
            }
        })
    }

   
    return (
        <div className="w-full min-h-screen">

            <Helmet>
                <title>Bistro Boss | Manage Item</title>
            </Helmet>
            <SectionTitle title="Manage Item" subtitle="Hurry Up" />
            <div className="flex justify-between gap-5 my-5 uppercase font-semibold">
                <div className="text-3xl">Total Items: cart.length</div>
                <div className="text-3xl">Total Price: total</div>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            menu.map((row, index) => <tr
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
                                <td>
                                    <button className="btn bg-[#c28709] border-none"><FaPenSquare className="text-white" />
                                    </button>
                                    

                                </td>
                                <th>
                                    <button onClick={()=> handelDelete(row._id)} className="btn btn-error "><FaTrashAlt className="text-white" /></button>
                                </th>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageItems;