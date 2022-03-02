import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Modal, Table, Space, Radio } from 'antd';
import { IoAddCircleSharp, IoTrashBin } from 'react-icons/io5';
import { AiFillEdit } from 'react-icons/ai';
import moment from "moment";
import momentTimezone from "moment-timezone";

const { Option, OptGroup } = Select;

const data = [
    {
        no:'1',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        assignedat:'07/14/2020, 02:24 AM',
        apiresponse: '',
        email:'johndoe@gmail.com',
        phone:'+1234567890'
    },
    {
        no:'2',
        name:'Doe Martins',
        casetype:`Auto Accident`,
        assignedat:'07/14/2020, 02:24 AM',
        apiresponse: '',
        email:'johndoe@gmail.com',
        phone:'+1234567890'
    },
    {
        no:'3',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        assignedat:'07/14/2020, 02:24 AM',
        apiresponse: '',
        email:'johndoe@gmail.com',
        phone:'+1234567890'
    },
]

const BillingInformation = () => {

    const [openAddPartnerModel, setopenAddPartnerModel] = useState(false)
    const [addPartnerInfoInputData, setaddPartnerInfoInputData] = useState({firstname:'',lastname:'',email:'',phone:''});

    const [openEditPartnerModel, setopenEditPartnerModel] = useState(false)
    const [editPartnerInfoInputData, seteditPartnerInfoInputData] = useState({editfirstname:'',editlastname:'',editemail:'',editphone:''});

    const { firstname,lastname,email,phone } = addPartnerInfoInputData;
    const { editfirstname,editlastname,editemail,editphone } = addPartnerInfoInputData;

    const handleOpenAddPartnerModel = () => {
        setopenAddPartnerModel(true);
    }

    const handleInputAddPartner = e => setaddPartnerInfoInputData({...addPartnerInfoInputData, [e.target.name]: e.target.value});

    const handleAddPartnerModelOk = () => {
        console.log('handleAddPartnerModelOk')
        setopenAddPartnerModel(false);
    };
    
    const handleAddPartnerModelCancel = () => {
        console.log('handleAddPartnerModelCancel');
        setopenAddPartnerModel(false);
    };

    const handleSavePartner = () =>{
        setopenAddPartnerModel(false);
        setaddPartnerInfoInputData({firstname:'',lastname:'',email:'',phone:''})
    }

    //edit model functions
    const handleOpenEditPartnerModel = () => {
        setopenEditPartnerModel(true);
    }

    const handleInputEditPartner = e => seteditPartnerInfoInputData({...editPartnerInfoInputData, [e.target.name]: e.target.value});

    const handleEditPartnerModelOk = () => {
        console.log('handleEditPartnerModelOk')
        setopenEditPartnerModel(false);
    };
    
    const handleEditPartnerModelCancel = () => {
        console.log('handleEditPartnerModelCancel');
        setopenEditPartnerModel(false);
    };

    const handleSaveEditPartner = () =>{
        setopenEditPartnerModel(false);
        seteditPartnerInfoInputData({editfirstname:'',editlastname:'',editemail:'',editphone:''})
    }

    const columns = [
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Email',
            dataIndex:'email',
            key:'email',
            width:150,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Phone',
            dataIndex:'phone',
            key:'phone',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Actions',
            dataIndex:'actions',
            key:'actions',
            align:'center',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Button size="small" type={'primary'} onClick={handleOpenEditPartnerModel} style={{marginRight:'1px'}}><AiFillEdit /></Button>
                            <Button size="small" type={'danger'}><IoTrashBin /></Button>
                            <Modal title="Edit Partner" width={500} mask={false} maskClosable={false} visible={openEditPartnerModel} onOk={handleEditPartnerModelOk} footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                        <Button type={'primary'} style={{marginRight:'10px'}} onClick={handleSaveEditPartner}>Save</Button>
                                        <Button type={'primary'} onClick={handleEditPartnerModelCancel}>Cancel</Button>
                                    </div>} onCancel={handleEditPartnerModelCancel}>
                                <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                                    <Form
                                            name="AffiliatEditPartner"
                                            scrollToFirstError
                                        >
                                        <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
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
                                                <Input placeholder={'First Name'} name="editfirstname" value={firstname} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                            </Form.Item>
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
                                                <Input placeholder={'Last Name'} name="editlastname" value={lastname} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                            </Form.Item>
                                            {/* <Input placeholder={'First Name'} name="editfirstname" value={firstname} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                            {/* <Input placeholder={'Last Name'} name="editlastname" value={lastname} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                        </div>
                                        <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
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
                                                <Input placeholder={'Email'} name="editemail" value={email} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                            </Form.Item>
                                            <Form.Item
                                                name="editphone"
                                                style={{margin:'0px',padding:'0px'}}
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter the Phone no.',
                                                },
                                                ]}
                                            >
                                                <Input placeholder={'Phone'} name="editphone" value={phone} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                            </Form.Item>
                                            {/* <Input placeholder={'Email'} name="editemail" value={email} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                            {/* <Input placeholder={'Phone'} name="editphone" value={phone} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                        </div>
                                    </Form>
                                </div>  
                            </Modal>
                        </Radio.Group>
                    </Space>
                )
            },
        }
    ]

    return (
        <div style={{width:'100%'}}>
             <div style={{width:'100%',marginBottom:'20px'}}>
                <Form
                    name="AffiliateBillingInfo"
                    scrollToFirstError
                >
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            {/* <Input placeholder={'Name'} /> */}
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
                                <Input name={'name'} placeholder={'Name'} />
                            </Form.Item>
                        </div>
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
                                        message: 'Please enter Firm Email!',
                                    },
                                ]}
                            >
                                {/* <Input name={'firmwebsite'} placeholder={'Firm Website'} /> */}
                                <Input placeholder={'Email'} name="email" />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'0'}}>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px'}}>
                            {/* <Input placeholder={'Phone'} /> */}
                            <Form.Item
                                name="phone"
                                style={{margin:'0px',padding:'0px'}}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Phone no.',
                                },
                                ]}
                            >
                                <Input name={'phone'} placeholder={'Phone'} />
                            </Form.Item>
                        </div>
                        <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'10px',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button type={'primary'}>Edit</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <div style={{width:'100%',marginTop:'20px'}}>
                <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                    <div style={{fontSize:'16px'}}>Account Partner</div>
                    <div>
                        <IoAddCircleSharp size={'25'} color={'#1890FF'} onClick={handleOpenAddPartnerModel} style={{cursor:'pointer'}} />
                        <Modal title="Add Partner" width={500} mask={false} maskClosable={false} visible={openAddPartnerModel} onOk={handleAddPartnerModelOk} footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                            <Button type={'primary'} style={{marginRight:'10px'}} onClick={handleSavePartner}>Save</Button>
                                            <Button type={'primary'} onClick={handleAddPartnerModelCancel}>Cancel</Button>
                                        </div>} onCancel={handleAddPartnerModelCancel}>
                            <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                                <Form
                                        name="AffiliateAddPartner"
                                        scrollToFirstError
                                    >
                                <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
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
                                        <Input placeholder={'First Name'} name="firstname" value={firstname} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                    </Form.Item>
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
                                        <Input placeholder={'Last Name'} name="lastname" value={lastname} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                    </Form.Item>
                                    {/* <Input placeholder={'First Name'} name="firstname" value={firstname} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                    {/* <Input placeholder={'Last Name'} name="lastname" value={lastname} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                </div>
                                <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
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
                                        <Input placeholder={'Email'} name="email" value={email} onChange={handleInputAddPartner} style={{width:'200px',marginBottom:'10px'}} />
                                    </Form.Item>
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
                                    {/* <Input placeholder={'Email'} name="email" value={email} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                    {/* <Input placeholder={'Phone'} name="phone" value={phone} onChange={handleInputAddPartner} style={{width:'160px',marginBottom:'10px'}} /> */}
                                </div>
                                {/* <div style={{width:'100%',marginBottom:'10px'}}>
                                    <Input placeholder={'Country'} name="country" value={country} onChange={handleInputAddCard} />
                                </div>

                                <div style={{width:'100%',marginBottom:'10px'}}>
                                    <Input placeholder={'Name'} name="name" value={name} onChange={handleInputAddCard} />
                                </div> */}

                                {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                    <Button type={'primary'} onClick={handleSavePartner}>Save</Button>
                                </div> */}
                                </Form>
                            </div>  
                        </Modal>
                    </div>
                </div>
            </div>
            <div style={{width:'100%',margin:'10px 0'}}>
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
    )
}

export default BillingInformation;
