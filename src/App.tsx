import React, {useState} from 'react';
import useFetchJobs from './useFetchJob';
import './App.css';
import SearchForm from './SearchForm';
import Job from './Job';
import styled from 'styled-components';
import { Spin } from 'antd';

export interface paramsInterface {
  loading: boolean;
  job: any[];
  error?: string;
}

const App:React.FC = () => {
  const [params, setParams] = useState<paramsInterface>({loading: true, job: []});
  const { jobs, loading, error} = useFetchJobs(params);
  
  function handleParamChange(e:any) {
    const param = e.target.name;
    const value = e.target.value;
    setParams(prev => {
      return {...prev, [param]: value};
    })
  }

  return (
    <Body>
        <SearchFormWrapper>
          <div>
            <h1 style={{display:'block'}}>QUICK TEK JOBS</h1>
            <a style={{display:'block'}} href="https://jobs.github.com/api">API Source</a>
          </div>
          <div>
            <SearchForm params={params} onParamChange={handleParamChange} />
          </div>
          <div>
            <img style={{marginRight: "10px"}} src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" height='60px' alt="logo" />
            <img  style={{marginRight: "10px"}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" height='60px' alt="logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" height='60px' alt="logo" />
          </div>
        </SearchFormWrapper>
        <ContentWrapper>
          {loading && <Spin size="large"/>}
          {error && <h1>Error. Try Refreshing.</h1>}
          {jobs.map((job: any) => {
            return <Job key={job.id} job={job} />
          })}
      </ContentWrapper>
    </Body>
  )
}

const ContentWrapper = styled.div`
  padding-top: 50px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(320px, 1fr) );
  gap: 30px;
  justify-items: center;
  width: 95vw;
`

const Body = styled.div`
  padding-bottom: 30px;
`

const SearchFormWrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 40px;
  grid-template-columns: 1fr 2fr 1fr;
  background-color:#FFC107;
  padding-top: 20px;
  & a {
    color: blue;
  }
`

export default App;
