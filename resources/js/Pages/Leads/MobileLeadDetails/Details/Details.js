import React, {useState, useEffect} from 'react'
import {Typography, Form, Input, Button} from 'antd';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const {Text} = Typography;

const LeadDetailsForm = ({ onChange,  leadDeatailsFields, onSaveLeadDetails, setLeadDetailsFields}) => (
 
    <Form
      name="global_state"
      layout="inline"
      style={{width:'100%'}}
      leadDeatailsFields={leadDeatailsFields}
      onFinish={onSaveLeadDetails}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >

<Form.Item
          name="name"
          label={"Name"}
          style={{width:'100%'}}
          rules={[
            {
              required: true,
              message: "PleaseinputyourName",
            },
          ]}
        >
          <Input
            placeholder={"Name"}
            style={{ marginBottom: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="Email"
          label={"Email"}
          style={{width:'100%'}}
          rules={[
            {
              type: 'email',
              message: "TheinputisnotvalidE-mail",
            },
            {
              required: true,
              message: "PleaseinputyourE-mail",
            },
          ]}
        >
          <Input
            placeholder={"Email"}
            style={{ marginBottom: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="Mobile"
          label={"Mobile"}
          style={{width:'100%'}}
          rules={[
            {
              type: 'number',
              message: "TheinputhastobeaNumber",
            },
            {
              required: true,
              message: "PleaseinputyourNumber",
            },
          ]}
        >
          <Input
            placeholder={"Mobile"}
            style={{ marginBottom: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="casetype"
          label={"Case Type"}
          style={{width:'100%'}}
          rules={[
            {
              required: true,
              message: "PleaseinputyourName",
            },
          ]}
        >
          <Input
            placeholder={"Name"}
            style={{ marginBottom: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="location"
          label={"Location"}
          style={{width:'100%'}}
          rules={[
            {
              required: true,
              message: "PleaseinputyourName",
            },
          ]}
        >
          <Input
            placeholder={"Location"}
            style={{ marginBottom: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label={"Status"}
          style={{width:'100%'}}
          rules={[
            {
              required: true,
              message: "PleaseinputyourName",
            },
          ]}
        >
          <Input
            placeholder={"Name"}
            style={{ marginBottom: 10 }}
          />
        </Form.Item>
    </Form>
);

function Details({lead_raw_data, leads}) {

    const [metavalues, setmetavalues] = useState([])
    const [fieldsDisabled, setFieldsDisabled] = useState(true);
    const [leadDeatailsFields, setLeadDeatailsFields] = useState([
        {
            name:['name'],
            value:lead_raw_data  && lead_raw_data.raw_data.firstName + lead_raw_data && lead_raw_data.raw_data.lastName 
        },
        {
            name:['Email'],
            value:lead_raw_data && lead_raw_data.raw_data.email
        },
        {
            name:['Mobile'],
            value:lead_raw_data && lead_raw_data.raw_data.phone
        },
        {
            name:['casetype'],
            value:lead_raw_data && lead_raw_data.raw_data.caseType 
        },
        {
            name:['location'],
            value:lead_raw_data && lead_raw_data.raw_data.state + ', '+ lead_raw_data.raw_data.zipCode
        },
        {
            name:['status'],
            value:''
        },
    ]);

    useEffect(() => {
        console.log('lead_raw_data from details tab:', lead_raw_data);
        if(lead_raw_data){
            // console.log('lead_raw_data useeff ',lead_raw_data)
            if(lead_raw_data && lead_raw_data.raw_data.meta){
                let meta = lead_raw_data.raw_data.meta;
                let datameta = Object.values(meta);
                // console.log('datameta ',datameta)
                return setmetavalues(datameta)
            }
            else{
                if(lead_raw_data && lead_raw_data.raw_data.caseHistory){  
                    let caseHistory = lead_raw_data.raw_data.caseHistory;
                    let datameta1 = Object.entries(caseHistory).map((e) => ( { [e[0]]: e[1] } ));
                    // console.log('caseHistory ',datameta1)
                    return  setmetavalues(datameta1)
                }
            }
           }
    }, [leads]);

    const onSaveLeadDetails = (values) => {
        console.log('Received values of form: ', values);
      };
    

    if(lead_raw_data === undefined){
        return (
            <div style={{width:'100%'}}>
                <div style={{width:'100%'}}>
                    No data
                </div>
            </div>
        )
    }

    return (
        <div>
             {/* <div style={{display:'flex'}}>
                        <Text type='secondary' style={{marginRight:5, fontSize:14}}>Name:</Text>
                        <Text  style={{fontSize:14}} strong>{ lead_raw_data  && lead_raw_data.raw_data.firstName } { lead_raw_data && lead_raw_data.raw_data.lastName }</Text>
                    </div>
                    <div style={{display:'flex'}}>
                        <Text type='secondary' style={{marginRight:5, fontSize:14}}>Phone:</Text>
                        <Text  style={{fontSize:14}} strong>{ lead_raw_data && lead_raw_data.raw_data.phone }</Text>
                    </div>
                    <div style={{display:'flex'}}>
                        <Text type='secondary' style={{marginRight:5, fontSize:14}}>Email:</Text>
                        <Text style={{fontSize:14}} strong>{ lead_raw_data && lead_raw_data.raw_data.email }</Text>
                    </div>
                    <div style={{display:'flex'}}>
                        <Text type='secondary' style={{marginRight:5, fontSize:14}}>Case-Type:</Text>
                        <Text  style={{fontSize:14}} strong>{ lead_raw_data && lead_raw_data.raw_data.caseType }</Text>
                    </div>
                    <div style={{display:'flex', marginBottom:'10px'}}>
                        <Text type='secondary' style={{marginRight:5, fontSize:14}}>Location:</Text>
                        <Text  style={{fontSize:14}} strong>{ lead_raw_data && (lead_raw_data.raw_data.state + ', '+ lead_raw_data.raw_data.zipCode) }</Text>
                    </div> */}
                    <LeadDetailsForm
                        leadDeatailsFields={leadDeatailsFields}
                        fieldsDisabled={fieldsDisabled}
                        setFieldsDisabled={setFieldsDisabled}
                        onSaveLeadDetails={onSaveLeadDetails}
                        onChange={(newFields) => {
                        setFields(newFields);
                        }}
                    />


                    <Text style={{fontSize:14}} strong>Case History:</Text>
                    
                    {
                            metavalues.map((data,index)=>{
                                return( 
                                    <p>
                                        <div> {`Q${index+1}. ${data.question}`}</div>
                                        <div> {`A: ${data.answer}`}</div>
                                    </p>
                                )
                            })
                        }
                        {/* <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q1. How long ago did the injury happen?</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: Less than 1 year</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q2. Did the injury require hospitalization, medical treatment, or surgery?</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: Yes</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q3. Were you at fault for the accident?</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: No</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q4. Do you already have a lawyer representing you?</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: No</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q5. What is the primary type of injury?</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: Other</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q6. Were you injured?</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: Yes</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q7. Position of power held by the abuser?</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: Motorcycle Accident</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q8. Describe your case</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: I was in a motorcyycle accident on June 14 2020. I had a few injuries but the worst one is my broken foot. I did not have insurance and I couldnt work any more and my foot is so bad off that I dont thinm I will ever be able to walk cometelynormalagain and</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Q9. Please read and accept our Terms of Service</Text>
                            <Text style={{fontSize:14}} type='secondary'>A: I accept</Text>
                        </div> */}
                    
        </div>
    )
}

Details.propTypes = {}

const mapStateToProps = (state) => ({
    leads: state.leads
});

export default connect(mapStateToProps, {})(Details);
