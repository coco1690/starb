import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import data from '../data';
// import Moment from 'react-moment';

// import 'moment-timezone';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// const p = "5%";
let timestamp = new Date();
// const matches = data.database().ref('matchesAll').orderByChild('timestamp').startAt(timestamp.getTime() / 1000);
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
        fetch('http://kingdeportes.com/oddsMaster/api/list/model/next',{cache:"no-cache"}).then(results => {
            return results.json();
        }).then(data => {
            context.setState({
                data: data,             
            })
            console.table(data)           
        });

    }
    componentWillUnmount(){
        this.setState({data:[]})
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
        let liga = ligasId.map(idliga=> {
            let o = l[idliga].matches

            
            let listaeventos = Object.keys(o).map(idevent=>{
                let y = o[idevent];
                let min = 1, max = 4.5;
                let timess = new Date(y.timestamp * 1000);
                let pmam = 'AM';
                var hours = timess.getHours();
                // correct for number over 24, and negatives
                if (hours >= 24) { hours -= 24; }
                if (hours <=0) { hours += 12; }
                if (hours > 12) { hours -= 12; pmam='PM'}
                    

                // add leading zero, first convert hours to string
                hours = hours + "";
                if (hours.length === 1) { hours = "0" + hours; }

                // minutes are the same on every time zone
                var minutes = timess.getMinutes();

                // add leading zero, first convert hours to string
                minutes = minutes + "";
                if (minutes.length === 1) { minutes = "0" + minutes; }


                var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var dd = timess.getDate();
                dd = dd < 10 ? '0' + dd : dd;
                var today = months[timess.getMonth()] + " " + dd;
                timess = today;
                let cuotas = y.data;
            //   let cuota=  Object.keys(cuotas).map(idlogro=>{
            //       let nn = cuotas[idlogro];

            //         nn.idtlogro


            //         return(
                        
            //             <th>
            //                 {cuotas[idlogro].o1}<br/>
            //                 {cuotas[idlogro].o2}<br />
            //                 {cuotas[idlogro].o3}<br />
            //             </th>
            //         )
            //     })
                let datalocal1 = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[19992] ? y.data[19992].o1: "",
                    option: y.home,
                    price: y.data[19992] ? y.data[19992].o1 : "",
                    time: hours + ":" + minutes + pmam +" - "+ timess,
                    type: y.data[19992] ? y.data[19992].type : "",
                    version: y.data[19992] ? y.data[19992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let dataempatex = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[19992] ? y.data[19992].o2 : "",
                    option: "Empate",
                    price: y.data[19992] ? y.data[19992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[19992] ? y.data[19992].type : "",
                    version: y.data[19992] ? y.data[19992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datavisitante2 = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[19992] ? y.data[19992].o3 : "",
                    option: y.away,
                    price: y.data[19992] ? y.data[19992].o3 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[19992] ? y.data[19992].type : "",
                    version: y.data[19992] ? y.data[19992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let data1x = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[49992] ? y.data[49992].o1 : "",
                    option: "1X",
                    price: y.data[49992] ? y.data[49992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[49992] ? y.data[49992].type : "",
                    version: y.data[49992] ? y.data[49992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let data12 = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[49992] ? y.data[49992].o2 : "",
                    option: "12",
                    price: y.data[49992] ? y.data[49992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[49992] ? y.data[49992].type : "",
                    version: y.data[49992] ? y.data[49992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let data2x = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[49992] ? y.data[49992].o3 : "",
                    option: "2X",
                    price: y.data[49992] ? y.data[49992].o3 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[49992] ? y.data[49992].type : "",
                    version: y.data[49992] ? y.data[49992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };

                let dataunder={
                    choose: 1, 
                    id: y, 
                    name: y.name, 
                    odd: y.data[29992]? y.data[29992].o1 + '(<' + y.data[29992].o3 + ')':"", 
                    option: "Under", 
                    price: y.data[29992] ? y.data[29992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess, 
                    type: y.data[29992]?y.data[29992].type:"", 
                    version: y.data[29992]? y.data[29992].version:"",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                  };
                let dataover = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[29992] ? y.data[29992].o2 + '(<' + y.data[29992].o3 + ')' : "",
                    option: "Over",
                    price: y.data[29992]? y.data[29992].o2:"",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[29992] ? y.data[29992].type : "",
                    version: y.data[29992] ? y.data[29992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datagg = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[139992] ? y.data[139992].o1 : "",
                    option: "GG",
                    price: y.data[139992] ? y.data[139992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[139992] ? y.data[139992].type : "",
                    version: y.data[139992] ? y.data[139992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datang = {
                    choose: 1,
                    id: y,
                    name: y.name,
                    odd: y.data[139992] ? y.data[139992].o1 : "",
                    option: "NG",
                    price: y.data[139992] ? y.data[139992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[139992] ? y.data[139992].type : "",
                    version: y.data[139992] ? y.data[139992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
             

               
                return (
                    
                <tr key= {y.idmatch} >
                        <th style={{width:70}} >
                            <div style={{color:'#C0C11A'}} >
                                {hours   + ":"+ minutes + pmam}
                            </div>
                            <small>
                                {timess} 
                            </small>                     
                        </th>
                        <th style={{textAlign: 'left', width:'28%'}} >{y.name}</th>
                        <th style={{width:40}} ><i className='ion-stats-bars'></i></th>

                        <th>
                            <th className="botn btn" style={{}} onClick={ this.props.addTocart.bind(this, y.idmatch,datalocal1)}>{y.data[19992] ? y.data[19992].o1 : "-"} </th>
                            {/* onClick={ this.props.addTocart.bind(this, z) } */}
                            {/* <button class="btn confirm" style="width: 100%; height: 40px; color: rgb(0, 0, 0); background: rgb(255, 247, 0); font-size: 14px; border: hidden;">Confirmar</button> */}
                           
                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, dataempatex)}>{y.data[19992] ? y.data[19992].o2 : "-"}</th>
                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, datavisitante2)}>{y.data[19992] ? y.data[19992].o3 : "-"}</th>
                        </th>

                        <th>
                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, data1x)}>{y.data[49992] ? y.data[49992].o1  : "-"}</th>
                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, data12)}>{y.data[49992] ? y.data[49992].o2 : "-"}</th>
                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, data2x)}>{y.data[49992] ? y.data[49992].o3 : "-"}</th>
                        </th>

                        <th>

                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, dataunder)}>{y.data[29992] ? y.data[29992].o1  : "-"}</th>
                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, dataover)}>{y.data[29992] ? y.data[29992].o2 : "-"}</th>
                            <th className="botnn"style={{ color: '#C0C11A'}}>{y.data[29992] ? y.data[29992].o3 : ""}</th>

                        </th>
                        <th>

                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, datagg)}>{y.data[139992] ? y.data[139992].o1 : "-"}</th>
                            <th className="botn btn" style={{}} onClick={this.props.addTocart.bind(this, y.idmatch, datang)}>{y.data[139992] ? y.data[139992].o2 : "-"}</th>
                            <th className="botn btn" style={{ color: '#C0C11A' }}>{y.more ? y.more : ""}</th>

                        </th>
                       
                 </tr>
                );
            })
            
            return(

                <table key={idliga} id={idliga} className="table table-sm table-bordered bg-light">
                    <thead className="table-primary">
                        <tr >
                            <th colSpan='3' style={{ textAlign: 'left', fontSize: 12 }}  ><i className='ion-android-stopwatch'></i>{l[idliga].sportName + " " + l[idliga].name}</th>
                            <th className='text-center' style={{wordSpacing: '20pt',fontSize: 10}}>1 X 2 </th>
                            <th className='text-center' style={{ wordSpacing: '15pt',fontSize: 10 }}>1X 12 2X</th>
                            <th className='text-center' style={{ wordSpacing: '15pt',fontSize: 10 }}>UN  OV  T</th>
                            <th className='text-center' style={{ wordSpacing: '15pt',fontSize: 10 }}>GG NG +</th>
                          
                        </tr>

                    </thead>
                    <tbody>

                        {listaeventos}
                    </tbody>
                </table>

          
            )
               
        });

        
        // console.log(c)
        console.log(liga)
       
        return (

            
            
            <div className="panels">
              {liga}


               
             {/* {salida}  */}

                {/* {this.state.data === 1 ? "Cargando..." : this.generarTabla(this.state.data)}
                {this.generarTabla(this.state.matchesAlternative)}
                {this.generarTabla(this.state.matches)} */}
            </div >

        );
    }
}


export default Centerpanel;