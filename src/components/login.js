import React from "react";
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import 'moment-timezone';

// import { Components } from 'react-bootstrap-navbar';

let canvas;
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            user: "",
            pass: ""

        }

        this.usuario = this.usuario.bind(this);
        this.password = this.password.bind(this);
        this.ingresar = this.ingresar.bind(this);
    }
    usuario(objuser) {
        console.log(objuser.target.value)
        this.setState({ user: objuser.target.value });
    }
    password(objpass) {
        console.log(objpass.target.value)
        this.setState({ pass: objpass.target.value });
    }
    ingresar(event) {

        // console.log(event.target);
        // console.log(this.state.pass)
        // console.log(this.state.pass)
        let value = { pass: this.state.pass, user: this.state.user };
        // alert('A name was submitted: ' + this.state.value);
        // fetch('http://localhost/gecko/api/login/m', 
        // { method: "POST"                
        // }).then(results => {
        //     console.log(results)    
        //     return results;
        // }).then(data => {                    
        //     console.log(data);
        // });


        const postData = (url = '', data = {}) => {
            // Default options are marked with *
            return fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                // mode: "no-cors", // no-cors, cors, *same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "text/html",
                },
                // redirect: "follow", // manual, *follow, error
                // referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify({'data':data}), // body data type must match "Content-Type" header
            })
                .then(response => response.json()) // parses response to JSON
                .catch(error => console.error(`Fetch Error =\n`, error));
        };

        postData('http://localhost/gecko/api/login/m', { username: this.state.user , pass:this.state.pass })
            .then(data => console.log(data)) // JSON from `response.json()` call
            .catch(error => console.error(error));


        event.preventDefault();
    }


    render() {

        if (!this.state.login) {
            canvas = <div className="headcont">
                <form onSubmit={this.ingresar}>
                    <button className="btn" id="btnLogin">Ingresar </button>
                    <input id="pass" placeholder="Contraseña" type="password" value={this.state.pass} onChange={this.password} />
                    <input id="email" placeholder="Usuario" type="text" value={this.state.user} onChange={this.usuario} />
                </form>
            </div>

        } else {
            return (
                canvas = <div className='navbar'>
                    <ul>
                        <li><a href="#news" id="deposito">Deposito<i className='ion-social-usd'></i></a></li>
                        <li className="dropdown">
                            <Link to="#" className="dropbtn">Settings<i className='ion-android-arrow-dropdown'></i></Link>
                            <div className="dropdown-content">
                                <Link to="/">Historial</Link>
                                <Link to="/">Deposito</Link>
                                <Link to="/">Retiros</Link>

                            </div>
                        </li>
                        {/* -------------------------------------------------------RELOJ_NAV-------------------------------------------------------------------- */}


                        <li className="reloj">
                            <i className='ion-ios-alarm'></i>&nbsp;
                            <i id="horas" className="horas"> : </i> :
                            <i id="minutos" className="minutos"> : </i>&nbsp;
                            <i id="segundos" className="segundos"> 0 </i>
                            <i id="ampm" className="ampm"> 0 </i>
                        </li>
                        <li>
                            <Link to="/">Historial</Link>

                        </li>
                        <li><Link to="/">Cupones</Link></li>
                        <li className="dropdown">
                            <Link to="#" className="dropbtn">Saldo<i className='ion-android-arrow-dropdown'></i></Link>
                            <div className="dropdown-content">
                                <Link to="/">Historial</Link>
                                <Link to="/">Deposito</Link>
                                <Link to="/">Retiros</Link>

                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to='#' className="dropbtn" id="usuario">USUARIO<i className='ion-android-arrow-dropdown'></i> </Link>
                            <div className="dropdown-content">
                                <Link to="/perfil">Perfil</Link>
                                <Link to="/">Balance</Link>
                                <Link to="/">Apuestas</Link>
                                {/* <Link to="/" style={{ background: "rgba(113, 0, 0, 0.63)" }}>salir<i className='ion-power' style={{ marginLeft: 10 }}></i></Link> */}
                                <Link to="/" id="salir">salir<i className='ion-power'></i></Link>
                            </div>
                        </li>
                    </ul>

                </div>
            );
        }
        return (
            canvas

        )

    }
}
export default Login;

