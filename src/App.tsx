import React, {useState} from 'react';
import useFetchJobs from './useFetchJob';
import './App.css';
import SearchForm from './SearchForm';

const App:React.FC = () => {
  const [params, setParams] = useState({});
  const { jobs, loading, error} = useFetchJobs(params);
  
  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setParams(prev => {
      return {...prev, [param]: value}
    })
  }

  return (
    <div className="App">
      <SearchForm params={params} onParamChange={handleParamChange}/>
    </div>
  );
}

export default App;
