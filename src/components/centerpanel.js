import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import data from '../data';
// import Moment from 'react-moment';

// import 'moment-timezone';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// const p = "5%";
let timestamp = new Date();
const matches = data.database().ref('matchesAll').orderByChild('timestamp').startAt(timestamp.getTime() / 1000);
let filtro, context;
class Centerpanel extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
           
        }
        context = this;
        console.log("Hora actual del Cliente " + timestamp.getTime() + ": " + timestamp);
    }

    componentDidMount() {
        fetch('http://kingdeportes.com/oddsMaster/api/list/model/next').then(results => {
            return results.json();
        }).then(data => {
            context.setState({
                data: data,
             
            })
            console.table(data)
           

        });

    }

    // static getDerivedStateFromProps(props, current_state) {
    //     if (current_state.index2 !== props.match.params.index2) {
    //         context.setState({
    //             resultados: 1
    //         })

    //         console.log("Buscando pais en el deporte seleccionado: " + props.match.params.index2);
    //         filtro = data.database().ref('matchesAll').orderByChild('countryId').equalTo(props.match.params.index2);

    //         filtro.on("value", snapshot => {

    //             console.log("Busqueda finalizada..");
    //             // console.table(snapshot.val());

    //             if (snapshot.val()) {

    //                 context.setState({
    //                     resultados: snapshot.val()
    //                 });
    //             } else {
    //                 context.setState({
    //                     resultados: 0
    //                 })
    //             }
    //         });
    //         return null;

    //     }
    //     return null;

    // }
   
    render() {
        
        // let liga=  Object.keys (this.state.data).map(i=>{
        //     return(
                
        //     )
        // })
        /**
        Obtengo las cabezeras de la tabla
        **/
        let l = this.state.data;
        let ligasId = Object.keys(l);
        let liga = ligasId.map(index=> {
            return(
                l[index].name
            )
               
        });

        
        // console.log(c)
        console.log(liga)
       
        return (

            <div className="panels">
                < table >
                    < tr >
                        < th > hora </ th >
                        < th >  {liga} </ th >
                        < th > others </ th >
                    </ tr > 
                     
                    </table>
          
             {/* {salida}  */}

                {/* {this.state.data === 1 ? "Cargando..." : this.generarTabla(this.state.data)}
                {this.generarTabla(this.state.matchesAlternative)}
                {this.generarTabla(this.state.matches)} */}
            </div >

        );
    }
}


export default Centerpanel;