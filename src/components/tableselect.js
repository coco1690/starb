import React from "react";

const Tableselect = (props)=>{


    let l = props.raw ? props.raw:[];
    let liganombre;
    let ligasId = Object.keys(l);
    let liga = ligasId.map(idliga => {
    let o = l[idliga].matches

        liganombre = l[idliga].sportName + " " + l[idliga].name;
        let listaeventos = Object.keys(o).map(idevent => {
        let y = o[idevent];
        // let min = 1, max = 4.5;
        let timess = new Date(y.timestamp * 1000);
        let pmam = 'AM';
        var hours = timess.getHours();
        // correct for number over 24, and negatives
        if (hours >= 24) { hours -= 24; }
        if (hours <= 0) { hours += 12; }
        if (hours > 12) { hours -= 12; pmam = 'PM' }


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
        // let cuotas = y.data;

        let datalocal1 = {
            choose: 1,
            id: y,
            name: y.name,
            odd: y.data[19992] ? y.data[19992].o1 : "",
            option: y.home,
            price: y.data[19992] ? y.data[19992].o1 : "",
            time: hours + ":" + minutes + pmam + " - " + timess,
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

        let dataunder = {
            choose: 1,
            id: y,
            name: y.name,
            odd: y.data[29992] ? y.data[29992].o1 + '(<' + y.data[29992].o3 + ')' : "",
            option: "Under",
            price: y.data[29992] ? y.data[29992].o1 : "",
            time: hours + ":" + minutes + pmam + " - " + timess,
            type: y.data[29992] ? y.data[29992].type : "",
            version: y.data[29992] ? y.data[29992].version : "",
            liga: l[idliga].sportName + " " + l[idliga].name,
        };
        let dataover = {
            choose: 1,
            id: y,
            name: y.name,
            odd: y.data[29992] ? y.data[29992].o2 + '(<' + y.data[29992].o3 + ')' : "",
            option: "Over",
            price: y.data[29992] ? y.data[29992].o2 : "",
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
           
          
            
            <tr key={y.idmatch} >
              
                <th style={{ width: 70 }} >
                
                    <div style={{ color: '#C0C11A', fontSize: 13, fontWeight: 100  }} >
                        {hours + ":" + minutes + pmam}
                    </div>
                    <small style={{fontWeight: 100 }}>
                        {timess}
                    </small>
                </th>
                <th style={{ textAlign: 'left', width: '28%', fontSize: 13, fontWeight: 100 }} >{y.name}</th>
                <th style={{ width: 40 }} ><i className='ion-stats-bars'></i></th>

                <th>
                    <th className={y.data[19992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[19992] ?props.addTocart.bind(this, y.idmatch, datalocal1):void(0)}>{y.data[19992] ? y.data[19992].o1 : ""} </th>

                    <th className={y.data[19992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[19992] ?props.addTocart.bind(this, y.idmatch, dataempatex):void(0)}>{y.data[19992] ? y.data[19992].o2 : ""}</th>

                    <th className={y.data[19992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[19992] ?props.addTocart.bind(this, y.idmatch, datavisitante2):void(0)}>{y.data[19992] ? y.data[19992].o3 : ""}</th>
                </th>

                <th>
                    <th className={y.data[49992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[49992] ?props.addTocart.bind(this, y.idmatch, data1x):void(0)}>{y.data[49992] ? y.data[49992].o1 : ""}</th>

                    <th className={y.data[49992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[49992] ?props.addTocart.bind(this, y.idmatch, data12):void(0)}>{y.data[49992] ? y.data[49992].o2 : ""}</th>

                    <th className={y.data[49992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[49992] ?props.addTocart.bind(this, y.idmatch, data2x):void(0)}>{y.data[49992] ? y.data[49992].o3 : ""}</th>
                </th>

                <th>

                    <th className={y.data[29992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[29992] ? props.addTocart.bind(this, y.idmatch, dataunder):void(0)}>{y.data[29992] ? y.data[29992].o1 : ""}</th>

                    <th className={y.data[29992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[29992] ? props.addTocart.bind(this, y.idmatch, dataover):void(0)}>{y.data[29992] ? y.data[29992].o2 : ""}</th>

                    <th className="botnn btn:active" style={{ color: '#C0C11A' }}>{y.data[29992] ? y.data[29992].o3 : ""}</th>

                </th>
                <th>

                    <th className={y.data[139992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[139992] ? props.addTocart.bind(this, y.idmatch, datagg):void(0)}>{y.data[139992] ? y.data[139992].o1 : ""}</th>

                    <th className={y.data[139992] ? "botn btn btn:active btn:hover" :"botnone"}  style={{}} onClick={y.data[139992] ? props.addTocart.bind(this, y.idmatch, datang):void(0)}>{y.data[139992] ? y.data[139992].o2 : ""}</th>

                    <th className="botn btn btn:active btn:hover" onClick={props.getdata.bind(this, y.idmatch, { name: y.name, time: timess, hora: hours + ":" + minutes + pmam, liga: liganombre })} style={{ color: '#ef092c' }}>{y.more ? y.more : ""}</th>

                </th>

            </tr>
            
        );
            
    })

    return (
       
        <table key={idliga} idl={idliga} id="table-central">   
            <thead id="thead-central">  
                {/* <tr>
                    <td id="proximos" colSpan='7' style={{ textAlign: 'left', fontSize: 14 }}>{liganombre}</td>
                </tr>   */}
                <tr >
                    
                    <th colSpan='3' style={{ textAlign: 'left', fontSize: 14, fontWeight: 100 }}  ><i className='ion-android-stopwatch'></i>{l[idliga].sportName + " " + l[idliga].name}</th>
                    <th className='text-center' style={{ wordSpacing: '20pt', fontSize: 10 }}>1 X 2 </th>
                    <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 10 }}>1X 12 2X</th>
                    <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 10 }}>UN  OV  T</th>
                    <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 10 }}>GG NG +</th>

                </tr>

            </thead>
            <tbody>

                {listaeventos}
            </tbody>
        </table>
        

    )

});

return liga;
    
}
export default Tableselect;