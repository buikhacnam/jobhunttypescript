import React, {useState} from 'react';
import { Card } from 'antd';
import { Modal, Button } from 'antd';
import ReactMarkdown from 'react-markdown';

const { Meta } = Card;

interface jobInterface {
    job: any;
    key?: string;
    handleSaveJob: (job:any) => any;
    savedJob: any;
}

const Job: React.FC<jobInterface> = ({job, handleSaveJob, savedJob}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
   
    const preHandleSavedJob = () => {
      handleSaveJob(job);
      setIsSaved(true);
    }

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
        <Card
        hoverable
        style={{ width: 320, cursor: 'default'}}
        cover={<img src={job.company_logo} alt={job.company} height="120px"/>}
      >
        <Meta title={job.title}  description={job.company}/>
        <p style = {{color: '#8C8C8C', fontSize: '0.8rem', marginTop: "10px"}}>{new Date(job.created_at).toLocaleDateString()} - {job.location}</p>
        <div>
            <Button type="primary" onClick={showModal}>
              Details
            </Button> {}
          {!isSaved && <Button onClick={preHandleSavedJob}>
              Save
            </Button>}  
             <Modal title={job.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div>
                  {!isSaved && <Button onClick={preHandleSavedJob}>
                    Save this job
                   </Button>
                  } 
                  <h3 style={{marginTop: '20px', color: '#40A9FF'}}>Apply here: {job.how_to_apply}</h3>
                  <ReactMarkdown source={job.description} />
                </div>
             </Modal>
        </div>
      </Card>
    )
}

export default Job;