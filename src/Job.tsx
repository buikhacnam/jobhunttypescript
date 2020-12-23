import React, {useState} from 'react';
import { Card } from 'antd';
import { Modal, Button } from 'antd';
import ReactMarkdown from 'react-markdown';

const { Meta } = Card;

export interface jobInterface {
    job: any;
    key?: any;
}

const Job: React.FC<jobInterface> = ({job}) => {
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
        <Card
        hoverable
        style={{ width: 320, cursor: 'default'}}
        cover={<img src={job.company_logo} alt={job.company} height="120px"/>}
      >
        <Meta title={job.title}  description={job.company}/>
        <p style = {{color: '#8C8C8C', fontSize: '0.8rem', marginTop: "10px"}}>{new Date(job.created_at).toLocaleDateString()}</p>
        <div>
            <Button type="primary" onClick={showModal}>
              Details
            </Button>
             <Modal title={job.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div>
                    <ReactMarkdown source={job.description} />
                </div>
             </Modal>
        </div>
      </Card>
    )
}

export default Job;