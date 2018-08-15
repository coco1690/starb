import React from "react";
import Sticky from 'react-sticky-el';
// import ReactModal from 'react-modal';

import { Scrollbars } from 'react-custom-scrollbars';
// import Modal from 'react-modal';
// import Imprimir from "./imprimir";
// import { Link } from 'react-router-dom';


// import { Components } from 'react-bootstrap-navbar';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };

let context
class Rightpanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stake: this.props.stake,
            items: this.props.items,
            total: this.props.total,
           
            lastItem: {},
        };
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        context = this;


    }
  

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.items !== props.items) {

            context.setState({
                items: props.items,
                stake: props.stake
            })


        }
        return null;

    }

    render() {
        // let closeModal = () => this.setState({ open: false })
        let p = 1; let q = 1;
        // console.log("****  Items del Cupon **********");
        // console.table(this.state.items);
        let items = this.state.items
        let itemsid = Object.keys(items)
        let obj = itemsid.map((idApuesta) => {
            p = p * items[idApuesta].price;
            p = p.toFixed(2);
            q = p * this.props.stake;
            return (
                <div key={idApuesta} className="panelright">
                    <div style={{ padding: "5px", position: "relative", textAlign: "left" }}>
                        <span style={{ display: "block", fontSize: 15, paddingBottom: 10, color: "rgb(255, 255, 255)" }}>
                            {items[idApuesta].liga}
                        </span>
                        <span style={{ display: "block", fontSize: 14, paddingBottom: 10, color: "rgb(254, 224, 100)" }}>
                            {items[idApuesta].name}
                        </span>
                        <div style={{ display: "inline", paddingTop: 10, fontSize: 12 }}>{items[idApuesta].time}</div> <br />
                        <div style={{ display: "inline", paddingTop: 10, color: "rgb(254, 224, 100)", fontSize: 12 }}>
                            <div style={{ display: "table-cell" }}><span>{items[idApuesta].option + " " + items[idApuesta].odd}</span></div>
                            <div style={{ display: "table-cell", right: 1, color: 'white', float: "right" }}>
                                <div to="#" className="btn botn" style={{ marginTop: -50, padding:6 }} onClick={this.props.removeFromCupon.bind(this, idApuesta)}><span style={{fontSize:16}} className="ion-ios-trash"></span></div></div>
                        </div>
                    </div>
                </div>
            )
        })




        // let o = this.props.item.data ? this.props.item.data : {};
        // let d = this.props.item.info ? this.props.item.info : { Agencia: "", Usuario: "", ID: "", Fecha: "", Monto: "", Cuota: "", Ganancia: "" }
        // console.log(d);
        // let oo = Object.keys(o);

        
        return (

            <div className="right-panel">
            <Sticky className="mierda">

                






                    <div style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div className="cuponrigth">
                            <i className="ion ion-clipboard" style={{ marginRight: 10, fontSize: 14 }}></i>
                            <span className="ticket-title ">Cupón  </span>
                            <div className="speech-bubble">
                                <div className="cup">{itemsid.length}</div>
                               
                            </div>
                           
                        </div>


                        <Scrollbars style={{ display: 'inline-block', height: 320, width: '100%' }}>

                            <div className="part" style={{ fontWeight: 100 }}>

                                {obj}

                            </div>

                        </Scrollbars>

                        <div className="mm" >
                            <div style={{ marginTop: 20, margin:0}}>
                                <div style={{ width: 70, marginLeft: 10}}> Cantidad: </div>
                               
                                    <input id="amount" placeholder="Ej: 2000" type="number" style={{ boxSizing: 'border-box', height: 30, width: 140, border: 'hidden', outline: 'none', padding: 5, textAlign: 'right', marginLeft:109 }} value={this.props.stake}   onChange={this.props.changeStake} /></div>
                           
                            <div style={{ marginTop: 20, margin: 10 }}>Cuota:
                                <span style={{ float: 'right', fontWeight: 'bold' }} className="totalodd">{p}</span>
                            </div>
                            <div style={{ marginTop: 10, margin: 10 }}>Pago Total:
                                <span style={{ float: 'right', fontWeight: 'bold' }}>
                                    <span className="currency-symbol">$</span>
                                    <span className="totalwin">{q.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </span>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <button className="btn confirm" onClick={this.props.save} style={{ boxSizing: 'borderBox', width: '100%', height: 40, color: '#000', background: '#fff700', fontSize: 14, border: 'hidden' }}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                
            </Sticky>
            </div>
        );
    }
}

export default Rightpanel;