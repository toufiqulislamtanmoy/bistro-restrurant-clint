import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import menubgImg from '../../assets/menu/banner3.jpg'
import pizzaBG from '../../assets/menu/pizza-bg.jpg'
import saladBG from '../../assets/menu/salad-bg.jpg'
import soupBG from '../../assets/menu/soup-bg.jpg'
import desertBG from '../../assets/menu/dessert-bg.jpeg'
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';
const Menu = () => {

    const [menu] = useMenu();
    const todaysOffer = menu.filter(todayMenu => todayMenu.category === "offered");
    const desert = menu.filter(desertMenu => desertMenu.category === "dessert");
    const pizaa = menu.filter(pizzaMenu => pizzaMenu.category === "pizza");
    const soup = menu.filter(soupMenu => soupMenu.category === "soup");
    const salad = menu.filter(saladMenu => saladMenu.category === "salad");

    return (
        <div className='space-y-24'>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover descriptionStyle="uppercase" bgimg={menubgImg} title="OUR MENU" description="Would you like to try a dish" />

            <SectionTitle subtitle="Don't miss" title="TODAY'S OFFER" />

            <MenuCategory items={todaysOffer} />




            {/* For Dessert */}
            <MenuCategory items={desert} title="desert" img={desertBG} desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />

            {/* For Pizza */}
            <MenuCategory items={pizaa} title="pizza" img={pizzaBG} desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />

            {/* For Salad */}
            <MenuCategory items={salad} title="salad" img={saladBG} desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
            
            {/* For Soup */}
            <MenuCategory items={soup} title="soup" img={soupBG} desc="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
        </div>
    );
};

export default Menu;