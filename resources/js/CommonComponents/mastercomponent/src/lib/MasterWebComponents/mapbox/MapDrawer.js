import React , {useEffect, useState}from 'react';
import { GoogleMap, Polygon, LoadScript, Autocomplete } from '@react-google-maps/api';
import texas from './texas.json';
import Spinner from '../Spinner/Spinner';
import { Input } from 'antd';

function MapDrawer({coords}) {
    // const [regions, setRegions] = useState(texas);
    const [coordinatesArr, setcoordinatesArr] = useState(coords);

    useEffect(()=>{
        // if(!temp_map_bounds){
        //     console.log(temp_map_bounds);
        //     setRegions(temp_map_bounds);
        // }
        // console.log('regtemp_map_boundsion:', temp_map_bounds)
        // let coordinates = temp_map_bounds?.features[0]?.geometry?.coordinates
        //   console.log('coordinates in map drawer',coordinates)
        //   let coordArr = []
        //   coordinates.map(coords=>{
        //     coords.map(coordinate => coordArr.push({lat: coordinate[1],lng: coordinate[0]}))
        //   })
          console.log('polygon cordinates',coords);
          setcoordinatesArr(coords)
        },[coords])

const containerStyle = {
    height: "400px",
    width: "350px"
  }
  
  const center = { lat: 37.0902, lng: -95.7129 }
  
  const options = {
    fillColor: "black",
    fillOpacity: 0.3,
    strokeColor: "black",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }
  
  const onLoad = polygon => {
    console.log("polygon: ", polygon);
  }

  const [autocomp, setAutocomp] = useState(null)

  const onAutoLoad  = (autocomplete) => {
    console.log('autocomplete: ', autocomplete)

    setAutocomp(autocomplete);
  }



  const onPlaceChanged = () => {
    if (autocomp !== null) {
      console.log('place in onPlaceChanged',autocomp.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

    return (
        // <LoadScript
        //   googleMapsApiKey="AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo"
        // >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            
          >
            { /* Child components, such as markers, info windows, etc. */ }
            {/* <Autocomplete
            onLoad={onAutoLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <Input
              placeholder="Enter a Location"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-80px"
              }}
            />
          </Autocomplete> */}
          {
            coordinatesArr.map((ele)=>{
              return <Polygon
              onLoad={onLoad}
              paths={ele.coord}
              options={options}
          /> 
            })
          }
            {/* <Polygon
                onLoad={onLoad}
                paths={temp_map_bounds[0].coord}
                options={options}
            /> */}
          </GoogleMap>
      )
    }

export default (MapDrawer);
