import React from 'react'
import '../CSS/BigImage.css'

function BigImage() {
    return (
        <div class = "image-container">
            <img src= {require("../Image/school.jpeg")} alt = "School" class = "responsive-image"></img>
        </div>
    )
}

export default BigImage