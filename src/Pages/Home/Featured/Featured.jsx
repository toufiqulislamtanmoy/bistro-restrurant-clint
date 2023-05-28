import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg"
import "./featured.css"
const Featured = () => {
    return (
        <section className="featured bg-fixed">
            <div className="hero-overlay pt-14">
                <div>
                    <SectionTitle subtitle="Check it out" title="FROM OUR MENU" color="text-white" />
                </div>

                <div className="md:flex items-center justify-center p-6 md:py-24 md:px-36 gap-5">
                    <div>
                        <img className="rounded-2xl" src={featuredImage} alt="" />
                    </div>
                    <div className="space-y-3 text-white">
                        <h3>March 20, 2023</h3>
                        <h2>WHERE CAN I GET SOME?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className="btn border-b-4 border-b-white btn-outline">Read More</button>
                    </div>
                </div> 
            </div>
        </section>
    );
};

export default Featured;