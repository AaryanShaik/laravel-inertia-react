import React, { useState, useEffect } from 'react';
import { Switch, Input, Select, Divider, DatePicker, Button, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateReduxSettlement } from '../../../../../../../../../store/actions/customer';

const { TextArea } = Input;
const { Option } = Select;

let index = 0;

const AttorneyResults = ({ settlements, updateReduxSettlement, handleactionupdateshowsettlement, handleactionupdatesettlement, handleactiondeletesettlement, handleactioncreatesettlement, customerdetails }) => {

    const [items, setitems] = useState(null);
    // const [item, setitem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSettlements, setShowSettlements] = useState(false);
    const [createSettlementName, setCreateSettlementName] = useState('');
    const [socket, setsocket] = useState(null);

    useEffect(async () => {
        await setSelectedItem(settlements?.settlements?.settlements[0]);
        await setitems(settlements?.settlements?.settlements);
        await setShowSettlements(settlements?.settlements?.show_settlements == 1 ? true : false);
    }, [settlements])

    // socket start
    useEffect(() => {
        console.log('process.env.NX_HOST', process.env.NX_HOST)
        const s = io(`${process.env.NX_HOST}/attorneys/account/web/settlements`);
        setsocket(s);
        console.log('socket id website settlement', s.id)
        // client-side
        s.on("connect", () => {
            console.log('connect socket id website settlement', s.id);
        });
        return () => {
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null)
            return;
        console.log('sockit useeffect in attorney website settlement create')
        socket.on('settlementCreate', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website settlement create', dbdata);
            let obj = { settlements: dbdata }
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSettlement(obj);
        });

        socket.on('settlementUpdate', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website settlement update', dbdata);
            let obj = { settlements: dbdata }
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSettlement(obj);
        });

        socket.on('settlementShow', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website settlement show', dbdata);
            let obj = { settlements: dbdata }
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSettlement(obj);
        });

        socket.on('settlementDelete', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website settlement delete', dbdata);
            let obj = { settlements: dbdata }
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxSettlement(obj);
        });
    }, [socket]);

    // socket end

    const onNameChange = value => {
        let newItem = items.filter((item) => item.name == value);
        setSelectedItem(newItem[0]);
    };

    const handleCreateSettlement = async () => {
        console.log(createSettlementName)
        if (customerdetails && customerdetails) {
            console.log(customerdetails?.attorney_id);
            let attorney_id = customerdetails?.attorney_id;
            //   await createSettlement(createSettlementName, attorney_id)
            await handleactioncreatesettlement(createSettlementName, attorney_id)
        }

        // let attorney_id = customerdetails?.attorney_id;

    }

    const handleButtonUpdateSettlement = async () => {
        // let settlement = items.filter((item)=>(item?.id == selectedItem ));
        console.log(selectedItem);
        await handleactionupdatesettlement(
            selectedItem.id,
            selectedItem.name,
            selectedItem.amount,
            selectedItem.description,
            customerdetails?.attorney_id
        )
        // await updateSettlement(id, settlementName, amount, description, attorneyId)
    }

    const handleButtonDeleteSettlement = async () => {
        await handleactiondeletesettlement(selectedItem.id, customerdetails?.attorney_id)
        // await deleteSettlement(settlementId,attorneyId);
    }

    const handleSwitchUpdateShowSettlement = async () => {
        console.log(showSettlements);
        await handleactionupdateshowsettlement(!showSettlements, customerdetails?.attorney_id)
    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>Results</div>
                <Switch onClick={handleSwitchUpdateShowSettlement} checked={showSettlements} />
            </div>
            <div style={{ display: 'flex' }}>
                <Input placeholder={"Add Settlement"} value={createSettlementName} onChange={(e) => { setCreateSettlementName(e.target.value) }} style={{ width: 240 }}></Input>
                <Button onClick={handleCreateSettlement}>Add</Button>
            </div>
            {items?.length > 0 ? <>
                <div style={{ marginTop: '10px', width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <Select
                        // labelInValue
                        // value={items[0]?.name}
                        value={items[0]?.name}
                        // initial

                        style={{ width: 240 }}
                        onChange={onNameChange}
                    >
                        {items?.map(item => (
                            <Option key={item?.id} value={item?.name}>{item?.name}</Option>
                        ))}
                    </Select>
                    <Button onClick={handleButtonUpdateSettlement}>Update</Button>
                    <Button onClick={handleButtonDeleteSettlement}>Delete</Button>
                </div>
                {/* {selectedItem?.map((item)=>( */}
                <>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', margin: '5px 0 0 0' }}>
                        <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                            <Input placeholder={'Injury Type'} onChange={(e) => { setSelectedItem({ ...selectedItem, name: e.target.value }) }} defaultValue={selectedItem?.name} />
                        </div>
                        <div style={{ minWidth: '200px', width: '48%', marginRight: '1px', marginTop: '5px' }}>
                            <InputNumber
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder={'Settlement'}
                                style={{ width: 'fit-content' }}
                                onChange={(value) => { setSelectedItem({ ...selectedItem, amount: value }) }} prefix='$' defaultValue={selectedItem?.amount} />
                        </div>
                        <div style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                            <TextArea rows={4} placeholder={'Description'} onChange={(e) => { setSelectedItem({ ...selectedItem, description: e.target.value }) }} defaultValue={selectedItem?.description} />
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

AttorneyResults.propTypes = {
    updateReduxSettlement: PropTypes.func.isRequired
}

export default connect(null, { updateReduxSettlement })(AttorneyResults);
