import React, { Component } from "react";
import data from '../data';
import Modal from 'react-bootstrap-modal'
import css from "react-bootstrap-modal/lib/css/rbm-complete.css";


let timestamp = new Date();

let filtro, context;
class Centerpanel extends Component {

    constructor() {
        super()
        this.state = {
            data: [],  
            open: false, 
            modal:[], 
            entrada:"",     
        }
        context = this;
        console.log("Hora actual del Cliente " + timestamp.getTime() + ": " + timestamp);
    }
        closeModal = () => this.setState({ open: false })
        getdata(id,entrada){
            fetch('http://kingdeportes.com/oddsMaster/api/list/model/odds/id/3261369', { cache: "no-cache" }).then(results => {
                return results.json();
            }).then(modal => {
                context.setState({
                    modal,
                    entrada,
                }) 
               
            });
            this.setState({open:true})   
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

 
    render() {
        
        /**
        Obtengo las cabezeras de la tabla
        **/
        let liganombre = "";
        let l = this.state.data;
        let ligasId = Object.keys(l);
        let liga = ligasId.map(idliga=> {
            let o = l[idliga].matches

            liganombre = l[idliga].sportName + " " + l[idliga].name;
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
                    odd: y.data[139992] ? y.data[139992].o2 : "",
                    option: "NG",
                    price: y.data[139992] ? y.data[139992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[139992] ? y.data[139992].type : "",
                    version: y.data[139992] ? y.data[139992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
             
              
               
                return (
                    
                <tr key= {y.idmatch} >
                        <th style={{width:70}} >
                            <div style={{color:'#C0C11A',fontSize:13}} >
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
                            <th className="botn btn" onClick={this.getdata.bind(this, y.idmatch, { name: y.name, time: timess, hora: hours + ":" + minutes + pmam, liga: liganombre })} style={{ color: '#C0C11A' }}>{y.more ? y.more : ""}</th>

                        </th>
                       
                 </tr>
                );
            })
            
            return(

                <table key={idliga} id={idliga} id="table-central">
                    <thead id="thead-central">
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
       
        let m = this.state.modal;
        let ids = Object.keys(m);
        let idss = ids.map(mo => {
let body = m[mo].data;
            let yy = Object.keys(body).map(yo=>{
                let jj = body[yo];
                let c1 = jj.o1;
                let c2 = jj.o2;
                let c3 = jj.o3;

               
                   switch (m[mo].id) {
                       case 1:
                           return (
                           <tr>
                             
                               <td> {c1} </td>
                               <td> {c2} </td>
                               <td> {c3} </td>

                           </tr>
                           )
                           break;
                       case "29992":
                           return (
                               <tr>
                                 
                                   <td> {"OV ("+c3+")            "+c1} </td>
                                   <td> {"UN (" + c3 + ")        " + c2} </td>
                                 

                               </tr>
                           )
                           break;
                       default:
                           return (
                               <tr>
                                 
                                   <td> {c1} </td>
                                   <td> {c2} </td>
                                   <td> {c3} </td>

                               </tr>
                           )
                           break;
                   } 

            


                
            })
            return(
                <div key={mo}>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan="3">{m[mo].name}</td> 
                             
                            </tr>
                           
                        </thead>
                        <tbody> 
                            {yy}
                        </tbody>
                    </table>
                
                </div>
                
            )

        })

        return (

            
            
            <div className="panels">
              {liga}

                <Modal 
                    show={this.state.open}
                    onHide={this.closeModal.bind()}
                    aria-labelledby="ModalHeader"
                >
                
                    <Modal.Header closeButton style={{ background: "rgba(255, 247, 0)" }}>
                        <Modal.Title id='ModalHeader' style={{ color: '#000000', textAlign:"center" }}>
                        
                            <div> {this.state.entrada.liga}<br /></div>
                            <div style={{ color: "#1e90ff", fontSize: 15 }} >{this.state.entrada.name}<br/> </div>
                            <div> <small>{this.state.entrada.time} - {this.state.entrada.hora}</small></div>
                           
                         </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: "rgba(255, 247, 0)" }}> 
                       
                        {idss} 
                       
                    </Modal.Body>
                    <Modal.Footer>
                       
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

                      
                        <button className='btn btn-primary' onClick={this.closeModal.bind()}>
                            Save
            </button>
                    </Modal.Footer>
                   
                </Modal>
               
       
            </div >

        );
    }
}


export default Centerpanel;