import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import moment from "moment";
import momentTimezone from "moment-timezone";
import {useTranslation} from "react-i18next";

const { Option, OptGroup } = Select;

const AccountInformation = ({user}) => {

    const {t, i18n} = useTranslation('common');

    const renderOptions = () => {
        const timezones = moment.tz.names();
        let mappedValues = {};
        let regions = [];
    
        timezones.map(timezone => {
            const splitTimezone = timezone.split("/");
            const region = splitTimezone[0];
            if (!mappedValues[region]) {
            mappedValues[region] = [];
            regions.push(region);
            }
            mappedValues[region].push(timezone);
        });
        return regions.map(region => {
            const options = mappedValues[region].map(timezone => {
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
    }

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%'}}>
                <Form
                    name="AffiliateAccountinfo"
                    scrollToFirstError
                >
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            {/* <Input placeholder={'First Name'} /> */}
                            <Form.Item
                                name="firstname"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter the First Name',
                                },
                                ]}
                            >
                                <Input name={'firstname'} placeholder={t('FirstName')} />
                            </Form.Item>
                        </div>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            {/* <Input placeholder={'Last Name'} /> */}
                            <Form.Item
                                name="lastname"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Last Name',
                                },
                                ]}
                            >
                                <Input name={'lastname'} placeholder={t('LastName')} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            {/* <Input placeholder={'Email'} /> */}
                            <Form.Item
                                name="email"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please enter the Email!',
                                    },
                                ]}
                            >
                                <Input name={'email'} placeholder={t('Email')} />
                            </Form.Item>
                        </div>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            {/* <Input placeholder={'Phone'} /> */}
                            <Form.Item
                                name="phone"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Phone Number',
                                },
                                ]}
                            >
                                <Input name={'phone'} placeholder={t('Phone')} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            {/* <Input placeholder={'TimeZone'} /> */}
                            <Form.Item
                                name="Timezone"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please select a Timezone!',
                                },
                                ]}
                            >
                                <Select
                                showSearch
                                style={{ width:'100%' }}
                                defaultValue={momentTimezone.tz.guess()}
                                >
                                    {renderOptions()}
                                </Select>
                            </Form.Item>
                        </div>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                        {/* {user && user.usertype === 'admin'? <Input placeholder={'EIN'} /> : null}   */}
                        {user && user.usertype === 'admin'? (
                        <Form.Item
                            name="ein"
                            style={{margin:'0px',padding:'0px'}}
                            rules={[
                            {
                                required: true,
                                message: 'Please enter the EIN',
                            },
                            ]}
                        >
                            <Input name={'ein'} placeholder={'EIN'} />
                        </Form.Item>
                        ) :null}
                        </div>
                    </div>
                    {user && user.usertype === 'admin'? 
                    (<div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            <Input placeholder={'Report Sheet Live'} />
                        </div>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            <Input placeholder={'Report Sheet Test'} />
                        </div>
                    </div>): null }
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                        {user && user.usertype === 'admin'? (
                        <Form.Item
                            name="leadprovider"
                            style={{margin:'0px',padding:'0px'}}
                            rules={[
                            {
                                required: true,
                                message: 'Please enter the Lead Provider',
                            },
                            ]}
                        >
                        <Input name={"leadprovider"} placeholder={'Lead Provider'} />
                        </Form.Item>
                        ) :null}
                        </div>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button type={'primary'}>Edit</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <div style={{width:'100%',marginTop:'20px'}}>
                <div style={{width:'100%',marginTop:'10px',marginBottom:'5px',fontSize:'16px',textAlign:'left'}}>Change Password</div>
                <Form
                    name="AffiliateAccountPass"
                    scrollToFirstError
                >
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'5px 0 0px 0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'5px'}}>
                            {/* <Input placeholder={'Current Password'} /> */}
                            <Form.Item
                                name="currentpassword"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Current Password',
                                },
                                ]}
                            >
                                <Input name={'currentpassword'} placeholder={'Current Password'} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'5px'}}>
                            {/* <Input placeholder={'New Password'} /> */}
                            <Form.Item
                                name="newpassword"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter the New Password',
                                },
                                ]}
                            >
                                <Input name={'newpassword'} placeholder={'New Password'} />
                            </Form.Item>
                        </div>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'5px'}}>
                            {/* <Input placeholder={'Confirm Password'} /> */}
                            <Form.Item
                                name="confirmpassword"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Confirm Password',
                                },
                                ]}
                            >
                                <Input name={'confirmpassword'} placeholder={'Confirm Password'} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-end',alignItems:'flex-end',width:'100%',margin:'10px 0 0 0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',textAlign:'right',marginTop:'5px'}}>
                            <Button type={'primary'} >Edit</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AccountInformation
