// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpots } from '../../store/spots';
// import { NavLink } from 'react-router-dom';
import './ProductList.css';

function ProductList() {
    return (
        <div>
            <div class="big-four-container">
                <div class="big-four-main">
                    <img src="/images/0037627589_171.jpg" alt="Main Image" />
                    <div class="image-overlay">
                    <h2 class="image-title">The Road to “American Football”</h2>
                    <p class="image-description">October’s selection includes a soundwalk in a park in Poland, improvisations based on French book titles, and more.</p>
                    <a href="#" class="cta-button">Learn More</a>
                    </div>
                </div>

                <div class="big-four-stack">
                    <div class="big-four-item">
                        <img src="/images/0037618495_170.jpg" alt="Stacked Image 1" />
                        <div class="image-overlay">
                        <h2 class="image-title">The New Psychedelia</h2>
                        <p class="image-description">FEATURE</p>
                        </div>
                    </div>
                    <div class="big-four-item">
                        <img src="/images/0037615351_170.jpg" alt="Stacked Image 2" />
                        <div class="image-overlay">
                        <h2 class="image-title">The Builders: Pioneers of Musique Concrète</h2>
                        <p class="image-description">LIST</p>
                        </div>
                    </div>
                    <div class="big-four-item">
                        <img src="/images/0037614588_170.jpg" alt="Stacked Image 3" />
                        <div class="image-overlay">
                        <h2 class="image-title">Bandcamp Weekly</h2>
                        <p class="image-description">Shigeto chats about Detroit, resilience, and making his collaborative new LP.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bandcamp-stats">
                Fans have paid artists <span class="bold-text">$1.39 billion</span> using Bandcamp, and 
                <span class="bold-text">$193 million</span> in the last year.
            </div>
        </div>
    );
}

export default ProductList;
