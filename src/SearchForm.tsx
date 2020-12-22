import React from 'react';
import { Form, Input, Button } from 'antd';

const SearchForm: React.FC = ({params, onParamChange}) => {
    const [form] = Form.useForm();

    const formItemLayout =
       {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
        }
  
    const buttonItemLayout =
      {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
      }
        
    return (
      <>
        <Form
          {...formItemLayout}
          layout='horizontal'
          form={form}
          onFinish={onParamChange}
        >
       
          <Form.Item label="Description">
            <Input value={params.description} onChange={onParamChange}/>
          </Form.Item>
          <Form.Item label="Location">
            <Input value={params.location} onChange={onParamChange}/>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </>
    );
}

export default SearchForm;