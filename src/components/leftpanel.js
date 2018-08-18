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
        fetch('http://91.121.116.131/gecko/api/menu', { cache: "no-cache" }
        ).then(results => {
            return results.json();
        }).then(data => {
            context.setState({ menu: data })
            // console.table(data);
        });
    }
    componentWillUnmount() {
        this.setState({ menu: {} })
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
        let deportes;
        if (deportesId.length > 0) {
            deportes = deportesId.map(index => {
                // console.log(index)
                if (b[index].countries) {

                    let paisId = Object.keys(b[index].countries)
                    let c = b[index].countries;

                    aux = paisId.map(index2 => {
                        // console.log(index2)
                        return (
                            <div key={index2} style={{ display: 'table', width: '100%', maxHeight: 600, }} className="countriesfav">
                                <div style={{ display: 'table-row' }}>
                                    <div>
                                        <Link className={"country:active country:focus country:hover country " + c[index2].class} style={{ width: 126, color: 'white', display: 'table-cell', fontSize: 14 }} to={"/sport/" + index + "/pais/" + index2} >
                                            &nbsp;&nbsp;   <i className={"ficon-inline f-" + index2}></i>&nbsp;&nbsp;
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
                aux = <div key={index} className="tabcontent" style={index===1?{display:'table'}:{}} id={index}>
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
        } else {
            deportes = <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        }

        return (

            <div>
                <div id="buscar">
                    <input placeholder="Buscar" style={{ width: '100%' }} type="text" />
                </div>

                <div className="contenedor-deportes">

                    <div className="contenedor-deportes2">

                        <div style={{ width: 70, margin: 1, background:"#000"}}>
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
