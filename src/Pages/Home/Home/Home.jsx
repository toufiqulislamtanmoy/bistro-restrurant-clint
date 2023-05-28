
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonial from "../Testimonial/Testimonial";
import chefServiceImg from '../../../assets/home/chef-service.jpg';
import Cover from "../../Shared/Cover/Cover";


const Home = () => {
  
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner />
      <Category />
      <Cover bgimg={chefServiceImg} title="Bistro Boss" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."/>
      <PopularMenu />
      <Featured/>
      <Testimonial/>
    </div>
  );
};

export default Home;