//Cuando se envian los formularios, dependiendo de la conexion a internet siempre puede demorar, entonces
//Bloquear el boton "Ingresar" al darle click y cambiar el estilo o el texto a "Cargando..."

import React from "react";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

// import Moment from 'react-moment';
import 'moment-timezone';
var md5 = require('md5');

// import { Components } from 'react-bootstrap-navbar';

let canvas;
let content;
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            button: {
                title: 'Ingresar',
                style: "",
                state: false
            },
            login: this.props.user.login,
            user: "",
            pass: ""
        }


        this.usuario = this.usuario.bind(this);
        this.password = this.password.bind(this);
        this.ingresar = this.ingresar.bind(this);
        this.salir = this.salir.bind(this);

        content = this;
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
        // $('#btnLogin').value("Cargando...")
        this.setState({
            button: {
                title: 'Cargando...',
                style: "lds-ellipsis",
                state: true
            }
        })
        let value = { pass: md5(this.state.pass), user: this.state.user };

        const postData = (url = '', data = {}) => {
            // Default options are marked with *
            return fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                // mode: "no-cors", // no-cors, cors, *same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    // "Content-Type": 'application/json; charset=utf-8',
                    // "Content-Type": "text/html",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'content-type': 'multipart/form-data',
                    'Accept': 'application/json; charset=utf-8'
                },
                // redirect: "follow", // manual, *follow, error
                // referrer: "no-referrer", // no-referrer, *client
                body: data, // body data type must match "Content-Type" header
            })
                .then(response => response.json()) // parses response to JSON
                .catch(error => console.error(`Fetch Error =\n`, error));
        };

        const searchParams = Object.keys(value).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(value[key]);
        }).join('&');


        postData('http://91.121.116.131/gecko/api/login/m', searchParams)
            .then(flow => {
                let data = flow.info;
                // console.log(flow);
                if (data) {
                    // console.log(data.GCCN_Nombre);
                    if (data.CODE) {

                        this.props.addToUser({ userdata: data, login: true })
                        this.setState({ login: true })
                        swal({
                            title:"Inicio de sesion",
                            text:"Bienvenido de nuevo",
                            icon:"success"
                        });
                        this.setState({
                            button: {
                                title: 'Ingresar',
                                style: "",
                                state: false
                            }
                        })

                    } else {
                        swal("Inicio de sesion", "No se encontro cuenta registrada", 'error');
                        this.setState({
                            button: {
                                title: 'Ingresar',
                                style: "",
                                state: false
                            }
                        })
                    }
                } else {
                    swal("Inicio de sesion", "No se encontro cuenta registrada", 'error');
                    this.setState({
                        button: {
                            title: 'Ingresar',
                            style: "",
                            state: false
                        }
                    })
                }
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));


        event.preventDefault();
    }
    salir(event) {
        this.props.removeFromUser();
        this.setState({ login: false })
        this.setState({ user: "", pass: "" })

        event.preventDefault();
    }

    componentDidMount() {
        // this.setState({
        //     login: this.props.user.login,
        //     user: this.props.user.userdata
        // })
        // console.log(this.props);
    }
    static getDerivedStateFromProps(props, current_state) {
        if (current_state.login !== props.login) {
            if (props.user)
                content.setState({
                    login: props.user.login,                   
                })
        }
        return null;

    }

    render() {

        if (!this.state.login) {
            canvas = <div className="headcont">
                <form onSubmit={this.ingresar}>

                    <button className="btn" disabled={this.state.button.state} tabIndex="3" id="btnLogin">{this.state.button.title} 
                        <div className={this.state.button.style}><div></div><div></div><div></div><div></div></div>
                    </button>
                    <input id="pass" placeholder="Contraseña" type="password" tabIndex="2" value={this.state.pass} onChange={this.password} />
                    <input id="email" placeholder="Usuario" type="text" tabIndex="1" value={this.state.user} onChange={this.usuario} />
                </form>
            </div>

        } else {



            canvas = <div className='navbar'>
                <ul>
                    <li><a href="#news" id="deposito"><i className='ion-social-usd'></i>  {this.props.user?this.props.user.userdata.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'):""}</a></li>
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
                    
                   
                    <li className="dropdown">
                        <Link to="#" className="dropbtn">Saldo<i className='ion-android-arrow-dropdown'></i></Link>
                        <div className="dropdown-content">
                            <Link to="/">Historial</Link>
                            <Link to="/">Deposito</Link>
                            <Link to="/">Retiros</Link>

                        </div>
                    </li>
                    <li className="dropdown">
                        <Link to='#' className="dropbtn" id="usuario">{this.props.user.userdata.fullname}<i className='ion-android-arrow-dropdown'></i> </Link>
                        <div className="dropdown-content">
                            <Link to="/perfil">Perfil</Link>
                         
                            {/* <Link to="/" style={{ background: "rgba(113, 0, 0, 0.63)" }}>salir<i className='ion-power' style={{ marginLeft: 10 }}></i></Link> */}
                            <Link to="/" id="salir" onClick={this.salir} >salir<i className='ion-power'></i></Link>
                        </div>
                    </li>
                </ul>

            </div>

        }


        return (canvas)

    }
}
export default Login;

