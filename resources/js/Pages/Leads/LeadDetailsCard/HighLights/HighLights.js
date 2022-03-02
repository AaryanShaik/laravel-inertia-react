import React from 'react';
import {Card, Button, Typography, Select, Input, Checkbox, Tabs, Timeline,  Menu, Dropdown, Collapse} from 'antd';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const { Panel } = Collapse;

const {Title, Text} = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const HighLights = ({leads,lead_details}) => {
    return (
        <div style={{width:'100%'}}>
            <Timeline>
                {/* <Timeline.Item color="green">Less than 1 year</Timeline.Item> */}
                {lead_details && lead_details.lead_raw_data.length > 0 && lead_details.lead_raw_data[0].raw_data.meta ? (lead_details.lead_raw_data[0].raw_data.meta  && lead_details.lead_raw_data[0].raw_data.meta.incident_date_option_b ? <Timeline.Item color="green">{ lead_details.lead_raw_data[0].raw_data.meta && lead_details.lead_raw_data[0].raw_data.meta.incident_date_option_b && lead_details.lead_raw_data[0].raw_data.meta.incident_date_option_b.answer }</Timeline.Item>: lead_details.lead_raw_data[0].raw_data.caseHistory && lead_details.lead_raw_data[0].raw_data.caseHistory['How long ago did the injury happen?'] ? <Timeline.Item color="green">{lead_details.lead_raw_data[0].raw_data.caseHistory && lead_details.lead_raw_data[0].raw_data.caseHistory['How long ago did the injury happen?']}</Timeline.Item>: null): null}
                {/* <Timeline.Item color="green">Case Description Is Less Than 255 Characters</Timeline.Item> */}
                { lead_details && lead_details.lead_raw_data.length > 0 && lead_details.lead_raw_data[0].raw_data.intelligence && <Timeline.Item color="green">{lead_details.lead_raw_data[0].raw_data.intelligence.case_description.message}</Timeline.Item> }
                {lead_details && lead_details.lead_email !== '' && lead_details.lead_email !== null && (<Timeline.Item color="green">{ lead_details && lead_details.lead_email }</Timeline.Item>)}
                {lead_details && lead_details.lead_contact !== '' && lead_details.lead_contact !== null && ( <Timeline.Item color="green">{ lead_details && lead_details.lead_contact }</Timeline.Item>)}
                { lead_details && (lead_details.lead_score !== 0 && lead_details.lead_score !== null) && <Timeline.Item color="green">{`${lead_details.lead_score}`} Score</Timeline.Item> }
                {/* <Timeline.Item color="red">Requalification Failed: Attorney Not Matched, Requalification Setting Is OFF</Timeline.Item> */}
                { lead_details && lead_details.auto_assign_reason ? <Timeline.Item color="red">{lead_details.auto_assign_reason}</Timeline.Item>: null }
                {/* auto_assign_reason */}
                {/* <Timeline.Item color="green">Qualified</Timeline.Item> */}
                { lead_details && (lead_details.qualified_by == 'alert_call_center_complete') && <Timeline.Item color="green">Qualified</Timeline.Item> }
                {/* <Timeline.Item color="green">Responsive</Timeline.Item> */}
                { lead_details && (lead_details.unresponsive === 0) && <Timeline.Item color="green">Responsive</Timeline.Item>}
            </Timeline>
        </div>
    )
}

HighLights.propTypes = {
    // getAssignedAttorney: PropTypes.func.isRequired, 
    // getEligibleAttorney: PropTypes.func.isRequired,
  };

const mapStateToProps = (state) => ({
    leads: state.leads,
    lead_details: state.leads.lead_details,
});


export default connect(mapStateToProps, {})(HighLights)
