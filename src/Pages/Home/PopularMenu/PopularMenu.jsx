import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../../Menu/MenuCategory/MenuCategory";
const PopularMenu = () => {
    const [menu] = useMenu();
    const popularMenu = menu.filter(pmenu => pmenu.category === "popular");
    

    return (
        <section className="my-24">
            <SectionTitle subtitle="Check it out" title="FROM OUR MENU" />
            <MenuCategory items={popularMenu}/>
        </section>
    );
};

export default PopularMenu;