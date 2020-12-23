import { useReducer, useEffect } from 'react'; 
import axios from "axios";

const baseUrl = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

type Actions = 
    | { type: 'make-request' }
    | { type: 'get-data', payload: { jobs: Object } }
    | { type: 'error', payload: { error: string } };

type State = any;

function reducer(state:State, action:Actions) {
    switch (action.type) {
        case 'make-request':
            return { loading: true, jobs: [] };
        case 'get-data':
            return {...state, loading: false, jobs: action.payload.jobs };
        case 'error':
            return {...state, loading: false, error: action.payload.error, jobs: [] };
        default:
            return state;
    }
};

export default function useFetchJob(params:Object) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });
    useEffect(() => {
        //dont want to make request every time you type:
        const cancelToken = axios.CancelToken.source()
        dispatch({ type: 'make-request' });
        axios.get(baseUrl, {
            cancelToken: cancelToken.token,
            params: { markdown: true, ...params }
        }).then(res => {
            dispatch({ type: 'get-data', payload: { jobs: res.data } });
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: 'error', payload: { error: e } })
        });

        return () => {
            cancelToken.cancel();
        }

    }, [params]);
    //console.log(state);
    return state;    
};
