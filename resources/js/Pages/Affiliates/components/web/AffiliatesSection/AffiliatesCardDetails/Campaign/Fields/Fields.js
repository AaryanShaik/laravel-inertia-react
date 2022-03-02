import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Modal, Tabs, Select, Input, Checkbox, Table, Space, Radio, Switch, Tooltip } from 'antd';
import { GrSend } from 'react-icons/gr';
import { FaLink } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';
import { BiBox, BiPlus } from 'react-icons/bi';


const { TabPane } = Tabs;
const { Option, OptGroup } = Select;
const { TextArea } = Input;

const Fields = ({ fieldsdata, updatedFieldData, editmode }) => {

    const [openAddFieldmodel, setopenAddFieldmodel] = useState(false);
    const [openEditFieldmodel, setopenEditFieldmodel] = useState(false);
    const [addNewFieldrecord, setaddNewFieldrecord] = useState({ key: '', nameanddesc: "", description: "", refkey: "", assignedat: "", datatype: "", status: false });
    const [currentEditFieldrecord, setcurrentEditFieldrecord] = useState();
    const [data, setdata] = useState([]);

    function callback(key) {
        console.log(key);
    }


    useEffect(() => {

    }, [currentEditFieldrecord])

    useEffect(() => {
        // console.log('data table',data)
        setdata(fieldsdata.fieldtable)
    }, [fieldsdata])

    // useEffect(() => {
    //     // console.log('data table',data)
    //     updatedFieldData(data)
    // }, [data])

    //add model
    const handleopenAddFieldModal = () => {
        setaddNewFieldrecord({ key: "", nameanddesc: "", description: "", refkey: "", assignedat: "", datatype: "", status: false });
        setopenAddFieldmodel(true);
    };

    const handleAddFieldOk = () => {
        console.log('handleAddFieldOk')
        addNewFieldrecord.key = Math.floor(Math.random() * 100000000);  //data.length +1; //dummy for time being, will have it alpha numeric later
        let olddata = [...data, addNewFieldrecord];
        setdata(olddata)
        setaddNewFieldrecord({ key: "", nameanddesc: "", description: "", refkey: "", assignedat: "", datatype: "", status: false });
        updatedFieldData(olddata);
        setopenAddFieldmodel(false);
    };

    const handleAddFieldCancel = () => {
        console.log('handleAddFieldCancel');
        // setcurrentShowDetailrecord();
        setopenAddFieldmodel(false);
    };


    //   edit model
    const handleopenEditFieldModal = (record) => {
        setcurrentEditFieldrecord(record);
        setopenEditFieldmodel(true);
    };

    const handleEditFieldOk = () => {
        console.log('handleEditFieldOk');
        console.log(currentEditFieldrecord);
        let olddata = [...data];
        let findindex = data.findIndex(item => item.key === currentEditFieldrecord.key);
        olddata[findindex] = currentEditFieldrecord;
        setdata(olddata);
        setcurrentEditFieldrecord();
        updatedFieldData(olddata);
        setopenEditFieldmodel(false);
    };

    const handleEditFieldCancel = () => {
        console.log('handleEditFieldCancel');
        setcurrentEditFieldrecord();
        setopenEditFieldmodel(false);
    };


    const onDataTypeChange = (value) => {
        console.log(`selected ${value}`);
        if (currentEditFieldrecord) {
            setcurrentEditFieldrecord({ ...currentEditFieldrecord, datatype: value })
        }
    }

    const onNewDataTypeChange = (value) => {
        if (addNewFieldrecord) {
            setaddNewFieldrecord({ ...addNewFieldrecord, datatype: value })
        }
    }

    const onDataTypeSearch = (val) => {
        console.log('search:', val);
    }

    const onTemplateChange = (value) => {
        console.log(`selected ${value}`);
        // setcreatenewdealdata({...createnewdealdata, leadtype: value});
    }

    const onTemplateSearch = (val) => {
        console.log('search:', val);
    }

    //add new
    const onNewFieldInputChangeHandler = (e) => {
        // if(addNewFieldrecord){
        setaddNewFieldrecord({ ...addNewFieldrecord, [e.target.name]: e.target.value })
        // }
    }

    const onNewFieldSwitchChangeHandler = (checked) => {
        // if(addNewFieldrecord){
        setaddNewFieldrecord({ ...addNewFieldrecord, status: checked })
        // }
    }

    //edit modal
    const oneditinputChangeHandler = (e) => {
        if (currentEditFieldrecord) {
            setcurrentEditFieldrecord({ ...currentEditFieldrecord, [e.target.name]: e.target.value })
        }
    }

    const oneditSwitchChangeHandler = (checked) => {
        if (currentEditFieldrecord) {
            setcurrentEditFieldrecord({ ...currentEditFieldrecord, status: checked })
        }
    }

    const handleOnclickDelete = (record) => {
        let dataarr = [...data];
        const filteredarray = dataarr.filter((item) => item.key !== record.key);
        console.log(filteredarray)
        setdata(filteredarray);
        updatedFieldData(filteredarray);
    }

    const columns = [
        {
            title: 'Name and Desc',
            dataIndex: 'nameanddesc',
            key: 'nameanddesc',
            width: 120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        {
            title: 'Ref Key',
            dataIndex: 'refkey',
            key: 'refkey',
            width: 150,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        {
            title: 'Data Type',
            dataIndex: 'datatype',
            key: 'datatype',
            width: 120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text ? 'Required' : 'Optional'}</span>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            width: 120,
            // responsive: ['sm'],
            render: (_, record) => {
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Button size={"small"} disabled={editmode} onClick={() => handleopenEditFieldModal(record)} type={'primary'} style={{ marginRight: '1px' }}><AiFillEdit /></Button>
                            <Button size={"small"} disabled={editmode} onClick={() => handleOnclickDelete(record)} type={'danger'}><IoTrashBin /></Button>
                        </Radio.Group>
                        <Modal title="Edit Field" mask={false} maskClosable={false} width={400} visible={openEditFieldmodel} footer={<div><Button type={'primary'} onClick={handleEditFieldOk}>Save</Button></div>} onOk={handleEditFieldOk} onCancel={handleEditFieldCancel}>
                            <div style={{ width: '100%' }}>
                                <Input style={{ margin: '10px 0', width: '100%' }} onChange={oneditinputChangeHandler} name={'nameanddesc'} placeholder={'Name'} value={currentEditFieldrecord && currentEditFieldrecord.nameanddesc} />
                                <Input style={{ margin: '10px 0', width: '100%' }} onChange={oneditinputChangeHandler} name={'description'} placeholder={'Description'} value={currentEditFieldrecord && currentEditFieldrecord.description} />
                                <Input style={{ margin: '10px 0', width: '100%' }} onChange={oneditinputChangeHandler} name={'refkey'} placeholder={'Ref Key'} value={currentEditFieldrecord && currentEditFieldrecord.refkey} />
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ margin: '10px 0', width: '100%' }}
                                    placeholder="Data Type"
                                    optionFilterProp="children"
                                    value={currentEditFieldrecord && currentEditFieldrecord.datatype}
                                    onChange={onDataTypeChange}
                                    onSearch={onDataTypeSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="Auto Accident">String</Option>
                                    <Option value="Personal Injury">Number</Option>
                                    <Option value="Construction">Boolean</Option>
                                </Select>
                                <div style={{ margin: '10px 0', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Switch checked={currentEditFieldrecord && currentEditFieldrecord.status} onChange={oneditSwitchChangeHandler}>Required</Switch>
                                    <div style={{ marginLeft: '10px' }}>Required</div>
                                </div>
                            </div>
                        </Modal>
                    </Space>
                )
            },
        }
    ]

    // console.log('currentEditFieldrecord ',currentEditFieldrecord)

    // const data = [
    //     {
    //         key:'1',
    //         nameanddesc:'First Name',
    //         refkey:`lead_first_name`,
    //         assignedat:'07/14/2020, 02:24 AM',
    //         datatype: 'String',
    //         status:'Required',
    //     },
    //     {
    //         key:'2',
    //         nameanddesc:'Last Name',
    //         refkey:`lead_first_name`,
    //         assignedat:'07/14/2020, 02:24 AM',
    //         datatype: 'String',
    //         status:'Required',
    //     },
    //     {
    //         key:'3',
    //         nameanddesc:'Email',
    //         refkey:`lead_first_name`,
    //         assignedat:'07/14/2020, 02:24 AM',
    //         datatype: 'String',
    //         status:'Required',
    //     },
    //     {
    //         key:'4',
    //         nameanddesc:'Phone',
    //         refkey:`lead_first_name`,
    //         assignedat:'07/14/2020, 02:24 AM',
    //         datatype: 'Number',
    //         status:'Required',
    //     },
    // ]

    console.log(addNewFieldrecord)

    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', padding: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px', fontSize: '18px' }}>API Docs</div>
                    <div style={{ marginRight: '10px' }}><FaLink size={18} /></div>
                    <div><GrSend size={18} /></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button onClick={handleopenAddFieldModal} disabled={editmode}>Add Field</Button>
                    <Modal title="Add Field" mask={false} maskClosable={false} width={600} visible={openAddFieldmodel} footer={<div><Button type={'primary'} onClick={handleAddFieldOk}>Add</Button></div>} onOk={handleAddFieldOk} onCancel={handleAddFieldCancel}>
                        <div style={{ width: '100%' }}>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><BiBox />&nbsp;Select Existing</span>} key="1">
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ margin: '10px 0', width: '100%' }}
                                        placeholder="Select Ref"
                                        optionFilterProp="children"
                                        onChange={onNewDataTypeChange}
                                        onSearch={onDataTypeSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="Auto Accident">String</Option>
                                        <Option value="Personal Injury">Number</Option>
                                        <Option value="Construction">Boolean</Option>
                                    </Select>
                                    <Tooltip
                                        trigger={['focus']}
                                        title="Name"
                                        placement="topLeft"
                                        overlayClassName="numeric-input"
                                    >
                                        <Input style={{ margin: '10px 0', width: '100%' }} onChange={onNewFieldInputChangeHandler} name={'nameanddesc'} value={addNewFieldrecord && addNewFieldrecord.nameanddesc} placeholder={'Name'} />
                                    </Tooltip>
                                    <Tooltip
                                        trigger={['focus']}
                                        title="Description"
                                        placement="topLeft"
                                        overlayClassName="numeric-input"
                                    >
                                        <Input style={{ margin: '10px 0', width: '100%' }} onChange={onNewFieldInputChangeHandler} name={'description'} value={addNewFieldrecord && addNewFieldrecord.description} placeholder={'Description'} />
                                    </Tooltip>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ margin: '10px 0', width: '100%' }}
                                        placeholder="Data Type"
                                        optionFilterProp="children"
                                        onChange={onNewDataTypeChange}
                                        onSearch={onDataTypeSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="Auto Accident">String</Option>
                                        <Option value="Personal Injury">Number</Option>
                                        <Option value="Construction">Boolean</Option>
                                    </Select>
                                    <div style={{ margin: '10px 0', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Switch checked={addNewFieldrecord && addNewFieldrecord.status} onChange={onNewFieldSwitchChangeHandler}>Required</Switch>
                                        <div style={{ marginLeft: '10px' }}>Required</div>
                                    </div>
                                </TabPane>
                                <TabPane tab={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><BiPlus />&nbsp;Create New</span>} key="2">
                                    <Tooltip
                                        trigger={['focus']}
                                        title="Ref Key"
                                        placement="topLeft"
                                        overlayClassName="numeric-input"
                                    >
                                        <Input style={{ margin: '10px 0', width: '100%' }} name={'nameanddesc'} placeholder={'Ref Key'} />
                                    </Tooltip>
                                    <Tooltip
                                        trigger={['focus']}
                                        title="Default Title"
                                        placement="topLeft"
                                        overlayClassName="numeric-input"
                                    >
                                        <Input style={{ margin: '10px 0', width: '100%' }} name={'nameanddesc'} placeholder={'Default Title'} />
                                    </Tooltip>
                                    <Tooltip
                                        trigger={['focus']}
                                        title="Script Title"
                                        placement="topLeft"
                                        overlayClassName="numeric-input"
                                    >
                                        <Input style={{ margin: '10px 0', width: '100%' }} name={'nameanddesc'} placeholder={'Script Title'} />
                                    </Tooltip>
                                    <Tooltip
                                        trigger={['focus']}
                                        title="Vendor Title"
                                        placement="topLeft"
                                        overlayClassName="numeric-input"
                                    >
                                        <Input style={{ margin: '10px 0', width: '100%' }} name={'nameanddesc'} placeholder={'Vendor Title'} />
                                    </Tooltip>
                                    <Tooltip
                                        trigger={['focus']}
                                        title="Description"
                                        placement="topLeft"
                                        overlayClassName="numeric-input"
                                    >
                                        <TextArea rows={4} placeholder="Description" />
                                    </Tooltip>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ margin: '10px 0', width: '100%' }}
                                        placeholder="Data Type"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="Auto Accident">String</Option>
                                        <Option value="Personal Injury">Number</Option>
                                        <Option value="Construction">Boolean</Option>
                                    </Select>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox>Required</Checkbox>
                                        <Checkbox>Include in case history</Checkbox>
                                        <Checkbox>Transform</Checkbox>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Modal>
                    <div style={{ marginLeft: '10px', width: '200px' }}>
                        <Select
                            showSearch
                            allowClear
                            style={{ margin: '10px 0', width: '100%' }}
                            placeholder="Template"
                            optionFilterProp="children"
                            disabled={editmode}
                            onChange={onTemplateChange}
                            onSearch={onTemplateSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Templat 1">Templat 1</Option>
                            <Option value="Templat 2">Templat 2</Option>
                            <Option value="Templat 3">Templat 3</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', margin: '10px 0' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                    // scroll={{ scrollToFirstRowOnChange: false }}
                    scroll={{
                        x: 800,
                        y: '25vh'
                    }}
                />
            </div>
        </div>
    )
}

export default Fields
