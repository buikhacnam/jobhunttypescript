import { useReducer, useEffect } from 'react'; 
import axios from "axios";


const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data1',
    ERROR: 'error'
};

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";
function reducer(state:any, action:any){
    switch (action.type){
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: []};
        case ACTIONS.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs };
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.payload.error, jobs: [] };
        default:
            return state;
    }
};

export default function useFetchJob(params:any) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true});
    useEffect(() => {
        //dont want to make request every time you type:
        const cancelToken1 = axios.CancelToken.source()
        dispatch( { type: ACTIONS.MAKE_REQUEST });
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true,  ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        });


        return () => {
            cancelToken1.cancel();
        }

    }, [params]);
    console.log(state);
    return state;    
};
