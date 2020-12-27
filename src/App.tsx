import React, {useState, useEffect} from 'react';
import useFetchJobs from './useFetchJob';
import './App.css';
import SearchForm from './SearchForm';
import Job from './Job';
import styled from 'styled-components';
import { Spin } from 'antd';
import { Modal, Button } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

export interface paramsInterface {
  loading: boolean;
  job: object[];
  error?: string;
}

const localData = localStorage.getItem('jobs');

const App:React.FC = () => {
  
  const [params, setParams] = useState<paramsInterface>({loading: true, job: []});
  const [savedJob, setSavedJob] = useState<any>(localData?(JSON.parse(localData)):[]);
  const { jobs, loading, error } = useFetchJobs(params);
 
  function handleParamChange(e: React.ChangeEvent<HTMLInputElement>) {
    const param = e.target.name;
    const value = e.target.value;
    setParams(prev => {
      return { ...prev, [param]: value };
    })
  }

  function handleSaveJobFunction(job:any) {
      setSavedJob((prev:any) => {
        return [...prev, job];
      });
      
  }

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(savedJob));
  }, [savedJob]);

  function handleClearJob(e: any, id: any){
    console.log(id)
    setSavedJob(savedJob.filter((job:any) => job.id !== id))
  }

  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
 };

 const handleOk = () => {
  setIsModalVisible(false);
 };

 const handleCancel = () => {
  setIsModalVisible(false);
 };


  return (
    <Body>
        
        <SearchFormWrapper>
          <div>
            <h1 style={{display:'block', marginLeft: "10px"}}>QUICK TEK JOBS</h1>
            <a style={{display:'block', marginLeft: "10px"}} href="https://jobs.github.com/api">API Source</a>
          </div>
          <div>
           
          </div>
          <div>
            <img style={{marginRight: "10px"}} src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" height='60px' alt="logo" />
            <img  style={{marginRight: "10px"}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" height='60px' alt="logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" height='60px' alt="logo" />
          </div>
        </SearchFormWrapper>

        <SectionTwo>
          <Button type="primary" size="large" onClick={showModal}>My Saved Jobs List ({savedJob.length})</Button>
        </SectionTwo>
        
        <SectionThree>
            <h2>SEARCH FOR A JOB</h2>
           <SearchForm onParamChange={handleParamChange} />
        </SectionThree>
        
         
        <Modal title="Saved Jobs List" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                {savedJob.length > 0 ? 
                   <SavedJobsWrapper>
                    {savedJob.map((job:any) => {
                          return  <Card 
                          hoverable
                          key={job}
                          style={{ width: 200, cursor: 'default'}}
                          cover={<img src={job.company_logo} alt={job.company} height="80px"/>}
                        >
                          <Meta title={job.title}  description={job.company}/>
                          <p style = {{color: '#8C8C8C', fontSize: '0.8rem', marginTop: "10px"}}>{new Date(job.created_at).toLocaleDateString()} - {job.location}</p>
                          <a href={job.url} target='_blank' rel='noreferrer'>Details</a>
                          <p style={{cursor: 'pointer', marginTop: '20px'}} onClick={(e) => handleClearJob(e, job.id)}>Unsave</p>
                        </Card>
                    })}
                  </SavedJobsWrapper>:
                  <h3>No Job is saved in the list now</h3>
                }
             
        </Modal>

        <ContentWrapper>
          {loading && <Spin size="large"/>}
          {error && <h1>Error. Try Refreshing.</h1>}
          {jobs.map((job: any) => {
            return <Job key={job.id} job={job} handleSaveJob={handleSaveJobFunction} savedJob={savedJob}/>
          })}
      </ContentWrapper>

    </Body>
  )
}

const ContentWrapper = styled.div`
  padding: 10px;
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
  background-color:#40A9FF;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  
  & a {
    color: red;
    text-decoration: underline;
  };
  & h1 {
    color: #ffffff;
  };
  
`

const SavedJobsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(220px, 1fr) );
  gap: 30px;
  justify-items: center;
  & a, p {
    color: #40A9FF;
  }
`
const SectionTwo = styled.div`
  text-align: center;
  position: sticky;
  z-index: 100;
  right: 0;
  top: 20px;
`

const SectionThree = styled.div`
  padding-top: 30px;
  display: grid;
  justify-content: center;
  text-align: center;
  
`

export default App;
