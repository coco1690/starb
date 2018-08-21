import React from "react";

const Tableselect = (props) => {


    let l = props.raw ? props.raw : [];
    let liganombre;
    let ligasId = Object.keys(l);
    let liga;
    if (!props.loading) {
        liga = [];
    } else if (ligasId.length > 0) {
        liga = ligasId.map(idliga => {


            // let liga = ligasId.map(idliga => {
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


                var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
                var dd = timess.getDate();
                dd = dd < 10 ? '0' + dd : dd;
                var today = months[timess.getMonth()] + " " + dd;
                timess = today;
                // let cuotas = y.data;

                let datalocal1 = {
                    choose: 1,
                    logro: y.data[19992] ? y.data[19992].logro : "",
                    id: y.idmatch,
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
                    choose: 2,
                    logro: y.data[19992] ? y.data[19992].logro : "",
                    id: y.idmatch,
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
                    choose: 3,
                    logro: y.data[19992] ? y.data[19992].logro : "",
                    id: y.idmatch,
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
                    logro: y.data[49992] ? y.data[49992].logro : "",
                    id: y.idmatch,
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
                    choose: 2,
                    logro: y.data[49992] ? y.data[49992].logro : "",
                    id: y.idmatch,
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
                    choose: 3,
                    logro: y.data[49992] ? y.data[49992].logro : "",
                    id: y.idmatch,
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
                    logro: y.data[29992] ? y.data[29992].logro : "",
                    id: y.idmatch,
                    name: y.name,
                    odd: y.data[29992] ? y.data[29992].o1 : "",
                    option: y.data[29992] ? "Mas de " + parseFloat(y.data[29992].o3) + " goles" : "",
                    price: y.data[29992] ? y.data[29992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[29992] ? y.data[29992].type : "",
                    version: y.data[29992] ? y.data[29992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let dataover = {
                    choose: 2,
                    logro: y.data[29992] ? y.data[29992].logro : "",
                    id: y.idmatch,
                    name: y.name,
                    odd: y.data[29992] ? y.data[29992].o2 : "",
                    option: y.data[29992] ? "Menos de " + parseFloat(y.data[29992].o3) + " goles" : "",
                    price: y.data[29992] ? y.data[29992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[29992] ? y.data[29992].type : "",
                    version: y.data[29992] ? y.data[29992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datagg = {
                    choose: 1,
                    logro: y.data[109992] ? y.data[109992].logro : "",
                    id: y.idmatch,
                    name: y.name,
                    odd: y.data[109992] ? y.data[109992].o1 : "",
                    option: "IMPAR",
                    price: y.data[109992] ? y.data[109992].o1 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[109992] ? y.data[109992].type : "",
                    version: y.data[109992] ? y.data[109992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };
                let datang = {
                    choose: 2,
                    logro: y.data[109992] ? y.data[109992].logro : "",
                    id: y.idmatch,
                    name: y.name,
                    odd: y.data[109992] ? y.data[109992].o2 : "",
                    option: "PAR",
                    price: y.data[109992] ? y.data[109992].o2 : "",
                    time: hours + ":" + minutes + pmam + " - " + timess,
                    type: y.data[109992] ? y.data[109992].type : "",
                    version: y.data[109992] ? y.data[109992].version : "",
                    liga: l[idliga].sportName + " " + l[idliga].name,
                };



                return (



                    <tr key={idevent} >

                        <th style={{ width: 70 }} >

                            <div style={{ color: '#C0C11A', fontSize: 13, fontWeight: 100 }} >
                                {hours + ":" + minutes + pmam}
                            </div>
                            <small style={{ fontWeight: 100 }}>
                                {timess}
                            </small>
                        </th>
                        <th style={{ textAlign: 'left', width: '28%', fontSize: 13, fontWeight: 100 }} >{y.name}</th>
                        <th style={{ width: 40 }} ><i className='ion-stats-bars'></i></th>

                        <th>
                            <div className={y.data[19992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[19992] ? props.addTocart.bind(this, y.idmatch, datalocal1) : void (0)}>{y.data[19992] ? props.format(y.data[19992].o1) : ""} </div>

                            <div className={y.data[19992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[19992] ? props.addTocart.bind(this, y.idmatch, dataempatex) : void (0)}>{y.data[19992] ? props.format(y.data[19992].o2) : ""}</div>

                            <div className={y.data[19992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[19992] ? props.addTocart.bind(this, y.idmatch, datavisitante2) : void (0)}>{y.data[19992] ? props.format(y.data[19992].o3) : ""}</div>
                        </th>

                        <th>
                            <div className={y.data[49992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[49992] ? props.addTocart.bind(this, y.idmatch, data1x) : void (0)}>{y.data[49992] ? props.format(y.data[49992].o1) : ""}</div>

                            <div className={y.data[49992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[49992] ? props.addTocart.bind(this, y.idmatch, data12) : void (0)}>{y.data[49992] ? props.format(y.data[49992].o2) : ""}</div>

                            <div className={y.data[49992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[49992] ? props.addTocart.bind(this, y.idmatch, data2x) : void (0)}>{y.data[49992] ? props.format(y.data[49992].o3) : ""}</div>
                        </th>

                        <th>

                            <div className={y.data[29992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[29992] ? props.addTocart.bind(this, y.idmatch, dataunder) : void (0)}>{y.data[29992] ? props.format(y.data[29992].o1) : ""}</div>

                            <div className={y.data[29992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[29992] ? props.addTocart.bind(this, y.idmatch, dataover) : void (0)}>{y.data[29992] ? props.format(y.data[29992].o2) : ""}</div>

                            <div className="botnn btn:active" style={{ color: '#C0C11A' }}>{y.data[29992] ? y.data[29992].o3 : ""}</div>

                        </th>
                        <th>

                            <div className={y.data[109992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[109992] ? props.addTocart.bind(this, y.idmatch, datang) : void (0)}>{y.data[109992] ? props.format(y.data[109992].o2) : ""}</div>
                            <div className={y.data[109992] ? "botn btn btn:active btn:hover" : "botnone"} style={{}} onClick={y.data[109992] ? props.addTocart.bind(this, y.idmatch, datagg) : void (0)}>{y.data[109992] ? props.format(y.data[109992].o1) : ""}</div>




                        </th>
                        <th>
                            <div className="botn btn btn:active btn:hover"
                                onClick={props.getdata.bind(this, y.idmatch, {
                                    id: y.idmatch,
                                    name: y.name,
                                    time: timess,
                                    hora: hours + ":" + minutes + pmam,
                                    liga: liganombre,
                                    home: y.home,
                                    away: y.away
                                })}
                                style={{ color: 'black', backgroundColor: "orange", borderRadius: 10 }}>
                                {y.more ? y.more : ""}
                            </div>
                        </th>
                    </tr>
                );

            })

            return (
                <div key={idliga} idl={idliga}>

                    <table id="table-central">
                        <thead id="thead-central">
                            {/* <tr>
                    <td id="proximos" colSpan='7' style={{ textAlign: 'left', fontSize: 14 }}>{liganombre}</td>
                </tr>   */}
                            <tr >


                                <th colSpan='3' style={{ textAlign: 'left', fontSize: 14, fontWeight: 100, textShadow: "2px 2px 4px #000000" }}  ><i className='ion-android-stopwatch'></i>
                                    {l[idliga].sportName + " " + l[idliga].name}
                                </th>
                                <th className='text-center' style={{ wordSpacing: '20pt', fontSize: 12, fontWeight: 'normal' }}>1 X 2 </th>
                                <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 12, fontWeight: 'normal' }}>1X 12 2X</th>
                                <th className='text-center' style={{ wordSpacing: '8pt', fontSize: 12, fontWeight: 'normal' }}>MAS / MENOS</th>
                                <th className='text-center' style={{ wordSpacing: '8pt', fontSize: 12, fontWeight: 'normal' }}>PAR / IMPAR</th>
                                <th className='text-center' style={{ wordSpacing: '15pt', fontSize: 12, fontWeight: 'normal' }}>Otros</th>

                            </tr>

                        </thead>
                        <tbody>

                            {listaeventos}
                        </tbody>
                    </table>
                </div>

            )

        });

    } else {
        liga =
            <div className="lds-facebook"><div></div><div></div><div></div></div>
    }
    return <div>   <div id="proximos" >{props.tableheader}</div>{liga}</div>;

}
export default Tableselect;