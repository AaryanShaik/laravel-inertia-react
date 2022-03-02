import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Modal,  Table, Space, Radio } from 'antd';
import { IoAddCircleSharp, IoTrashBin } from 'react-icons/io5';
import {ImCross, ImCheckmark} from 'react-icons/im';
import { AiFillStar, AiFillEdit } from "react-icons/ai";

const AddorEditpartners = ({onChange, fields, title, openPartnerModel,handlePartnerModelOk,handleSavePartner,handlePartnerModelCancel}) => {
    // console.log('openPartnerModel ',openPartnerModel, fields)
    return (
        <div style={{width:'100%'}}>
            <Modal title={title} width={500} mask={false} maskClosable={false} visible={openPartnerModel} onOk={handlePartnerModelOk} 
                                    footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                            <Button type={'primary'} onClick={handleSavePartner}>Save</Button>
                                        </div>}
                                        onCancel={handlePartnerModelCancel}>
                                    <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                                        <Form
                                            name="addpartner"
                                            scrollToFirstError
                                            fields={fields}
                                            onFieldsChange={(_, allFields) => {
                                                onChange(allFields);
                                                
                                            }}
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
                                                <Input placeholder={'Name'} name="name" style={{width:'200px',marginBottom:'10px'}} />
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
                                                <Input placeholder={'Email'} name="email"  style={{width:'200px',marginBottom:'10px'}} />
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
                                                    <Input placeholder={'Phone'} name="phone" vstyle={{width:'200px',marginBottom:'10px'}} />
                                                </Form.Item>
                                                {/* <Form.Item
                                                    name="state"
                                                    style={{margin:'0px',padding:'0px'}}
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter the State',
                                                    },
                                                    ]}
                                                >
                                                    <Input placeholder={'State'} name="editstate" onChange={handleInputEditPartner} style={{width:'200px',marginBottom:'10px'}} />
                                                </Form.Item> */}
                                            </div>
                                        </Form>
                                    </div>  
                                </Modal>   
        </div>
    )
}

export default AddorEditpartners;
