import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Tabs, Select, Input, Checkbox, Table, Space, Radio, Switch } from 'antd';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { FaCalendar } from 'react-icons/fa'
import { ImCross, ImCheckmark } from 'react-icons/im';
import { AiFillStar, AiFillEdit } from "react-icons/ai";
// import moment from "moment";
// import momentTimezone from "moment-timezone";
import './AffiliatesCardDetails.css';
import { DownOutlined } from '@ant-design/icons';
import LandingPage from './Account/LandingPage/LandingPage';
import API from './Account/API/API';
import AutomaticMail from './AutomaticMail/AutomaticMail';
import Campaign from './Campaign/Campaign';
import { AccountInformation, BillingInformation, NewLeads, Notification } from '../../../../../../CommonComponents/mastercomponent/src';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

let user = {
  usertype: 'admin'
}

const AffiliatesCardDetails = ({ handleMinimizeTableChange, minimizetable, testData }) => {

  console.log('test data', testData);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [selecteddate, setselecteddate] = useState('');
  const [noofleadscount, setnoofleadscount] = useState('10')

  useEffect(() => {
    //call the leads by passing count
    console.log('noofleadscount ', noofleadscount);
  }, [noofleadscount])

  const onDateChange = (item) => {
    console.log(item.selection.endDate === item.selection.startDate, new Date(item.selection.endDate).toLocaleDateString() === new Date(item.selection.startDate).toLocaleDateString(), new Date(item.selection.endDate).toLocaleDateString())
    setselecteddate(`${new Date(item.selection.startDate).toLocaleDateString()} - ${new Date(item.selection.endDate).toLocaleDateString()}`)
    console.log(item);
    setState([item.selection]);
  }

  const handleMenuClick = (e) => {
    console.log('click', e);
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    }
    // getCheckboxProps: (record) => ({
    // disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    // name: record.name,
    // }),
  };

  const setRowClassName = (record) => {
    console.log(' record ', record)
    return record.rating === 5 ? 'backgroundgreen' : '';
  }

  //  const handleScrollheight = () =>{
  //   let x = document.getElementsByClassName('affiliatesplantabsoptions');
  //   console.log('x',x)

  //  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        Backed Up
      </Menu.Item>
      <Menu.Item key="1">
        Budget Cap Confirmed
      </Menu.Item>
      <Menu.Item key="3">
        Pending Budget Increase
      </Menu.Item>
      <Menu.Item key="4">
        $0 Refill Authorized
      </Menu.Item>
    </Menu>
  );


  const handlesubmitnoofleadchange = (num) => {
    setnoofleadscount(num);
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', padding: '4px 0 10px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <Button type="primary" style={{marginRight:'10px'}}>Create Invite</Button> */}
        {
          minimizetable ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <div style={{ cursor: 'pointer', marginTop: '10px', marginLeft: '10px', fontWeight: '500' }} onClick={handleMinimizeTableChange}>Maximize Table</div>
            </div>
          ) : (<div></div>)
        }
        <Popover placement="leftTop" content={() => (<DateRangePicker
          onChange={item => onDateChange(item)}
          className="PreviewArea"
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
        />)} triggonDealChangeer="click">
          <Button
            style={{ color: 'black', background: 'rgb(244, 245, 247)', outline: 'hidden', marginRight: '20px' }}>
            {selecteddate ? selecteddate : 'Select Date'}
          </Button>
        </Popover>
      </div>
      <Card style={{ width: '100%', height: 'calc(-53px + 100%)' }}>
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#777' }}>Optin Test Company</div>
              {/* <div style={{marginLeft:'10px'}}><FiExternalLink size={18} /></div> */}
            </div>
            <Dropdown.Button overlay={menu} style={{ right: '0px' }} onClick={() => console.log('pressed action')}>Edit</Dropdown.Button>
          </div>
          <div style={{ padding: '2px 0', width: '100%' }}>
            <div style={{ padding: '2px 0' }}>New York City, NYC</div>

          </div>
        </div>
        <div style={{ width: '100%' }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Leads" key="1" style={{ margin: '0px', padding: '0px' }} className="affiliatesplantabsoptions" >
              <NewLeads user={user} handlesubmitnoofleadchange={handlesubmitnoofleadchange} />
            </TabPane>
            <TabPane tab="Campaign" key="2" style={{ width: '100%', margin: '0', padding: '0' }} className="affiliatesplantabsoptions">
              {/* <div style={{width:'100%'}}> */}
              <Campaign />
            </TabPane>
            <TabPane tab="Account" key="3" style={{ width: '100%', margin: '0', padding: '0' }}>
              <Tabs className="tabs" size='small' defaultActiveKey="Account Information" >
                <TabPane tab="Account Information" key="Account Information" className="affiliatesplantabsoptionssubtabs">
                  <AccountInformation user={user} />
                </TabPane>
                <TabPane tab="Billing Infomation" key="BillingInfomation" className="affiliatesplantabsoptionssubtabs">
                  <BillingInformation />
                </TabPane>
                <TabPane tab="Notifications" key="Notification" className="affiliatesplantabsoptionssubtabs">
                  <Notification />
                </TabPane>
                <TabPane tab="API" key="API" className="affiliatesplantabsoptionssubtabs">
                  <API />
                </TabPane>
                <TabPane tab="Landing Page" key="LandingPage" className="affiliatesplantabsoptionssubtabs">
                  <LandingPage />
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Automatic Mail" key="4" style={{ width: '100%', margin: '0', padding: '0' }}>
              <AutomaticMail />
            </TabPane>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

export default AffiliatesCardDetails;
