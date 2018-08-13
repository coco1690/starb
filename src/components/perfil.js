import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap-tabs';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'




class Perfil extends Component {
    constructor(props){
        super(props);
        this.state={
            name: ''
        }
       
    }

    render() {
        // let u = this.props.user? this.props.user:{};
        let hhh = this.props.user.userdata ? this.props.user.userdata : {};
        console.log(hhh)
        let uu =  Object.keys(hhh);
        
       
        let usu = uu.map(idusu=>{
            let d = hhh
            let mov = d.Movimientos

            console.log(d.Movimientos[0].ID)

            // let hh = Object.keys(hhh).map(hist=>{

            //     let h = hhh[hist]
             
            //     console.log(h)
            // })
          
              
           
            
            // console.log(idusu)
            console.log(d)

            // const options = {
            //     page: 2,  // which page you want to show as default
           
            //     sizePerPage: 4,  // which size per page you want to locate as default
            //     pageStartIndex: 0, // where to start counting the pages
            //     paginationSize: 3,  // the pagination bar size.
            //     prePage: 'Prev', // Previous page button text
            //     nextPage: 'Next', // Next page button text
            //     firstPage: 'First', // First page button text
            //     lastPage: 'Last', // Last page button text
            //     paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            //     paginationPosition: 'bottom',  // default is bottom, top and both is all available
            //     hideSizePerPage: true ,
            //     alwaysShowAllBtns: true ,
            //     // withFirstAndLast: false, 
            // };

            // var products = [{
            //     id: mov[0].ID,
            //     fecha:mov[0].Fecha,
            //     Estado: mov[0].Estado,
            // }, {
            //     id: mov[1].ID,
            //     fecha:mov[1].Fecha,
            //     Estado: mov[1].Estado,
            // },
            //     {
            //     id: mov[2].ID,
            //     name:mov[2].Fecha,
            //     Estado: mov[2].Estado,
            // }, {
            //     id: mov[3].ID,
            //     fecha:mov[3].Fecha,
            //     Estado: mov[3].Estado,
            //     },
            // {
            //     id: mov[4].ID,
            //     fecha:mov[4].Fecha,
            //     Estado: mov[4].Estado,
            // }, {
            //     id: mov[5].ID,
            //     fecha:mov[5].Fecha,
            //     Estado: mov[5].Estado,
            // }, {
            //     id: mov[6].ID,
            //     fecha:mov[6].Fecha,
            //     Estado: mov[6].Estado,
            // }, {
            //     id: mov[7].ID,
            //     fecha:mov[7].Fecha,
            //     Estado: mov[7].Estado,
            // },
            //     {
            //     id: mov[8].ID,
            //     fecha:mov[8].Fecha,
            //     Estado: mov[8].Estado,
            // }, {
            //     id: mov[9].ID,
            //     fecha:mov[9].Fecha,
            //     Estado: mov[9].Estado,
            // }];

       
          
        return (
          
            <div key={idusu}>
            <div className="panels">
                        {/* <pre>{JSON.stringify(this.props.user)}
                         
                        </pre> */}
                       
                <div id="panel-usuario" className="title-text"> Perfil del usuario </div>
                  
                 <div>
                        <div className="perfil">

                            <div className="foto">
                            <div className="iconuser"><img id="imagen-perfil" alt="" src="img/icons/user.png" /></div>
                                
                                {/* <div className="formulario"> */}
                                <Tabs className="formulario" onSelect={(index, label) => console.log(label + ' selected')}>
                                    
                                    <Tab  label="PERFIL"> 
                                       
                                        <div id="contenedor-form" ><hr></hr>
                                            
                                            <div id="form">

                                                <br /> &nbsp;&nbsp;Nombre Completo<br /><input id="nombre" type="text" value={this.state.name} placeholder={d.fullname}/>

                                                <br />&nbsp;&nbsp;Telefono<br /> <input id="telefono" type="tel" name="telefono" value={this.state.name} placeholder={d.Telefono} />
                                           
                                            <br />&nbsp;&nbsp;Direccion<br /><input id="direccion" type="text" value={this.state.name} /> 
                                            
                                            </div>
                                            <div id="form2">

                                                <br />&nbsp;&nbsp;Pais<br /><input id="pais" type="email" value={this.state.name} placeholder={d.Pais} />
                                          
                                                <br />&nbsp;&nbsp;Email<br /><input id="email2" type="email" value={this.state.name} placeholder={d.email}  /> 
                                            </div>
                                            </div>
                                           

                                            
                                         
                                        </Tab>
                                        <Tab label="HISTORIAL">
                                            <div className="tabla-mov">
                                          
                                            <table id="t01">
                                            <thead>   
                                                <tr>
                                                    <th>ID</th>
                                                    <th>FECHA</th>
                                                    <th>ESTADO</th>
                                                    <th>MONTO</th>
                                                </tr>
                                            </thead> 
                                            <tbody>
                                                <tr>
                                                    <td>{mov[0].ID}</td>
                                                    <td>{mov[0].Fecha}</td>
                                                        <td className={mov[0].Estado < 1 ? "cerrado" : "abierto" }>{mov[0].Estado < 1 ? "CERRADO": "ABIERTO"}</td>
                                                    <td>{mov[0].Monto}</td>
                                                </tr>
                                                <tr>
                                                    <td>{mov[1].ID}</td>
                                                    <td>{mov[1].Fecha}</td>
                                                        <td className={mov[1].Estado < 1 ? "cerrado" : "abierto"}>{mov[1].Estado < 1 ? "CERRADO" : "ABIERTO"} </td>
                                                    <td>{mov[1].Monto}</td>
                                                </tr>
                                                <tr>
                                                    <td>{mov[2].ID}</td>
                                                    <td>{mov[2].Fecha}</td>
                                                        <td className={mov[2].Estado < 1 ? "cerrado" : "abierto"}>{mov[2].Estado < 1 ? "CERRADO" : "ABIERTO"}</td>
                                                    <td>{mov[2].Monto}</td>
                                                </tr>
                                                <tr>
                                                    <td>{mov[3].ID}</td>
                                                    <td>{mov[3].Fecha}</td>
                                                        <td className={mov[3].Estado < 1 ? "cerrado" : "abierto"}>{mov[3].Estado < 1 ? "CERRADO" : "ABIERTO"} </td>
                                                    <td>{mov[3].Monto}</td>
                                                </tr>
                                                <tr>
                                                    <td>{mov[4].ID}</td>
                                                    <td>{mov[4].Fecha}</td>
                                                        <td className={mov[4].Estado < 1 ? "cerrado" : "abierto"}>{mov[4].Estado < 1 ? "CERRADO" : "ABIERTO"}</td>
                                                    <td>{mov[4].Monto}</td>
                                                </tr>
                                            </tbody>
                                                </table>
                                      
                                        {/* <BootstrapTable
                                            data={products}
                                            pagination={true}
                                            options={options}
                                         
                                           
                                             
                                                bodyStyle={{marginTop: -10, }}
                                            containerClass='my-custom-class' hover

                                        >
                                                <TableHeaderColumn dataField='id' isKey tdStyle={{width:'5%', marginLeft:5}}> ID</TableHeaderColumn>
                                                <TableHeaderColumn dataField='fecha' tdStyle={{color:'black',  }}>FECHA</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Estado'>ESTADO</TableHeaderColumn>
                                        </BootstrapTable> */}
                                        </div>
                                        </Tab>
                                    
                                    </Tabs>
                                {/* </div>   */}
                            </div>                          
                        </div>
                     </div>
                </div>
            </div>
            

        );
        })

        return usu
    }
}

export default Perfil;