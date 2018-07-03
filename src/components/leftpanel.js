import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

class Leftpanel extends Component {

    constructor() {
        super()
        this.openCity = this.openCity.bind(this)
        this.state = {
            menu: {},
        }
    }
    componentDidMount() {
        var context = this;
        fetch('http://kingdeportes.com/oddsMaster/api/list/model/menu/',{cache:"no-cache"}
        ).then(results => {
            return results.json();
        }).then(data => {
            context.setState({ menu: data })
            // console.table(data);
        });
    }
    componentWillUnmount(){
        this.setState({menu:{}})
    }
    openCity(event, y) {
        var i, tabcontent, tablinks;
        //		    console.log(event.target);
        //			console.log(y);
        event.currentTarget.className += " active";
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("sportbutton");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(y).style.display = "table";
        event.currentTarget.className += " active";





    }
    render() {
        //        let i,countriesfav,sportbutton;
        let paises = [], aux;
        let b = this.state.menu;
        let deportesId = Object.keys(b);


        let deportes = deportesId.map(index => {
            if (b[index].countries) {

                let paisId = Object.keys(b[index].countries)
                let c = b[index].countries;

                aux = paisId.map(index2 => {
                    return (
                        <div key={index2} style={{ display: 'table', width: '100%', maxHeight: 600,  }} className="countriesfav">
                            <div style={{ display: 'table-row' }}>
                            <div>
                                    <Link  className={"country btn "+c[index2].class}style={{width: '140px', color: 'white', display: 'table-cell' }} to={"/sport/"+index+"/pais/" + index2} >
                                    
                                    {c[index2].name}
                                   
                                    
                                    </Link> 
                                    </div>
                            </div>
                        </div>
                    )
                })
            } else {
                return null;
            }


            //  ---------------------MUESTRA PAISES-------------------------------
            aux = <div key={index} className="tabcontent" id={index}>
                {aux}
            </div>
            paises.push(aux);
            // if(b[index].class=="active")
            // this.openCity(null, index)
            return (
                <div key={index} className={"sportbutton btn " + b[index].class} onClick={(event) => this.openCity(event, index)} style={{ backgroundImage: "url(/img/icons/" + index + ".png)" }}>
                    <div style={{ position: "absolute", bottom: "7px", fontSize: 12, width: "100%", left: 0, textAlign: "center" }}> {b[index].name}
                    </div>
                </div>
            )
        })

        // return (
        //     <div>
        //         <div id="buscar">
        //             <input placeholder="Buscar" style={{ width: '100%' }} type="text" />
        //         </div>

        //         <div id="contenedor-deportes">
        //             <div className="contenedor-deportes">
        //                 <div id="contenedorsub-deportes">
        //                     {deportes}
        //                 </div>

        //                 <Scrollbars style={{ height: 500, display: 'table-cell', verticalAlign: 'top' }}>
        //                     <div id="contendor-paises">
        //                         {paises}
        //                     </div>

        //                 </Scrollbars>
        //             </div>
        //         </div>
        //     </div>

        return (
            // <div>
            //     <div style={{ background: 'rgba(255,255,255,0.1)', padding: 5, marginBottom: 10 }}>
            //         <input placeholder="Buscar" style={{ width: '100%' }} type="text" />
            //     </div>

            <div>
            <div id="buscar">
                <input placeholder="Buscar" style={{ width: '100%' }} type="text" />
            </div>
                
                <div className="contenedor-deportes">
                    
                    <div className="contenedor-deportes2">
                       
                        <div style={{ width: 70, margin:1 }}>
                            {deportes}
                        </div>
                        

                        <Scrollbars
                            style={{ height: 425, display: 'table-cell', verticalAlign: 'top' }}>
                            <div style={{ display: 'table-cell', verticalAlign: 'top', width: '150%', maxHeight: 425 }}>
                                {paises}
                            </div>

                        </Scrollbars>
                       
                    </div>
                   
                </div>
                  
            </div>



        );

    }

}
export default Leftpanel;
