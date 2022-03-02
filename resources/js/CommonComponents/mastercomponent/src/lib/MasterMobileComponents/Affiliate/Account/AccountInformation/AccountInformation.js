import React from 'react';
import {Button, Input, Typography, Form, Select} from 'antd';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

const { Option, OptGroup } = Select;

const {Text} = Typography;

function AccountInformation() {

    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    const renderOptions = () => {
        const timezones = moment.tz.names();
        let mappedValues = {};
        let regions = [];
    
        timezones.map((timezone) => {
          const splitTimezone = timezone.split('/');
          const region = splitTimezone[0];
          if (!mappedValues[region]) {
            mappedValues[region] = [];
            regions.push(region);
          }
          mappedValues[region].push(timezone);
        });
        return regions.map((region) => {
          const options = mappedValues[region].map((timezone) => {
            return <Option key={timezone}>{timezone}</Option>;
          });
          return (
            <OptGroup
              key={region}
              title={<div style={{ fontSize: 30 }}>{region}</div>}
            >
              {options}
            </OptGroup>
          );
        });
      };

    return (
        <div>
            <Text style={{fontSize:15, marginBottom:10}}>Account Information</Text>
            {/* <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='First Name'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Last Name'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Email'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Phone'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Timezone'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='EIN'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Reporting Sheet Live'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Reporting Sheet Test'/>
            <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Lead Provider'/>
            <Button size='small' style={{width:'100%', marginBottom:20}} type='primary'> Save</Button> */}
            <Form
          form={form}
          name="register"
          onFinish={onFinish}
          size="middle"
          style={{width:'100%'}}
          //   initialValues={{
          //     residence: ['zhejiang', 'hangzhou', 'xihu'],
          //     prefix: '86',
          //   }}
          scrollToFirstError
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}
          >
            <Input
              placeholder="Last Name"
              // style={{ marginBottom: 10 }}
            />
          </Form.Item>

          <Form.Item
            name="Mobile"
            label="Mobile"
            rules={[
              {
                type: 'number',
                message: 'The input has to be a Number!',
              },
              {
                required: true,
                message: 'Please input your Number!',
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
            label="Email"
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
        

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
         
          <div
            style={{
              minWidth: '200px',
              width: '100%',
              marginRight: '1px',
              marginTop: '5px',
              display:'flex',
              flexDirection:'column'
            }}
          >
            
            <Form.Item
            name="timezone"
            label="Timezone"
            rules={[
              {
                required: true,
                message: 'Please select Timezone!',
              },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              defaultValue={momentTimezone.tz.guess()}
            >
              {renderOptions()}
            </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="ein"
            label="EIN"
            style={{width:'100%'}}
            rules={[
              {
                required: true,
                message: 'Please input your EIN!',
              },
            ]}
          >
            <Input
              placeholder="EIN"
              // style={{ marginBottom: 10 }}
            />
          </Form.Item>

          <Form.Item
            name="ReportingSheetTest"
            label="Reporting Sheet Test"
            style={{width:'100%'}}
            rules={[
              {
                required: true,
                message: 'Please enter your Reporting Sheet Test ID!',
              },
            ]}
          >
            <Input
              placeholder="Reporting Sheet Test ID"
              // style={{ marginBottom: 10 }}
            />
          </Form.Item>

          <Form.Item
            name="ReportingSheetLive"
            label="Reporting Sheet Live"
            style={{width:'100%'}}
            rules={[
              {
                required: true,
                message: 'Please enter Reporting Sheet Live ID!',
              },
            ]}
          >
            <Input
              placeholder="Reporting Sheet Test ID"
              // style={{ marginBottom: 10 }}
            />
          </Form.Item>

          <Form.Item
            name="leadProvider"
            label="Lead Provider"
            style={{width:'100%'}}
            rules={[
              {
                required: true,
                message: 'Please input your Lead Provider!',
              },
            ]}
          >
            <Input
              placeholder="Lead Provider"
              // style={{ marginBottom: 10 }}
            />
          </Form.Item>
          <div
            style={{
              minWidth: '200px',
              width: '100%',
              marginRight: '1px',
              textAlign: 'right',
              marginTop: '10px',
            }}
          >
            <Button type={'primary'}>Save</Button>
          </div>
          </div>
          </Form>

            <Text style={{fontSize:15, marginBottom:10}}>Change Password</Text>
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
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: 'Please input your Current Password!',
              },
            ]}
          >
            <Input.Password placeholder="Current Password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your New Password!',
              },
            ]}
          >
            <Input.Password placeholder="New Password"/>
          </Form.Item>

          <Form.Item
            name="passwordConfirm"
            label="Password Confirm"
            rules={[
              {
                required: true,
                message: 'Please Confirm Password!',
              },
            ]}
          >
            <Input.Password placeholder="Password Confirm" />
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
        </div>
    )
}

export default AccountInformation
