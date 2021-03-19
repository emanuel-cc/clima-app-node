const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs')
            .options({
                direccion: {
                    alias: 'd',
                    desc: "Dirección de la ciudad para obtener el clima",
                    demand: true
                }
            }).argv;

// lugar.getLugarLatLng(argv.direccion)
//             .then(resp=>{
//                 console.log(resp);
//             });

// clima.getClima(20.9345, -89.0182)
//             .then(resp=>{
//                 console.log(resp);
//             }).catch(console.log);

const getInfo = async(direccion)=>{
    // salida
    // El clima de XXXX es XXX
    // No se pudo determinar el clima de XXX
    try{
        let coords = await lugar.getLugarLatLng(direccion);
        let temp = await clima.getClima(coords.lat, coords.lng);

        return `El clima de ${coords.direccion} es de ${temp}`;
    }catch(err){
        return `No se pudo determinar el clima de ${direccion}`;
    }

    return clima;
};

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);