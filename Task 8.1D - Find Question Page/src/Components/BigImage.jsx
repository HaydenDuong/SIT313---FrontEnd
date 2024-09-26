import React from 'react'
import '../CSS/BigImage.css'

function BigImage() {
    return (
        <div className = "image-container">
            <img src= {require("../Image/school.jpeg")} alt = "School" className = "responsive-image"></img>
        </div>
    )
}

export default BigImage