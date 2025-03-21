import "../../styles/components/home/HomeAds.scss";

export default function HomeAds() {
    return (
        <div className="advertisement-container">
            <div className="ad-content">
                <div className="ad-box">
                    <span className="ad-label">AD</span>
                    <img src="/ad1.png" alt="ad1" className="ad-image" />
                </div>
                <div className="ad-box">
                    <img src="/ad2.png" alt="ad2" className="ad-image" />
                </div>
            </div>
        </div>
    );
}
