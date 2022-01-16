import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { useParams } from 'react-router-dom';


const containerStyle = {
  width: '100vw',
  height: '18vh'
};

const center = {
  lat: 34.06999972,
  lng: -118.439789907
};



function Bins({match}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  
const [bins, setBins] = useState({
    "bins": [
        {
            "binid": "1",
            "lat": "34.0690071",
            "level": 91,
            "lng": "-118.4414707",
            "status": "locked",
            "type": "regular"
        },
        {
            "binid": "2",
            "lat": "34.069254987694634",
            "level": 89,
            "lng": "-118.44952255127538",
            "status": "locked",
            "type": "regular"
        },
        {
            "binid": "3",
            "lat": "34.06876875739058",
            "level": 26,
            "lng": "-118.44349111672695",
            "status": "unlocked",
            "type": "recycle"
        }
    ],
    "status": "done"
})

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(center)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const _getBinInfo = () => {
    var data = JSON.stringify({
        "action": "getbins"
      });
      
      var config = {
        method: 'post',
        url: 'http://45.79.199.42:8005/getcans',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setBins(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }
  const _openBin = () => {
    let password = prompt("Enter password:", "");
    var config = {
        method: 'get',
        url: `http://45.79.199.42:8005/getcans?action=updates&password=${password}`,
        headers: { }
      };

      if(password=="0pensesame"){      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setBins(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      alert('Invalid Password');
    }
      
  }
  const _resetBin = () => {
    let password = prompt("Enter password:", "");
    var config = {
        method: 'get',
        url: `http://45.79.199.42:8005/getcans?action=updates&password=${password}`,
        headers: { }
      };

      if(password=='cl0sesesame'){
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setBins(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      alert('Invalid Password')
    }
      
  }
  const bin = "M 21 2 C 19.355469 2 18 3.355469 18 5 L 18 7 L 8 7 C 7.640625 6.996094 7.304688 7.183594 7.121094 7.496094 C 6.941406 7.808594 6.941406 8.191406 7.121094 8.503906 C 7.304688 8.816406 7.640625 9.003906 8 9 L 9 9 L 9 45 C 9 46.652344 10.347656 48 12 48 L 38 48 C 39.652344 48 41 46.652344 41 45 L 41 9 L 42 9 C 42.359375 9.003906 42.695312 8.816406 42.878906 8.503906 C 43.058594 8.191406 43.058594 7.808594 42.878906 7.496094 C 42.695312 7.183594 42.359375 6.996094 42 7 L 32 7 L 32 5 C 32 3.355469 30.644531 2 29 2 Z M 21 4 L 29 4 C 29.554688 4 30 4.445312 30 5 L 30 7 L 20 7 L 20 5 C 20 4.445312 20.445312 4 21 4 Z M 19 14 C 19.550781 14 20 14.449219 20 15 L 20 40 C 20 40.554688 19.550781 41 19 41 C 18.449219 41 18 40.554688 18 40 L 18 15 C 18 14.449219 18.449219 14 19 14 Z M 25 14 C 25.550781 14 26 14.449219 26 15 L 26 40 C 26 40.554688 25.550781 41 25 41 C 24.449219 41 24 40.554688 24 40 L 24 15 C 24 14.449219 24.449219 14 25 14 Z M 31 14 C 31.554688 14 32 14.449219 32 15 L 32 40 C 32 40.554688 31.554688 41 31 41 C 30.445312 41 30 40.554688 30 40 L 30 15 C 30 14.449219 30.445312 14 31 14 Z M 31 14 "
  const recycle = "M 19.0625 1 C 16.5 1.152344 14.691406 2.058594 13.6875 3.71875 L 7.09375 15.15625 L 11.5 17.6875 L 0.15625 19.09375 L 3.625 21.09375 L 0.59375 26.25 C -0.0429688 27.351562 -0.410156 29.820312 0.78125 31.625 C 1.253906 32.339844 2.777344 35.066406 4.125 37.46875 C 5.289062 39.542969 6.378906 41.496094 6.875 42.3125 C 7.453125 43.097656 8.023438 43.871094 8.09375 43.96875 C 8.097656 43.96875 6.816406 41.816406 9.09375 37.875 L 15 27.65625 L 18.46875 29.65625 L 14.03125 19.15625 L 18.4375 21.6875 L 27.875 5.34375 C 29.785156 1.777344 31.3125 1.160156 31.65625 1.0625 C 31.828125 1.0625 31.96875 1.0625 32.125 1.0625 C 31.992188 1.058594 31.855469 1.027344 31.71875 1.03125 C 31.636719 1.03125 31.550781 1.027344 31.46875 1.03125 C 30.074219 1.058594 27.664062 1.050781 24.75 1.03125 C 23.019531 1.019531 21.121094 1.003906 19.0625 1 Z M 32.96875 1.15625 C 32.371094 1.445312 31.078125 2.394531 29.5 5.34375 L 25.875 11.625 L 28 15.34375 L 24.53125 17.375 L 35.84375 18.75 L 31.4375 21.28125 L 37.15625 31.1875 L 44.59375 31.1875 C 47.722656 31.1875 49.277344 30.179688 49.9375 29.53125 C 50.121094 28.304688 49.933594 27.167969 49.375 26.15625 L 42.78125 14.75 L 38.375 17.28125 L 42.84375 6.78125 L 39.375 8.78125 L 36.40625 3.59375 C 35.902344 2.71875 34.578125 1.535156 32.96875 1.15625 Z M 32.15625 28.71875 L 25.28125 37.84375 L 25.28125 32.75 L 13.84375 32.75 L 10.125 39.1875 C 8.5625 41.898438 8.675781 43.757812 8.90625 44.65625 C 9.878906 45.429688 10.9375 45.851562 12.09375 45.875 L 25.28125 45.875 L 25.28125 40.75 L 32.15625 49.875 L 32.15625 45.875 L 38.125 45.90625 C 39.398438 45.90625 41.71875 45.03125 42.6875 43.09375 C 43.070312 42.328125 44.6875 39.617188 46.09375 37.25 C 47.308594 35.203125 48.445312 33.277344 48.90625 32.4375 C 49.300781 31.542969 49.667969 30.671875 49.71875 30.5625 C 49.71875 30.5625 48.519531 32.75 43.96875 32.75 L 32.15625 32.75 Z M 32.15625 28.71875 ";


  const binAlmostFull = "rgb(94.509804%,76.862746%,5.882353%)"
  const binEmpty = "rgb(18.039216%,80.000001%,44.313726%)"
  const binFull = "rgb(90.588236%,29.803923%,23.529412%)"


  const {id} = useParams();
  

  useEffect(() => {
  
  });

  return isLoaded ? (
    <div style={{paddingTop:'1.5%'}}>
    <img src={Logo} style={{width:200}}></img>

    <div>

        <div style={{backgroundColor:"#F1A800", borderRadius:30, width:'90vw', padding:'2.5%', alignSelf:'center', margin:'auto', marginBottom:'2.5%'}}>
        <div style={{fontSize:60, fontWeight:'bold', color:"#2D67C3"}}>{bins.bins[id-1].binid}</div>
        <div style={{fontSize:25, fontWeight:'bold'}}>BIN ID</div>
    </div>

        <div style={{backgroundColor:"#F1A800", borderRadius:30, width:'90vw', padding:'2.5%', alignSelf:'center', margin:'auto', marginBottom:'2.5%'}}>
        <div style={{fontSize:60, fontWeight:'bold', color:"#2D67C3"}}>{bins.bins[id-1].type}</div>
        <div style={{fontSize:25, fontWeight:'bold'}}>TYPE</div>
    </div>
  
        <div style={{backgroundColor:"#F1A800", borderRadius:30, width:'90vw', padding:'2.5%', alignSelf:'center', margin:'auto', marginBottom:'2.5%'}}>
        <div style={{fontSize:60, fontWeight:'bold', color:"#2D67C3"}}>{bins.bins[id-1].level}</div>
        <div style={{fontSize:25, fontWeight:'bold'}}>BIN LEVEL</div>
    </div>
        <div style={{backgroundColor:"#F1A800", borderRadius:30, width:'90vw', padding:'2.5%', alignSelf:'center', margin:'auto', marginBottom:'2.5%'}}>
        <div style={{fontSize:60, fontWeight:'bold', color:"#2D67C3"}}>{bins.bins[id-1].status}</div>
        <div style={{fontSize:25, fontWeight:'bold'}}>BIN STATUS</div>
    </div>
    </div>
    
    <div style={{marginLeft:'2.5vw', marginRight:'2.5vw'}}>
    <div onClick={()=>_openBin()} style={{backgroundColor:"#A83D33", borderRadius:30, width:'40vw', padding:'2.5%', alignSelf:'center', margin:'auto', marginBottom:'2.5%', float:'left'}}>
        <div style={{fontSize:25, fontWeight:'bold', color:"#FFF"}}>UNLOCK</div>
    </div>
    <div onClick={()=>_resetBin()} style={{backgroundColor:"#2D67C3", borderRadius:30, width:'40vw', padding:'2.5%', alignSelf:'center', margin:'auto', marginBottom:'2.5%', float:'right'}}>
        <div style={{fontSize:25, fontWeight:'bold', color:"#FFF"}}>RESET</div>
    </div>
    </div>

    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      
        <>
       
            <Marker
            icon={{
              path:
              bins.bins[id-1].type=="recycle"? recycle:'https://raw.githubusercontent.com/ebtesam25/ideahacks2022/main/app/src/assets/green.png',
              fillColor: bins.bins[id-1].level>90 ? binFull:(bins.bins[id-1].level>75 ? binAlmostFull:binEmpty),
              fillOpacity: 1,
              scale: 0.5,
              strokeColor: "none",
              strokeWeight: 0,
            }}
            position={{lat:parseFloat(bins.bins[id-1].lat),lng: parseFloat(bins.bins[id-1].lng)}}
          />

 
 
    </>
    </GoogleMap>

      </div>
  ) : <div>Text{process.env.REACT_APP_GOOGLE_MAPS_API_KEY}</div>
}

export default Bins