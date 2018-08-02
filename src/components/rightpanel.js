import React from "react";
import Sticky from 'react-sticky-el';
// import { Scrollbars } from 'react-custom-scrollbars';
// import { Link } from 'react-router-dom';


// import { Components } from 'react-bootstrap-navbar';

let context
class Rightpanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stake: this.props.stake,
            items: this.props.items,
            total: this.props.total
        };     
        context=this;   
    }
    static getDerivedStateFromProps(props, current_state) {
        if (current_state.items !== props.items) {
           
                context.setState({
                    items:props.items
                })
                

        }
        return null;

    }
    handleChange(event) {
        context.setState({stake: event.target.value});
      }
    render() {        
        let p= 1;  let q=1;    
        // console.log("****  Items del Cupon **********");
        // console.table(this.state.items);
        let items = this.state.items
        let itemsid = Object.keys(items)
        let obj = itemsid.map((idApuesta)=>{
            p = p * items[idApuesta].price;
            p = p.toFixed(2);
            q=p*this.state.stake;
            return(
                <div key={idApuesta} className="panelright">
                    <div style={{ padding: "5px", position: "relative", textAlign: "left" }}>
                        <span style={{ display: "block", fontSize: 15, paddingBottom: 10, color: "rgb(255, 255, 255)" }}>
                            {items[idApuesta].liga}
                        </span>
                        <span style={{ display: "block", fontSize: 14, paddingBottom: 10, color: "rgb(254, 224, 100)"}}>
                            {items[idApuesta].name}
                        </span>
                        <div style={{ display: "inline", paddingTop: 10, fontSize: 12}}>{items[idApuesta].time}</div> <br/>
                        <div style={{ display: "inline", paddingTop: 10, color: "rgb(254, 224, 100)", fontSize: 12 }}>
                            <div style={{ display: "table-cell" }}><span>{items[idApuesta].option + " " + items[idApuesta].odd}</span></div>
                            <div style={{ display: "table-cell", right: 1, color: 'white', float: "right"}}>
                                <div to="#" className="btn botn" style={{marginTop:-50}} onClick={ this.props.removeFromCupon.bind(this, idApuesta)}>-</div></div>
                        </div>
                    </div> 
                </div>
            )
        } )
        return (
            
                
            

                <div className="right-panel">
                
                
                <Sticky stickyStyle={{ right: 35, width: 280 }}>
                   
        
                   
                    <div style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div style={{ padding: 10, fontWeight: 'bold', color: '#FEE064' }}>
                            <i className="ion ion-clipboard" style={{ marginRight: 10, fontSize: 14 }}></i>
                            <span className="ticket-title">Cupón</span>
                        </div>
                        {/* <Scrollbars style={{ height: 425, display: 'table-cell', verticalAlign: 'top' }}> */}
                        <div>
                      
                      {obj}
                     
                        </div>
                        {/* </Scrollbars> */}
                        
                        <div >
                            <div style={{ marginTop: 20, margin: 10}}>
                               <div style={{ width:70}}> Cantidad: </div>
                               
                                    <input id="amount" placeholder="Ej: 2000" style={{ boxSizing: 'border-box', height: 30, width: 140, border: 'hidden', outline: 'none', padding: 5, textAlign: 'right', marginLeft:109 }} value={this.state.stake}   onChange={this.handleChange} type="text" /></div>
                           
                            <div style={{ marginTop: 20, margin: 10 }}>Cuota:
                                <span style={{ float: 'right', fontWeight: 'bold' }} className="totalodd">{p}</span>
                            </div>
                            <div style={{ marginTop: 10, margin: 10 }}>Pago Total:
                                <span style={{ float: 'right', fontWeight: 'bold' }}><span className="currency-symbol">$</span> 
                                <span className="totalwin">{q}</span></span>
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