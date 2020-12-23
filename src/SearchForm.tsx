import React from 'react';
import { Form, Input } from 'antd';

interface searchParams {
  onParamChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchForm: React.FC<searchParams> = ({onParamChange}) => {
    const [form] = Form.useForm();

    const formItemLayout =
       {
            labelCol: {
              span: 9,
            },
            wrapperCol: {
              span: 44,
            },
        }
  
    return (
      <>
        <Form
          {...formItemLayout}
          layout='horizontal'
          form={form}
        >
          <Form.Item label="Job Description">
            <Input name="description" type="text" onChange={onParamChange}/>
          </Form.Item>
          <Form.Item label="Location">
            <Input name="location" type="text" onChange={onParamChange}/>
          </Form.Item>
        </Form>
      </>
    )
}

export default SearchForm;