import "../../styles/components/home/BrandStore.scss";
import { useState, useEffect, useRef } from "react";
import { getBrandData } from "../../utils/api";

export default function BrandStore() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandsData = await getBrandData();
                console.log("Brands:", brandsData);

                if (brandsData) setBrands(brandsData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const [brands, setBrands] = useState([
        // {
        //     id: 1,
        //     image_path: "/brand1.png",
        //     name: "UltraTech Cement",
        // },
        // {
        //     id: 2,
        //     image_path: "/brand2.png",
        //     name: "Cemex",
        // },
        // {
        //     id: 3,
        //     image_path: "/brand3.png",
        //     name: "Heidelberg Materials",
        // },
        // {
        //     id: 4,
        //     image_path: "/brand1.png",
        //     name: "LafargeHolcim",
        // },
        // {
        //     id: 5,
        //     image_path: "/brand2.png",
        //     name: "Anhui Conch Cement",
        // },
        // {
        //     id: 6,
        //     image_path: "/brand3.png",
        //     name: "Vulcan Materials Company",
        // },
    ]);

    return (
        <div className="brands-container">
            <h1 className="brands-heading">EXPLORE OFFICIAL BRAND STORES</h1>
            <div className="brands-grid">
                {brands.slice(0, 3).map((brand) => (
                    <div key={brand.id} className="brand-card">
                        <div className="brand-logo">
                            <img src={brand.image_path} alt={brand.name} />
                        </div>
                        <div className="brand-details">
                            <h2 className="brand-name">{brand.name.toUpperCase()}</h2>
                            <a href="#" className="brand-link">
                                Visit Store &gt;
                            </a>
                        </div>
                    </div>
                ))}
                {brands.slice(3, 6).map((brand) => (
                    <div key={brand.id} className="brand-card">
                        <div className="brand-logo">
                            <img src={brand.image_path} alt={brand.name} />
                        </div>
                        <div className="brand-details">
                            <h2 className="brand-name">{brand.name.toUpperCase()}</h2>
                            <a href="#" className="brand-link">
                                Visit Store &gt;
                            </a>
                        </div>
                    </div>
                ))}
                {/* {brands.slice(6, 9).map((brand) => (
                    <div key={brand.id} className="brand-card">
                        <div className="brand-logo">
                            <img src={brand.image_path} alt={brand.name} />
                        </div>
                        <div className="brand-details">
                            <h2 className="brand-name">{brand.name.toUpperCase()}</h2>
                            <a href="#" className="brand-link">
                                Visit Store &gt;
                            </a>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}