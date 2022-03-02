import React, { useState, useEffect } from 'react';
import { Button, Avatar, Popover, Menu, Typography, Breadcrumb, Switch } from "antd";
import {
  UserOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  LogoutOutlined,
  DollarOutlined,
  HomeOutlined
} from "@ant-design/icons";
// import FeatherIcon from "feather-icons-react";
import './TopMenu.css';
// import { Redirect, withRouter } from 'react-router-dom';
import { handleLogout } from '../../store/actions/auth';
import { handlesetTestMode } from '../../store/actions/config';

import { connect } from "react-redux";
import PropTypes from "prop-types";


const { Text } = Typography;

const TopMenu = ({
  collapsed,
  toggleCollapsed,
  location,
  setTopMenuHeight,
  getTopMenuHeight,
  handleLogout,
  handlesetTestMode,
  config_test_mode,
  authenticated,
  lead
}) => {

  const [profileCollapsed, setProfileCollapsed] = useState(false);
  const [path, setPath] = useState("Affiliates");
  // const [testdataswitch, settestdataswitch] = useState('')
  // let { pathname } = location ? location : '';
  // console.log('location.pathname', pathname)
  // useEffect(() => {
  //   setPath(pathname.slice(1).split('/')[0])
  //   console.log('new path:', path);
  // }, [])


  const HandleProfileCollapsed = () => {
    setProfileCollapsed(!profileCollapsed);
  };

  function handleMenuLogout() {
    console.log('handle menu logout', authenticated);
    handleLogout();
  }

  useEffect(() => {
    // if(testdataswitch === ''){
    //   handlesetTestMode(config_test_mode);
    //   settestdataswitch(config_test_mode)
    // }
  }, [config_test_mode])

  const handleTestModeChange = (value) => {
    console.log(value);
    handlesetTestMode(value);
    // settestdataswitch(value)
  }

  const content = (
    <div style={{ width: 256 }}>
      <Menu
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="white"
        // inlineCollapsed={profileCollapsed}
        style={{ border: "none" }}
      >
        <Menu.Item
          // onClick={onHandlePersonalize}
          key="test"
          // icon={<UserOutlined />}
          //   onClick={onHandleAccount}
          style={{ color: "#5a5f7d", display: window.innerWidth <= 575 || window.innerHeight <= 575 ? 'block' : 'none' }}
        >
          <Switch checked={config_test_mode} onChange={handleTestModeChange} style={{ marginRight: 10 }} />
          View Test Data
        </Menu.Item>
        <Menu.Item
          // onClick={onHandlePersonalize}
          key="account"
          icon={<UserOutlined />}
          //   onClick={onHandleAccount}
          style={{ color: "#5a5f7d" }}
        >
          Account
        </Menu.Item>
        <Menu.Item
          // onClick={onHandleEnquiry}
          key="logout"
          style={{ backgroundColor: "#F8F9FB", color: "#5a5f7d" }}
          icon={<LogoutOutlined />}
          onClick={handleMenuLogout}
        //   onClick={() => {
        // logoutuser();
        // logout();
        //   }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );



  if (!authenticated) {
    console.log('authenticated', authenticated);
    // <Redirect to="/login" />
  }
  // console.log('config_test_mode ',config_test_mode)
  return (

    <div className="topMenu" style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
        <div className="topMenuButton">
          <Button
            className="topMenuCollapsed"
            type="white"
            onClick={toggleCollapsed}
            style={{
              background: 'white',
              border: "none",
              color: "#ADB4D2",
              fontSize: "20px",
              padding: "0",
              // marginLeft: "17px",
            }}
          >
            {React.createElement(
              collapsed ? AlignLeftOutlined : AlignRightOutlined
            )}
          </Button>
          <div style={{ display: 'flex', flexDirection: window.innerWidth <= 575 || window.innerHeight <= 575 ? 'column' : 'row', width: window.innerWidth <= 575 || window.innerHeight <= 575 ? '100%' : '', marginLeft: 10 }}>
            <p className="topMenuLogo" style={{ textAlign: 'center' }}>
              AdminBuild
            </p>
            <div style={{ paddingLeft: window.innerWidth <= 575 || window.innerHeight <= 575 ? 0 : '20px' }}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <HomeOutlined style={{ position: 'relative', top: '-.4vh' }} />
                </Breadcrumb.Item>
                <Breadcrumb.Item>{path}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
        <div>
          {/* switch */}
          <div style={{ display: window.innerWidth <= 575 || window.innerHeight <= 575 ? 'none' : 'flex' }}>
            {/* <Switch value={testdataswitch === 'true' ? true: false} onChange={handleTestModeChange} />  config_test_mode*/}
            <Switch checked={config_test_mode} onChange={handleTestModeChange} />
            <div style={{ marginLeft: '10px' }}>View Test Data</div>
          </div>

        </div>
      </div>

      <div>
        <Popover
          className="topMenuAvatar"
          placement="topRight"
          content={content}
          trigger="click"
        >
          <Avatar
            onClick={HandleProfileCollapsed}
            icon={
              <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            }
          />
        </Popover>
      </div>
    </div>

  )
}

TopMenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handlesetTestMode: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  config_test_mode: state.config.config_test_mode,
  lead: state.leads.lead_details,
});

export default connect(mapStateToProps, { handleLogout, handlesetTestMode })(TopMenu);
