const axios = require('axios');


const getLugarLatLng = async(direccion)=>{
    const encodedUrl = encodeURI(direccion);
    
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
        headers: {
            'X-RapidAPI-Key': '08ee32a163mshbdbb5cd2eba65f0p126a25jsn65521f1b6153'
        }
    });

    const resp = await instance.get();

    if(resp.data.Results.length === 0){
        throw new Error(`No hay resultados para la dirección ${direccion}`);
    }else if(resp.data.Results === null){
        throw new Error(`Los resultados son nulos para ${direccion}`);
    }else{
        const data = resp.data.Results[0];
        const nombreDireccion = data.name;
        const lat = data.lat;
        const lng = data.lon;
    
        return {
            nombreDireccion,
            lat,
            lng
        };
    }

};

module.exports = {
    getLugarLatLng
};