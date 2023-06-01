import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

const image_hosting_token = import.meta.env.VITE_IMAGE_TOKEN;
console.log(image_hosting_token);
const AddItem = () => {
    const { register, handleSubmit,reset } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const imamge_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const onSubmit = data => {
        console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0]);
        fetch(imamge_hosting_url, {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(imgResponse => {
            if (imgResponse.success) {
                const imgurl = imgResponse.data.display_url;
                const { name, price, recipe, category } = data;
                const newItem = { name, category, price: parseFloat(price), recipe, image: imgurl };
                console.log(newItem);
                axiosSecure.post('/menu', newItem).then(data => {
                    if (data.data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item added Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        reset();
                    }
                })
            }
        })
    };
    return (
        <div className="w-full min-h-screen">
            <Helmet>
                <title>Bistro Boss | Add Item</title>
            </Helmet>
            <SectionTitle title="Add an item" subtitle="What's new" />
            <div className="bg-base-200 h-[800px] p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Recipe name*</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-10">
                        {/* select category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="Pick one" {...register("category", { required: true })} className="select select-bordered">
                                <option disabled>Pick one</option>
                                <option>pizza</option>
                                <option>salad</option>
                                <option>soup</option>
                                <option>drinks</option>
                                <option>dessert</option>
                            </select>
                        </div>
                        {/* Price */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input {...register("price", { required: true })} type="text" placeholder="$20" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* text area */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea {...register("recipe", { required: true })} placeholder="Recipe Details" className="textarea textarea-bordered textarea-lg w-full " ></textarea>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Item Image*</span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <input type="submit" value={`Add Item`} className="file-input mt-5 bg-[#644c1d] btn btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-indigo-400 outline-none" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;