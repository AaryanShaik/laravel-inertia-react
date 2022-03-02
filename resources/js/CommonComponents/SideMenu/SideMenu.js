import React, { useState, memo } from 'react';
import { Menu, Typography, Row, Col } from "antd";
import {
  TableOutlined,
  FileTextOutlined,
  DesktopOutlined,
  CarOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import './SideMenu.css';
// import Leads from '../../Components/Leads/Leads';
// import { NavLink } from 'react-router-dom';
// import { withRouter } from 'react-router';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

const { SubMenu } = Menu;

const { Text } = Typography;

const MemoizedSideMenu = memo(function MemoizedSideMenu({
  collapsed,
  widthbool,
  onHandleLeads,
  location
}) {
  console.log('location ', location);


  return (
    <div className="sideMenu">
      <div className="mainA">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={collapsed ? 0 : 12}>
            <div style={{
              position: ' fixed',
              alignItems: 'flex-start',
              height: '100%',
              height: '100vh',
              left: '0px',
              top: window.innerWidth <= 575 || window.innerHeight <= 575 ? '64px' : '',
              marginBottom: window.innerWidth <= 575 ? '64px' : '',
              zIndex: '998',
              background: '#fff',
              margin: window.innerWidth <= 575 || window.innerHeight <= 575 ? 0 : '63px 0px 0px',
              boxShadow: '5px 0 5px -5px #00000020, -5px 0 5px -5px #00000020',
            }} className="dropdownSideMenu">
              <Menu
                defaultSelectedKeys={['/leads']}
                selectedKeys={['/leads']}
                mode="inline"
                theme="white"
                inlineCollapsed={collapsed}
                style={{
                  border: "none",
                  width: collapsed && window.innerWidth <= 575 || collapsed && window.innerHeight <= 575 ? "0px" : !collapsed && window.innerWidth <= 575 || !collapsed && window.innerHeight <= 575 ? window.innerWidth : collapsed && window.innerWidth > 575 && collapsed && window.innerHeight > 575 ? '80px' : '250px',
                  background: 'white'
                }}
              >
                <SubMenu
                  style={{ backgroundColor: "white" }}
                  key="/"
                  icon={
                    <DatabaseOutlined
                      style={{
                        fontSize: "20px",
                        color: "#ADB4D2",
                        marginRight: "16px",
                      }}
                    />
                  }
                  title="Invitation"
                >
                  <Menu.Item
                    style={{ backgroundColor: "white", margin: 0 }}
                    icon={
                      <CarOutlined
                        style={{
                          fontSize: "20px",
                          color: "#ADB4D2",
                          marginRight: "16px",
                        }}
                      />
                    }
                    key="/websitebuilder"
                  >
                    {/* <NavLink to="/websitebuilder">
                      Website Builder
                    </NavLink> */}
                    Website Builder
                  </Menu.Item>
                  <Menu.Item
                    style={{ backgroundColor: "white", margin: 0 }}
                    icon={
                      <TableOutlined
                        style={{
                          fontSize: "20px",
                          color: "#ADB4D2",
                          marginRight: "16px",
                        }}
                      />
                    }
                    key="/invites"
                  >
                    {/* <NavLink to="/invites">
                      Invite
                    </NavLink> */}
                    Invite
                  </Menu.Item>
                </SubMenu>
                <Menu.Item
                  style={{
                    backgroundColor: "white", margin: 0
                  }}
                  onClick={onHandleLeads}
                  key="/leads"
                  icon={
                    <DesktopOutlined
                      style={{
                        fontSize: "20px",
                        color: "#ADB4D2",
                        marginRight: "16px",
                      }}
                    />
                  }

                >
                  {/* <NavLink to="/leads">
                    Leads
                  </NavLink> */}
                  <InertiaLink href="/leads" className="font-sans">Leads</InertiaLink>
                </Menu.Item>
                <SubMenu
                  style={{ backgroundColor: "white" }}
                  key="sub7"
                  icon={
                    <DatabaseOutlined
                      style={{
                        fontSize: "20px",
                        color: "#ADB4D2",
                        marginRight: "16px",
                      }}
                    />
                  }
                  title="Customers"
                >
                  <Menu.Item
                    style={{ backgroundColor: "white", margin: 0 }}
                    icon={
                      <CarOutlined
                        style={{
                          fontSize: "20px",
                          color: "#ADB4D2",
                          marginRight: "16px",
                        }}
                      />
                    }
                    key="/customer"
                  >
                    {/* <NavLink to="/customer">
                      All Customers
                    </NavLink> */}
                    All Customers
                  </Menu.Item>
                  <Menu.Item
                    style={{ backgroundColor: "white", margin: 0 }}
                    icon={
                      <TableOutlined
                        style={{
                          fontSize: "20px",
                          color: "#ADB4D2",
                          marginRight: "16px",
                        }}
                      />
                    }
                    key="All Profiles"
                  >
                    All Profiles
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  style={{ backgroundColor: "white" }}
                  key="sub3"
                  icon={
                    <DatabaseOutlined
                      style={{
                        fontSize: "20px",
                        color: "#ADB4D2",
                        marginRight: "16px",
                      }}
                    />
                  }
                  title="Affiliates"
                >
                  <Menu.Item
                    style={{ backgroundColor: "white", margin: 0 }}
                    icon={
                      <CarOutlined
                        style={{
                          fontSize: "20px",
                          color: "#ADB4D2",
                          marginRight: "16px",
                        }}
                      />
                    }
                    key="/affiliate"
                  >
                    {/* <NavLink to="/affiliate">
                      All Affiliates
                    </NavLink> */}
                    <InertiaLink href="/affiliates" className="font-sans">All Affiliates</InertiaLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  style={{ backgroundColor: "white" }}
                  key="Analytics"
                  icon={
                    <DatabaseOutlined
                      style={{
                        fontSize: "20px",
                        color: "#ADB4D2",
                        marginRight: "16px",
                      }}
                    />
                  }
                  title="Analytics"
                >
                  <Menu.Item
                    style={{ backgroundColor: "white", margin: 0 }}
                    icon={
                      <CarOutlined
                        style={{
                          fontSize: "20px",
                          color: "#ADB4D2",
                          marginRight: "16px",
                        }}
                      />
                    }
                    key="16"
                  >
                    Overview
                  </Menu.Item>
                  <Menu.Item
                    style={{ backgroundColor: "white", margin: 0 }}
                    icon={
                      <TableOutlined
                        style={{
                          fontSize: "20px",
                          color: "#ADB4D2",
                          marginRight: "16px",
                        }}
                      />
                    }
                    key="Lead Feedback"
                  >
                    Lead Feedback
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
)
export default MemoizedSideMenu;
