import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure]=useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })

    const handelMakeRole = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: "PATCH",
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.modifiedCount) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} is admin now`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handelDelete = id => {

    }
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <div className="flex justify-between gap-5 my-5 uppercase font-semibold">
                <div className="text-3xl">Total Users: {users.length}</div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <div>No.</div>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((row, index) => <tr
                                key={row._id}
                            >
                                <th>
                                    <label>
                                        <div>{index + 1}</div>
                                    </label>
                                </th>
                                <td>
                                    {row.name}
                                </td>
                                <td>
                                    {row.email}
                                </td>
                                <td>
                                    {
                                        row?.role === 'admin' ? "Admin" : <><button onClick={() => handelMakeRole(row)} className="btn bg-[#c28709] outline-none"><FaUsers className="text-white" /></button></>
                                    }
                                    
                                </td>
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

export default AllUsers;