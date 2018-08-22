import React from "react";
import Sticky from 'react-sticky-el';
// import ReactModal from 'react-modal';

import { Scrollbars } from 'react-custom-scrollbars';


let context
class Rightpanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            stake: ""
        };
        this.changeStake = this.changeStake.bind(this);
        context = this;


    }
    changeStake(stake) {
        this.setState({ stake: stake.target.value })
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.items !== props.items) {

            context.setState({
                items: props.items,
            })


        }
        return null;

    }

    render() {

        let items = this.state.items
        let itemsid = Object.keys(items)
        let obj = itemsid.map((idApuesta) => {

            return (
                <div key={idApuesta} className="panelright">
                    <div style={{ padding: "5px", position: "relative", textAlign: "left" }}>
                        <div style={{ display: "table-cell", right: 1, color: 'white', float: "right" }}>
                            <div to="#" className="btn botn" style={{ marginTop: 0, padding: 6 }} onClick={this.props.removeFromCupon.bind(this, idApuesta)}>
                                <span style={{ fontSize: 16 }} className="ion-ios-trash"></span>
                            </div>
                        </div>

                        <span style={{ display: "block", fontSize: 15, color: "rgb(255, 255, 255)" }}>
                            {items[idApuesta].liga}
                        </span>
                        <span style={{ display: "block", fontSize: 14, color: "rgb(254, 224, 100)" }}>
                            {items[idApuesta].name}
                        </span>

                        <div style={{ display: "inline", paddingTop: 10, fontSize: 12 }}>{items[idApuesta].time}</div>
                        <span style={{ display: "block", fontSize: 14, color: "rgb(254, 224, 100)" }}>
                            <span style={{ fontSize: 18, color: 'white', float: 'right' }}> {this.props.format(items[idApuesta].odd)}</span>
                            {items[idApuesta].logro}
                        </span>
                        <div style={{ display: "inline", paddingTop: 10, color: "rgb(255, 165, 0)", fontSize: 12 }}>
                            <div style={{ display: "table-cell" }}>{items[idApuesta].option}</div>

                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div className="right-panel">
                <Sticky className="mierda">
                    <div style={{ background: 'rgba(255,255,255,0.1)', border: "1px solid #ff4600", textShadow: "2px 2px 4px #000000" }}>
                        <div className="cuponrigth">
                            <i className="ion ion-clipboard" style={{ marginRight: 10, fontSize: 18 }}></i>
                            <span className="ticket-title ">Cupón  </span>
                            <div className="speech-bubble" >
                                <div className="cup">{itemsid.length}</div>

                            </div>

                        </div>


                        <Scrollbars style={{ display: 'inline-block', height: 320, width: '100%' }}>

                            <div className="part" style={{ fontWeight: 100, textShadow: "2px 2px 4px #000000" }}>

                                {obj}

                            </div>

                        </Scrollbars>

                        <div className="mm" style={{ textShadow: "2px 2px 4px #000000" }}>
                            <div style={{ marginTop: 20, margin: 0, display: "inline" }}>
                                <div style={{ width: 70, marginLeft: 10, display: "inline" }}> Apuesta: </div>

                                <input id="amount" placeholder="Ej: 2000" type="number"
                                    style={{
                                        backgroundColor: "#c7c7c7", boxSizing: 'border-box',
                                        height: 30, width: 140, border: 'hidden', outline: 'none', textAlign: 'right', marginLeft: 59
                                    }}
                                    value={this.state.stake}
                                    onChange={this.changeStake} /></div>

                            <div style={{ margin: 10, marginTop: 10 }}>Cuota:
                                <span style={{ float: 'right' }} className="totalodd">{this.props.price}</span>
                            </div>
                            <div style={{ margin: 10, marginTop: 15 }}>Pago Total:
                                <span style={{ float: 'right' }}>
                                    <span className="currency-symbol">$</span>
                                    <span className="totalwin">{(this.props.price * this.state.stake).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                                </span>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <button className="btn confirm" onClick={this.props.save.bind(this, this.state.stake)} style={{ boxSizing: 'borderBox', textShadow: "2px 2px 4px #000000", width: '100%', height: 40, color: 'white', background: '#ff4600', fontSize: 14, border: 'hidden' }}>Confirmar</button>
                            </div>
                        </div>
                    </div>

                </Sticky>
            </div>
        );
    }
}

export default Rightpanel;