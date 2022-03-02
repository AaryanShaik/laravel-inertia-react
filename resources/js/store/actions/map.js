import axios from 'axios';
import {
    SEARCHED_BOUNDS_LOADED,SEARCHED_BOUNDS_LOADING
} from './types'

export const fetchCoordinates = (placeId,pname,allCords) => async (dispatch) => {
    try {
        console.log('inside action map')
        console.log('place id', placeId);
        const res = await axios.get(`${process.env.NX_HOST}/api/invites/fetchCoordinates/${placeId}`);
        let coordinates = res.data.data.features[0].geometry.coordinates
        let coordArr = []
        coordinates.map(coords => {
            coords.map(coordinate => coordArr.push({ lat: coordinate[1], lng: coordinate[0] }))
        })
        let obj = {name:pname,coord:coordArr}
        allCords.push(obj)
        console.log('Data from res in fetch cods', obj);
        dispatch({
            type: SEARCHED_BOUNDS_LOADED,
            payload: "test"
        })
        return allCords;
        console.log('place data', obj);
    } catch (err) {
        console.log(err)
    }
}

export const updateReduxInviteMaps = (m) => async (dispatch) => {
    console.log("data in redux invite maps",m);
    try{
      dispatch({
        type: SEARCHED_BOUNDS_LOADED,
        payload: m
        });
    }catch(err){
        console.log('err in updateReduxInviteMaps',err)
    }
  }

  export const mapStartLoad = () => async (dispatch) => {
    try{
      dispatch({
        type: SEARCHED_BOUNDS_LOADING,
        payload: true
        });
    }catch(err){
        console.log('err in updateReduxInviteMaps',err)
    }
  }