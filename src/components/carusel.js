import React from "react";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import  'react-responsive-carousel/lib/styles/carousel.min.css';





class Carusel extends React.Component {
    // constructor() {
    //     super()
    // }

    render() {

       

        return (
            
            <Carousel showArrows={false} showThumbs={false} showStatus={false}  stopOnHover autoPlay interval={5000} infiniteLoop dynamicHeight  >
                <div>
                    <img id="1" alt="" style={{ marginTop: 0}} src="/img/icons/slid11.png" />                                    
                </div>
                <div>
                    <img id="2" alt="" style={{ marginTop: 0 }} src="/img/icons/slid12.png" />
                </div>
                <div>
                    <img id="3" alt="" style={{ marginTop: 0}} src="/img/icons/slid13.png" />

                </div>
                <div>
                    <img id="4" alt="" style={{ marginTop: 0}} src="/img/icons/slid14.png" />

                </div>
               
            </Carousel>
            
        );
        // return null
    }
}

export default Carusel;
