import { useState, useEffect, Suspense, lazy } from 'react';
// import SideMenu from '../../SideMenu/SideMenu';
import MemoizedSideMenu from '../../CommonComponents/SideMenu/SideMenu';
import TopMenu from '../../CommonComponents/TopMenu/TopMenu';
// import { Redirect } from 'react-router-dom';
// import Leads from '../../../Components/Leads/Leads';
// import LeadsList from '../../../Components/Leads/LeadsList/LeadsList';
// const SideMenu = lazy(()=>import('../../SideMenu/SideMenu'));
// const TopMenu = lazy(()=>import('../../TopMenu/TopMenu'));
const Leads = lazy(() => import('./Leads'));
const LeadsList = lazy(() => import('./LeadsList/LeadsList'));

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handlegetallleads, handlegetallleadsbytestmode } from '../../store/actions/lead'
import Loading from './Loading/Loading';

const Lead = ({ authenticated, handlegetallleads, handlegetallleadsbytestmode, config_test_mode }) => {

    const [collapsed, setCollapsed] = useState(window.innerWidth <= 575 ? true : false);
    // const [navValue, setnavValue] = useState('Leads');
    const [widthbool, setwidthbool] = useState(false);
    const [loader, setloader] = useState(false);//just used to refresh the page

    useEffect(() => {
        console.log('collapsed', collapsed)
        setloader(!loader);
    }, [widthbool])

    //   useEffect(() => {
    //     console.log('collapsed',collapsed)
    //   }, [setCollapsed])

    useEffect(() => {
        // var tableContent = document.querySelector('.tableclass')
        // handlegetallleads();
        // handlegetallleadsbytestmode();
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
        if (config_test_mode !== undefined) {
            handlegetallleadsbytestmode(config_test_mode);
        }
    }, [config_test_mode])

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
        // <Redirect to="/leads" />
    }

    if (!authenticated) {
        // return <Redirect to="/login" />
    }

    return (
        <Suspense fallback={<Loading />}>
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
                    />
                    <div style={{ display: window.innerHeight > 575 && window.innerWidth > 575 ? 'block' : 'none', paddingTop: '60px', marginLeft: collapsed && window.innerWidth <= 575 ? "0px" : collapsed && window.innerWidth > 575 ? '80px' : '250px', minHeight: '100%' }}>
                        <Leads collapsed={collapsed} widthbool={widthbool} />
                    </div>
                    <div style={{ display: window.innerWidth <= 575 || window.innerHeight <= 575 ? 'block' : 'none', marginTop: 64, paddingBottom: 64, width: '100%' }}>
                        <LeadsList />
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

Lead.propTypes = {
    handlegetallleads: PropTypes.func.isRequired,
    handlegetallleadsbytestmode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    config_test_mode: state.config.config_test_mode
});


export default connect(mapStateToProps, { handlegetallleads, handlegetallleadsbytestmode })(Lead);
