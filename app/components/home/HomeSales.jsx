import "../../styles/components/home/HomeSales.scss";


export default function HomeSales() {

    const megaSalesItems = [
        { title: "New Arrivals", description: "Fresh Selections Just For You!", image: "/product-cat1.jpg" },
        { title: "Best Sellers", description: "Fresh Selections Just For You!", image: "/product-cat2.jpg" },
        { title: "Featured Picks", description: "Fresh Selections Just For You!", image: "/product-cat1.jpg" },
        { title: "Must-Haves", description: "Fresh Selections Just For You!", image: "/product-cat2.jpg" },
    ];

    return (
        <div className="home-container">
            {/* Mega Sales Section */}
            <section className="mega-sales">
                <h2>Mega Sales</h2>
                <div className="row mega-sales-grid">
                    {megaSalesItems.slice(0, 2).map((item, index) => (
                        <div key={index} className="card">
                            <img src={item.image} alt={item.title} className="card-image" />

                            <div className="card-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mega-sales-grid">
                    {megaSalesItems.slice(2, 4).map((item, index) => (
                        <div key={index} className="card">
                            <img src={item.image} alt={item.title} className="card-image" />

                            <div className="card-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Offer Sales Section */}
            <section className="offer-sales">
                <h2>Offer Sales</h2>
                <div className="offer-banner">
                    <img src="/offer-sales.png" alt="Offer Sale" />
                </div>
            </section>
        </div>
    )
}