import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Modal, Table, Space, Radio } from 'antd';
import { IoAddCircleSharp, IoTrashBin } from 'react-icons/io5';
import { ImCross, ImCheckmark } from 'react-icons/im';
import { AiFillStar, AiFillEdit } from "react-icons/ai";
import AddorEditpartners from './AddorEditpartners/AddorEditpartners';
import { updateFirmInformation, updateReduxFirmInformation, startLoading } from '../../../../../../../../store/actions/customer';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";


let attorneyPartnersdata = [
    {
        no: '1',
        name: 'John Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
    {
        no: '2',
        name: 'Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
    {
        no: '3',
        name: 'John Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
    {
        no: '4',
        name: 'John Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
    {
        no: '5',
        name: 'John Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
    {
        no: '6',
        name: 'John Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
    {
        no: '7',
        name: 'John Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
    {
        no: '8',
        name: 'John Doe Martins',
        casetype: `Auto Accident`,
        assignedat: '07/14/2020, 02:24 AM',
        apiresponse: '',
        email: 'johndoe@gmail.com',
        phone: '+1234567890'
    },
]


const CustomizedLawFirmInfoForm = ({ onChange, fields, handleOnFirmInfoEditCancel, handleonFirmInfoClickSave }) => {
    const [disableEditLawFirmInfoBool, setdisableEditLawFirmInfoBool] = useState(true);
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
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', margin: '5px 0 0 0' }}>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Firm Name'} /> */}
                    <Form.Item
                        name="firmname"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the Firm Name',
                            },
                        ]}
                    >
                        <Input name={'firmname'} disabled={disableEditLawFirmInfoBool} placeholder={'Firm Name'} />
                    </Form.Item>
                </div>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Firm Email'} /> */}
                    <Form.Item
                        name="firmemail"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please enter Firm Email!',
                            },
                        ]}
                    >
                        <Input name={'firmemail'} disabled={disableEditLawFirmInfoBool} placeholder={'Firm Email'} />
                    </Form.Item>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Firm Phone Number'} /> */}
                    <Form.Item
                        name="Firm Phone Number"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the Firm Phone Number',
                            },
                        ]}
                    >
                        <Input name={'firmphonenumber'} disabled={disableEditLawFirmInfoBool} placeholder={'Firm Phone Number'} />
                    </Form.Item>
                </div>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Firm Address'} /> */}
                    <Form.Item
                        name="firmaddress"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the Firm Address',
                            },
                        ]}
                    >
                        <Input name={'firmaddress'} disabled={disableEditLawFirmInfoBool} placeholder={'Firm Address'} />
                    </Form.Item>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                    {/* <Input placeholder={'Firm Website'} /> */}
                    <Form.Item
                        name="firmwebsite"
                        style={{ margin: '0px', padding: '0px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the Firm Website',
                            },
                        ]}
                    >
                        <Input name={'firmwebsite'} disabled={disableEditLawFirmInfoBool} placeholder={'Firm Website'} />
                    </Form.Item>
                </div>
                <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', textAlign: 'right', marginTop: '5px' }}>
                    {/* <Button type={'primary'} >Save</Button> */}
                    {
                        disableEditLawFirmInfoBool ? (<Button type={'primary'} onClick={() => setdisableEditLawFirmInfoBool(!disableEditLawFirmInfoBool)}>Edit</Button>) :
                            (
                                <>
                                    <Button type={'primary'} onClick={() => { handleonFirmInfoClickSave(); setdisableEditLawFirmInfoBool(!disableEditLawFirmInfoBool) }}>Save</Button>
                                    <Button style={{ marginLeft: '10px' }} onClick={() => { handleOnFirmInfoEditCancel(); setdisableEditLawFirmInfoBool(!disableEditLawFirmInfoBool) }}>Cancel</Button>

                                </>
                            )
                    }
                </div>
            </div>
        </Form>
    )
}

const AttorneyLawfirmInformation = ({ startLoading, attorneyPartners, customerdetails, updateFirmInformation, updateReduxFirmInformation }) => {
    console.log('customerdetails in lawfirm', customerdetails);
    const [openAddPartnerModel, setopenAddPartnerModel] = useState(false);
    // const [firminfo, setfirminfo] = useState({firmname: customerdetails && customerdetails.firmInfo.attorney_firm_name ||'',firmemail: customerdetails && customerdetails.firmInfo.law_firm_email || '',firmphonenumber: customerdetails && customerdetails.firmInfo.law_firm_phone || '',firmaddress: customerdetails && customerdetails.attorney_address || '',firmwebsite: customerdetails && customerdetails.firmInfo.law_firm_website || ''});
    const [firminfo, setfirminfo] = useState([{ name: 'firmname', value: customerdetails && customerdetails.firmInfo.attorney_firm_name || '' }, { name: 'firmemail', value: customerdetails && customerdetails.firmInfo.law_firm_email || '' }, { name: 'firmphonenumber', value: customerdetails && customerdetails.firmInfo.law_firm_phone || '' }, { name: 'firmaddress', value: customerdetails && customerdetails.attorney_address || '' }, { name: 'firmwebsite', value: customerdetails && customerdetails.firmInfo.law_firm_website || '' }]);
    const [firmInfofields, setfirmInfofields] = useState([{ name: 'firmname', value: customerdetails && customerdetails.firmInfo.attorney_firm_name || '' }, { name: 'firmemail', value: customerdetails && customerdetails.firmInfo.law_firm_email || '' }, { name: 'firmphonenumber', value: customerdetails && customerdetails.firmInfo.law_firm_phone || '' }, { name: 'firmaddress', value: customerdetails && customerdetails.attorney_address || '' }, { name: 'firmwebsite', value: customerdetails && customerdetails.firmInfo.law_firm_website || '' }]);
    const [currentEditPartnerInfo, setcurrentEditPartnerInfo] = useState();
    const [socket, setsocket] = useState(null);


    // const [addPartnerInfoInputData, setaddPartnerInfoInputData] = useState({name:'',email:'',phone:'',state:''});
    const [addPartnerInfoInputData, setaddPartnerInfoInputData] = useState([{ name: 'name', value: '' }, { name: 'email', value: '' }, { name: 'phone:', value: '' }]); //{name:'partnerId',value:''}
    const [openEditPartnerModel, setopenEditPartnerModel] = useState(false)
    // const [editPartnerInfoInputData, seteditPartnerInfoInputData] = useState({editname:'',editemail:'',editphone:'',editstate:''});
    const [editPartnerInfoInputData, seteditPartnerInfoInputData] = useState([{ name: 'partnerId', value: '' }, { name: 'name', value: '' }, { name: 'email', value: '' }, { name: 'phone:', value: '' }]);
    // const [data, setdata] = useState(attorneyPartnersdata);
    const [data, setdata] = useState(attorneyPartners || []);

    //add
    const { name, email, phone, state } = addPartnerInfoInputData;

    // const { firmname, firmemail, firmphonenumber, firmaddress, firmwebsite } = firminfo;

    const handleInputAddPartner = e => setaddPartnerInfoInputData({ ...addPartnerInfoInputData, [e.target.name]: e.target.value });

    // const handleInputFirmInfo = e => setfirminfo({...firminfo, [e.target.name]: e.target.value});

    // console.log('firminfo ',firminfo, firmname, firmemail, firmphonenumber, firmaddress, firmwebsite);
    useEffect(() => {
        if (attorneyPartners) {
            setdata(attorneyPartners);
        }
    }, [attorneyPartners])

    useEffect(() => {
        if (customerdetails) {
            console.log('customerdetails in lawfirm', customerdetails);
            // setfirminfo({firmname: customerdetails && customerdetails.firmInfo.attorney_firm_name ||'',firmemail: customerdetails && customerdetails.firmInfo.law_firm_email || '',firmphonenumber: customerdetails && customerdetails.firmInfo.law_firm_phone || '',firmaddress: customerdetails && customerdetails.attorney_address || '',firmwebsite: customerdetails && customerdetails.firmInfo.law_firm_website || ''});
            setfirminfo([{ name: 'firmname', value: customerdetails && customerdetails.firmInfo.attorney_firm_name || '' }, { name: 'firmemail', value: customerdetails && customerdetails.firmInfo.law_firm_email || '' }, { name: 'firmphonenumber', value: customerdetails && customerdetails.firmInfo.law_firm_phone || '' }, { name: 'firmaddress', value: customerdetails && customerdetails.attorney_address || '' }, { name: 'firmwebsite', value: customerdetails && customerdetails.firmInfo.law_firm_website || '' }]);
            setfirmInfofields([{ name: 'firmname', value: customerdetails && customerdetails.firmInfo.attorney_firm_name || '' }, { name: 'firmemail', value: customerdetails && customerdetails.firmInfo.law_firm_email || '' }, { name: 'firmphonenumber', value: customerdetails && customerdetails.firmInfo.law_firm_phone || '' }, { name: 'firmaddress', value: customerdetails && customerdetails.attorney_address || '' }, { name: 'firmwebsite', value: customerdetails && customerdetails.firmInfo.law_firm_website || '' }]);
        }
    }, [customerdetails])

    // useEffect for sockets (boilerplate)
    useEffect(() => {
        console.log('process.env.NX_HOST', process.env.NX_HOST)
        const s = io(`${process.env.NX_HOST}/attorneys`);
        setsocket(s);
        console.log('socket id lawfirm info', s.id)
        // client-side
        s.on("connect", () => {
            console.log('connect socket id lawfirm info', s.id);
        });

        return () => {
            s.disconnect();
        }
    }, [])

    // useEffect for sockets 2 (where we get that info)
    useEffect(() => {
        if (socket === null)
            return;

        console.log('sockit useeffect in lawfirm')
        socket.on('attorneysinfo', (m) => {
            console.log('m in lawfirm', JSON.parse(m));
            let dbdata = JSON.parse(m);
            console.log(`dbdata.attorney_id = ${dbdata.attorney_id}, customerdetails.attorney_id = ${customerdetails.attorney_id}`);
            if (dbdata.attorney_id === customerdetails.attorney_id) {
                updateReduxFirmInformation(dbdata);
            }
        });

    }, [socket]);

    const handleOpenAddPartnerModel = () => {
        setopenAddPartnerModel(true);
    }

    const handleAddPartnerModelOk = () => {
        console.log('handleAddPartnerModelOk')
        setopenAddPartnerModel(false);
    };

    const handleAddPartnerModelCancel = () => {
        console.log('handleAddPartnerModelCancel');
        setopenAddPartnerModel(false);
        setaddPartnerInfoInputData([{ name: 'name', value: '' }, { name: 'email', value: '' }, { name: 'phone:', value: '' }])
    };

    const handleSavePartner = () => {
        setopenAddPartnerModel(false);
        setaddPartnerInfoInputData([{ name: 'name', value: '' }, { name: 'email', value: '' }, { name: 'phone:', value: '' }]); //empty for the next input
    }

    //edit
    // const { editname,editemail,editphone, editstate } = editPartnerInfoInputData;

    // const handleInputEditPartner = e => seteditPartnerInfoInputData({...editPartnerInfoInputData, [e.target.name]: e.target.value});

    const handleOpenEditPartnerModel = (record) => {
        setopenEditPartnerModel(true);
        setcurrentEditPartnerInfo(record); // since on edit the partnerId filed goes as its not there in the form
        seteditPartnerInfoInputData([{ name: 'partnerId', value: record.partnerId || '' }, { name: 'name', value: record.name || '' }, { name: 'email', value: record.email || '' }, { name: 'phone:', value: record.phone || '' }]);
    }

    const handleEditPartnerModelOk = () => {
        console.log('handleEditPartnerModelOk')
        setopenEditPartnerModel(false);
    };

    const handleEditPartnerModelCancel = () => {
        console.log('handleEditPartnerModelCancel');
        setopenEditPartnerModel(false);
        setcurrentEditPartnerInfo(); //[{name:'partnerId',value:''},{name:'name', value: ''},{name:'email',value:''},{name:'phone:', value: ''}]
        seteditPartnerInfoInputData([{ name: 'partnerId', value: '' }, { name: 'name', value: '' }, { name: 'email', value: '' }, { name: 'phone:', value: '' }]);
    };

    const handleEditSavePartner = () => {
        setopenEditPartnerModel(false);
        // seteditPartnerInfoInputData({editname:'',editemail:'',editphone:'',editstate:''})
    }

    const handleOnFirmInfoEditCancel = () => {
        setfirminfo(firmInfofields)
    }

    const handleonFirmInfoClickSave = () => {
        setfirmInfofields(firminfo);
        startLoading()
        // console.log('firm info name',firminfo[0].value);
        // console.log('firm info email',firminfo[1].value);
        // console.log('firm info mobile',firminfo[2].value);
        // console.log('firm info address',firminfo[3].value);
        // console.log('firm info website',firminfo[4].value);
        // console.log('firm info attorney id',customerdetails.attorney_id);
        // console.log('full firminfo in lawfirm',firminfo);
        updateFirmInformation(firminfo[0].value, firminfo[1].value, firminfo[3].value, firminfo[2].value, firminfo[4].value, customerdetails.attorney_id, customerdetails.attorney_last_name)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        // {
        //     title:'Actions',
        //     dataIndex:'actions',
        //     key:'actions',
        //     width:120,
        //     // responsive: ['sm'],
        //     // render: (_, record) =>{
        //     //     // console.log("_", _, " record ",record, " ",this)
        //     //     return (
        //     //         <Space size="middle">
        //     //                 <Radio.Group>
        //     //                     <Button type='primary'  icon={<AiFillEye />}></Button>
        //     //                     <Button type='primary'  icon={<FaMoneyBillAlt />}></Button>        
        //     //                 </Radio.Group>
        //     //                 </Space>
        //     //     )
        //     // },
        // },
        {
            title: "Action",
            dataIndex: 'actions',
            key: 'actions',
            width: 120,
            align: 'center',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Button size='small' style={{ color: '#00e676' }} onClick={() => handleOpenEditPartnerModel(record)} icon={<AiFillEdit />}></Button>
                            <Button size='small' style={{ color: '#f44336' }} icon={<ImCross />}></Button>
                            <AddorEditpartners
                                title={"Edit Partner"}
                                fields={editPartnerInfoInputData}
                                openPartnerModel={openEditPartnerModel}
                                handlePartnerModelOk={handleEditPartnerModelOk}
                                // editPartnerInfoInputData={editPartnerInfoInputData}
                                handleSavePartner={handleEditSavePartner}
                                handlePartnerModelCancel={handleEditPartnerModelCancel}
                                onChange={(newFields) => {
                                    seteditPartnerInfoInputData(newFields);
                                }}
                            />
                        </Radio.Group>
                    </Space>
                )
            }
        }
    ]



    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', marginBottom: '5px', fontSize: '16px' }}>Firm Information</div>
                <CustomizedLawFirmInfoForm
                    fields={firminfo}
                    handleOnFirmInfoEditCancel={handleOnFirmInfoEditCancel}
                    handleonFirmInfoClickSave={handleonFirmInfoClickSave}
                    onChange={(newFields) => {
                        setfirminfo(newFields);
                    }}
                />

            </div>
            <div style={{ width: '100%', marginTop: '20px' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '16px' }}>Account Partner</div>
                    <div>
                        <IoAddCircleSharp size={'25'} color={'#1890FF'} onClick={handleOpenAddPartnerModel} style={{ cursor: 'pointer' }} />

                        <AddorEditpartners
                            title={"Add Partner"}
                            fields={addPartnerInfoInputData}
                            openPartnerModel={openAddPartnerModel}
                            handlePartnerModelOk={handleAddPartnerModelOk}
                            // editPartnerInfoInputData={editPartnerInfoInputData}
                            handleSavePartner={handleSavePartner}
                            handlePartnerModelCancel={handleAddPartnerModelCancel}
                            onChange={(newFields) => {
                                setaddPartnerInfoInputData(newFields);
                            }}
                        />
                        {/* <Modal title="Add Partner" width={500} mask={false} maskClosable={false} visible={openAddPartnerModel} onOk={handleAddPartnerModelOk} 
                        footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <Button type={'primary'} onClick={handleSavePartner}>Save</Button>
                            </div>}
                             onCancel={handleAddPartnerModelCancel}>
                        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                            <Form
                                name="addpartner"
                                scrollToFirstError
                            >
                                <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                                <Form.Item
                                    name="name"
                                    style={{margin:'0px',padding:'0px'}}
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the Name',
                                    },
                                    ]}
                                >
                                    <Input placeholder={'Name'} name="name" value={name} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                </Form.Item>

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
                                            message: 'Please enter Firm Email!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'Email'} name="email" value={email} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                </Form.Item>
                                </div>
                                <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                                    <Form.Item
                                        name="phone"
                                        style={{margin:'0px',padding:'0px'}}
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please enter the Phone',
                                        },
                                        ]}
                                    >
                                        <Input placeholder={'Phone'} name="phone" value={phone} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                    </Form.Item>
                                   
                                </div>
                            </Form>
                        </div>  
                    </Modal> */}
                    </div>
                </div>
                <div style={{ width: '100%', margin: '10px 0' }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        size="small"
                    // scroll={{ scrollToFirstRowOnChange: false }}
                    // scroll={{
                    //     x: 800
                    // }}
                    />
                </div>
            </div>
        </div>
    )
}

AttorneyLawfirmInformation.propTypes = {
    updateFirmInformation: PropTypes.func.isRequired,
    updateReduxFirmInformation: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired
}

export default connect(null, { startLoading, updateFirmInformation, updateReduxFirmInformation })(AttorneyLawfirmInformation);
