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

            return <div key={idApuesta} className="panelright">
                <div  id="panelright-sub">
                  <div id="contbtn-delete">
                    <div to="#" className="btn botn btn-delete"  onClick={this.props.removeFromCupon.bind(this, idApuesta)}>
                      <span style={{ fontSize: 16 }} className="ion-ios-trash" />
                    </div>
                  </div>

                  <div id="text-liga">
                    <span>
                      {items[idApuesta].liga}
                    </span>
                </div>

                <div id="text-equipos">
                  <span>
                    {items[idApuesta].name}
                  </span>
                </div>

                  <div id="text-fecha">
                    {items[idApuesta].time}
                  </div>

            <div id="text-logro" >
                    <span>
                <div id="text-apuesta">
                    <span>
                      {" "}
                      {this.props.format(items[idApuesta].odd)}
                    </span>
                </div>
                    {items[idApuesta].logro}
                  </span>
            </div>
                  <div id="context-option">
                    <div id="text-option">
                      {items[idApuesta].option}
                    </div>
                  </div>
                </div>
              </div>;
        })

        return (

            <div className="right-panel">
                <Sticky className="stk">
                    <div id="cont-cupon">
                        <div className="cuponrigth">
                            <i className="ion ion-clipboard" style={{ marginRight: 10, fontSize: 18 }}></i>
                            <span className="ticket-title ">Cupón  </span>
                            <div className="speech-bubble" >
                                <div className="cup">{itemsid.length}</div>

                            </div>

                        </div>


                        <Scrollbars style={{ display: 'inline-block', height: 320, width: '100%' }}>

                            <div className="part">

                                {obj}

                            </div>

                        </Scrollbars>

                        <div className="mm">
                            <div id="cont-apuesta">
                                <div id="texto-apuesta"> Apuesta: </div>

                                <input id="amount" placeholder="Ej: 2000" type="number"
                               
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
                            <div id="text-confirm">
                                <button className="btn btn-confirm" onClick={this.props.save.bind(this, this.state.stake)}>Confirmar</button>
                            </div>
                        </div>
                    </div>

                </Sticky>
            </div>
        );
    }
}

export default Rightpanel;