import "../../styles/components/home/HomeSavings.scss";

export default function HomeSavings() {
    const offers = [
        {
            id: 1,
            image: "/female.png",
            label: "Female",
            discount: "Extra 20% off",
            category: "on Electricals",
        },
        {
            id: 2,
            image: "/male.png",
            label: "Male",
            discount: "Extra 20% off",
            category: "on Hardware & Fixtures",
        },
        {
            id: 3,
            image: "/male.png",
            label: "Unisex",
            discount: "Extra 20% off",
            category: "on Cement",
        },
        // {
        //     id: 4,
        //     image: "/product-cat2.jpg",
        //     label: "Deals Of The Day",
        //     discount: "Save up to 20% off",
        //     category: "on TMT Steels",
        // },
    ];

    return (
        <div className="boost-container">
            {/* <h1 className="boost-heading">BOOST YOUR SAVINGS</h1> */}
            <div className="boost-grid">
                {offers.map((offer) => (
                    <div key={offer.id} className="boost-card">
                        <img
                            src={offer.image}
                            alt={offer.category}
                            className="boost-image"
                        />
                        <div className="offer-label">{offer.label}</div>
                        {/* <div className="boost-info">
                            <p className="boost-discount">{offer.discount}</p>
                            <p className="boost-category">{offer.category}</p>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
}