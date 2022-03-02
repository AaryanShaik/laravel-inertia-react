import React, { useState, useEffect } from 'react';
import {Card, Modal, Button} from 'antd';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar,DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import './LeadCard.css';
import { ItemWraper, ButtonGroup } from '../LeadCardStyle';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

import {handletosetleadtype,handleleadfilterdata} from '../../../store/actions/lead';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const LeadsCard = ({authenticated,handleMinimizeCountViewChanges,minimizecountview, leads, allleads, leadfilter, handletosetleadtype, handleleadfilterdata}) =>{
 
 
    const [selectedleadtype, setselectedleadtype] = useState('');
    const [leadlength, setleadlength] = useState({AllLeads:[],Assigned: [],New: [],Purchased: [],Disputed: [],Refunded: [],Archived: []});
    const [leadstatus, setleadstatus] = useState('')
    const [currentday, setcurrentday] = useState('Custom Range')


    //   useEffect(() => {
    //     handleleadfilterdata('','',[],'','','','','','')
    //   }, [])

    useEffect(() => {
        if(leads.allleads){
        // console.log('leads.allleads[-1] ',leads.allleads[-1]);
        let AllLeads = [],Assignedlead = [],Newlead= [],Purchasedlead= [],Disputedlead= [],Refundedlead= [],Archivedlead= [];
        // lead.lead_status_value = lead_status_value_obj[lead_status];

        leads.allleads.map(lead=>{
            if(lead.lead_status_value === "Assigned"){
                Assignedlead.push(lead);
            }
            if(lead.lead_status_value === "New"){
                Newlead.push(lead);
            }
            if(lead.lead_status_value === "Purchased"){
                Purchasedlead.push(lead);
            }
            if(lead.lead_status_value === "Disputed"){
                Disputedlead.push(lead);
            }
            if(lead.lead_status_value === "Refunded"){
                Refundedlead.push(lead);
            }
            if(lead.lead_status_value === "Archived"){
                Archivedlead.push(lead);
            }
            AllLeads.push(lead)
        })

        // console.log('Assignedlead ',Assignedlead)
        setleadlength({AllLeads: AllLeads, Assigned: Assignedlead, New: Newlead, Purchased: Purchasedlead, Disputed: Disputedlead, Refunded: Refundedlead, Archived: Archivedlead });
            if(leadstatus !== leads.selected_lead_type){
                // console.log('not equal');
                setleadstatus(leads.selected_lead_type);
                updatefilter();
            }
        }
    }, [allleads])  //leads ->> allleads

    useEffect(() => {
        if(leadfilter){  //&& leadfilter.lead_filter.fromdate  && leadfilter.lead_filter.todate 
            var hours = Math.ceil(Math.abs((new Date(leadfilter.lead_filter.todate)) - (new Date(leadfilter.lead_filter.fromdate))) / 36e5);
            let currentDate = new Date();

            if(new Date(moment()._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.fromdate).toLocaleDateString())  && new Date(moment()._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.todate).toLocaleDateString())){
                // new Date('Sat Sep 25 2021 19:01:50 GMT+0530').toLocaleDateString()
                setcurrentday("Today");
            }


            else if(new Date(moment().subtract(1, 'days')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.fromdate).toLocaleDateString())  && new Date(moment().subtract(1, 'days')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.todate).toLocaleDateString())){
                // new Date('Sat Sep 25 2021 19:01:50 GMT+0530').toLocaleDateString()
                setcurrentday("Yesterday");
            }

            else if(new Date(moment().day("Sunday").subtract(7, 'days')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.fromdate).toLocaleDateString())  && new Date(moment().day("Saturday").subtract(7, 'days')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.todate).toLocaleDateString())){
                // new Date('Sat Sep 25 2021 19:01:50 GMT+0530').toLocaleDateString()
                setcurrentday("Last Week");
            }

            else if(new Date(moment().day("Sunday")._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.fromdate).toLocaleDateString())  && new Date(moment().day("Saturday")._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.todate).toLocaleDateString())){
                // new Date('Sat Sep 25 2021 19:01:50 GMT+0530').toLocaleDateString()
                setcurrentday("This Week");
            }

            //moment().startOf('M').subtract(1,'M')._d
            else if(new Date(moment().subtract(1,'M').startOf('M')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.fromdate).toLocaleDateString())  && new Date(moment().subtract(1,'M').endOf('M')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.todate).toLocaleDateString())){
                // new Date('Sat Sep 25 2021 19:01:50 GMT+0530').toLocaleDateString()
                setcurrentday("Last Month");
            }
            
            //moment().startOf('M')._d, moment().endOf('M')._d
            else if(new Date(moment().startOf('M')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.fromdate).toLocaleDateString())  && new Date(moment().endOf('M')._d).toLocaleDateString() == (new Date(leadfilter.lead_filter.todate).toLocaleDateString())){
                // new Date('Sat Sep 25 2021 19:01:50 GMT+0530').toLocaleDateString()
                setcurrentday("This Month");
            }

            else if(leadfilter.lead_filter.fromdate === ""  && leadfilter.lead_filter.todate === ""){
                // new Date('Sat Sep 25 2021 19:01:50 GMT+0530').toLocaleDateString()
                setcurrentday("Custom Range");
            }
            
            else{
                setcurrentday("Custom Range");
            }
        }
        
    }, [leadfilter])

    useEffect(() => {
        if(leads.allleads){
            handletosetleadtype(selectedleadtype)
        }
    }, [selectedleadtype])

    const updatefilter = () =>{
        handleleadfilterdata('','',[],'','','','','','');
    }

    if(!authenticated){
        <Redirect to="/login"/>
    }

    console.log('currentday ',currentday)
    return (
        <Card style={{width:'99%',marginBottom: '10px',minHeight: minimizecountview ? '0vh':'28vh', display:minimizecountview?'none':'block'}}>
            <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                <div style={{display:'flex',flexDirection:'row', alignItems:'center' ,width:'100%'}}>
                    <div style={{fontSize:'30px',fontWeight:'bold',color:'#999'}}>{currentday}</div>
                </div>  
                <div>
                    {
                        minimizecountview ? (<div></div>): (<Button size={'small'} onClick={handleMinimizeCountViewChanges}>Hide View</Button>)
                    }
                </div>
            </div>
            <div style={{width:'100%', marginTop:'5px',display:'flex',flexDirection:'row',justifyContent:'space-around', flexWrap:'wrap'}}>
                <div onClick={()=>setselectedleadtype('')} style={{padding:'5px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:'1px solid rgba(0, 0, 0, 0.45)',margin:'10px',width:'100px',height:'100px',cursor:'pointer',boxShadow: (selectedleadtype==''?'4px 4px 8px #ccc': 'none'), top: (selectedleadtype==''? '-15px': '0') }}>
                    {/* <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{(leads.allleads && leads.allleads.length) || '-'}</div>  */}
                    <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{leadlength.AllLeads.length > 0 ? leadlength.AllLeads.length : '-'}</div>
                    <div style={{fontSize:'18px',fontWeight:'bold',color:'#999'}}>All</div>               
                </div>
                <div onClick={()=>setselectedleadtype('New')} style={{padding:'5px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:'1px solid rgba(0, 0, 0, 0.45)',margin:'10px',width:'100px',height:'100px',cursor:'pointer',boxShadow: (selectedleadtype=='New'?'4px 4px 8px #ccc': 'none'), top: (selectedleadtype=='New'? '-15px': '0')}}>
                    {/* <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{(leads && leads.New.length) || '-'}</div> */}
                    <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{leadlength.New.length > 0 ? leadlength.New.length : '-'}</div>
                    <div style={{fontSize:'18px',fontWeight:'bold',color:'#999'}}>New</div>               
                </div>
                <div onClick={()=>setselectedleadtype('Disputed')} style={{padding:'5px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:'1px solid rgba(0, 0, 0, 0.45)',margin:'10px',cursor:'pointer',boxShadow: (selectedleadtype=='Disputed'?'4px 4px 8px #ccc': 'none'), top: (selectedleadtype=='Disputed'? '-15px': '0')}}>
                    {/* <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{(leads && leads.Disputed.length) || '-'}</div> */}
                    <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{leadlength.Disputed.length > 0 ? leadlength.Disputed.length :  '-'}</div>
                    <div style={{fontSize:'18px',fontWeight:'bold',color:'#999'}}>Disputed</div>                 
                </div>
                <div onClick={()=>setselectedleadtype('Refunded')} style={{padding:'5px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:'1px solid rgba(0, 0, 0, 0.45)',margin:'10px',cursor:'pointer',boxShadow: (selectedleadtype=='Refunded'?'4px 4px 8px #ccc': 'none'), top: (selectedleadtype=='Refunded'? '-15px': '0')}}>
                    {/* <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{(leads && leads.Refunded.length) || '-'}</div> */}
                    <div style={{fontSize:'30px',fontWeight:'bold',color:'rgba(0, 0, 0, 0.45)'}}>{leadlength.Refunded.length > 0 ? leadlength.Refunded.length :  '-'}</div>
                    <div style={{fontSize:'18px',fontWeight:'bold',color:'#999'}}>Refunded</div> 
                </div>
            </div> 
           
        </Card>
    )
}

LeadsCard.propTypes = {
    handletosetleadtype: PropTypes.func.isRequired,
    handleleadfilterdata: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    authenticated:state.auth.authenticated,
    leads: state.leads,
    leadfilter: state.leadfilter,
    allleads: state.leads.allleads
});


export default connect(mapStateToProps, {handletosetleadtype,handleleadfilterdata})(LeadsCard);
