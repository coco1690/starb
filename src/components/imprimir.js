// import React, { Component } from "react";


// class Imprimir extends Component{

   
       
//         // this.state = {
//         //     lastItem: this.props.lastItem
            
//         // }
       
   




//     render(){


//         let o = this.props.item.data ? this.props.item.data:{};
//         let d = this.props.item.info ? this.props.item.info:{Agencia:"",Usuario:"",ID:"",Fecha:"", Monto:"",Cuota:"",Ganancia:""}
//         console.log(d);
//         let oo = Object.keys(o);

//         let tk = oo.map(ticket => {
//             let f = o[ticket]
//             console.log(f)
       

//                 return(
                    
//                    <div>
//                        <th className="tot">
//                             <div style={{width:"100%"}}>   &nbsp; {f.liga} </div> 

//                             <div>    &nbsp; {f.time} </div> <br />

//                             <div>   &nbsp; {f.name} </div> 
                          
//                             <div>   &nbsp; {f.option}
                           
//                             <div className="tk-imprimir" style={{ float: "right" }}>CUOTA : {f.odd}</div>  

//                             </div>
                        
                        
//                         </th>
//                     </div> 
                
//                 );

//         })
//         return(
//             <div>  
//                 <div className="tick" >


//                     <div id="logoprint">
//                         <img id="logo-print" alt="" src="../img/logo8abet.png" />
//                     </div>

//                     <div id="cliente-print">
//                        &nbsp; AGENCIA   <div className="tk-imprimir" style={{ float: "right" }}>{d.Agencia}</div> <br />
//                         &nbsp; USUARIO   <div className="tk-imprimir" style={{ float: "right" }}>{d.Usuario}</div> <br />
//                         &nbsp; ID        <div className="tk-imprimir"style={{ float: "right" }}>{d.ID}</div> <br />
//                         &nbsp; FECHA        <div className="tk-imprimir" style={{ float: "right" }}>{d.Fecha}</div> <br />

//                     </div>

//                     <div id="cliente-print">
//                         <th>
//                  {tk}
//                         </th>
//                     </div>

//                     <div id="cliente-print">
//                         &nbsp; APUESTA  <div className="tk-imprimir" style={{ float: "right" }}>COP &nbsp; &nbsp;{d.Monto}</div> <br /> 
//                         </div>


//                     <div id="cuota-print">
//                         &nbsp; CUOTA <div className="tk-imprimir" style={{ float: "right" }}>{d.Cuota}</div> <br />
//                     </div>

//                     <div id="ganancia-print">
//                         <div className="ga-imprimir">COP &nbsp; &nbsp;{d.Ganancia}</div> <br />
//                     </div>
//                 </div>

           
            
                

//             </div>
          

//         )
//     }



// }
// export default Imprimir;