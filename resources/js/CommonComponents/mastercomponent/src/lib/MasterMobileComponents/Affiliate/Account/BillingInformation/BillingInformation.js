import React from 'react';
import {Button, Card, Input, Typography, Form} from 'antd';

const {Text} = Typography;

function BillingInformation() {

    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    const partners = [
        {
            name:'Test Name',
            email:'test@gmail.com',
            phone:'(123)123-1234'
        }
    ];
    return (
        <div>
            <Text style={{fontSize:15, marginBottom:10}}>Billing Information</Text>
            {/* <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Name'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Email'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Phone'/> */}

            {/* <Button size='small' type='primary' style={{width:'100%', marginBottom:20}}>Save</Button> */}

            <Form
            form={form}
            name="register"
            onFinish={onFinish}
            size="middle"
            //   initialValues={{
            //     residence: ['zhejiang', 'hangzhou', 'xihu'],
            //     prefix: '86',
            //   }}
            scrollToFirstError
          >
            <Form.Item
              name="Name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input Name!',
                },
              ]}
            >
              <Input
                placeholder="Name"
                // style={{ marginBottom: 10 }}
              />
            </Form.Item>

            <Form.Item
              name="Mobile"
              label=" Mobile"
              rules={[
                {
                  type: 'number',
                  message: 'The input has to be a Mobile!',
                },
                {
                  required: true,
                  message: 'Please input Mobile!',
                },
              ]}
            >
              <Input
                placeholder="Mobile"
                // style={{ marginBottom: 10 }}
              />
            </Form.Item>

            <Form.Item
              name="Email"
              label=" Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                placeholder="Email"
                // style={{ marginBottom: 10 }}
              />
            </Form.Item>

          </Form>
          <div
            style={{
              minWidth: '200px',
              width: '100%',
              marginRight: '1px',
              textAlign: 'right',
              marginTop: '5px',
            }}
          >
            <Button type={'primary'}>Save</Button>
        </div>

            <Text style={{fontSize:15}}>Account Partners</Text>
            {
                partners.map(partner => 
                    <Card size='small' style={{display:'flex', flexDirection:'column'}}>
                        <div>
                        <Text style={{fontSize:12}}>{partner.name}</Text>
                        </div>
                      
                      <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                      <Text style={{fontSize:12}}>{partner.email}</Text>
                      <Text style={{fontSize:12}}>{partner.phone}</Text>
                      </div>
                      
                  
                    </Card>    
                )
            }
        </div>
    )
}

export default BillingInformation
