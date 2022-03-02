import { useState, useEffect } from 'react';
import { Card, Typography, Layout, Tabs } from 'antd';
// import TopMenu from '../../../Layout/TopMenu/TopMenu';
// import SideMenu from '../../../Layout/SideMenu/SideMenu';
import LandingPage from './Account/LandingPage/LandingPage';
import Api from './Account/Api/Api';
import Campaign from './Campaign/Campaign';
// import Leads from './Leads/Leads';
import {
    AffiliateMoblieLeads,
    AffiliateMobileAccountInformation,
    AffiliateMobileBillingInformation,
    AffiliateMobileNotifications
} from '../../../../../../CommonComponents/mastercomponent/src/index';
import AutomatedMails from './AutomatedMails/AutomatedMails';

import { connect } from "react-redux";

const { TabPane } = Tabs;
const { Header, Content } = Layout;
const { Text } = Typography;

function AffiliatesDetails({ affiliatesData }) {


    const [collapsed, setCollapsed] = useState(true);
    // const [navValue, setnavValue] = useState('Leads');
    const [widthbool, setwidthbool] = useState(false);
    const [loader, setloader] = useState(false);//just used to refresh the page
    const [setTopMenu, setTopMenuHeight] = useState('');
    useEffect(() => {
        // console.log('lead',leadData);
        console.log('collapsed', collapsed)
        setloader(!loader);
    }, [widthbool])

    useEffect(() => {
        console.log('affiliates', affiliatesData);
    }, [])

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

    const getTopMenuHeight = (height) => {
        setTopMenuHeight(height);
        console.log(height);
    }

    return (
        <Layout>
            <div className='mobileLeadDetails' style={{ background: "rgb(244, 245, 247)" }}>
                <Header className='mobileLeadDetailsHeader' style={{ height: '57px' }}>
                    {/* <TopMenu
                id='topMenu'
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                toggleCollapsed={toggleCollapsed}
                setTopMenuHeight={setTopMenuHeight}
                getTopMenuHeight={getTopMenuHeight}
            /> */}
                </Header>
                <div>
                    {/* <SideMenu
                    collapsed={collapsed}
                    widthbool={widthbool}
                    // redirecttopage={redirecttopage}
                    // openkeys="sub2" 
                    // menukeys={1}
                /> */}
                    <div style={{ position: 'relative', height: '80%', display: window.innerWidth <= 575 && !collapsed ? 'none' : 'block' }}>
                        <Content>
                            <Card className="customerDetails" size='small' style={{ background: "white", width: '100%' }}>
                                <div style={{ width: '100%' }}>
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', width: '40%' }}>
                                            <Text strong style={{ fontSize: 15 }} type='secondary'>{affiliatesData ? affiliatesData.name : ''}</Text>
                                            <Text style={{ fontSize: 13, textAlign: 'left' }} type='secondary'>{affiliatesData ? affiliatesData.locations : 'NYC'}</Text>
                                        </div>
                                        <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', width: '20%' }}>
                                            <Text style={{ marginRight: '10px', fontSize: 14 }} strong type='secondary'>Balance</Text>
                                            <div style={{ padding: '3px', alignSelf: 'center', background: '#41A9FE', color: 'white', fontWeight: 'bold' }}>${affiliatesData ? affiliatesData.balance : ''}</div>
                                        </div>

                                    </div>
                                </div>
                            </Card>

                            <Tabs className="tabs" size='small' style={{ paddingLeft: '10px', overflow: 'scroll', paddingRight: '10px', background: 'white' }} defaultActiveKey="1" >
                                <TabPane tab="Leads" key="Leads">
                                    {/* <Leads/> */}
                                    <AffiliateMoblieLeads userType={"admin"} />
                                </TabPane>
                                <TabPane tab="Campaign" key="Campaign">
                                    <Campaign />
                                </TabPane>
                                <TabPane tab="Account" key="Account">
                                    <Tabs className="tabs" size='small' style={{ overflow: 'scroll', background: 'white' }} defaultActiveKey="1" >
                                        <TabPane tab="Account Information" key="Account Information">
                                            {/* <AccountInformation/> */}
                                            <AffiliateMobileAccountInformation />
                                        </TabPane>
                                        <TabPane tab="Billing Information" key="Billing Information">
                                            {/* <BillingInformation/> */}
                                            <AffiliateMobileBillingInformation />
                                        </TabPane>
                                        <TabPane tab="Notifications" key="Notifications">
                                            {/* <Notifications/> */}
                                            <AffiliateMobileNotifications />
                                        </TabPane>
                                        <TabPane tab="API" key="API">
                                            <Api />
                                        </TabPane>
                                        <TabPane tab="Landing Page" key="Landing Page">
                                            <LandingPage />
                                        </TabPane>
                                    </Tabs>
                                </TabPane>
                                <TabPane tab="Automated Mails" key="Automated Mails">
                                    <AutomatedMails />
                                </TabPane>
                            </Tabs>
                        </Content>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => ({
    affiliatesData: state.affiliates.affiliatesData
});

export default connect(mapStateToProps, {})(AffiliatesDetails);
