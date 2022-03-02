import React, { useState, useEffect } from 'react';
import { Switch, Input, Select, Divider, DatePicker, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from 'rc-field-form/es/Form';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateReduxTestimonial } from '../../../../../../../../../store/actions/customer';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

let index = 0;

const AttorneyTestimonials = ({ updateReduxTestimonial, testimonials, handleactionupdatetestimonial, handleactiondeletetestimonial, handleactioncreatetestimonial, handleactionupdateshowimage, handleactionupdateshowtestimonials, customerdetails }) => {

    const [items, setitems] = useState(['item 1', 'item 2']);
    const [testimonialName, setTestimonialName] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTestimonials, setShowTestimonials] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [socket, setsocket] = useState(null);

    useEffect(async () => {
        await setitems(testimonials?.testimonials?.testimonials);
        await setSelectedItem(testimonials?.testimonials?.testimonials[0]);
        await setShowTestimonials(testimonials?.testimonials?.show_testimonials == 1 ? true : false);
        await setShowImage(testimonials?.testimonials?.show_testimonial_avatars == 1 ? true : false);
        console.log('items', items)
    }, [testimonials])

    // useEffect for sockets (boilerplate) create
    useEffect(() => {
        console.log('process.env.NX_HOST', process.env.NX_HOST)
        const s = io(`${process.env.NX_HOST}/attorneys/account/web/testimonials`);
        setsocket(s);
        console.log('socket id attorney testimonial Create', s.id)
        // client-side
        s.on("connect", () => {
            console.log('connect socket id attorney testimonial', s.id);
        });
        return () => {
            s.disconnect();
        }
    }, [])
    // useEffect for sockets 2 (where we get that info) create
    useEffect(() => {
        if (socket === null)
            return;
        console.log('sockit useeffect in attorney testimonial create')
        socket.on('testimonialsCreate', (m) => {
            console.log('m in attorney testimonial create', JSON.parse(m));
            let dbdata = JSON.parse(m);
            let obj = { testimonials: JSON.parse(m) }
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxTestimonial(obj);
        });

        socket.on('testimonialsUpdate', (m) => {
            console.log('m in attorney testimonial update', JSON.parse(m));
            let dbdata = JSON.parse(m);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(dbdata);
            // }
            let obj = { testimonials: JSON.parse(m) }
            updateReduxTestimonial(obj);
        });

        socket.on('testimonialsDelete', (m) => {
            console.log('m in attorney testimonial delete', JSON.parse(m));
            let dbdata = JSON.parse(m);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(dbdata);
            // }
            let obj = { testimonials: JSON.parse(m) }
            updateReduxTestimonial(obj);
        });

        socket.on('testimonialsShow', (m) => {
            console.log('m in attorney testimonial show', JSON.parse(m));
            let dbdata = JSON.parse(m);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(dbdata);
            // }
            let obj = { testimonials: JSON.parse(m) }
            updateReduxTestimonial(obj);
        });

        socket.on('testimonialsShowImg', (m) => {
            console.log('m in attorney testimonial show img', JSON.parse(m));
            let dbdata = JSON.parse(m);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(dbdata);
            // }
            let obj = { testimonials: JSON.parse(m) }
            updateReduxTestimonial(obj);
        });
    }, [socket]);

    function onChange(date, dateString) {
        console.log(date, dateString);
    }



    const onHandleSelectedItem = (value) => {
        console.log('selected item value', value)
        let temp = items.filter((item) => item.id == value);
        setSelectedItem(temp[0]);
    }

    const handleCreateTestimonial = async () => {
        console.log('at id', customerdetails?.attorney_id);
        handleactioncreatetestimonial(customerdetails?.attorney_id, testimonialName);
    }

    const handleUpdateTestimonial = async () => {
        handleactionupdatetestimonial(selectedItem.id, selectedItem.name, selectedItem.month, selectedItem.description, customerdetails?.attorney_id)
    }

    const handleDeleteTestimonial = async () => {
        handleactiondeletetestimonial(selectedItem.id, customerdetails?.attorney_id);
    }

    const handleUpdateShowTestimonials = async () => {
        await handleactionupdateshowtestimonials(!showTestimonials, customerdetails?.attorney_id);
    }

    const handleUpdateShowImage = async () => {
        await handleactionupdateshowimage(!showImage, customerdetails?.attorney_id);
    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>Testimonials</div>
                <Switch checked={showTestimonials} onClick={handleUpdateShowTestimonials} />
            </div>
            {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Input />
                <Input />
            </div> */}
            <div style={{ marginTop: '10px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <Input placeholder={"Add Testimonial"} value={testimonialName} onChange={(e) => { setTestimonialName(e.target.value) }} style={{ width: 240 }}></Input>
                    <Button onClick={handleCreateTestimonial}>Add</Button>
                </div>

                <div style={{ width: '140px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '5px 0' }}>
                    <div>Show Image</div>
                    <Switch checked={showImage} onClick={handleUpdateShowImage} />
                </div>
            </div>
            {items?.length > 0 ? <>
                <div style={{ marginTop: '10px', width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Select
                        style={{ width: 240 }}
                        placeholder="Select Testimonials"
                        onChange={onHandleSelectedItem}
                        value={selectedItem?.name}
                    >
                        {items?.map(item => (
                            <Option key={item?.id}>{item?.name}</Option>
                        ))}
                    </Select>
                    <Button onClick={handleUpdateTestimonial}>Update</Button>
                    <Button onClick={handleDeleteTestimonial}>Delete</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', margin: '5px 0 0 0' }}>
                    <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                        <Input placeholder={'Name'} value={selectedItem?.name} onChange={(e) => { setSelectedItem({ ...selectedItem, name: e.target.value }) }} />
                    </div>
                    <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                        <DatePicker onChange={onChange} picker="month" />
                    </div>
                    <div style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                        <TextArea rows={4} placeholder={'About'} value={selectedItem?.description} onChange={(e) => { setSelectedItem({ ...selectedItem, description: (e.target.value) }) }} />
                    </div>
                </div>
            </> : <>
                <div>
                    <Text>No data found. Create a Testimonial</Text>
                </div>
            </>
            }
        </div>
    )
}

AttorneyTestimonials.propTypes = {
    updateReduxTestimonial: PropTypes.func.isRequired
}

export default connect(null, { updateReduxTestimonial })(AttorneyTestimonials);
