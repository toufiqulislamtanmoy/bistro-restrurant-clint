const SectionTitle = ({subtitle,title,color}) => {
    return (
        <div className="text-center">
            <p className="text-[#D99904] text-[20px]">--{subtitle}--</p>
            <h3 className={`${color} uppercase md:text-5xl border-y-4 w-4/12 py-3 my-5 mx-auto`}>{title}</h3>
        </div>
    );
};

export default SectionTitle;