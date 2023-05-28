import { Link } from "react-router-dom";
import MenuCard from "../../Shared/MenuCard/MenuCard";
import Cover from "../../Shared/Cover/Cover";


const MenuCategory = ({ items,img,title,desc }) => {

    return (
        <section>
            {title && <Cover title={title} bgimg={img} description={desc}></Cover>}
            <div className="grid md:grid-cols-2 gap-5 my-10">
                {
                    items.map(singleMenu =>
                        <MenuCard key={singleMenu._id} item={singleMenu} />
                    )
                }
            </div>
            <div className="text-center">
                <Link to={`/order/${title}`}>
                    <button className="btn border-b-4 border-b-white btn-outline ">Order Now</button>
                </Link>
            </div>
        </section>
    );
};

export default MenuCategory;