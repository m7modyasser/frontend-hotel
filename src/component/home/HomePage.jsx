import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {

    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">
            {/* HEADER / BANNER ROOM SECTION */}
            <section>
                <header className="header-banner">
                    <img src="./assets/images/hotel.webp" alt="Phegon Hotel" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Experience Luxury at <span className="phegon-color">Phegon Hotel</span>
                        </h1>
                        <p className="banner-subtitle">Step into a haven of comfort, elegance, and unparalleled care.</p>
                        <a href="/rooms" className="banner-button">Explore Rooms</a>
                    </div>
                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
            <div className="search-section-wrapper">
                <RoomSearch handleSearchResult={handleSearchResult} />
                <RoomResult roomSearchResults={roomSearchResults} />
            </div>

            {/* ABOUT US SECTION */}
            <section className="about-section">
                <div className="about-content">
                    <h2 className="section-title">Discover Our <span className="phegon-color">Story</span></h2>
                    <p className="about-text">
                        Nestled in the heart of the city, Phegon Hotel offers a seamless blend of modern luxury and timeless elegance. 
                        Whether you are here for a romantic getaway, a business trip, or a family vacation, our world-class amenities 
                        and personalized service ensure an unforgettable stay. Experience comfort redefined.
                    </p>
                    <a className="view-rooms-home" href="/rooms">View All Rooms</a>
                </div>
                <div className="about-image-container">
                    <img src="./assets/images/hotel.webp" alt="About Phegon Hotel" className="about-image" />
                </div>
            </section>

            {/* PREMIUM AMENITIES / SERVICES SECTION */}
            <h2 className="section-title center">Premium <span className="phegon-color">Amenities</span></h2>
            <section className="service-section">
                <div className="service-card glass">
                    <div className="service-icon">
                        <img src="./assets/images/ac.png" alt="Air Conditioning" />
                    </div>
                    <div className="service-details">
                        <h3 className="service-title">Climate Control</h3>
                        <p className="service-description">Stay cool and comfortable throughout your stay with our state-of-the-art individually controlled in-room air conditioning.</p>
                    </div>
                </div>
                <div className="service-card glass">
                    <div className="service-icon">
                        <img src="./assets/images/mini-bar.png" alt="Mini Bar" />
                    </div>
                    <div className="service-details">
                        <h3 className="service-title">Gourmet Mini Bar</h3>
                        <p className="service-description">Enjoy a curated selection of premium beverages and artisanal snacks stocked in your room's mini bar.</p>
                    </div>
                </div>
                <div className="service-card glass">
                    <div className="service-icon">
                        <img src="./assets/images/parking.png" alt="Parking" />
                    </div>
                    <div className="service-details">
                        <h3 className="service-title">Valet Parking</h3>
                        <p className="service-description">Experience ultimate convenience with our secure on-site parking and exclusive 24/7 valet services.</p>
                    </div>
                </div>
                <div className="service-card glass">
                    <div className="service-icon">
                        <img src="./assets/images/wifi.png" alt="WiFi" width={80} height={80}/>
                    </div>
                    <div className="service-details">
                        <h3 className="service-title">High-Speed WiFi</h3>
                        <p className="service-description">Stay seamlessly connected with complimentary ultra-fast Wi-Fi access available in all guest rooms and public areas.</p>
                    </div>
                </div>
            </section>

            {/* FEATURED EXPERIENCE SECTION */}
            <section className="experience-section">
                <h2 className="section-title center">An Unforgettable <span className="phegon-color">Experience</span></h2>
                <div className="experience-grid">
                    <div className="experience-card">
                        <img src="./assets/images/hotel.webp" alt="Dining" />
                        <div className="experience-overlay">
                            <h3>Exquisite Dining</h3>
                        </div>
                    </div>
                    <div className="experience-card">
                        <img src="./assets/images/hotel.webp" alt="Spa" />
                        <div className="experience-overlay">
                            <h3>Wellness & Spa</h3>
                        </div>
                    </div>
                    <div className="experience-card">
                        <img src="./assets/images/hotel.webp" alt="Pool" />
                        <div className="experience-overlay">
                            <h3>Rooftop Pool</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
