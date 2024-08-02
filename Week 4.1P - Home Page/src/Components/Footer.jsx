import React from 'react';                    
import './Footer.css';
import facebookIcon from '../Image/facebook.png';
import twitterIcon from '../Image/twitter.png';
import instagramIcon from '../Image/instagram.png';
                    
function Footer() {
    return (
        <footer class = "footer">
            <div class ="footer-column">

                <h3>Explore</h3>

                {/* Replace <span> with <a href = "url"> where url is the website link */}
                {/* <span>: is prefered for display purpose as it is used to group inlne elements to apply CSS styles*/}
                {/* The <ul> and <li> elements in HTML are used to create unordered lists, which are collections of items presented in a bullet-point format. These elements are useful for structuring content in a way that is easy to read and navigate.
                    <ul> Element
                        Description: The <ul> (unordered list) element is a block-level element that is used to create a list of items in which the order does not matter.
                        Attributes:
                            type: Specifies the kind of marker to use in the list (e.g., disc, circle, square). It is rarely used as styles are typically handled with CSS.
                    <li> Element
                        Description: The <li> (list item) element is used to represent an item in a list. It must be contained within a parent list element, such as <ul>, <ol>, or <menu>.
                        Attributes:
                            value: Used only within an <ol> to specify the value of the list item.*/}
                <ul>
                    <li><span>Home</span></li>
                    <li><span>Questions</span></li>
                    <li><span>Articles</span></li>
                    <li><span>Tutorials</span></li>
                </ul>
            </div>

            <div class = "footer-column">

                <h3>Support</h3>

                <ul>
                    <li><span>FAQs</span></li>
                    <li><span>Help</span></li>
                    <li><span>Contact Us</span></li>
                </ul>
            </div>

            <div class = "footer-column">

                <h3>Stay connected</h3>
                
                <ul class = "social-icons">
                    <li><img src = {facebookIcon} alt = "Facebook" /></li>
                    <li><img src = {twitterIcon} alt = "Twitter" /></li>
                    <li><img src = {instagramIcon} alt = "Instagram" /></li>
                </ul>
            </div>
            
            <div class = "footer-bottom">

                <p>DEV@Deakin 2024</p>

                <ul>
                    <li><span>Privacy Policy</span></li>
                    <li><span>Terms</span></li>
                    <li><span>Code of Conduct</span></li>
                </ul>
            </div>
        </footer>
    );
}
                    
export default Footer;