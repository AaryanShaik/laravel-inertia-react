import React, {useState,useEffect} from 'react';
import { PageHeader, Card, Modal, Button, Tooltip, Popover } from 'antd';
import { Calendar,DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import {handleleadfilterdata} from '../../store/actions/lead';
import momentTimezone from 'moment-timezone';
import moment from 'moment'

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const LeadDateComp = ({handleleadfilterdata,leadfilter}) => {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);
      const [toggle, settoggle] = useState(true)
      
      const [selecteddate, setselecteddate] = useState('');

      useEffect(() => {
        settoggle(!toggle);
      }, [selecteddate])

      const onDateChange = (item) =>{
        console.log('selected date ',item)
          console.log(item.selection.endDate === item.selection.startDate, new Date(item.selection.endDate).toLocaleDateString() === new Date(item.selection.startDate).toLocaleDateString(), new Date(item.selection.endDate).toLocaleDateString())
          // if(new Date(item.selection.endDate).toLocaleDateString() === new Date(item.selection.startDate).toLocaleDateString()){
          //     console.log("same day", new Date(item.selection.endDate).toDateString());
          //     setselecteddate(new Date(item.selection.startDate).toLocaleDateString())
          // }
          // else{
          //     setselecteddate(`${new Date(item.selection.startDate).toLocaleDateString()} - ${new Date(item.selection.endDate).toLocaleDateString()}`)
          // }
          setselecteddate(`${moment(leadfilter.lead_filter.todate).tz("America/New_York").format('MM/DD/YYYY')} - ${moment(leadfilter.lead_filter.todate).tz("America/New_York").format('MM/DD/YYYY')}`)  //moment(leadfilter.lead_filter.todate).format('MM-DD-YYYY HH:mm:ss')
          // setselecteddate(`${new Date(item.selection.startDate).toLocaleDateString()} - ${new Date(item.selection.endDate).toLocaleDateString()}`)  //moment(leadfilter.lead_filter.todate).format('MM-DD-YYYY HH:mm:ss')
          // handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, new Date(item.selection.startDate), new Date(item.selection.endDate))//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
          handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, moment(item.selection.startDate).tz("America/New_York").hours(0).minutes(0).seconds(0).toString(), moment(item.selection.endDate).tz("America/New_York").hours(23).minutes(59).seconds(59).toString())//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate        
          // handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, moment(item.selection.startDate).tz("America/New_York").hours(0).minutes(0).seconds(0).format(), moment(item.selection.endDate).tz("America/New_York").hours(23).minutes(59).seconds(59).format())//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate        
          // console.log(item);
          //'Asia/Calcutta'
          setState([item.selection]);
          // handleOk()
      }

      const onClearDate = () =>{
        setselecteddate('')
        handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, '', '')//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
      }


    return (
        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
             <Popover placement="leftTop" content={()=>(
                <div style={{display:'flex',flexDirection:'column'}}>
                <DateRangePicker
                    onChange={item => onDateChange(item)}
                    className="PreviewArea"
                    // ranges={{
                    //     'Last Hour':[moment().subtract(1, 'hours') , moment()],
                    //     Today: [moment(), moment()],
                    //     'Yesterday':[moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    //     'Last 7 Days': [moment().subtract(7, 'days'), moment()],
                    //     'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                    //   }}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={state}
                    direction="horizontal"
                    />
                    <Button onClick={()=>onClearDate()}>Clear Date</Button>
                    </div>
                    )} trigger="click">
                    
                <Button 
                    // onClick={showModal} 
                    style={{color:'black',background:'rgb(244, 245, 247)',outline:'hidden',marginRight:'20px'}}>
                    {selecteddate?selecteddate:'Select Date'}
                </Button>
            </Popover>
        </div>
    )
}

LeadDateComp.propTypes = {
    handleleadfilterdata: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    leads: state.leads,
    leadfilter: state.leadfilter,
});


export default connect(mapStateToProps, {handleleadfilterdata})(LeadDateComp);
