import { LOGIN_FAILED, LOGIN_SUCCESS } from "./types";
import axios from "axios";
import {Inertia} from '@inertiajs/inertia';

export const handleLogin = () => (dispatch) => {
    try {
        dispatch({
            type: LOGIN_SUCCESS,
        });
    } catch (err) {
        console.log(err);
    }
}

export const handleLogout = () => async (dispatch) => {
    console.log('acctions logout')
    const res = await Inertia.get('/testing/local/api')
    try {
        dispatch({
            type: LOGIN_FAILED,
        });
    } catch (err) {
        console.log(err);
    }
}