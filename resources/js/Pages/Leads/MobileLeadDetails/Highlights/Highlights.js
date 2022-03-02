import React from 'react';
import {Timeline, Typography} from 'antd';
import { AiFillGoogleCircle, AiFillInfoCircle } from 'react-icons/ai';
import {ImLocation2} from 'react-icons/im'
const {Text} = Typography;

import { connect } from "react-redux";

function Highlights({leads}) {
    return (
        <div>
            {/* <Timeline.Item color="green">
                        <Text style={{fontSize:14}} type='secondary'>Less than 1 year</Text>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <Text style={{fontSize:14}} type='secondary'>Case Description Is Less Than 255 Characters</Text>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <Text style={{fontSize:14}} type='secondary'>direactsas1434@yopmail.com</Text>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <p><Text style={{fontSize:14}} type='secondary'>+16467011444</Text></p>
                        <Text style={{fontSize:14}} type='secondary'><AiFillInfoCircle style={{marginRight:5}}/>Mobile</Text>
                        <Text style={{fontSize:14}} type='secondary'><ImLocation2 style={{marginRight:5}}/>Nwyrcyzn01</Text>
                    </div>
                    </Timeline.Item>
                    <Timeline.Item color="red">
                        <Text style={{fontSize:14}} type='secondary'>Requalification Failed: Attorney Not Matched, Requalification Setting Is OFF</Text>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <Text style={{fontSize:14}} type='secondary'>Qualified</Text>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <Text style={{fontSize:14}} type='secondary'>Responsive</Text>
                    </Timeline.Item> */}

                    <Timeline>
                            {/* <Timeline.Item color="green">Less than 1 year</Timeline.Item> */}
                            {leads.lead_details && leads.lead_details.lead_raw_data.length > 0 && leads.lead_details.lead_raw_data[0].raw_data.meta ? (leads.lead_details.lead_raw_data[0].raw_data.meta  && leads.lead_details.lead_raw_data[0].raw_data.meta.incident_date_option_b ? <Timeline.Item color="green">{ leads.lead_details.lead_raw_data[0].raw_data.meta && leads.lead_details.lead_raw_data[0].raw_data.meta.incident_date_option_b && leads.lead_details.lead_raw_data[0].raw_data.meta.incident_date_option_b.answer }</Timeline.Item>: leads.lead_details.lead_raw_data[0].raw_data.caseHistory ? <Timeline.Item color="green">{leads.lead_details.lead_raw_data[0].raw_data.caseHistory && leads.lead_details.lead_raw_data[0].raw_data.caseHistory['How long ago did the injury happen?']}</Timeline.Item>: null): null}
                            {/* <Timeline.Item color="green">Case Description Is Less Than 255 Characters</Timeline.Item> */}
                            { leads.lead_details && leads.lead_details.lead_raw_data.length > 0 && leads.lead_details.lead_raw_data[0].raw_data.intelligence && <Timeline.Item color="green">{leads.lead_details.lead_raw_data[0].raw_data.intelligence.case_description.message}</Timeline.Item> }
                            {leads.lead_details && leads.lead_details.lead_email !== '' && leads.lead_details.lead_email !== null && (<Timeline.Item color="green">{ leads.lead_details && leads.lead_details.lead_email }</Timeline.Item>)}
                            {leads.lead_details && leads.lead_details.lead_contact !== '' && leads.lead_details.lead_contact !== null && ( <Timeline.Item color="green">{ leads.lead_details && leads.lead_details.lead_contact }</Timeline.Item>)}
                            { leads.lead_details && (leads.lead_details.lead_score !== 0 && leads.lead_details.lead_score !== null) && <Timeline.Item color="green">{`${leads.lead_details.lead_score}`} Score</Timeline.Item> }
                            {/* <Timeline.Item color="red">Requalification Failed: Attorney Not Matched, Requalification Setting Is OFF</Timeline.Item> */}
                            { leads.lead_details && leads.lead_details.auto_assign_reason ? <Timeline.Item color="red">{leads.lead_details.auto_assign_reason}</Timeline.Item>: null }
                            {/* auto_assign_reason */}
                            {/* <Timeline.Item color="green">Qualified</Timeline.Item> */}
                            { leads.lead_details && (leads.lead_details.qualified_by == 'alert_call_center_complete') && <Timeline.Item color="green">Qualified</Timeline.Item> }
                            {/* <Timeline.Item color="green">Responsive</Timeline.Item> */}
                            { leads.lead_details && (leads.lead_details.unresponsive === 0) && <Timeline.Item color="green">Responsive</Timeline.Item>}
                        </Timeline>
        </div>

    )
}

const mapStateToProps = (state) => ({
    leads: state.leads
});

export default connect(mapStateToProps, {})(Highlights)
