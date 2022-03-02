import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Select, Input, Checkbox, Tabs, Timeline, Menu, Dropdown, Collapse } from 'antd';

import { CallLogsTable } from '../../../../CommonComponents/mastercomponent/src/index';
import moment from "moment";

import ReactJson from 'react-json-view';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const { Panel } = Collapse;

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const DataExplore = ({ lead_details }) => {

    const [EAD, setEAD] = useState([]);

    useEffect(() => {

        if (lead_details && lead_details) {

            if (lead_details.external_api_dump.length > 0) {
                let external_api_dump = lead_details.external_api_dump;
                let x = external_api_dump.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                console.log('x in ead', x)
                setEAD(x);
            }
        }
        // const sortedActivities = activities.sort((a, b) => b.date - a.date)
    }, [lead_details])


    function callbackpanel(key) {
        console.log(key);
    }
    let test_response = {
        "message": "Lead generated successfully",
        "status": "created",
        "result": "success"
    }

    return (
        <div style={{ width: '100%' }}>
            <Collapse defaultActiveKey={['1']} onChange={callbackpanel}>
                {
                    EAD.map((data, index) => {
                        return (
                            <Panel
                                // header={`Data Explorer ${index}`}
                                showArrow={false}
                                header={<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div>{`Data Explorer ${index}`}</div>
                                    {/* <div>{data.created_at}</div> */}
                                    <div>{moment(data.created_at).tz("America/New_York").format('MM-DD-YYYY HH:mm:ss')}</div>
                                </div>
                                }
                                key={`${index}`}>
                                <div style={{ width: '100%', marginTop: '5px' }}>
                                    <div>Request</div>
                                    <ReactJson src={data.request_body} style={{ border: '1px solid #ccc', padding: '5px', marginTop: '5px' }} displayDataTypes={false} displayObjectSize={false} />
                                </div>
                                <div style={{ width: '100%', marginTop: '5px' }}>
                                    <div>Response</div>
                                    <ReactJson src={data.response} style={{ border: '1px solid #ccc', padding: '5px', marginTop: '5px' }} displayDataTypes={false} displayObjectSize={false} />
                                </div>
                            </Panel>
                        )
                    })
                }
            </Collapse>
        </div>
    )
}

DataExplore.propTypes = {
    // getAssignedAttorney: PropTypes.func.isRequired, 
    // getEligibleAttorney: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    leads: state.leads,
    lead_details: state.leads.lead_details,
});


export default connect(mapStateToProps, null)(DataExplore)
