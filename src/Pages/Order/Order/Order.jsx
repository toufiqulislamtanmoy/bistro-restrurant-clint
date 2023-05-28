import { useState } from "react";
import ourShopBg from "../../../assets/shop/banner2.jpg"
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
    const categories = ['salad','pizza','soup','desert','drinks'];
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    console.log(category);
    const desert = menu.filter(desertMenu => desertMenu.category === "dessert");
    const pizza = menu.filter(pizzaMenu => pizzaMenu.category === "pizza");
    const soup = menu.filter(soupMenu => soupMenu.category === "soup");
    const salad = menu.filter(saladMenu => saladMenu.category === "salad");
    const drinks = menu.filter(saladMenu => saladMenu.category === "drinks");

    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Our Shop</title>
            </Helmet>
            <Cover bgimg={ourShopBg} title="OUR SHOP" description="Would you like to try a dish" descriptionStyle="uppercase" />

            <Tabs defaultIndex={tabIndex} onSelect={(index) => console.log(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desert} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;