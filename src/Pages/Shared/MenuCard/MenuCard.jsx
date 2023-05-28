const MenuCard = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="flex space-x-4 items-center" >
            <img className="w-[120px] h-[108px] rounded-b-[200px] rounded-tr-[200px]" src={image} alt="" />
            <div>
                <h3>{name}-------------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-[#BB8506]">${price}</p>
        </div>
    );
};

export default MenuCard;