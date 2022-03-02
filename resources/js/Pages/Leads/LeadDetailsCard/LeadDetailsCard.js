import { useState, useEffect, lazy, Suspense } from 'react';
import { Card, Button, Typography, Select, Input, Checkbox, Tabs, Menu, Dropdown, Collapse } from 'antd';
import { FaMapMarkedAlt, FaCheckCircle, FaCarCrash } from 'react-icons/fa';
import './LeadDetailsCard.css';
// import AssignmentTable from './AssignmentTable/AssignmentTable';
// import DisputeTable from './DisputeTable/DisputeTable';
// import DetailsEditable from './DetailsEditable/DetailsEditable';
// import ApiEvents from './ApiEvents/ApiEvents';
import HighLights from './HighLights/HighLights';
// import DataExplore from './DataExplore/DataExplore';

const AssignmentTable = lazy(() => import('./AssignmentTable/AssignmentTable'));
const DisputeTable = lazy(() => import('./DisputeTable/DisputeTable'));
const DetailsEditable = lazy(() => import('./DetailsEditable/DetailsEditable'));
const ApiEvents = lazy(() => import('./ApiEvents/ApiEvents'));
// const HighLights= lazy(()=>import('./HighLights/HighLights'));
const DataExplore = lazy(() => import('./DataExplore/DataExplore'));

// import ReactJson from 'react-json-view';
import Analytics from '../MobileLeadDetails/Analytics/Analytics';


import { getAssignedAttorney, handleAssignLeadToAttorney, getEligibleAttorney, getLeadAnalyticsData, handletosetleadDetails, handleMarkAsTestLeadDeatils, handleMarkAsDuplicateLeadDeatils, handleMarkAsStarredLeadDeatils, handleMarkAsFakeLeadDeatils, handleMarkAsLowQualityLeadDeatils, handleMarkAsWrongCaseTypeLeadDeatils, handleMarkAsWrongLocationLeadDeatils } from '../../../store/actions/lead';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loading from '../Loading/Loading';

// NOT BEIGN USED
// import Api from '../../AffiliatesMobile/AffiliatesDetails/Account/Api/Api';
// import { CallLogsTable } from '@frontendmonorepo/mastercomponent';
// import Details from './Details/Details';
// NOT BEIGN USED


const { Panel } = Collapse;

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const LeadDetailsCard = ({ handleMinimizeCountViewChanges, handleAssignLeadToAttorney, minimizecountview, minimizetable, leads, lead_details, getAssignedAttorney, getEligibleAttorney, handletosetleadDetails, getLeadAnalyticsData, handleMarkAsTestLeadDeatils, handleMarkAsDuplicateLeadDeatils, handleMarkAsStarredLeadDeatils, handleMarkAsFakeLeadDeatils, handleMarkAsLowQualityLeadDeatils, handleMarkAsWrongCaseTypeLeadDeatils, handleMarkAsWrongLocationLeadDeatils, eligibleAttorneys, assignedAttorney }) => {

    const [checked, setchecked] = useState(false);
    const [pricevalue, setpricevalue] = useState('');
    const [tabskeyvalue, settabskeyvalue] = useState('Highlights');
    const [toggletorefresh, settoggletorefresh] = useState(true);
    const [selectedAttorneyInSelectInput, setselectedAttorneyInSelectInput] = useState();

    useEffect(() => {
        if (checked) {
            setpricevalue('0');
        }
        else {
            if (selectedAttorneyInSelectInput) {
                setpricevalue(selectedAttorneyInSelectInput[0].attornery_lead_cost);
            }
        }
    }, [checked]);

    useEffect(() => {
        if (selectedAttorneyInSelectInput != undefined) {
            setpricevalue(selectedAttorneyInSelectInput[0].attornery_lead_cost);
        }
        if (selectedAttorneyInSelectInput == undefined) {
            setpricevalue('');
        }
    }, [selectedAttorneyInSelectInput])

    useEffect(() => {
        if (leads && leads.allleads && leads.allleads.length > 0 && leads.lead_details == null) {
            //get lead details
            //    console.log('leads.allleads[leads.allleads.length - 1].lead_id ',leads.allleads[leads.allleads.length - 1].lead_id, leads.allleads.length - 1)
            handletosetleadDetails(leads.allleads[0].lead_id);
            getLeadAnalyticsData(leads.allleads[0].lead_id);
        }
    }, [leads]);

    useEffect(() => {
        settoggletorefresh(!toggletorefresh);
        setselectedAttorneyInSelectInput();
    }, [lead_details])

    function callbackpanel(key) {
        console.log(key);
    }

    const onAttorneySelectChange = (value) => {
        console.log(`onAttorneySelectChange ${value}`);
        let data;
        if (eligibleAttorneys && eligibleAttorneys.length > 0 && value != '' && value != undefined) {
            data = eligibleAttorneys.filter(att => att.attorney_name == value)
        }
        setselectedAttorneyInSelectInput(data);
        setchecked(false);
        console.log('data', data);
    }

    const onAttorneySelect = (value) => {
        console.log(`onAttorneySelect ${value}`);
        // let data;
        // if(eligibleAttorneys && eligibleAttorneys.length > 0 ){
        //   data = eligibleAttorneys.filter(att => att.attorney_name == value)
        // }
        //    console.log('data',data);
    }

    const onBlur = () => {
        console.log('blur');
    }

    const onFocus = () => {
        console.log('focus');
    }

    const onSearch = (val) => {
        console.log('search:', val);
    }

    const handleMenuClick = (e) => {
        console.log('click', e);
    }

    const handleprice = (e) => {
        console.log('click', e, e.target.value);
        setpricevalue(e.target.value);
    }

    const callback = (key) => {
        console.log(key);
        settabskeyvalue(key);
    }

    //   console.log('selectedAttorneyInSelectInput ',selectedAttorneyInSelectInput, pricevalue)

    const menu = (
        <Menu onClick={handleMenuClick}>
            {/* <Menu.Item key="1">Mark As Duplicate</Menu.Item> */}

            {lead_details && lead_details.test_mode == 0 && <Menu.Item key="1" onClick={() => { console.log('Click test'); handleMarkAsTestLeadDeatils(true, lead_details && lead_details.lead_id) }}>Mark As Test</Menu.Item>}
            {lead_details && lead_details.test_mode == 1 && <Menu.Item key="2" onClick={() => { console.log('Click test'); handleMarkAsTestLeadDeatils(false, lead_details && lead_details.lead_id) }}>Mark As Live</Menu.Item>}

            {lead_details && lead_details.duplicate == 0 && <Menu.Item key="3" onClick={() => { console.log('Click test'); handleMarkAsDuplicateLeadDeatils(true, lead_details && lead_details.lead_id) }}>Mark As Duplicate</Menu.Item>}
            {lead_details && lead_details.duplicate == 1 && <Menu.Item key="4" onClick={() => { console.log('Click test'); handleMarkAsDuplicateLeadDeatils(false, lead_details && lead_details.lead_id) }}>Unmark As Duplicate</Menu.Item>}

            {lead_details && lead_details.starred == 0 && <Menu.Item key="5" onClick={() => { console.log('Click test'); handleMarkAsStarredLeadDeatils(true, lead_details && lead_details.lead_id) }}>Mark As Starred</Menu.Item>}
            {lead_details && lead_details.starred == 1 && <Menu.Item key="6" onClick={() => { console.log('Click test'); handleMarkAsStarredLeadDeatils(false, lead_details && lead_details.lead_id) }}>UnMark As Starred</Menu.Item>}

            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.is_fake == 0 && <Menu.Item key="7" onClick={() => { console.log('Click test'); handleMarkAsFakeLeadDeatils(true, lead_details && lead_details.lead_id) }}>Mark As Fake</Menu.Item>}
            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.is_fake == 1 && <Menu.Item key="8" onClick={() => { console.log('Click test'); handleMarkAsFakeLeadDeatils(false, lead_details && lead_details.lead_id) }}>UnMark As Fake</Menu.Item>}

            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.is_low_quality == 0 && <Menu.Item key="9" onClick={() => { console.log('Click test'); handleMarkAsLowQualityLeadDeatils(true, lead_details && lead_details.lead_id) }}>Mark As Low Quality</Menu.Item>}
            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.is_low_quality == 1 && <Menu.Item key="10" onClick={() => { console.log('Click test'); handleMarkAsLowQualityLeadDeatils(false, lead_details && lead_details.lead_id) }}>UnMark As Low Quality</Menu.Item>}

            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.has_wrong_location == 0 && <Menu.Item key="11" onClick={() => { console.log('Click test'); handleMarkAsWrongLocationLeadDeatils(true, lead_details && lead_details.lead_id) }}>Mark As Wrong Location</Menu.Item>}
            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.has_wrong_location == 1 && <Menu.Item key="12" onClick={() => { console.log('Click test'); handleMarkAsWrongLocationLeadDeatils(false, lead_details && lead_details.lead_id) }}>UnMark As Wrong Location</Menu.Item>}

            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.has_wrong_case_type == 0 && <Menu.Item key="13" onClick={() => { console.log('Click test'); handleMarkAsWrongCaseTypeLeadDeatils(true, lead_details && lead_details.lead_id) }}>Mark As Wrong CaseType</Menu.Item>}
            {lead_details && lead_details.leadsSegment && lead_details.leadsSegment.has_wrong_case_type == 1 && <Menu.Item key="14" onClick={() => { console.log('Click test'); handleMarkAsWrongCaseTypeLeadDeatils(false, lead_details && lead_details.lead_id) }}>UnMark As Wrong CaseType</Menu.Item>}
        </Menu>
    );

    const assignLead = () => {
        console.log('admin id', 27)
        console.log('attorney id ', selectedAttorneyInSelectInput[0].attorney_id);
        console.log('lead id ', lead_details.lead_id);
        console.log('lead cost ', pricevalue);
        handleAssignLeadToAttorney(pricevalue, lead_details.lead_id, 27, selectedAttorneyInSelectInput[0].attorney_id)
    }

    return (

        <Card style={{ width: '99%', height: minimizecountview ? '82vh' : '54vh' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div>
                    <Text level={3} type='secondary' strong style={{ fontSize: '20px' }}>{leads.lead_details && leads.lead_details.lead_name || 'Jessica M.'}</Text>
                    <Text level={3} type='secondary' strong style={{ fontSize: '16px', marginLeft: '20px' }}>{leads.lead_details && leads.lead_details.lead_status_value || 'New'} Lead</Text>
                </div>
                <div>
                    {
                        minimizecountview ? (<Button size={'small'} onClick={handleMinimizeCountViewChanges}>Show View</Button>) : (<div></div>)
                    }
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', width: '100%', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '200px', width: '35%', margin: '3px' }}>
                    <Text level={4} type='secondary' strong style={{ fontSize: '14px', alignContent: 'center' }}><FaCarCrash style={{ marginRight: 5 }} fontSize={'18'} />{leads.lead_details && leads.lead_details.lead_case_type || 'Auto Accident'}</Text>
                    <Text type='secondary' strong style={{ fontSize: '13px' }}><FaCheckCircle style={{ marginRight: 5 }} fontSize={'18'} />{leads.lead_details && leads.lead_details.lead_email || 'jessicaamalba@gmail.com'}</Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '100px', width: '25%', margin: '3px' }}>
                    <Text level={4} type='secondary' strong style={{ fontSize: '13px' }}><FaMapMarkedAlt style={{ marginRight: 5 }} fontSize={'18'} />{leads.lead_details && leads.lead_details.lead_location || 'Los Angeles, CA'}</Text>
                    <Text type='secondary' strong style={{ fontSize: '13px' }}><FaCheckCircle style={{ marginRight: 5 }} fontSize={'18'} />{leads.lead_details && leads.lead_details.lead_contact || '(626)701-1444'}</Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '150px', width: '30%', margin: '3px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: 5, position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                            <Text type='secondary' style={{ fontSize: '13px', width: '40px' }}>Lead Cost</Text>
                            <Input size="medium"
                                disabled={checked}
                                inputMode="numeric"
                                value={pricevalue != "" || pricevalue.length != 0 ? `$ ` + pricevalue.replace(/\$\s?|(,*)/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') : pricevalue}
                                onChange={(txt) => handleprice(txt)}
                                style={{ width: '80%', alignSelf: 'center', marginLeft: '2px' }}></Input>
                            <Checkbox className="eye"
                                style={{ right: minimizetable ? '20px' : '5px' }}
                                checked={checked}
                                onChange={() => setchecked(!checked)}
                            >Free</Checkbox>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '20px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div style={{ display: 'flex', width: '200px' }}>
                    <Select
                        showSearch
                        size='medium'
                        style={{ width: 200, }}
                        placeholder="Select Attorney"
                        optionFilterProp="children"
                        allowClear
                        value={selectedAttorneyInSelectInput && selectedAttorneyInSelectInput[0].attorney_name}
                        onChange={onAttorneySelectChange}
                        onSelect={onAttorneySelect}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            (eligibleAttorneys && eligibleAttorneys.length > 0 && eligibleAttorneys.map(att => <Option key={att.attorney_id} value={att.attorney_name}>{att.attorney_name}</Option>)) || []
                        }
                    </Select>
                </div>
                <Dropdown.Button overlay={menu} style={{ right: '-20px' }} onClick={assignLead}>Assign</Dropdown.Button>
            </div>
            <div>
                <Tabs defaultActiveKey={tabskeyvalue} onChange={callback}> {/* style={{height:'330px',overflowY:'scroll'}} */}
                    <TabPane tab="Highlights" key={'Highlights'} className="panetabsoptions" style={{ height: minimizecountview ? '50vh' : '23vh' }}>
                        <HighLights />
                    </TabPane>
                    <TabPane tab="Analytics Data" key={'Analytics Data'} className="panetabsoptions" style={{ height: minimizecountview ? '50vh' : '23vh' }}>
                        <Suspense fallback={<Loading />}>
                            <Analytics />
                        </Suspense>
                    </TabPane>
                    <TabPane tab="Details" key={'Details'} className="panetabsoptions" style={{ height: minimizecountview ? '50vh' : '23vh' }}>
                        <Suspense fallback={<Loading />}>
                            <DetailsEditable lead_raw_data={leads.lead_details && leads.lead_details.lead_raw_data[0]} />
                        </Suspense>
                    </TabPane>
                    <TabPane tab="Dispute" key={'Dispute'} className="panetabsoptions" style={{ height: minimizecountview ? '50vh' : '23vh' }}>
                        <div style={{ width: '100%' }}>
                            <Suspense fallback={<Loading />}>
                                <DisputeTable lead_disputes={leads.lead_details && leads.lead_details.lead_disputes} />
                            </Suspense>
                        </div>
                    </TabPane>
                    <TabPane tab="Assignments" key={'Assignments'} className="panetabsoptions" style={{ height: minimizecountview ? '50vh' : '23vh' }}>

                        <div style={{ width: '100%' }}>
                            <Suspense fallback={<Loading />}>
                                <AssignmentTable tabskeyvalue={tabskeyvalue} eligibleAttorneys={eligibleAttorneys} assignedAttorney={assignedAttorney} />
                            </Suspense>
                        </div>
                    </TabPane>
                    <TabPane tab="Data Explorer" key={'Data Explorer'} className="panetabsoptions" style={{ height: minimizecountview ? '50vh' : '23vh' }}>
                        <Suspense fallback={<Loading />}>
                            <DataExplore />
                        </Suspense>
                    </TabPane>
                    <TabPane tab="API Events" key={'API Events'} className="panetabsoptions" style={{ height: minimizecountview ? '50vh' : '23vh' }}>

                        <Suspense fallback={<Loading />}>
                            <ApiEvents />
                        </Suspense>
                    </TabPane>
                </Tabs>
            </div>

        </Card>
    )
}

LeadDetailsCard.propTypes = {
    getAssignedAttorney: PropTypes.func.isRequired,
    getEligibleAttorney: PropTypes.func.isRequired,
    handletosetleadDetails: PropTypes.func.isRequired,
    getLeadAnalyticsData: PropTypes.func.isRequired,
    handleMarkAsTestLeadDeatils: PropTypes.func.isRequired,
    handleMarkAsDuplicateLeadDeatils: PropTypes.func.isRequired,
    handleMarkAsStarredLeadDeatils: PropTypes.func.isRequired,
    handleMarkAsFakeLeadDeatils: PropTypes.func.isRequired,
    handleMarkAsLowQualityLeadDeatils: PropTypes.func.isRequired,
    handleMarkAsWrongCaseTypeLeadDeatils: PropTypes.func.isRequired,
    handleMarkAsWrongLocationLeadDeatils: PropTypes.func.isRequired,
    handleAssignLeadToAttorney: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    leads: state.leads,
    lead_details: state.leads.lead_details,
    eligibleAttorneys: state.leads.eligibleAttorneys,
    assignedAttorney: state.leads.assignedAttorney
});


export default connect(mapStateToProps, { handleAssignLeadToAttorney, getAssignedAttorney, getEligibleAttorney, handletosetleadDetails, getLeadAnalyticsData, handleMarkAsTestLeadDeatils, handleMarkAsDuplicateLeadDeatils, handleMarkAsStarredLeadDeatils, handleMarkAsFakeLeadDeatils, handleMarkAsLowQualityLeadDeatils, handleMarkAsWrongCaseTypeLeadDeatils, handleMarkAsWrongLocationLeadDeatils })(LeadDetailsCard)
