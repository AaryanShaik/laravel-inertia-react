import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Modal, Table, Space, Radio } from 'antd';
import { IoAddCircleSharp, IoTrashBin } from 'react-icons/io5';
import { ImCross, ImCheckmark } from 'react-icons/im';
import { AiFillStar, AiFillEdit } from "react-icons/ai";

import CaseHistory from '../../../../CommonComponents/mastercomponent/src/lib/MasterWebComponents/Attorney/Leads/CaseHistory/CaseHistory';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";



const CustomizedDetailForm = ({ onChange, fields, disableEditmodeforDetails }) => {

    return (
        <Form
            name="global_state"
            layout="inline"
            fields={fields}
            onFieldsChange={(_, allFields) => {
                onChange(allFields);
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: '10px 0' }}>
                    <Form.Item
                        name="name"
                        label={"Name"}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Name",
                            },
                        ]}
                    >
                        <Input disabled={disableEditmodeforDetails} placeholder={"Name"} />
                    </Form.Item>
                </div>
                <div style={{ margin: '10px 0' }}>
                    <Form.Item
                        name="email"
                        label={"Email"}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email",
                            },
                        ]}
                    >
                        <Input disabled={disableEditmodeforDetails} placeholder={"Email"} />
                    </Form.Item>
                </div>
                <div style={{ margin: '10px 0' }}>
                    <Form.Item
                        name="phone"
                        label={"Phone"}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Phone",
                            },
                        ]}
                    >
                        <Input disabled={disableEditmodeforDetails} placeholder={"Phone"} />
                    </Form.Item>
                </div>
                <div style={{ margin: '10px 0' }}>
                    <Form.Item
                        name="casetype"
                        label={"Case Type"}
                        rules={[
                            {
                                required: true,
                                message: "Please input Case Type",
                            },
                        ]}
                    >
                        <Input disabled={disableEditmodeforDetails} placeholder={"Case Type"} />
                    </Form.Item>
                </div>
                <div style={{ margin: '10px 0' }}>
                    <Form.Item
                        name="location"
                        label={"Location"}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Location",
                            },
                        ]}
                    >
                        <Input disabled={disableEditmodeforDetails} placeholder={"Location"} />
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}

const DetailsEditable = ({ lead_raw_data, leads, lead_details }) => {

    const [metavalues, setmetavalues] = useState([])
    const [leaddetails, setleaddetails] = useState([])
    const [detailsfields, setdetailsfields] = useState([{ name: 'name', value: '' }, { name: 'email', value: '' }, { name: 'phone', value: '' }, { name: 'casetype', value: '' }, { name: 'location', value: '' }]);
    const [detailsfieldscopy, setdetailsfieldscopy] = useState([{ name: 'name', value: '' }, { name: 'email', value: '' }, { name: 'phone', value: '' }, { name: 'casetype', value: '' }, { name: 'location', value: '' }]);
    const [disableEditmodeforDetails, setdisableEditmodeforDetails] = useState(true);
    // useEffect(() => {
    //     if(leads.lead_details && leads.lead_details){
    //         setleaddetails(leads.lead_details);
    //     }
    // }, [])

    useEffect(() => {
        // console.log('leads ',leads.lead_details && leads.lead_details)
        // if(leads.lead_details && leads.lead_details){
        //     let ld = leads.lead_details;
        //     console.log('leads.lead_details.lead_raw_data) ',ld.lead_raw_data)
        //     // setleaddetails(leads.lead_details);
        // }
        // if(lead_details){
        //     setdetailsfields([{name:'name',value: `${lead_raw_data  && lead_raw_data.raw_data.firstName} ${lead_raw_data && lead_raw_data.raw_data.lastName}`},{name:'email',value: lead_raw_data && lead_raw_data.raw_data.email || ''},{name:'phone',value: lead_raw_data && lead_raw_data.raw_data.phone || ''},{name:'casetype',value: lead_raw_data && lead_raw_data.raw_data.caseType || ''},{name:'location',value: lead_raw_data && (lead_raw_data.raw_data.state + ', '+ lead_raw_data.raw_data.zipCode) || '' }]);
        // }

        if (lead_raw_data) {
            setdetailsfields([{ name: 'name', value: `${lead_raw_data && lead_raw_data.raw_data.firstName} ${lead_raw_data && lead_raw_data.raw_data.lastName}` }, { name: 'email', value: lead_raw_data && lead_raw_data.raw_data.email || '' }, { name: 'phone', value: lead_raw_data && lead_raw_data.raw_data.phone || '' }, { name: 'casetype', value: lead_raw_data && lead_raw_data.raw_data.caseType || '' }, { name: 'location', value: lead_raw_data && (lead_raw_data.raw_data.state + ', ' + lead_raw_data.raw_data.zipCode) || '' }]);
            setdetailsfieldscopy([{ name: 'name', value: `${lead_raw_data && lead_raw_data.raw_data.firstName} ${lead_raw_data && lead_raw_data.raw_data.lastName}` }, { name: 'email', value: lead_raw_data && lead_raw_data.raw_data.email || '' }, { name: 'phone', value: lead_raw_data && lead_raw_data.raw_data.phone || '' }, { name: 'casetype', value: lead_raw_data && lead_raw_data.raw_data.caseType || '' }, { name: 'location', value: lead_raw_data && (lead_raw_data.raw_data.state + ', ' + lead_raw_data.raw_data.zipCode) || '' }]);
            // console.log('lead_raw_data useeff ',lead_raw_data)
            if (lead_raw_data && lead_raw_data.raw_data.meta) {
                let meta = lead_raw_data.raw_data.meta;
                let datameta = Object.values(meta);
                // console.log('datameta ',datameta)
                return setmetavalues(datameta)
            }
            else {
                if (lead_raw_data && lead_raw_data.raw_data.caseHistory) {
                    let caseHistory = lead_raw_data.raw_data.caseHistory;
                    let datameta1 = Object.entries(caseHistory).map((e) => ({ [e[0]]: e[1] }));
                    // console.log('caseHistory ',datameta1)
                    return setmetavalues(datameta1)
                }
            }
        }
    }, [lead_details])

    // useEffect(() => {
    //    if(leaddetails){
    //     if(leads.lead_details && leads.lead_details.meta){
    //         let meta = leads.lead_details.meta;
    //         let datameta = Object.values(meta);
    //         console.log('datameta ',datameta)
    //         return setmetavalues(datameta)
    //     }
    //     else{
    //         if(leads.lead_details && leads.lead_details.caseHistory){  
    //             let caseHistory = leads.lead_details.caseHistory;
    //             let datameta1 = Object.entries(caseHistory).map((e) => ( { [e[0]]: e[1] } ));
    //             console.log('caseHistory ',datameta1)
    //             return  setmetavalues(datameta1)
    //         }
    //     }
    //    }
    // }, [leaddetails])

    // console.log('metavalues ',metavalues)
    // console.log('leaddetails ',leaddetails)

    // if(leaddetails.length === 0){
    //     console.log('leaddetails.length ',leaddetails.length ) //leaddetails.lead_raw_data.length
    // }

    // if(leaddetails.length > 0){
    //     let x = leaddetails.lead_raw_data       // if length is zero then display nothing else display data
    //     console.log('leaddetails.lead_raw_data.length ',x.length ) //leaddetails.lead_raw_data.length
    // }

    if (lead_raw_data === undefined) {
        return (
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%' }}>
                    No data
                </div>
            </div>
        )
    }

    // console.log('lead_raw_data ', lead_raw_data)
    // if(leaddetails.lead_raw_data )
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 'bold' }}>Details</div>
                        {
                            disableEditmodeforDetails ?
                                (<Button type={'primary'} size={'small'} style={{ marginRight: '10px' }} name={'Edit'} label={'Edit'} onClick={() => setdisableEditmodeforDetails(!disableEditmodeforDetails)}>Edit</Button>) :
                                (
                                    <div style={{ marginRight: '10px' }}>
                                        <Button type={'primary'} size={'small'} onClick={() => setdisableEditmodeforDetails(!disableEditmodeforDetails)}>Save</Button>
                                        <Button size={'small'} style={{ marginLeft: '10px' }} onClick={() => {
                                            setdisableEditmodeforDetails(!disableEditmodeforDetails);
                                            setdetailsfields(detailsfieldscopy)
                                        }}>Cancel</Button>
                                    </div>
                                )
                        }

                    </div>
                    <CustomizedDetailForm
                        fields={detailsfields}
                        disableEditmodeforDetails={disableEditmodeforDetails}
                        // handleOnAccountInfoEditCancel={handleOnAccountInfoEditCancel}
                        // handleonAccountInfoClickSave={handleonAccountInfoClickSave}
                        // handleTimeZoneChange={handleTimeZoneChange}
                        onChange={(newFields) => {
                            setdetailsfields(newFields);
                        }}
                    />
                    {/* <div style={{width:'100%',display:'flex'}}>
                        <div>Name:</div>
                        <div style={{marginLeft:'10px',fontWeight:'bold'}}>{ lead_raw_data  && lead_raw_data.raw_data.firstName } { lead_raw_data && lead_raw_data.raw_data.lastName }</div>  
                    </div>
                    <div style={{width:'100%',display:'flex'}}>
                        <div>Email:</div>
                        <div style={{marginLeft:'10px',fontWeight:'bold'}}>{ lead_raw_data && lead_raw_data.raw_data.email }</div>  
                    </div>
                    <div style={{width:'100%',display:'flex'}}>
                        <div>Phone:</div>
                        <div style={{marginLeft:'10px',fontWeight:'bold'}}>{ lead_raw_data && lead_raw_data.raw_data.phone }</div>  
                    </div>
                    <div style={{width:'100%',display:'flex'}}>
                        <div>Case Type:</div>
                        <div style={{marginLeft:'10px',fontWeight:'bold'}}>{ lead_raw_data && lead_raw_data.raw_data.caseType }</div>  
                    </div>
                    <div style={{width:'100%',display:'flex'}}>
                        <div>Location:</div>
                        <div style={{marginLeft:'10px',fontWeight:'bold'}}>{ lead_raw_data && (lead_raw_data.raw_data.state + ', '+ lead_raw_data.raw_data.zipCode) }</div>  
                    </div> */}
                </div>
                <div style={{ width: '100%', marginTop: '10px' }}>
                    {/* <div style={{fontWeight:'bold'}}>Case History:</div> */}
                    <div style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                        {/* {
                            metavalues.map((data,index)=>{
                                return( 
                                    <p>
                                        <div> {`Q${index+1}. ${data.question}`}</div>
                                        <div> {`A: ${data.answer}`}</div>
                                    </p>
                                )
                            })
                        } */}
                        <CaseHistory case_history={metavalues} />

                    </div>
                </div>
            </div>
        </div>
    )
}


DetailsEditable.propTypes = {

};

const mapStateToProps = (state) => ({
    leads: state.leads,
    lead_details: state.leads.lead_details,
});


export default connect(mapStateToProps, {})(DetailsEditable);
