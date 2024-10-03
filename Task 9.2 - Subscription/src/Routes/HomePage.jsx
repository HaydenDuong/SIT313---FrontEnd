import React from 'react';
import SearchBar from '../Components/SearchBar';
import BigImage from '../Components/BigImage';
import FeaturedArticles from '../Components/FeaturedArticles';
import FeaturedTutorials from '../Components/FeaturedTutorials';
import SignUpForm from '../Components/SignUpForm';
import Footer from '../Components/Footer';

const HomePage = () => {
    return (
        <div>
            <SearchBar />
            <BigImage />
            <FeaturedArticles />
            <FeaturedTutorials />
            <SignUpForm />
            <Footer />
        </div>
    )
}
  
export default HomePage;