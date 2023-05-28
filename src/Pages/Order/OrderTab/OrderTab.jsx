import FoodCard from "../../Shared/FoodCard/FoodCard";

const OrderTab = ({items}) => {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
            {
                items.map(singleItem => <FoodCard key={singleItem._id} item={singleItem} />)
            }
        </div>
    );
};

export default OrderTab;