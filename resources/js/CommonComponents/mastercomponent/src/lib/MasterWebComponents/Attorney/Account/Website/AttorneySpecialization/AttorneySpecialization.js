import React, { useState, useEffect } from 'react';
import { Switch, Input, Select, Divider, DatePicker, Slider, Button, Typography, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateReduxSpecialization } from '../../../../../../../../../store/actions/customer';

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

let index = 0;

const AttorneySpecialization = ({ specializations, updateReduxSpecialization, handlecactioncreatespecialization, handleactionupdatespecialization, handleactionshowspecialization, handleactiondeletespecialization, customerdetails }) => {

    const [items, setitems] = useState(null);
    const [newitem, setnewitem] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [createSpecializationName, setCreateSpecializationName] = useState('');
    const [showSpecializations, setShowSpecializations] = useState(false);
    const [socket, setsocket] = useState(null);

    useEffect(async () => {
        console.log('from common specialization component', specializations)
        await setitems(specializations?.specializations);
        await setSelectedItem(specializations?.specializations[0]);
        await setShowSpecializations(specializations?.show_specializations == 1 ? true : false)
        console.log('items specialization', items)
    }, [specializations])

    // socket start
    useEffect(() => {
        console.log('process.env.NX_HOST', process.env.NX_HOST)
        const s = io(`${process.env.NX_HOST}/attorneys/account/web/specialization`);
        setsocket(s);
        console.log('socket id website specialization', s.id)
        // client-side
        s.on("connect", () => {
            console.log('connect socket id website specialization', s.id);
        });
        return () => {
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null)
            return;
        console.log('sockit useeffect in attorney website specialization create')
        socket.on('specializationCreate', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website specialization create', dbdata);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSpecialization(dbdata);
        });

        socket.on('specializationUpdate', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website specialization update', dbdata);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSpecialization(dbdata);
        });

        socket.on('specializationShow', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website specialization show', dbdata);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSpecialization(dbdata);
        });

        socket.on('specializationDelete', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website specialization delete', dbdata);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSpecialization(dbdata);
        });
    }, [socket]);

    // socket end

    const onNameChange = event => {
        setnewitem(event.target.value);
    };

    const addItem = () => {
        console.log('addItem');
        // const { items, name } = this.state;
        setitems([...items, newitem || `New item ${index++}`]);
        setnewitem('');
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedItem({ ...selectedItem, name: value })
    }

    const onHandleSelectedItem = (value) => {
        console.log("onHandleSelectedItem", value, items);
        let data = (items.filter(item => item.id == value));
        setSelectedItem(data[0]);
    }

    const handlecreatespecialization = async () => {
        await handlecactioncreatespecialization(createSpecializationName, customerdetails?.attorney_id);
    }

    const handleupdatespecialization = async () => {
        await handleactionupdatespecialization(selectedItem.id, selectedItem.name, selectedItem.name, selectedItem.percentage, customerdetails?.attorney_id)
    }

    const handledeletespecialization = async () => {
        await handleactiondeletespecialization(selectedItem.id, customerdetails?.attorney_id)
    }

    const handleshowspecialization = async () => {
        await handleactionshowspecialization(!showSpecializations, customerdetails?.attorney_id)
    }

    let casetypeoptions = [
        {
            id: 1,
            value: 'Construction'
        },
        {
            id: 2,
            value: 'PIA'
        },
        {
            id: 3,
            value: 'Real Estate'
        },
        {
            id: 4,
            value: 'House Repairs'
        },
        {
            id: 5,
            value: 'Auto Accident ES'
        },
        {
            id: 6,
            value: 'Mortgage Finance'
        },
        {
            id: 7,
            value: 'Personal Injury'
        },
        {
            id: 8,
            value: 'Sexual Assault'
        },
        {
            id: 9,
            value: 'Auto Accident'
        },
        {
            id: 10,
            value: 'Medical Malpractice'
        },
        {
            id: 11,
            value: 'Workers Compensation'
        },
        {
            id: 12,
            value: 'Wrongful Death'
        },
        {
            id: 13,
            value: 'Others'
        },
    ];

    let children = [];
    console.log('option ', casetypeoptions.length)
    for (let i = 0; i < casetypeoptions.length; i++) {

        children.push(<Option key={casetypeoptions[i].id} value={casetypeoptions[i].value}>{casetypeoptions[i].value}</Option>);

    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>Specialization</div>
                <Switch onClick={handleshowspecialization} checked={specializations != null && specializations.show_specializations == 1 ? true : false} />
            </div>

            <div style={{ display: 'flex' }}>
                <Input placeholder={"Add Specialization"} value={createSpecializationName} onChange={(e) => { setCreateSpecializationName(e.target.value) }} style={{ width: 240 }}></Input>
                <Button onClick={handlecreatespecialization}>Add</Button>
            </div>
            {items?.length > 0 ? <>
                <div style={{ marginTop: '10px', width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Select
                        showSearch
                        value={items[0]?.name}
                        style={{ width: 240, marginRight: '20px' }}
                        placeholder="Select Specialization"
                        onChange={onHandleSelectedItem}
                    >
                        {items?.map(item => (
                            <Option key={item?.id} value={item.id} >{item?.name}</Option>
                        ))}
                    </Select>
                    <Button onClick={handleupdatespecialization}>Update</Button>
                    <Button onClick={handledeletespecialization}>Delete</Button>
                </div>
                <>
                    <div style={{ width: '100%', marginTop: '10px' }}>
                        <Input placeholder={'Specialization sub heading'} onChange={(e) => { setSelectedItem({ ...selectedItem, name: e.target.value }) }} value={selectedItem?.name} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div style={{ width: '48%', minWidth: '200px', marginTop: '10px', marginRight: '10px' }}>
                            <div style={{ marginBottom: '5px' }}>Practice Area</div>
                            <Select
                                // mode="multiple"
                                // allowClear
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="select"
                                value={selectedItem?.name}
                                onChange={handleChange}
                            >{children}</Select>
                        </div>
                        <div style={{ width: '48%', minWidth: '200px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div style={{ marginBottom: '5px' }}>Percentage</div>
                                <InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value} %`}
                                    style={{ width: 70 }}
                                    parser={value => value.replace('%', '')}
                                    onChange={(e) => { setSelectedItem({ ...selectedItem, percentage: (e) }) }}
                                    value={selectedItem?.percentage}
                                />
                            </div>
                            <Slider
                                min={0}
                                max={100}
                                onChange={(e) => { setSelectedItem({ ...selectedItem, percentage: (e) }) }}
                                value={selectedItem?.percentage}
                            />

                        </div>
                    </div>
                </>
            </> : <>
                <div style={{ width: '100%', marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                    <Text>No data found. Add a new Settlement</Text>
                </div>
            </>
            }
        </div>
    )
}

AttorneySpecialization.propTypes = {
    updateReduxSpecialization: PropTypes.func.isRequired
}

export default connect(null, { updateReduxSpecialization })(AttorneySpecialization);
