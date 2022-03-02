import React, {useEffect, useState} from 'react'
import {Popover, Button, Card, Select,AutoComplete, Drawer, DatePicker, Typography } from 'antd';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import {MdClose} from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import {handleleadfilterdata} from '../../../../store/actions/lead';
import moment from 'moment-timezone';

// import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

import './Filter.css';

import { connect } from "react-redux";
import PropTypes from "prop-types";

const {Option} = Select;
const { Text } = Typography;
const { RangePicker } = DatePicker;

function Filter({handleleadfilterdata, leadfilter, leads, attorneys, attorney }) {

    // const [filteroptions, setfilteroptions] = useState({selectedchannel: [], selectedAttorney: [], selectedCaseTypes: [], selectedLeadName: [], selectedLeadEmail: [], selectedLeadContact: [], selectLeadLocation: [], selectedfromdate: '', selectedtodate: ''})
    // const [filtervalue, setfiltervalue] = useState({channel:'', Attorney:'', CaseTypes:[], LeadName:'', LeadEmail:'', LeadContact:'', LeadLocation:''});
    const [displayfilter, setdisplayfilter] = useState(false);
    const [edittableclicked, setedittableclicked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // const [attorney, setAttorney] = useState('');
    const [location, setLocation] = useState('');
    const [caseTypes, setCaseTypes] = useState([]);
    const [channel, setChannel] = useState('');
    const [leadName, setLeadName] = useState('');
    const [leadEmail, setLeadEmail] = useState('');
    const [leadContact, setLeadContact] = useState('')

    // const [open, setOpen] = useState(true);
	// const [dateRange, setDateRange] = useState();
    // useEffect(() => {
    //     console.log('Mobile Filter:',leadfilter)
    // },[])

   


    // useEffect(() => {
    //     // console.log("leads filter table leads------------------"); 
       
    //     if(leads.allleads){
    //         let selectedchannel= [],
    //         selectedAttorney= [],
    //         selectedCaseTypes= [],
    //         selectedLeadName= [],
    //         selectedLeadEmail= [],
    //         selectedLeadContact= [],
    //         selectLeadLocation= [],
    //         selectedfromdate= [],
    //         selectedtodate= [];
    //         leads.allleads.map(item=>{
    //             if(leads.selected_lead_type ===""){
    //                 if(item.channel !== null && item.channel !== "" &&  selectedchannel.indexOf(item.channel) === -1){
    //                     selectedchannel.push(item.channel);
    //                 }
    //                 if(item.lead_name !== null &&  item.lead_name !== "" && selectedLeadName.map(item=> item.value).indexOf(item.lead_name) === -1){
    //                     selectedLeadName.push({value: item.lead_name});
    //                 }
    //                 if(item.lead_email !== null && item.lead_email !== "" && selectedLeadEmail.map(item=> item.value).indexOf(item.lead_email) === -1){
    //                     selectedLeadEmail.push({value: item.lead_email});
    //                 }
    //                 if(item.lead_contact !== null && item.lead_contact !== "" && selectedLeadContact.map(item=> item.value).indexOf(item.lead_contact) === -1){
    //                     selectedLeadContact.push({value: item.lead_contact});
    //                 }
    //                 if(item.lead_case_type !== null && item.lead_case_type !== "" && selectedCaseTypes.indexOf(item.lead_case_type) === -1){
    //                     selectedCaseTypes.push(item.lead_case_type);
    //                 }
    //                 if(item.lead_location !== null && item.lead_location !== "" && selectLeadLocation.map(item=> item.value).indexOf(item.lead_location) === -1 ){ //selectLeadLocation.map(item=> item.value).filter((value, index, self) => self.indexOf(value) === index)
    //                     selectLeadLocation.push({value: item.lead_location});
    //                 }
    //             }
 
    //             if(leads.selected_lead_type !=="" ){
    //                 if(item.channel !== null && item.channel !== "" && leads.selected_lead_type === item.lead_status_value &&  selectedchannel.indexOf(item.channel) === -1){
    //                     selectedchannel.push(item.channel); 
    //                 }
    //                 if(item.lead_name !== null &&  item.lead_name !== "" && leads.selected_lead_type === item.lead_status_value && selectedLeadName.map(item=> item.value).indexOf(item.lead_name) === -1){
    //                     selectedLeadName.push({value: item.lead_name});
    //                 }
    //                 if(item.lead_email !== null && item.lead_email !== "" && leads.selected_lead_type === item.lead_status_value && selectedLeadEmail.map(item=> item.value).indexOf(item.lead_email) === -1){
    //                     selectedLeadEmail.push({value: item.lead_email});
    //                 }
    //                 if(item.lead_contact !== null && item.lead_contact !== "" && leads.selected_lead_type === item.lead_status_value && selectedLeadContact.map(item=> item.value).indexOf(item.lead_contact) === -1){
    //                     selectedLeadContact.push({value: item.lead_contact});
    //                 }
    //                 if(item.lead_case_type !== null && item.lead_case_type !== "" && leads.selected_lead_type === item.lead_status_value && selectedCaseTypes.indexOf(item.lead_case_type) === -1){
    //                     selectedCaseTypes.push(item.lead_case_type);
    //                 }
    //                 if(item.lead_location !== null && item.lead_location !== "" && leads.selected_lead_type === item.lead_status_value && selectLeadLocation.map(item=> item.value).indexOf(item.lead_location) === -1 ){ //selectLeadLocation.map(item=> item.value).filter((value, index, self) => self.indexOf(value) === index)
    //                     selectLeadLocation.push({value: item.lead_location});
    //                 }
    //             }
               
    //         })
    //         setfilteroptions({selectedchannel, selectedAttorney, selectedCaseTypes, selectedLeadName, selectedLeadEmail, selectedLeadContact, selectLeadLocation:selectLeadLocation, selectedfromdate: '', selectedtodate: ''})
    //         // console.log('selectedchannel ',selectedchannel, selectLeadLocation)
    //         selectedchannel= [],
    //         selectedAttorney= [],
    //         selectedCaseTypes= [],
    //         selectedLeadName= [],
    //         selectedLeadEmail= [],
    //         selectedLeadContact= [],
    //         selectLeadLocation= [],
    //         selectedfromdate= [],
    //         selectedtodate= [];
    //     }
    // }, [leads]);
    
    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
        setAttorney('');
        setLocation('');
        setCaseTypes([]);
        setChannel('');
        setLeadName('');
        setLeadEmail('');
        setLeadContact('');

        handleleadfilterdata(channel, attorney, caseTypes, leadName, leadEmail, leadContact, location, startDate, endDate)
        
    }

    const handleFilter = () => {
        handleleadfilterdata(channel, attorney, caseTypes, leadName, leadEmail, leadContact, location, startDate, endDate)
    }

    const handleLocationChange = (value) => {
        setLocation(value);
        
    }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

    const locations = [
        {
          value: 'Burns Bay Road',
        },
        {
          value: 'Downing Street',
        },
        {
          value: 'Wall Street',
        },
      ];

      const leademail = [
        {
          value: 'ramsyhock@accident.com',
        },
        {
          value: 'samtale@accident.com',
        },
        {
          value: 'aceportgus@accident.com',
        },
        {
            value: 'jonesz@accident.com',
        },
        {
            value: 'jassim@accident.com',
        },
        {
            value: 'rockjames@accident.com',
        },
        {
            value: 'tonystark@accident.com',
        },
      ];

      const leadcontace = [
        {
          value: '+(626)701-1444',
        },
        {
          value: '+(636)807-1154',
        },
        {
          value: '+(656)752-4586',
        },
        {
            value: '+(726)701-1544',
        },
        {
            value: '+(626)701-1151',
        },
        {
            value: '+(628)701-1844',
        },
        {
            value: '+(646)701-1353',
        },
      ];

      const leadname = [
        {
          value: 'Ramsy Hock',
        },
        {
          value: 'Sam Tale',
        },
        {
          value: 'Ace Portgus',
        },
        {
            value: 'Jones Z.',
        },
        {
            value: 'Jessi M.',
        },
        {
            value: 'Rock James',
        },
        {
            value: 'Tony Stark',
        },
      ];

    let casetypeoptions = [
        {
            id:1,
            value:'Construction'
        },
        {
            id:2,
            value:'PIA'
        },
        {
            id:3,
            value:'Real Estate'
        },
        {
            id:4,
            value:'House Repairs'
        },
        {
            id:5,
            value:'Auto Accident ES'
        },
        {

            value:'Personal Injury'
        },
        {
            id:8,
            value:'Sexual Assault'
        },
        {
            id:9,
            value:'Auto Accident'
        },
        {
            id:10,
            value:'Medical Malpractice'
        },
        {
            id:11,
            value:'Workers Compensation'
        },
        {
            id:12,
            value:'Wrongful Death'
        },
        {
            id:13,
            value:'Others'
        },
    ];


    let children = [];
    console.log('option ',casetypeoptions.length )
    for (let i = 0; i < casetypeoptions.length; i++) {
       
    children.push(<Option key={casetypeoptions[i].id} value={casetypeoptions[i].value}>{casetypeoptions[i].value}</Option>);
    
    }

    const handleCaseTypes = (value) => {
        // console.log(`selected ${value}`);
        setCaseTypes([...caseTypes, value])
    }

    const handleChannel = (value) => {
        // console.log(`selected ${value}`);
        setChannel(value)
    }
    
    const handleLeadName = (value) => {
        // console.log(`selected ${value}`);
        setLeadName(value)
    }

    const handleLeadEmail  = (value) => {
        // console.log(`selected ${value}`);
        setLeadEmail(value)
    }

    const handleLeadContact = (value) => {
        // console.log(`selected ${value}`);
        setLeadContact(value)
    }

    const handleChange = (value) => {
    console.log(`selected ${value}`);
    }

    const handleAttorney = (value) => {
        console.log('handle attorney:',value);
        setAttorney(value);
    }

    const onFilterBtn =() =>{
        setdisplayfilter(!displayfilter);
        setedittableclicked(false)
    }

    const onEditBtn =() =>{
        setdisplayfilter(false);
        setedittableclicked(!edittableclicked)
    }


    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);

    // const filterContent = (
        
    // );

    const dateContent = (
        <div style={{width:'100%'}}>
            <DateRangePicker
                style={{display:'flex', flexDirection:'column'}}
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="vertical"
            />
        </div>
    );

    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        if(value && value._d){
            setEndDate(moment(value[1]._d).tz('America/New_York'))
            setStartDate(moment(value[0]._d).tz('America/New_York'))
    }
        console.log('Formatted Selected Time: ', dateString);
      }
      
      function onOk(value) {
        console.log('onOk: ', value);
      }

      function AddCardHeader() {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BiArrowBack style={{ fontSize: 20 }} onClick={onClose} />
            <Text style={{ marginLeft: 10 }}>Filter</Text>
          </div>
        );
      }

    return (
        <div style={{display:'flex', justifyContent:'space-around', background:'white', width:'100%'}}>
            <div style={{display:'flex', width:'100%', margin:'5px', justifyContent:'flex-end'}}>
            <Button  style={{width:100, background:'white'}} onClick={showDrawer}>
                Filter
            </Button>
            </div>

            <Drawer
                title={<AddCardHeader/>}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width='100%'
            >
                {/* <div onClick={onClose} style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                    <MdClose/>
                </div> */}

               {/* <Card style={{width:'80%',marginTop:'7px'}}> */}
                        {/* <div className="FilterSearchBtn">Filter</div> */}
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',width:'100%'}}>
                            <div style={{width:'100%',margin:'5px'}}>
                            <Text style={{marginBottom:10}}>Date</Text>
                            <RangePicker
                                style={{width:'100%', marginTop:10, marginBottom:10}}
                                //   showTime={{ format: 'HH:mm' }}
                                format="MM-DD-YYYY"
                                // value={leadfilter.fromdate, leadfilter.todate}
                                value={startDate, endDate}
                                onChange={onChange}
                                onOk={onOk}
                            />

                            {/* <input 
                                type="date" 
                                name="date" 
                                // placeholder="from"
                                placeholder="MM/DD/YYYY"
                            />

                            <input 
                                type="date" 
                                name="date" 
                                placeholder="MM/DD/YYYY"
                                // placeholder="to"
                            /> */}
                            
                            {/* <DateRangePicker

			                    open={open}
			                    onChange={range => setDateRange(range)}
		                    /> */}

                                <div className="filterOptionHeaderName">Attorney</div>
                                {/* <Select style={{ width: '100%' }} 
                                    value={attorney}
                                    showSearch size='middle' placeholder="Select Attorney" onChange={handleAttorney}>
                                   
                                    <Option key={'1'} value={'John F. Diaz'}>{'John F. Diaz'}</Option>
                                    <Option key={'2'} value={'Law Martins'}>{'Law Martins'}</Option>
                                    <Option key={'3'} value={'Rock James'}>{'Rock James'}</Option>
                                    <Option key={'4'} value={'Chass Dias'}>{'Chass Dias'}</Option>
                                    <Option key={'5'} value={'Sisui Hatake'}>{'Sisui Hatake'}</Option>
                                    <Option key={'6'} value={'Shames Shaw'}>{'Shames Shaw'}</Option>
                                    <Option key={'7'} value={'Neon Blake'}>{'Neon Blake'}</Option>
                                    <Option key={'8'} value={'Robbin Diaz'}>{'Robbin Diaz'}</Option>
                                    <Option key={'9'} value={'James D.'}>{'James D.'}</Option>
                                    <Option key={'10'} value={'John Doe'}>{'John Doe'}</Option>
                                </Select> */}
                                 <AutoComplete
                                    style={{
                                    width: '100%',
                                    }}
                                    options={attorney && attorney.length > 0 ? attorney : ''}
                                    placeholder="Select Attorney"
                                    // placeholder={filtervalue.LeadName === '' && leadfilter.lead_filter.LeadName !== ''? leadfilter.lead_filter.LeadName : 'Enter Name'}
                                    allowClear
                                    // onClear={()=>handleLeadNameChange('')}
                                    // defaultValue={leadfilter.lead_filter.LeadName}
                                    // value={filtervalue.LeadName} 
                                    // onChange={handleLeadNameOnChange}
                                    // onSelect={handleLeadNameChange}
                                    filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </div>
                            
                            <div style={{ width:'100%',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Location</div>
                                <AutoComplete
                                size='middle'
                                // value={leadfilter.LeadLocation}
                                value={location}
                                style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    width: '100%',
                                }}
                                showDrawer
                                allowClear
                                onClear={()=> handleLocationChange('')}
                                onChange={handleLocationChange}
                                options={locations}
                                placeholder="location"
                                filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',width:'100%'}}>
                            <div style={{ width:'100%',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Case Types</div>
                                <Select
                                    size='middle'
                                    mode="multiple"
                                    // value={leadfilter.CaseTypes}
                                    value={caseTypes}
                                    showSearch
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={[]}
                                    onClear={()=> setCaseTypes([])}
                                    onChange={handleCaseTypes}
                                    >{children}
                                </Select>
                            </div>
                            <div style={{width:'100%',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Channel</div>
                                <Select 
                                    style={{ width: '100%' }} 
                                    size={'middle'} 
                                    placeholder="Select a Channel"
                                    // value={leadfilter.channel}
                                    value={channel}
                                    showSearch 
                                    allowClear
                                    onClear={()=> setChannel('')} 
                                    placeholder="Select One" 
                                    onChange={handleChannel}
                                >
                                    <Option key={'1'} value={'Google'}>{'Google'}</Option>
                                    <Option key={'2'} value={'Facebook'}>{'Facebook'}</Option>
                                    <Option key={'3'} value={'Bing'}>{'Bing'}</Option>
                                </Select>
                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',width:'100%'}}>
                            <div style={{ width:'100%',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Lead Name</div>
                                <AutoComplete
                                // value={leadfilter.LeadName}
                                value={leadName}
                                size='middle'
                                style={{
                                width: '100%',
                                }}
                                options={leadname}
                                allowClear
                                showSearch
                                onClear={()=> setLeadName('')}
                                onChange={handleLeadName}
                                placeholder="Enter Name"
                                filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                            </div>
                            <div style={{width:'100%',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Lead Email</div>
                                <AutoComplete
                                size='middle'
                                // value={leadfilter.LeadEmail}
                                value={leadEmail}
                                style={{
                                width: '100%',
                                }}
                                showSearch
                                allowClear
                                onClear={()=> setLeadEmail('')}
                                onChange={handleLeadEmail}
                                options={leademail}
                                placeholder="Enter Email"
                                filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                            </div>
                            <div style={{ width:'100%',margin:'5px', marginBottom:10}}>
                                <div className="filterOptionHeaderName">Lead Contact</div>
                                <AutoComplete
                                size='middle'
                                // value={leadfilter.LeadContact}
                                value={leadContact}
                                style={{
                                width: '100%',
                                }}
                                showSearch
                                allowClear
                                onClear={()=> setLeadContanct('')}
                                onChange={handleLeadContact}
                                options={leadcontace}
                                placeholder="Lead Contact"
                                filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />

                           
                            </div>
                            <div style={{display:'flex', width:'100%', marginTop:20, justifyContent:'space-around'}}>
                                <Button style={{width:'45%'}} onClick={handleClearFilters}>Clear All</Button>
                                <Button style={{width:'45%'}} onClick={handleFilter}>Filter</Button>
                            </div>
                          
                        </div>
                    {/* </Card> */}
            </Drawer>
     
            {/* <Button type="primary" onClick={showDrawer}>
                Select Date
            </Button>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer> */}
        </div>
    )
}

Filter.propTypes = {
    handleleadfilterdata: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    leadfilter: state.leadfilter.lead_filter,
    leads: state.leads,
    attorneys: state.customer.attorneys
});

export default connect(mapStateToProps, { handleleadfilterdata})(Filter)
