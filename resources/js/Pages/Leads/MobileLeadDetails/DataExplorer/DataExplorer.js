import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';
import {Collapse} from 'antd';

import { connect } from "react-redux";

const { Panel } = Collapse;

function DataExplorer({leads}) {

   const [EAD, setEAD] = useState([])

   useEffect(() => {
    
      if(leads.lead_details && leads.lead_details){
              // console.log('leads.lead_details ',leads.lead_details)
          if(leads.lead_details.external_api_dump.length > 0){
              let external_api_dump = leads.lead_details.external_api_dump;
              let x = external_api_dump.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
              // console.log('x',x)
              setEAD(x);
          }
         }
         // const sortedActivities = activities.sort((a, b) => b.date - a.date)
         }, [leads])

         function callbackpanel(key) {
            console.log(key);
          }

   //  const data = 
   //      {
   //          arrived_at: "2021-06-25T22:20:50Z",
   //          test_mode: "false",
   //          lead_first_name: "testRequali06",
   //          lead_last_name: "testRequali06",
   //          lead_email: "testRequali06@accident.com",
   //          lead_phone: "+16467011444",
   //          case_type: "Auto Accident",
   //          zip_code: "65483",
   //          deal: "Ld3azYW8eAyXnk2x5174BoQpORJ0mD",
   //          fields: [
   //             {
   //                ref: "were_you_injured",
   //                title: "Were you or a loved one Injured in an Accident that wasn't",
   //                answer: "Yes"
   //             },
   //             {
   //                ref: "were_you_at_fault",
   //                title: "Were you or a loved one Injured in an Accident that wasn't",
   //                answer: "no"
   //             },
   //             {
   //                ref: "abuser_power",
   //                title: "What caused your injury?",
   //                answer: "Motorcycle Accident"
   //             },
   //             {
   //                ref: "have_attorney",
   //                title: "Do you currently have a lawyer representing your claim?",
   //                answer: "no"
   //             },
   //             {
   //                ref: "primary_injury",
   //                title: "Did you sustain any of the following?",
   //                answer: "Other"
   //             },
   //             {
   //                ref: "doctor_treatment",
   //                title: "Did the injury require hospitalization, medical treatment",
   //                answer: "Yes"
   //             },
   //             {
   //                ref: "incident_date_option_b",
   //                title: "Select Year of Injury",
   //                answer: "less than 1 year"
   //             },
   //             {
   //                ref: "comments",
   //                title: "describe your case",
   //                answer: "I was in a motorcyycle accident on June 14 2020. I had a few injuries but the worst one is my broken foot. I did not have insurance and I couldnt work any more and my foot is so bad off that I dont thinm I will ever be able to walk cometelynormalagain and"
   //             }
   //          ],
   //          vendor_id: "d4xEPD3X8NJGV5oRwamAjLYr071b6K",
   //          requestSlug: "lead-create",
   //          type: "lead"
   //       }
    
    return (
        <div>
            {/* <ReactJson displayDataTypes={false} displayObjectSize={false} src={data} /> */}
            <Collapse defaultActiveKey={['1']} onChange={callbackpanel}>
                            {
                              EAD.map((data,index)=>{
                                    return (
                                        <Panel 
                                        // header={`Data Explorer ${index}`}
                                        showArrow={false}
                                        header={<div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                   <div>{`Data Explorer ${index}`}</div>
                                                    <div>{data.created_at}</div>
                                                    </div>
                                            } 
                                            key={`${index}`}>
                                            <div style={{width:'100%',marginTop:'5px'}}>
                                                <div>Request</div>
                                                <ReactJson src={data.request_body} style={{border:'1px solid #ccc',padding:'5px',marginTop:'5px'}} displayDataTypes={false} displayObjectSize={false} />
                                            </div>
                                            <div style={{width:'100%',marginTop:'5px'}}>
                                                <div>Response</div>
                                                <ReactJson src={data.response} style={{border:'1px solid #ccc',padding:'5px',marginTop:'5px'}} displayDataTypes={false} displayObjectSize={false} />
                                            </div>
                                        </Panel>
                                    )
                                })
                            }
                            {/* <Panel header="Data Explorer 1" key="1">
                                <ReactJson src={DataExploreObj} displayDataTypes={false} displayObjectSize={false} />
                            </Panel>
                            <Panel header="Data Explorer 2" key="2">
                                <ReactJson src={DataExploreObj} displayDataTypes={false} displayObjectSize={false} />
                            </Panel>
                            <Panel header="Data Explorer 3" key="3">
                                <ReactJson src={DataExploreObj} displayDataTypes={false} displayObjectSize={false} />
                            </Panel> */}
                        </Collapse>
        </div>
    )
}


const mapStateToProps = (state) => ({
   leads: state.leads
});

export default connect(mapStateToProps, {})(DataExplorer)
