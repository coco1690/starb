import React, { Component } from "react";
import data from '../data';
// import Moment from 'react-moment';

import 'moment-timezone';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


let timestamp = new Date();
//timestamp.getTime()
let tj = [];
// let tr;
const matches = data.database().ref('matchesAll').orderByChild('timestamp').startAt(timestamp.getTime()/1000);
let filtro,context;
class Centerpanel extends Component {

    constructor() {
        super()
        this.state = {
            matches: [],
        }
        context = this;
        console.log("trabajando con " + timestamp.getTime() + " = " + timestamp);
    }

    componentDidMount() {
        matches.on('value', snapshot => {
            // console.log("events:", snapshot.val());

            var idListaEventos = Object.keys(snapshot.val());
            // console.log("mis eventos ID: ", idListaEventos);

            var listaEventos = idListaEventos.map((id) => {
                let events = snapshot.val();

                var a = new Date(events[id].timestamp * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                // var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var ampm = hour >= 12 ? 'pm' : 'am';
                hour = hour % 12;
                hour = hour ? hour : 12
                hour = hour < 10? "0"+hour:hour;
                var min = a.getMinutes();
                min = min < 10? "0"+min:min;
               
                var time = hour + ':' + min+' '+ampm ;
                date = date + ' ' + month;

                let odds = events[id].odds;

                if (odds !== undefined) {
                    // console.table({ idm: id, odds: odds });
                    // return events[id];
                    let clave = Object.keys(events[id].odds);
                    // console.log("ceys:  ", clave);
                    // let nombres = clave.map((i)=>{return odds[i].name });
                    // console.log("names: ", nombres);
                 
                    return {

                        id: events[id].idmatch,
                        pais: events[id].countryId,
                        text: "+ 00",
                        name: events[id].fullname,
                        // time: time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear() + " - " + time.getHours(),
                        time:time,
                        date:date,
                        odds: events[id].odds,
                        // demo: JSON.stringify(test["03"].short ? test["03"].short : test["03"].activeType),
                        claves: clave.toString(),

                        //  o1:events[i].odds[clave[0]][0].o1

                    }
                } else return null;
                //
            });
            listaEventos = listaEventos.filter((i) => { return i != null })
            // console.table(listaEventos);


            this.setState({
                matches: listaEventos,
            })
            // console.log(this.state.matches)
        });
        // console.log(this.props.match.params)
        // console.log(this.props.match.data)

    }

    componentWillUnmount() {
        matches.off();
    }

    static getDerivedStateFromProps(props, current_state){
        if (current_state.index2 !== props.match.params.index2){
            console.log("Se actualizo la prop a "+props.match.params.index2);
            filtro = data.database().ref('matchesAll').orderByChild('countryId').equalTo(props.match.params.index2);
            filtro.on("value",snapshot=>{
                console.log("por agregar al listado");
                console.table(snapshot.val());
                context.setState({
                    sport: props.match.params.index2,
                    
                     groupId: 205
                 });
            });
            return null;

        }
        return null;
        
    }

    render() {

        // -------------------------------------------------------columna_others--------------------------------------------------------------------------
        let otros = ["Others"]
        let tableo = otros.map((y) => {
            return <TableHeaderColumn key={y} dataFormat={oformat} width='5%' dataField='text' dataAlign="center" tdStyle={{ textAlign: 'left', }}>{y}
            </TableHeaderColumn>
        });
        // -------------------------------------------------------columna_OV/UN_GG/NG----------------------------------------------------------------------
        // let j = ["OV / UN", "GG / NG"];
        let j = tj;

        j = j.filter((y, pos) => { return j.indexOf(y) === pos; })


        let tablej = j.map((y) => {
            return <TableHeaderColumn key={y} dataFormat={Formatter} width='70' dataField='text' dataAlign="center" tdStyle={{ textAlign: 'left', }}>{y}</TableHeaderColumn>
        });

        function Formatter(cell, row) {
            return (<div>
                <div className='botn btn'>{cell}</div>
                <div className='botn btn'>{cell}</div>
            </div>);
        }
        
        // -------------------------------------------------------columna_TIMES_PARTIDOS-------------------------------------------------------------------


        function oformat(cell, row) {
            return (<div>
                <div className="btn"><img alt="" src='/img/icons/11.png' style={{ marginLeft: 10 }} /></div>
            </div>);
        }
      
        // -------------------------------------------------------columna_BANDERAS_PAISES------------------------------------------------------------------

        function bandera(cell, row) {
            return (
                <div>
                    &nbsp;&nbsp;   <i className={"ficon-inline f-" + row.pais}></i>&nbsp;&nbsp;
                {cell}
                </div>);
        }
        function time(cell, row) {
            return (
                <div>    
                    {row.time}            
                <br/><small>
                {cell}</small>
                </div>);
        }

      
// -------------------------------------------------------TABLA_DE_MATCHES----------------------------------------------------------------------
        return (
            
            
                <div className="panels">
                <div style={{ padding: 20, fontSize: 16, fontWeight: 'bold', background: 'rgba(255,255,255,0.1)', textTransform: 'uppercase' }} className="title-text">
                Fútbol-Próximos         
               <small> {" pais: "+this.props.match.params.index2+" + deporte: "+this.props.match.params.index}</small>
                </div>

                <div className="matches-panel">

                    <BootstrapTable data={this.state.matches} tableStyle={{ fontSize: 12, border: '1px solid rgba(255, 255, 255, 0.1)' }} >


                        <TableHeaderColumn dataField='date' dataFormat={time} isKey width='10%' dataAlign="center">
                            <img alt="" style={{ margin: 9 }} src='/img/icons/10.png' />
                        </TableHeaderColumn>

                        <TableHeaderColumn dataField='name' dataFormat={bandera} tdStyle={{
                            textAlign: 'left',
                        }} dataAlign="center"></TableHeaderColumn>
                        {/* {table} */}
                        {tablej}
                        {tableo}
                    </BootstrapTable>

                </div>
            </div >

        );
    }
}


export default Centerpanel;