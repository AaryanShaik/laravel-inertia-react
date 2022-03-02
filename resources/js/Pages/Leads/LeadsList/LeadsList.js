import React, {useEffect, useState} from 'react';
import {Typography} from 'antd';
import {AiFillGoogleCircle} from 'react-icons/ai';
import {RiDeleteBinLine} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi';
import './LeadList.css';
import { Link } from 'react-router-dom';
import {handleLeadData} from '../../../store/actions/leadDetails';
import {handletosetleadDetails,getLeadAnalyticsData} from '../../../store/actions/lead';
import {handlegetallmobileleads} from '../../../store/actions/lead';
import {getAllAttorneys} from '../../../store/actions/lead';
import Filter from './Filter/Filter';
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote } from '@ionic/react';
import InfiniteScroll from "react-infinite-scroll-component";
import {LoadingOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';

import { connect } from "react-redux";
import PropTypes from "prop-types";

const {Title, Text} = Typography;

function LeadsList({handleLeadData,handletosetleadDetails,getLeadAnalyticsData,config_test_mode, attorneys, getAllAttorneys, handlegetallmobileleads, mobileLeads, hasmoredata}) {
    const [attorney, setAttorney] = useState('');
    const [leads, setLeads] = useState([]);
    
    // useEffect(()=>{
    //     console.log('config useEffect')
    //     setLeads([]);
    // },[config_test_mode])
    
    useEffect( async ()=>{
        setLeads([]);
        console.log('leadslist:',mobileLeads)
        await handlegetallmobileleads(0, config_test_mode);
        setLeads(mobileLeads);
    },[config_test_mode])

    useEffect( async ()=>{ 
        await getAllAttorneys();
       
    },[]);

    useEffect(()=>{
        console.log('Attorneys:',attorneys)
    },[attorneys])

    useEffect(()=>{

        let attorneyNames = [];

        if(attorneys && attorneys.length > 0){
        attorneys.map((item) => {
            if(item.attorney_name != "" && item.attorney_name != null && attorneyNames.map(item=> item.value).indexOf(item.attorney_name) === -1){
                let temp = item.attorney_name    
                attorneyNames.push({value:temp});
            } 
        })
    }
        console.log('Attorney a=name:', attorneyNames);
        setAttorney(attorneyNames);
        attorneyNames = [];
    },[attorneys])

   
    // const [hasMoreData, setHasMoreData] = useState(false);


    const sources = [
        'Google',
        'Instagram'
    ];

    const handleLeadCard = async (lead) => {
        // e.preventdefault();
        console.log('lead from leadList', lead);
        await handleLeadData(lead);
    }


    // const fetchData = () => {
    //     setTimeout(() => {
    //         setTempData(tempData.concat(Array.from({ length: 20 })));
    //     },5000)
      
    // }

    const fetchMoreData = async () => {
        console.log('inside fetch more');
        console.log('mobileLeads length', leads.length);
        await handlegetallmobileleads(leads.length, config_test_mode);
       console.log('handle lead function complete');
        setLeads([...leads, ...mobileLeads]);
        // if (items.length >= 50) {
        //   setHasMoreData(false);
        //   return;
        // }
        
        // a fake async api call like which sends
        // 20 more records in .5 secs
        // let newItems = [
        //     {id:items.length + 1}
        // ]
        // setTimeout(() => {
        //   setItems([...items, newItems]);
        // }, 500);
      };

      const handleTestId = (id) => {
          console.log('handleTestId', id);
      }

    
    return (
        <div style={{width:'100%'}}>
            <Filter attorney={attorney}/>
            <InfiniteScroll
                dataLength={leads && leads.length}
                next={fetchMoreData}
                hasMore={true}
                endMessage={<Text>Last Lead Reached</Text>}
                loader={<div ><LoadingOutlined style={{fontSize:30, marginLeft:'44%', marginTop:15, marginBottom:15}}/></div>}
                >
            <IonList style={{innerWidth:'100%', outerHeight:'100%'}}>

            {/*  */}
            { leads && leads.map((lead) => 
            
            <IonItemSliding  id={lead && lead.lead_id} >
                <IonItem onClick={()=> {
                    handletosetleadDetails(lead.lead_id);
                    getLeadAnalyticsData(lead.lead_id); 
                    handleTestId(lead.lead_id);}}  style={{outerwidth:'100%', innerwidth:'100%',  borderLeft:lead && lead.lead_status == 11 ? '5px solid #00E676' : '5px solid #00B0FF'}}>
                <Link to={`/lead-list/${lead && String(lead.lead_id)}`} style={{width:'100%'}}>
                {/* <Link to={'/leaddetails/'+ lead && lead.lead_name + '?id=' + lead && lead.lead_id } style={{width:'100%'}}> */}
                    <IonLabel style={{innerWidth:'100%', outerWidth:'100%'}}>
                    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <Text className="leadListTitle" style={{fontSize:'15px'}} strong type='secondary'>{lead && lead.lead_name}</Text>
                        <Text className="leadListArrivalTime" style={{fontSize:'14px'}} type='secondary'>{moment(lead && lead.created_at).format("MM/DD/YY HH:mm:ss")}</Text>
                    </div>
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                                                       
                        <Text className="leadListCaseType" style={{fontSize:'14px'}} type='secondary'>{lead.lead_case_type}</Text>
                                
                                <Text style={{fontSize:'14px'}} type='secondary'>{lead && lead.lead_location}</Text>
                          
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <div style={{marginRight:3}}>
                                    <Text><AiFillGoogleCircle/></Text>
                                </div>
                        </div>
                    </IonLabel>

                    {/* <IonNote slot="end">
                        <Text className="leadListArrivalTime" style={{fontSize:'12px'}} type='secondary'>{lead && lead.created_at}</Text>
                    </IonNote> */}
                    </Link>
                </IonItem>

                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)'}}>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}} >
                        <RiDeleteBinLine style={{color:'#ff4d4f', fontSize:25}}/>
                    </IonItemOption>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                        <FiEdit style={{color:'#191970', fontSize:25}}/>
                    </IonItemOption>
                </IonItemOptions>
                </IonItemSliding>
            )}
            

            </IonList>

</InfiniteScroll>
            {/* <InfiniteScroll
                dataLength={tempData.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >
                {tempData.map((item, index)=> {
                    return(
                    <p  key={index}>{index}</p>
                    )
                })}    
            </InfiniteScroll> */}
            

        </div>
    )
}

LeadsList.propTypes = {
    handleLeadData: PropTypes.func.isRequired,
    handlegetallmobileleads:PropTypes.func.isRequired,
    // handletosetleadtype: PropTypes.func.isRequired,
    handletosetleadDetails: PropTypes.func.isRequired,
    getLeadAnalyticsData: PropTypes.func.isRequired,
    getAllAttorneys: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    mobileLeads: state.leads.mobileLeads,
    hasmoredata: state.leads.hasmoredata,
    config_test_mode : state.config.config_test_mode,
    attorneys: state.leads.attorneys
});

export default connect(mapStateToProps, {handleLeadData, getAllAttorneys, handletosetleadDetails,getLeadAnalyticsData, handlegetallmobileleads})(LeadsList);
