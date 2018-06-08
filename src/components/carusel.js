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
            
            <Carousel showThumbs={false} showStatus={false}  stopOnHover autoPlay interval={5000} infiniteLoop dynamicHeight  >
                <div>
                    <img id="1" alt="" style={{ marginTop: -100}} src="/img/icons/22.jpg" />                                    
                </div>
                <div>
                    <img id="2" alt="" style={{ marginTop: -100 }} src="/img/icons/21.jpg" />
                </div>
                <div>
                    <img id="3" alt="" style={{ marginTop: -40 }}src="/img/icons/20.jpg" />

                </div>
               
            </Carousel>
            
        );
        // return null
    }
}

export default Carusel;
