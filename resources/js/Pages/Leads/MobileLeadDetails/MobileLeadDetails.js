import { useState, useEffect, Suspense, lazy } from 'react';
import { Card, Typography, Select, Menu, Layout, AutoComplete, Collapse, Dropdown } from 'antd';
import { AiFillGoogleCircle } from 'react-icons/ai';
import Moment from 'react-moment';
import { Tabs } from 'antd';
import { Redirect } from 'react-router-dom';

// import {ReactHeight} from 'react-height';
import AssignmentList from './AssignmentList/AssignmentList';
import './MobileLeadDetails.css';
// import { StickyContainer, Sticky } from 'react-sticky';
import SideMenu from '../../../CommonComponents/SideMenu/SideMenu';
import TopMenu from '../../../CommonComponents/TopMenu/TopMenu';
// import ApiEvents from './ApiEvents/ApiEvents';
// import Dispute from './Dispute/Dispute';
// import Analytics from './Analytics/Analytics';
// import DataExplorer from './DataExplorer/DataExplorer';
// import Highlights from './Highlights/Highlights';
// import Details from './Details/Details';

// const SideMenu = lazy(()=>import('../../../Layout/SideMenu/SideMenu'));
// const TopMenu = lazy(()=>import('../../../Layout/TopMenu/TopMenu'));
const ApiEvents = lazy(() => import('./ApiEvents/ApiEvents'));
const Dispute = lazy(() => import('./Dispute/Dispute'));
const Analytics = lazy(() => import('./Analytics/Analytics'));
const DataExplorer = lazy(() => import('./DataExplorer/DataExplorer'));
const Highlights = lazy(() => import('./Highlights/Highlights'));
const Details = lazy(() => import('./Details/Details'));

import { useParams } from 'react-router-dom'
import { handletosetleadDetails, getLeadAnalyticsData } from '../../../store/actions/lead';
import { getEligibleAttorney, getAssignedAttorney } from '../../../store/actions/lead';

import { connect } from "react-redux";
import PropTypes from "prop-types";


const { Header, Content, Footer, Sider } = Layout;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

const data = [
    {
        no: '1',
        arrivalTime: '14 April 2020, 02:24 AM',
        status: 'New',
        name: 'John Doe',
        caseType: 'Auto Accident',
        location: 'Los Angeles, CA',
        channel: ['Google'],
        phone: '(626)701-1444',
        email: 'johndoe@gmail.com',
        new: '9',
        disputed: '2',
        refunded: '1',
    }
];

const sources = [
    'Google',
    'Instagram'
];

function MobileLeadDetails({ leadData, getEligibleAttorney, assignedAttorney, getAssignedAttorney, lead, handletosetleadDetails, getLeadAnalyticsData, eligibleAttorneys }) {
    const [collapsed, setCollapsed] = useState(true);
    // const [navValue, setnavValue] = useState('Leads');
    const [widthbool, setwidthbool] = useState(false);
    const [loader, setloader] = useState(false);//just used to refresh the page
    const [setTopMenu, setTopMenuHeight] = useState('');
    const [eligibleAttorney, setEligibleAttorney] = useState(null);

    const { leadId, leadName } = useParams();

    useEffect(async () => {
        console.log('leadId from params:', leadId);
        await handletosetleadDetails(leadId)
        await getLeadAnalyticsData(leadId)
    }, [])

    useEffect(async () => {
        await getEligibleAttorney(leadId)
        await getAssignedAttorney(leadId)
    }, [])

    useEffect(() => {
        if (assignedAttorney) {
            console.log('assigned attorney:', assignedAttorney);
        }
    }, [assignedAttorney])

    useEffect(() => {
        let attorneyNames = [];

        if (eligibleAttorneys && eligibleAttorneys.length > 0) {
            eligibleAttorneys.map((item) => {
                if (item.attorney_name != "" && item.attorney_name != null && attorneyNames.map(item => item.value).indexOf(item.attorney_name) === -1) {
                    let temp = item.attorney_name
                    attorneyNames.push({ value: temp });
                }
            })
        }
        console.log('Attorney a=name:', attorneyNames);
        setEligibleAttorney(attorneyNames);
        console.log('eligible attorney redux', eligibleAttorneys);
        attorneyNames = [];
    }, [eligibleAttorneys])

    useEffect(() => {
        console.log('leads', lead);
        console.log('collapsed', collapsed)
        setloader(!loader);
    }, [widthbool])

    //   useEffect(() => {
    //     let elHeight = document.getElementById('topMenu').clientHeight;
    //     setTopMenuHeight(elHeight);
    //     console.log(elHeight);
    //   }, [])

    useEffect(() => {
        // var tableContent = document.querySelector('.tableclass')
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    const handleResize = (event) => {
        // console.log('yes, I am listening')
        // let maxScroll = event.target.scrollHeight - event.target.clientHeight
        // let currentScroll = event.target.scrollTop
        // if (currentScroll === maxScroll) {
        //    // load more data
        // }
        // console.log("Nv Enter:", event);
        var w = window.innerWidth;
        if (w <= 950) { //1150
            console.log('hide menu');
            setwidthbool(true);
            setloader(!loader);
        }
        else {
            console.log('show menu');
            if (widthbool) {
                setwidthbool(false);
                setloader(!loader);
            }
        }
    }

    const toggleCollapsed = () => {
        // console.log(collapsed);
        setCollapsed(!collapsed);
    };

    const redirecttopage = () => {
        <Redirect to="/" />
    }

    const getTopMenuHeight = (height) => {
        setTopMenuHeight(height);
        console.log(height);
    }

    const handleMenuClick = (e) => {
        console.log('click', e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            {/* <Menu.Item key="1">Mark As Duplicate</Menu.Item> */}
            {lead && lead.duplicate == 0 && <Menu.Item key="1">Mark As Duplicate</Menu.Item>}
            {lead && lead.duplicate == 1 && <Menu.Item key="2">Unmark As Duplicate</Menu.Item>}

            {lead && lead.test_mode == 0 && <Menu.Item key="3">Mark As Test</Menu.Item>}
            {lead && lead.test_mode == 1 && <Menu.Item key="4">Mark As Live</Menu.Item>}

            {lead && lead.starred == 0 && <Menu.Item key="5">Mark As Starred</Menu.Item>}
            {lead && lead.starred == 1 && <Menu.Item key="6">UnMark As Starred</Menu.Item>}

            {lead && lead.leadsSegment && lead.leadsSegment.is_fake == 0 && <Menu.Item key="7">Mark As Fake</Menu.Item>}
            {lead && lead.leadsSegment && lead.leadsSegment.is_fake == 1 && <Menu.Item key="8">UnMark As Fake</Menu.Item>}

            {lead && lead.leadsSegment && lead.leadsSegment.is_low_quality == 0 && <Menu.Item key="9">Mark As Low Quality</Menu.Item>}
            {lead && lead.leadsSegment && lead.leadsSegment.is_low_quality == 1 && <Menu.Item key="10">UnMark As Low Quality</Menu.Item>}

            {lead && lead.leadsSegment && lead.leadsSegment.has_wrong_location == 0 && <Menu.Item key="11">Mark As Wrong Location</Menu.Item>}
            {lead && lead.leadsSegment && lead.leadsSegment.has_wrong_location == 1 && <Menu.Item key="12">UnMark As Wrong Location</Menu.Item>}

            {lead && lead.leadsSegment && lead.leadsSegment.has_wrong_case_type == 0 && <Menu.Item key="11">Mark As Wrong CaseType</Menu.Item>}
            {lead && lead.leadsSegment && lead.leadsSegment.has_wrong_case_type == 1 && <Menu.Item key="12">UnMark As Wrong CaseType</Menu.Item>}
        </Menu>
    );


    return (
        <Layout>
            <div className='mobileLeadDetails' style={{ background: "white" }}>
                <Header className='mobileLeadDetailsHeader' style={{ height: '57px' }}>
                    <TopMenu
                        id='topMenu'
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        toggleCollapsed={toggleCollapsed}
                        setTopMenuHeight={setTopMenuHeight}
                        getTopMenuHeight={getTopMenuHeight}
                    />
                </Header>
                <div>
                    {/* <Sider> */}
                    <SideMenu
                        collapsed={collapsed}
                        widthbool={widthbool}
                    // redirecttopage={redirecttopage}
                    // openkeys="sub2" 
                    // menukeys={1}
                    />
                    {/* </Sider> */}
                    {/* widthbool && (collapsed || !collapsed)?'80px':!widthbool && collapsed?'80px':'250px' */}

                    <div style={{ position: 'relative', height: '80%', display: window.innerWidth <= 575 && !collapsed ? 'none' : 'block', marginLeft: collapsed && window.innerWidth <= 575 ? "0px" : collapsed && window.innerWidth > 575 ? '80px' : '250px' }}>
                        <Content>

                            <Card className="leadListCard"
                                style={{
                                    // position: '-webkit-sticky',
                                    // position: 'sticky',
                                    // top: '14px',
                                    zIndex: '1',
                                    height: '100px',
                                    position: 'fixed',
                                    background: 'white',
                                    width: '100%',
                                    borderLeft: lead && lead.lead_status == 11 ? '5px solid #00E676' : '5px solid #00B0FF'
                                }} >
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Text className="leadListTitle" style={{ fontSize: '15px' }} strong type='secondary'>{lead && lead.lead_name}</Text>
                                    <Text className="leadListArrivalTime" style={{ fontSize: '14px' }} type='secondary'>
                                        <Moment format="MM/DD/YYYY HH:mm:ss">
                                            {lead && lead.created_at}
                                        </Moment>
                                    </Text>
                                    {/* <Text className="leadListArrivalTime" style={{fontSize:'14px'}} type='secondary'>{lead.created_at}</Text> */}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text className="leadListCaseType" style={{ fontSize: '14px' }} type='secondary'>{lead && lead.lead_case_type}</Text>
                                        <Text style={{ fontSize: '14px' }} type='secondary'>{lead && lead.lead_location}</Text>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                                        <Text><AiFillGoogleCircle /></Text>
                                    </div>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex' }}>
                                        {/* <Select size='small' placeholder='Attorney' style={{ width:150 }}>
                        <Option key={'1'} value={'John F. Diaz'}>{'John F. Diaz'}</Option>
                            <Option key={'2'} value={'Law Martins'}>{'Law Martins'}</Option>
                            <Option key={'3'} value={'Rock James'}>{'Rock James'}</Option>
                            <Option key={'4'} value={'Chass Dias'}>{'Chass Dias'}</Option>
                            <Option key={'5'} value={'Sisui Hatake'}>{'Sisui Hatake'}</Option>
                            <Option key={'6'} value={'Shames Shaw'}>{'Shames Shaw'}</Option>
                            <Option key={'7'} value={'Neon Blake'}>{'Neon Blake'}</Option>
                            <Option key={'8'} value={'Robbin Diaz'}>{'Robbin Diaz'}</Option>
                            <Option key={'9'} value={'James D.'}>{'James D.'}</Option>
                            <Option key={'10'} value={'John Doe'}>{'John Doe'}</Option>
                        </Select> */}

                                        <AutoComplete
                                            style={{
                                                width: 150,
                                            }}
                                            size='small'
                                            options={eligibleAttorney && eligibleAttorney.length > 0 ? eligibleAttorney : ''}
                                            placeholder={eligibleAttorney && eligibleAttorney.length > 0 ? "Select Attorney" : "No Eligible Attorney"}
                                            // placeholder={filtervalue.LeadName === '' && leadfilter.lead_filter.LeadName !== ''? leadfilter.lead_filter.LeadName : 'Enter Name'}
                                            allowClear
                                            // onClear={()=>handleLeadNameChange('')}
                                            // defaultValue={leadfilter.lead_filter.LeadName}
                                            // value={filtervalue.LeadName} 
                                            // onChange={handleLeadNameOnChange}
                                            // onSelect={handleLeadNameChange}
                                            filterOption={(inputValue, option) =>
                                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                        />
                                        <Text style={{ marginLeft: 10 }} type='secondary'>$5.55</Text>
                                    </div>
                                    <Dropdown.Button overlay={menu} style={{ right: '-20px' }} onClick={() => console.log('pressed action')}>Assign</Dropdown.Button>
                                    {/* <Button size='small' style={{ width:100, textAlign:'center' }} type='primary'>Assign</Button> */}
                                </div>
                            </Card>



                            <Tabs className="tabs" size='small' style={{ paddingTop: '100px', paddingLeft: '10px', marginBottom: '64px', overflow: 'scroll', paddingRight: '10px', background: 'white' }} defaultActiveKey="1" >
                                <TabPane tab="Highlights" key="highlights">
                                    <Suspense fallback="loading">
                                        <Highlights />
                                    </Suspense>
                                </TabPane>
                                <TabPane tab="Analytics" key="analytics">
                                    <Suspense fallback="loading">
                                        <Analytics />
                                    </Suspense>
                                </TabPane>
                                <TabPane tab="Details" key="details" style={{ overflow: 'scroll' }}>
                                    <Suspense fallback="loading">
                                        <Details lead_raw_data={lead && lead.lead_raw_data[0]} />
                                    </Suspense>
                                </TabPane>
                                <TabPane tab="Dispute" key="dispute">
                                    <Suspense fallback="loading">
                                        <Dispute lead_disputes={lead && lead.lead_disputes} />
                                    </Suspense>
                                </TabPane>
                                <TabPane tab="Assignments" key="assignments">
                                    <Suspense fallback="loading">
                                        <AssignmentList assignedAttorney={assignedAttorney} eligibleAttorneys={eligibleAttorneys} />
                                    </Suspense>
                                </TabPane>
                                <TabPane tab="Data Explorer" key="DataExplorer">
                                    <Collapse accordion>
                                        {/* <Panel header="John Doe" key="1"> */}
                                        <Suspense fallback="loading">
                                            <DataExplorer />
                                        </Suspense>
                                        {/* </Panel> */}
                                    </Collapse>
                                </TabPane>
                                <TabPane tab="API Events" key="APIEvents">
                                    <Suspense fallback="loading">
                                        <ApiEvents />
                                    </Suspense>
                                </TabPane>
                            </Tabs>
                        </Content>
                    </div>

                </div>
            </div>
        </Layout>
    )
}


MobileLeadDetails.propTypes = {
    handletosetleadDetails: PropTypes.func.isRequired,
    getLeadAnalyticsData: PropTypes.func.isRequired,
    getEligibleAttorney: PropTypes.func.isRequired,
    getAssignedAttorney: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    leadData: state.leadDetails.leadData,
    lead: state.leads.lead_details,
    eligibleAttorneys: state.leads.eligibleAttorneys,
    assignedAttorney: state.leads.assignedAttorney
});

export default connect(mapStateToProps, { handletosetleadDetails, getLeadAnalyticsData, getAssignedAttorney, getEligibleAttorney })(MobileLeadDetails);
