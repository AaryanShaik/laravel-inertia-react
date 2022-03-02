import { useState, useEffect } from 'react';
// import SideMenu from '../../../SideMenu/SideMenu'; keep commented
import MemoizedSideMenu from '../../CommonComponents/SideMenu/SideMenu';
import TopMenu from '../../CommonComponents/TopMenu/TopMenu';
// import { Navigate } from 'react-router-dom';
import AffiliatesSection from './components/web/AffiliatesSection/AffiliatesSection';
import AffiliatesList from './components/mobile/AffiliatesMobile/AffiliatesList/AffiliatesList';

import { connect } from "react-redux";
// import PropTypes from "prop-types";

const Affiliates = ({ authenticated }) => {
  // console.log('Affiliates page')
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 575 ? true : false);
  // const [navValue, setnavValue] = useState('Leads');
  const [widthbool, setwidthbool] = useState(false);
  const [loader, setloader] = useState(false);//just used to refresh the page

  useEffect(() => {
    // console.log('collapsed',collapsed)
    setloader(!loader);
  }, [widthbool])


  const toggleCollapsed = () => {
    // console.log(collapsed);
    setCollapsed(!collapsed);
  };

  const redirecttopage = () => {
    // <Navigate to="/" />
  }

  if (!authenticated) {
    // return <Navigate to="/login" />
  }

  return (
    <>
      <div style={{ width: '100%', height: '100vh', background: window.innerHeight <= 575 || window.innerWidth <= 575 ? "white" : "rgb(244, 245, 247)" }}>
        <TopMenu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          toggleCollapsed={toggleCollapsed}
        />
        <div style={{ width: '100%', height: '100%', margin: 0, padding: 0, border: '1px solid rgb(244, 245, 247)' }}>
          <MemoizedSideMenu
            collapsed={collapsed}
            widthbool={widthbool}
            redirecttopage={redirecttopage}
          />
          <div style={{ display: window.innerHeight > 575 && window.innerWidth > 575 ? 'block' : 'none', paddingTop: '60px', marginLeft: collapsed && window.innerWidth <= 575 ? "0px" : collapsed && window.innerWidth > 575 ? '80px' : '250px', minHeight: '100%', background: '#F4F5F7' }}>
            <AffiliatesSection />
          </div>
          <div style={{ display: window.innerWidth <= 575 || window.innerHeight <= 575 ? 'block' : 'none', marginTop: '64px', paddingBottom: '64px', width: '100%' }}>
            <AffiliatesList />
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});


export default connect(mapStateToProps, {})(Affiliates);
