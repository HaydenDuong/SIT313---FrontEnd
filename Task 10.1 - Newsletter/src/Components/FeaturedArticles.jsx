import React from 'react';
import '../CSS/FeaturedArticles.css';
import Item from './Item';
import image1 from '../Image/one.jpg';
import image2 from '../Image/two.jpg';
import image3 from '../Image/three.jpg';

function FeaturedArticles() {
    return (
        <div class = "container">

            <h1>Featured Articles</h1>

            <div class = "items">

                <Item 
                    imageUrl = {image1} 
                    title = "Tranquil Forest and Ocean View" 
                    description = "A breathtaking view of a dense forest with a serene ocean and distant mountains in the background. The tranquility of nature is perfectly captured, offering a peaceful escape from the hustle and bustle of everyday life." 
                    rating = "5" 
                    author = "Paul Jarvis" 
                />

                <Item 
                    imageUrl = {image2}
                    title = "Rugged Rocky Coastline" 
                    description = "A rugged coastline with large rocks jutting out into the calm sea. The natural beauty of the rocky shore against the vast ocean creates a stunning and serene landscape."  
                    rating = "5" 
                    author = "Paul Jarvis" 
                />

                <Item
                    imageUrl = {image3} 
                    title = "Creative Workspace Essentials" 
                    description = "A neatly organized workspace featuring a laptop, various design books, pencils, and a notebook. This setup embodies the essentials of a creative professional, ready to dive into their next big project." 
                    rating = "5" 
                    author = "Aleks Dorohovich" 
                />

            </div>

        <button class = "see-all">See all articles!</button>

    </div>
    )
    
}

export default FeaturedArticles