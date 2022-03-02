import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Select, Input, Checkbox, Tabs, Timeline, Menu, Dropdown, Collapse } from 'antd';

import { CallLogsTable } from '../../../../CommonComponents/mastercomponent/src/index';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const { Panel } = Collapse;

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;


const ApiEvents = ({ lead_details }) => {

    const [APIEvents, setAPIEvents] = useState([]);

    useEffect(() => {
        if (lead_details && lead_details) {
            // setAPIEvents
            if (lead_details.api_events.length > 0) {
                let api_events = lead_details.api_events;
                let x = api_events.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                // console.log('x',x)
                setAPIEvents(x);
            }
        }
        // const sortedActivities = activities.sort((a, b) => b.date - a.date)
    }, [lead_details]);

    return (
        <div style={{ width: '100%' }}>
            <Timeline>
                {/* <Timeline.Item color="green">
                <div style={{fontSize:'15px',fontWeight:'500'}}>Auto Assignment</div>
                <div>No Matching Attorney</div>
                <div>06-25-2021 12:55:07</div>
            </Timeline.Item>
            <Timeline.Item color="green">
                <div style={{fontSize:'15px',fontWeight:'500'}}>Requalification</div>
                <div>Requalification Success - Lead Created</div>
                <div>06-25-2021 12:55:08</div>
            </Timeline.Item> */}
                {APIEvents.map(item => {
                    // console.log('item ',item)
                    return item.specifics.map(d => {
                        // console.log('d', d)
                        var splitStr = d.ref.toLowerCase().split('_');
                        for (var i = 0; i < splitStr.length; i++) {
                            // You do not need to check if i is larger than splitStr length, as your for does that for you
                            // Assign it back to the array
                            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                        }
                        // Directly return the joined string
                        d.ref = splitStr.join(' ');
                        return (
                            <Timeline.Item color="green">
                                <div style={{ fontSize: '15px', fontWeight: '500' }}>{d.ref}</div>
                                <div>{d.message}</div>
                                <div>{d.timestamp}</div>
                            </Timeline.Item>
                        )
                    })
                })}
            </Timeline>
            <Collapse accordion>
                <Panel header="Call Logs" key="1">
                    <div style={{ width: '100%' }}>
                        <CallLogsTable call_logs={lead_details && lead_details.call_logs} />
                    </div>

                </Panel>
            </Collapse>
        </div>
    )
}

ApiEvents.propTypes = {
    // getAssignedAttorney: PropTypes.func.isRequired, 
    // getEligibleAttorney: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    leads: state.leads,
    lead_details: state.leads.lead_details,
});


export default connect(mapStateToProps, null)(ApiEvents);
