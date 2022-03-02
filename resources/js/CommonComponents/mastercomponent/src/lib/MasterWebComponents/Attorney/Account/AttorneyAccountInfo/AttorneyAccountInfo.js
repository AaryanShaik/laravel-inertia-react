import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import moment from "moment";
import momentTimezone from "moment-timezone";
import { io } from "socket.io-client";
import { updateAccountInformation, updateReduxAccountInformation, startLoading } from '../../../../../../../../store/actions/customer';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const { Option, OptGroup } = Select;


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


const CustomizedAccountInfoForm = ({ onChange, fields, handleOnAccountInfoEditCancel, handleonAccountInfoClickSave, handleTimeZoneChange }) => {
    const [disableEditAccountInfoBool, setdisableEditAccountInfoBool] = useState(true);
    return (
        <Form
            name="AttorneyAccountinfo"
            scrollToFirstError
            fields={fields}
            // onFinish={onFinish}
            onFieldsChange={(_, allFields) => {
                onChange(allFields);

            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', margin: '5px 0 0px 0' }}>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    <Form.Item
                        name="attorney_first_name"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the First Name',
                            },
                        ]}
                    >
                        <Input disabled={disableEditAccountInfoBool} placeholder={'First Name'} />
                    </Form.Item>
                </div>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Last Name'} /> */}
                    <Form.Item
                        name="attorney_last_name"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the Last Name',
                            },
                        ]}
                    >
                        <Input disabled={disableEditAccountInfoBool} placeholder={'Last Name'} />
                    </Form.Item>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Mobile'} /> */}
                    <Form.Item
                        name="attorney_phone"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the Mobile Number',
                            },
                        ]}
                    >
                        <Input disabled={disableEditAccountInfoBool} placeholder={'Mobile'} />
                    </Form.Item>
                </div>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Email'} /> */}
                    <Form.Item
                        name="attorney_email"
                        style={{ margin: '0px', padding: '0px' }}
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
                        <Input disabled={disableEditAccountInfoBool} placeholder={'Email'} />
                    </Form.Item>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <div>Select timezone</div> */}
                    <Form.Item
                        name="attorney_timezone"
                    // rules={[
                    // {
                    //     required: true,
                    //     message: 'Please select a Timezone!',
                    // },
                    // ]}
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            disabled={disableEditAccountInfoBool}
                            defaultValue={momentTimezone.tz.guess()}
                            onChange={handleTimeZoneChange}

                        >
                            {renderOptions()}
                        </Select>
                    </Form.Item>
                </div>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', textAlign: 'right', marginTop: '5px' }}>
                    {
                        disableEditAccountInfoBool ? (<Button type={'primary'} onClick={() => setdisableEditAccountInfoBool(!disableEditAccountInfoBool)}>Edit</Button>) :
                            (
                                <>
                                    <Button type={'primary'} onClick={() => { handleonAccountInfoClickSave(); setdisableEditAccountInfoBool(!disableEditAccountInfoBool) }}>Save</Button>
                                    <Button style={{ marginLeft: '10px' }} onClick={() => { handleOnAccountInfoEditCancel(); setdisableEditAccountInfoBool(!disableEditAccountInfoBool) }}>Cancel</Button>

                                </>
                            )
                    }

                </div>
            </div>
        </Form>
    )
}

const AttorneyAccountInfo = ({ startLoading, customerdetails, updateAccountInformation, updateReduxAccountInformation, config_test_mode }) => {

    // const [accountinfo, setaccountinfo] = useState({attorney_first_name: customerdetails && customerdetails.attorney_first_name ||'',attorney_last_name: customerdetails && customerdetails.attorney_last_name || '',attorney_phone: customerdetails && customerdetails.attorney_phone || '',attorney_email: customerdetails && customerdetails.attorney_email || '',attorney_timezone: customerdetails && customerdetails.attorney_timezone || ''});
    // const [accountinfo, setaccountinfo] = useState({attorney_first_name: '',attorney_last_name: '',attorney_phone: '',attorney_email: '',attorney_timezone: ''});
    // const [fields, setfields] = useState([{name:['attorney_first_name'], value: ''},{name: ['attorney_last_name'], value: ''},{name: ['attorney_phone'], value: ''},{name: ['attorney_email'], value: ''},{name: ['attorney_timezone'], value: ''}]);
    const [fields, setfields] = useState([
        {
            name: 'attorney_first_name',
            value: customerdetails && customerdetails.attorney_first_name || ''
        },
        {
            name: 'attorney_last_name',
            value: customerdetails && customerdetails.attorney_last_name || ''
        },
        {
            name: 'attorney_phone',
            value: customerdetails && customerdetails.attorney_phone || ''
        },
        {
            name: 'attorney_email',
            value: customerdetails && customerdetails.attorney_email || ''
        },
        {
            name: 'attorney_timezone',
            value: customerdetails && customerdetails.attorney_timezone || ''
        }]);
    const [accountInfofields, setaccountInfofields] = useState([{ name: ['attorney_first_name'], value: customerdetails && customerdetails.attorney_first_name || '' }, { name: ['attorney_last_name'], value: customerdetails && customerdetails.attorney_last_name || '' }, { name: ['attorney_phone'], value: customerdetails && customerdetails.attorney_phone || '' }, { name: ['attorney_email'], value: customerdetails && customerdetails.attorney_email || '' }, { name: ['attorney_timezone'], value: customerdetails && customerdetails.attorney_timezone || '' }]);
    const [disableEditAccountInfoBool, setdisableEditAccountInfoBool] = useState(true);
    // const { attorney_first_name, attorney_last_name, attorney_phone, attorney_email, attorney_timezone } = accountinfo;

    // console.log('accountinfo ',accountinfo, attorney_first_name, attorney_last_name, attorney_phone, attorney_email, attorney_timezone);

    // const handleInputAccountInfo = e => setaccountinfo({...accountinfo, [e.target.name]: e.target.value});
    const [socket, setsocket] = useState(null);



    useEffect(() => {
        if (customerdetails) {
            // setaccountinfo({attorney_first_name: customerdetails && customerdetails.attorney_first_name ||'',attorney_last_name: customerdetails && customerdetails.attorney_last_name || '',attorney_phone: customerdetails && customerdetails.attorney_phone || '',attorney_email: customerdetails && customerdetails.attorney_email || '',attorney_timezone: customerdetails && customerdetails.attorney_timezone || ''});
            setfields([
                {
                    name: 'attorney_first_name',
                    value: customerdetails && customerdetails.attorney_first_name || ''
                },
                {
                    name: 'attorney_last_name',
                    value: customerdetails && customerdetails.attorney_last_name || ''
                },
                {
                    name: 'attorney_phone',
                    value: customerdetails && customerdetails.attorney_phone || ''
                },
                {
                    name: 'attorney_email',
                    value: customerdetails && customerdetails.attorney_email || ''
                },
                {
                    name: 'attorney_timezone',
                    value: customerdetails && customerdetails.attorney_timezone || ''
                }
            ]);
            setaccountInfofields([
                {
                    name: 'attorney_first_name',
                    value: customerdetails && customerdetails.attorney_first_name || ''
                },
                {
                    name: 'attorney_last_name',
                    value: customerdetails && customerdetails.attorney_last_name || ''
                },
                {
                    name: 'attorney_phone',
                    value: customerdetails && customerdetails.attorney_phone || ''
                },
                {
                    name: 'attorney_email',
                    value: customerdetails && customerdetails.attorney_email || ''
                },
                {
                    name: 'attorney_timezone',
                    value: customerdetails && customerdetails.attorney_timezone || ''
                }
            ]);

        }
    }, [customerdetails]);

    // useEffect(() => {

    // }, [accountinfo]);
    // console.log('accountinfo ',accountinfo);
    console.log('fields ', fields);

    // useEffect for sockets (boilerplate)
    useEffect(() => {
        console.log('process.env.NX_HOST', process.env.NX_HOST)
        const s = io(`${process.env.NX_HOST}/attorneys/account/accountInformation`);
        setsocket(s);
        console.log('socket id account info', s.id)
        // client-side
        s.on("connect", () => {
            console.log('connect socket id account info', s.id);
        });

        return () => {
            s.disconnect();
        }
    }, [])

    // useEffect for sockets 2 (where we get that info)
    useEffect(() => {
        if (socket === null)
            return;

        console.log('sockit useeffect in attorney')
        socket.on('attorneyAccountInfo', (m) => {
            console.log('m in attorney', JSON.parse(m));
            let dbdata = JSON.parse(m);
            // console.log('db id',dbdata.attorney_id);
            // console.log('db first name',dbdata.attorney_first_name);
            // console.log('db last name',dbdata.attorney_last_name);
            // console.log('db phone',dbdata.attorney_phone);
            // console.log('db email',dbdata.attorney_email);
            // console.log('db timezone',dbdata.attorney_timezone);
            if (dbdata.attorney_id === customerdetails.attorney_id) {
                updateReduxAccountInformation(dbdata);
            }
        });

    }, [socket]);

    const handleTimeZoneChange = (value) => {
        console.log(`selected ${value}`);
        setfields([...fields, { name: ['attorney_timezone'], value: value }])
    }

    const onFinish = (values) => {
        console.log('onFinish ', values);
    };

    const handleOnAccountInfoEditCancel = () => {
        setfields(accountInfofields)
    }

    const handleonAccountInfoClickSave = () => {
        startLoading()
        setaccountInfofields(fields);
        updateAccountInformation(fields[0].value, fields[1].value, fields[2].value, fields[3].value, fields[4].value, customerdetails.attorney_id, config_test_mode)
        // console.log('first name',fields[0].value);
        // console.log('last name',fields[1].value);
        // console.log('phone',fields[2].value);
        // console.log('email',fields[3].value);
        // console.log('timezone',fields[4].value);
    }



    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', marginBottom: '5px', fontSize: '16px' }}>Personal Information</div>
                <CustomizedAccountInfoForm
                    fields={fields}
                    handleOnAccountInfoEditCancel={handleOnAccountInfoEditCancel}
                    handleonAccountInfoClickSave={handleonAccountInfoClickSave}
                    handleTimeZoneChange={handleTimeZoneChange}
                    onChange={(newFields) => {
                        setfields(newFields);
                    }}
                />
            </div>

            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', marginTop: '10px', marginBottom: '5px', fontSize: '16px' }}>Change Password</div>
                <Form
                    name="AttorneyAccountPass"
                    scrollToFirstError
                >
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', margin: '5px 0 0px 0' }}>
                        <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                            {/* <Input placeholder={'Current Password'} /> */}
                            <Form.Item
                                name="currentpassword"
                                style={{ margin: '0px', padding: '0px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the Current Password',
                                    },
                                ]}
                            >
                                <Input.Password name={'currentpassword'} placeholder={'Current Password'} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                            {/* <Input placeholder={'New Password'} /> */}
                            <Form.Item
                                name="newpassword"
                                style={{ margin: '0px', padding: '0px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the New Password',
                                    },
                                ]}
                            >
                                <Input.Password name={'newpassword'} placeholder={'New Password'} />
                            </Form.Item>
                        </div>
                        <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                            {/* <Input placeholder={'Confirm Password'} /> */}
                            <Form.Item
                                name="confirmpassword"
                                style={{ margin: '0px', padding: '0px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the Confirm Password',
                                    },
                                ]}
                            >
                                <Input.Password name={'confirmpassword'} placeholder={'Confirm Password'} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', margin: '10px 0 0 0' }}>
                        <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', textAlign: 'right', marginTop: '5px' }}>
                            <Button type={'primary'} >Save</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <div style={{ width: '100%' }}>Billing Date: {customerdetails && moment(customerdetails.wallet.billing_date).tz("America/New_York").format('MMMM Do YYYY') || 'July 27th 2021'}</div>
        </div>
    )
}

AttorneyAccountInfo.propTypes = {
    updateAccountInformation: PropTypes.func.isRequired,
    updateReduxAccountInformation: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    customerdetails: state.customer.customerdetails,
    config_test_mode: state.config.config_test_mode
})

export default connect(mapStateToProps, { updateAccountInformation, updateReduxAccountInformation, startLoading })(AttorneyAccountInfo);