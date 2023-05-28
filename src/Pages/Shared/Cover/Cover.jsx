import { Parallax } from 'react-parallax';

const Cover = ({ bgimg, title, description, descriptionStyle }) => {

    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={bgimg}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero h-[600px]">
                <div className="hero-overlay bg-opacity-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="hero-overlay bg-opacity-75 p-10 w-[800px]">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p className={`mb-5 ${descriptionStyle}`}>{description}</p>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;