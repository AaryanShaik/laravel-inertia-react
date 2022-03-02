import { PageHeader, Card, Modal, Button, Tooltip, Popover,Spin } from 'antd';
import {useState, useEffect, Suspense, lazy} from 'react';
import LeadsTable from './LeadsTable/LeadsTable';
import LeadsCard from './LeadsCard/LeadsCard';
import LeadDetailsCard from './LeadDetailsCard/LeadDetailsCard';
// const LeadsTable = lazy(()=>import('./LeadsTable/LeadsTable'));
// const LeadsCard = lazy(()=>import('./LeadsCard/LeadsCard'));
// const LeadDetailsCard = lazy(()=>import('./LeadDetailsCard/LeadDetailsCard'))
import './Leads.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// NOT BEIGN USED 
// import LeadsList from './LeadsList/LeadsList';
// import FilterTable from './LeadsTable/FilterTable/FilterTable';
// import { Calendar,DateRangePicker } from 'react-date-range';
// import { addDays } from 'date-fns';
// import { ItemWraper, ButtonGroup } from './LeadCardStyle';
// NOT BEING USED
import { Redirect } from "react-router-dom";

import LeadDateComp from './LeadDateComp';

import { connect } from "react-redux";
import PropTypes from "prop-types";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

const Leads = ({collapsed, authenticated,loading}) => {

    const { height, width } = useWindowDimensions();

    const [minimizetablewidth, setminimizetablewidth] = useState(50);
    const [minimizetable, setminimizetable] = useState(false);
    const [minimizeCardDetails, setminimizeCardDetails] = useState(false);
    const [minimizecountview, setminimizecountview] = useState(false);

    //this function handles the table with size and is passed in the leadstable component and from there to the filter component from there we fetch the value
    const handleTableWidthChange = (value) =>{
      // console.log('value ',value);
      setminimizetablewidth(value);
    }

    //this fucntion holds the bool value that can either minimize or maximize the lead table and is passed to the filter component
    const handleMinimizeTableChange = () =>{
        // console.log('value ',value);
        if(!minimizeCardDetails){
          setminimizetable(!minimizetable);
        }
    }

    //this fucntion holds the bool value that can either minimize or maximize the the lead card and the lead detail section  and is passed to the filter component
    const handleMinimizeCardDetailsChange = () =>{
      // console.log('value ',value);
      setminimizeCardDetails(!minimizeCardDetails);
    }

    //this function minimizes or displays the lead card that holds the lead count
    const handleMinimizeCountViewChanges = () =>{
      setminimizecountview(!minimizecountview);
    }

  // console.log('minimizecountview ',minimizecountview)

  if(!authenticated){
    <Redirect to="/login"/>
}

    return (
      <Spin tip="Loading..." spinning={loading}>
      <Suspense fallback="Loading">
        <div style={{ background: "rgb(244, 245, 247)",height:'100%', width:'100%'}}>
            <div className="LeadsInnerDiv">
                <div className="LeadTableDiv" style={{width:minimizetable?'0%': (minimizeCardDetails? '100%' :`${minimizetablewidth}%`),display: width > 575 && !minimizetable ? 'block':'none',height:'100%'}}>
                    <LeadsTable collapsed={collapsed} handleTableWidthChange={handleTableWidthChange} minimizetablewidth={minimizetablewidth} handleMinimizeTableChange={handleMinimizeTableChange} minimizetable={minimizetable} handleMinimizeCardDetailsChange={handleMinimizeCardDetailsChange} minimizeCardDetails={minimizeCardDetails} />
                </div> 
                <div className="LeadRightSectionDivs" style={{width:minimizetable?'100%': (minimizeCardDetails? '0%' : `${100-minimizetablewidth}%`),display:width > 575 && !minimizeCardDetails ? 'block':'none',minHeight:'100%',background: "rgb(244, 245, 247)"}}>
                  <div style={{width:'100%', margin:'4px 0 10px 0',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                          {
                        minimizetable ?(
                            <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
                                <div style={{cursor:'pointer',marginTop:'10px',marginLeft:'10px',fontWeight:'500'}} onClick={handleMinimizeTableChange}>Maximize Table</div>
                            </div>
                        ):(<div></div>) 
                    }
                    <LeadDateComp />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',minHeight: height >= 772 ? '94%': 'calc(-14px + 95%)'}}>
                      <LeadsCard handleMinimizeCountViewChanges={handleMinimizeCountViewChanges} minimizecountview={minimizecountview} />
                      <LeadDetailsCard handleMinimizeCountViewChanges={handleMinimizeCountViewChanges} minimizetable={minimizetable} minimizecountview={minimizecountview} />
                    </div>    
                </div>
            </div>
        </div>
        </Suspense>
        </Spin>
    )
}

const mapStateToProps = (state) => ({
  authenticated:state.auth.authenticated,
  loading: state.leads.loading
});


export default connect(mapStateToProps, {})(Leads);
