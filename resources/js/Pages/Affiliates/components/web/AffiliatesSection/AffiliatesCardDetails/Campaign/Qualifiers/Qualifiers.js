import React,{useState, useEffect} from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Tabs, Select, Modal, Input, Checkbox, Table, Space, Radio, Switch } from 'antd';
import { GrSend } from 'react-icons/gr';
import {FaLink} from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

const Qualifiers = ({editmode}) => {

    const [openAddQualifiersmodel, setopenAddQualifiersmodel] = useState(false);
    const [openEditQualifiersmodel, setopenEditQualifiersmodel] = useState(false);
    const [currentEditQualifiersrecord, setcurrentEditQualifiersrecord] = useState();

    useEffect(() => {

    }, [currentEditQualifiersrecord])

    //add model
    const handleopenAddQualifiersModal = () => {
        // setcurrentShowDetailrecord(record);
        setopenAddQualifiersmodel(true);
      };
    
      const handleAddQualifiersOk = () => {
        console.log('handleAddQualifiersOk')
        // setcurrentShowDetailrecord();
        setopenAddQualifiersmodel(false);
      };
    
      const handleAddQualifiersCancel = () => {
        console.log('handleAddQualifiersCancel');
        // setcurrentShowDetailrecord();
        setopenAddQualifiersmodel(false);
      };


    //   edit model
      const handleopenEditQualifiersModal = (record) => {
        setcurrentEditQualifiersrecord(record);
        setopenEditQualifiersmodel(true);
      };
    
      const handleEditQualifiersOk = () => {
        console.log('handleEditQualifiersOk')
        setcurrentEditQualifiersrecord();
        setopenEditQualifiersmodel(false);
      };
    
      const handleEditQualifiersCancel = () => {
        console.log('handleEditQualifiersCancel');
        setcurrentEditQualifiersrecord();
        setopenEditQualifiersmodel(false);
      };

    const columns = [
        {
            title:'Parameter',
            dataIndex:'parameter',
            key:'parameter',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Condition',
            dataIndex:'condition',
            key:'condition',
            width:150,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Value',
            dataIndex:'value',
            key:'value',
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
                            <Button size={"small"} disabled={editmode} type={'primary'} onClick={()=>handleopenEditQualifiersModal(record)} style={{marginRight:'1px'}}><AiFillEdit /></Button>
                            <Button size={"small"} disabled={editmode} type={'danger'}><IoTrashBin /></Button>
                        </Radio.Group>
                        <Modal title="Edit Qualifiers" mask={false} maskClosable={false} width={400} visible={openEditQualifiersmodel} footer={<div><Button type={'primary'} onClick={handleEditQualifiersOk}>Save</Button></div>} onOk={handleEditQualifiersOk} onCancel={handleEditQualifiersCancel}>
                            <div style={{width:'100%'}}>
                                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Parameter'/>
                                <Input style={{width:'100%', marginTop:10}} size='small' value='Equal To'  placeholder='Condition'/>
                                <Select style={{marginTop:10, width:'100%'}} placeholder='Value' size='small'>
                                    <Option value='Yes'>Yes</Option>
                                    <Option value='No'>No</Option>
                                </Select>
                                {/* <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Create Qualifier</Button> */}
                            </div>
                        </Modal>
                    </Space>
                )
            },
        }
    ]

    const data = [
        {
            key:'1',
            parameter:'Were you injured',
            condition:`equal to`,
            value:'Yes',
        },
        {
            key:'2',
            parameter:'Were you injured',
            condition:`equal to`,
            value:'Yes',
        },
        {
            key:'3',
            parameter:'Were you injured',
            condition:`equal to`,
            value:'No',
        },
        {
            key:'4',
            parameter:'Were you injured',
            condition:`equal to`,
            value:'Yes',
        },
    ]

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%',padding:'5px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <div style={{marginRight:'10px',fontSize:'18px'}}>Lead Qualifiers</div>
                    <div style={{marginRight:'10px'}}><FaLink size={18} /></div>
                    <div><GrSend size={18} /></div>
                </div>
                <div>
                    <Button type={'primary'} disabled={editmode} onClick={handleopenAddQualifiersModal}>Add</Button>
                    <Modal title="Add Qualifiers" mask={false} maskClosable={false} width={400} visible={openAddQualifiersmodel} footer={<div><Button type={'primary'} onClick={handleAddQualifiersOk}>Create Qualifier</Button></div>} onOk={handleAddQualifiersOk} onCancel={handleAddQualifiersCancel}>
                        <div style={{width:'100%'}}>
                            <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Parameter'/>
                            <Input style={{width:'100%', marginTop:10}} size='small' value='Equal To'  placeholder='Condition'/>
                            <Select style={{marginTop:10, width:'100%'}} placeholder='Value' size='small'>
                                <Option value='Yes'>Yes</Option>
                                <Option value='No'>No</Option>
                            </Select>
                            {/* <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Create Qualifier</Button> */}
                        </div>
                    </Modal>
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

export default Qualifiers;
