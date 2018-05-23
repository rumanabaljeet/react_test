import axios from 'axios';
import config from './../../Config';

export const Listing = (page=1,search='') => {
       let apiPath = `${config.API_URL}discover/movie?page=${page}&api_key=${config.API_KEY}`;
        if(search){
            apiPath = `${config.API_URL}search/movie?query=${search}&page=${page}&api_key=${config.API_KEY}`;
        }
    return dispatch => {
        axios.get(apiPath).then(response => {
            dispatch({ "type": "LISTING", "payload": response.data });
        }).catch(error => {
            dispatch({ "type": "LISTING_ERROR", "payload": error.response.data });
        });
    }
}