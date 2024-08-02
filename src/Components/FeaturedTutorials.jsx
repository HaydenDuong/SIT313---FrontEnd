import React from 'react';
import './FeaturedArticles.css';
import Item from './Item';
import image1 from '../Image/five.jpg';
import image2 from '../Image/four.jpg';
import image3 from '../Image/six.jpg';

function FeaturedTutorials() {
  return (
    <div class = "container">

      <h1>Featured Tutorials</h1>

      <div class = "items">

        <Item 
          imageUrl = {image1} 
          title = "Inside the Gadget: Disassembly Tutorial" 
          description = "Explore the intricate details of electronic devices with this disassembly tutorial. Understand the components and their functions as you take apart and examine each piece carefully." 
          rating = "5" 
          author = "Vadim Sherbakov" 
        />

        <Item 
          imageUrl = {image2}
          title = "Essential Tools for Creative Professionals" 
          description = "Discover the essential tools every creative professional needs. From notebooks to headphones, this tutorial will guide you through the must-have items to enhance your productivity and creativity."  
          rating = "5" 
          author = "Vadim Sherbakov" 
        />

        <Item 
          imageUrl = {image3} 
          title = "Capturing Urban Landscapes: Photography Tips" 
          description = "Learn how to capture stunning urban landscapes with this photography tutorial. Get tips on composition, lighting, and techniques to bring the beauty of city streets to life in your photos." 
          rating = "4.9" 
          author = "Nicholas Swanson" 
        />

      </div>

      <button class = "see-all">See all tutorials!</button>
      
    </div>
  );
}

export default FeaturedTutorials;