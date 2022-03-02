import React, { Component, useState, useRef, useEffect, memo, Fragment } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Polyline } from "react-google-maps";
import geojson from './geojson.json';
import texas from './texas.json';
// import {withRouter} from 'react-router-dom';

const MemoizedMap = memo(function Map({ temp_map_bounds }) {
  const [regions, setRegions] = useState(texas);
  const [coordinatesArr, setcoordinatesArr] = useState();
  const map = useRef()
  //   constructor(props) {
  //     super(props);
  //     this.map = React.createRef();
  //   }

  useEffect(() => {
    // e.preventDefault();
    if (!temp_map_bounds) {
      console.log(temp_map_bounds);
      setRegions(temp_map_bounds);
    }
  }, [temp_map_bounds]);

  const renderRegion = () => {
    return regions?.map(regionJ => {
      console.log('regionJ ', regionJ)
      // let region = JSON.parse(regionJ.geoJSON)
      let region = regionJ;
      //   console.log('region ',region);
      //   console.log('region.features.geometry.coordinates[0][0] ',region.features[0]);
      let coordinates = region.features[0].geometry.coordinates
      //   console.log('coordinates ',coordinates)
      let coordArr = []
      coordinates.map(coords => {
        coords.map(coordinate => coordArr.push({ lat: coordinate[1], lng: coordinate[0] }))
      })

      setcoordinatesArr(coordinatesArr)
      //   console.log('coordArr ',coordArr)

      return (
        <Polyline
          path={coordArr}
          options={{
            strokeColor: '#111111',
            strokeOpacity: 10,
            strokeWeight: 1,
            fillColor: `#111111`,
            fillOpacity: 0.5,
            icons: [{
              icon: 'hello',
              offset: '5',
              repeat: '10px'
            }]
          }}
          circl
        />
      )
    });
  }

  const GoogleMapExample = withScriptjs(
    withGoogleMap(onMapIdle => (
      <GoogleMap
        ref={map => {
          map = map;
        }}
        onIdle={onMapIdle}
        defaultCenter={{ lat: 37.0902, lng: -95.7129 }}
        defaultZoom={3}
      >
        {renderRegion()}
      </GoogleMap>
    ))
  );

  return (
    <Fragment style={{ width: '100%', height: '100%', padding: '10px 0' }}>
      <GoogleMapExample
        onMapIdle={(e) => {
          console.log('google map example')
          let ne = map.getBounds().getNorthEast();
          let sw = map.getBounds().getSouthWest();
          // console.log(ne.lat() + ";" + ne.lng());
          // console.log(sw.lat() + ";" + sw.lng());
        }}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />

    </Fragment>
  )
}
)
export default MemoizedMap;
