import React, { useState, useEffect } from 'react';
import { Timeline, Typography, Collapse } from 'antd';
import { CallLogsTable } from '../../../../CommonComponents/mastercomponent/src/index';

import { connect } from "react-redux";

const { Text } = Typography;
const { Panel } = Collapse;

function ApiEvents({ leads }) {

    const [APIEvents, setAPIEvents] = useState([])


    useEffect(() => {

        if (leads.lead_details && leads.lead_details) {

            // setAPIEvents
            if (leads.lead_details.api_events.length > 0) {
                let api_events = leads.lead_details.api_events;
                let x = api_events.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                // console.log('x',x)
                setAPIEvents(x);
            }
        }
        // const sortedActivities = activities.sort((a, b) => b.date - a.date)
    }, [leads])

    return (
        <div>
            {/* <Timeline.Item color="green" >
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Text style={{fontSize:14}} type='success' strong>Auto Assignment</Text>
                    <Text style={{fontSize:14}} type='secondary'>No Matching Attorney</Text>
                    <Text style={{fontSize:14}} type='secondary'>06-25-2021 14:55:07</Text>
                </div>
            </Timeline.Item>
            <Timeline.Item color="green">
            <div style={{display:'flex', flexDirection:'column'}}>
                <Text style={{fontSize:14}} strong type='success'>Requalification</Text>
                <Text style={{fontSize:14}} type='secondary'>Requalification Success-Lead created</Text>
                <Text style={{fontSize:14}} type='secondary'>06-25-2021 14:55:08</Text>
            </div>
            </Timeline.Item> */}

            <Timeline>

                {APIEvents.map(item => {
                    // console.log('item ',item)
                    return item.specifics.map(d => {
                        // console.log('d', d)
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
                        <CallLogsTable call_logs={leads.lead_details && leads.lead_details.call_logs} />
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}


const mapStateToProps = (state) => ({
    leads: state.leads
});

export default connect(mapStateToProps, {})(ApiEvents)
