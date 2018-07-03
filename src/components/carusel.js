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
                    <img id="1" alt="" style={{ marginTop: 0}} src="/img/icons/slid1.png" />                                    
                </div>
                <div>
                    <img id="2" alt="" style={{ marginTop: 0 }} src="/img/icons/slid2.png" />
                </div>
                <div>
                    <img id="3" alt="" style={{ marginTop: 0}}src="/img/icons/slid3.png" />

                </div>
               
            </Carousel>
            
        );
        // return null
    }
}

export default Carusel;
