import React, { useState, useEffect } from 'react';
import { Card, Select, AutoComplete, Popover, Button, Slider, Tooltip, Tag } from 'antd';
import './FilterTable.css';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { FilterOutlined, ControlOutlined } from '@ant-design/icons';
import EditColumns from '../EditColumns/EditColumns';

import { handleleadfilterdata } from '../../../../store/actions/lead';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const { Option } = Select;

const FilterTable = ({ selectedcolumnnames, allcolumns, setEditedColms, handleTableWidthChange, minimizetablewidth, handleMinimizeTableChange, minimizetable, handleMinimizeCardDetailsChange, minimizeCardDetails, leads, allattorneys, leadfilter, handleleadfilterdata }) => {
    const [displayfilter, setdisplayfilter] = useState(false);
    const [edittableclicked, setedittableclicked] = useState(false);
    const [filteroptions, setfilteroptions] = useState({ selectedchannel: [], selectedAttorney: [], selectedCaseTypes: [], selectedLeadName: [], selectedLeadEmail: [], selectedLeadContact: [], selectLeadLocation: [], selectedfromdate: '', selectedtodate: '' })
    const [filtervalue, setfiltervalue] = useState({ channel: '', Attorney: '', CaseTypes: [], LeadName: '', LeadEmail: '', LeadContact: '', LeadLocation: '' });
    const [selectedattorneyobj, setselectedattorneyobj] = useState({});
    const [filtercount, setfiltercount] = useState(0)

    useEffect(() => {
        handleleadfilterdata('', {}, [], '', '', '', '', '', '')//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
    }, [])

    useEffect(() => {
        // console.log("leads filter table leads------------------"); 

        if (leads.allleads) {
            let selectedchannel = [],
                selectedCaseTypes = [],
                selectedLeadName = [],
                selectedLeadEmail = [],
                selectedLeadContact = [],
                selectLeadLocation = [],
                selectedfromdate = [],
                selectedtodate = [];
            leads.allleads.map(item => {
                if (leads.selected_lead_type === "") {
                    if (item.channel !== null && item.channel !== "" && selectedchannel.indexOf(item.channel) === -1) {
                        selectedchannel.push(item.channel);
                    }
                    if (item.lead_name !== null && item.lead_name !== "" && selectedLeadName.map(item => item.value).indexOf(item.lead_name) === -1) {
                        selectedLeadName.push({ value: item.lead_name });
                    }
                    if (item.lead_email !== null && item.lead_email !== "" && selectedLeadEmail.map(item => item.value).indexOf(item.lead_email) === -1) {
                        selectedLeadEmail.push({ value: item.lead_email });
                    }
                    if (item.lead_contact !== null && item.lead_contact !== "" && selectedLeadContact.map(item => item.value).indexOf(item.lead_contact) === -1) {
                        selectedLeadContact.push({ value: item.lead_contact });
                    }
                    if (item.lead_case_type !== null && item.lead_case_type !== "" && selectedCaseTypes.indexOf(item.lead_case_type) === -1) {
                        selectedCaseTypes.push(item.lead_case_type);
                    }
                    if (item.lead_location !== null && item.lead_location !== "" && selectLeadLocation.map(item => item.value).indexOf(item.lead_location) === -1) { //selectLeadLocation.map(item=> item.value).filter((value, index, self) => self.indexOf(value) === index)
                        selectLeadLocation.push({ value: item.lead_location });
                    }
                }

                if (leads.selected_lead_type !== "") {
                    if (item.channel !== null && item.channel !== "" && leads.selected_lead_type === item.lead_status_value && selectedchannel.indexOf(item.channel) === -1) {
                        selectedchannel.push(item.channel);
                    }
                    if (item.lead_name !== null && item.lead_name !== "" && leads.selected_lead_type === item.lead_status_value && selectedLeadName.map(item => item.value).indexOf(item.lead_name) === -1) {
                        selectedLeadName.push({ value: item.lead_name });
                    }
                    if (item.lead_email !== null && item.lead_email !== "" && leads.selected_lead_type === item.lead_status_value && selectedLeadEmail.map(item => item.value).indexOf(item.lead_email) === -1) {
                        selectedLeadEmail.push({ value: item.lead_email });
                    }
                    if (item.lead_contact !== null && item.lead_contact !== "" && leads.selected_lead_type === item.lead_status_value && selectedLeadContact.map(item => item.value).indexOf(item.lead_contact) === -1) {
                        selectedLeadContact.push({ value: item.lead_contact });
                    }
                    if (item.lead_case_type !== null && item.lead_case_type !== "" && leads.selected_lead_type === item.lead_status_value && selectedCaseTypes.indexOf(item.lead_case_type) === -1) {
                        selectedCaseTypes.push(item.lead_case_type);
                    }
                    if (item.lead_location !== null && item.lead_location !== "" && leads.selected_lead_type === item.lead_status_value && selectLeadLocation.map(item => item.value).indexOf(item.lead_location) === -1) { //selectLeadLocation.map(item=> item.value).filter((value, index, self) => self.indexOf(value) === index)
                        selectLeadLocation.push({ value: item.lead_location });
                    }
                }

            })
            setfilteroptions({ ...filteroptions, selectedchannel, selectedCaseTypes, selectedLeadName, selectedLeadEmail, selectedLeadContact, selectLeadLocation: selectLeadLocation, selectedfromdate: '', selectedtodate: '' })

            selectedchannel = [],
                selectedCaseTypes = [],
                selectedLeadName = [],
                selectedLeadEmail = [],
                selectedLeadContact = [],
                selectLeadLocation = [],
                selectedfromdate = [],
                selectedtodate = [];
        }
    }, [leads]);


    useEffect(() => {
        if (allattorneys && allattorneys.length > 0) {
            let selectedAttorney = [];
            allattorneys.map(att => {
                att.value = att.attorney_name;
                att.key = att.attorney_id;
                selectedAttorney.push(att);
            })
            setfilteroptions({ ...filteroptions, selectedAttorney });
        }
    }, [allattorneys])

    useEffect(() => {
        if (leadfilter && leadfilter.lead_filter) {
            let count = 0;
            if (Object.keys(leadfilter.lead_filter.Attorney).length !== 0) {  //Object.keys(leadfilter.lead_filter.Attorney).length === 0
                count = count + 1;
            }
            if (leadfilter.lead_filter.channel !== '' && leadfilter.lead_filter.channel !== undefined) {
                count = count + 1;
            }
            if (leadfilter.lead_filter.LeadName !== '') {
                count = count + 1;
            }
            if (leadfilter.lead_filter.LeadEmail !== '') {
                count = count + 1;
            }
            if (leadfilter.lead_filter.LeadContact !== '') {
                count = count + 1;
            }
            if (leadfilter.lead_filter.LeadLocation !== '') {
                count = count + 1;
            }
            if (leadfilter.lead_filter.CaseTypes.length > 0) {
                count = count + 1;
            }
            setfiltercount(count);
        }

    }, [leadfilter])

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
            id: 1,
            value: 'Construction'
        },
        {
            id: 2,
            value: 'PIA'
        },
        {
            id: 3,
            value: 'Real Estate'
        },
        {
            id: 4,
            value: 'House Repairs'
        },
        {
            id: 5,
            value: 'Auto Accident ES'
        },
        {
            id: 6,
            value: 'Mortgage Finance'
        },
        {
            id: 7,
            value: 'Personal Injury'
        },
        {
            id: 8,
            value: 'Sexual Assault'
        },
        {
            id: 9,
            value: 'Auto Accident'
        },
        {
            id: 10,
            value: 'Medical Malpractice'
        },
        {
            id: 11,
            value: 'Workers Compensation'
        },
        {
            id: 12,
            value: 'Wrongful Death'
        },
        {
            id: 13,
            value: 'Others'
        },
    ];

    let children = [];
    for (let i = 0; i < casetypeoptions.length; i++) {

        children.push(<Option key={casetypeoptions[i].id} value={casetypeoptions[i].value}>{casetypeoptions[i].value}</Option>);

    }

    //lead attorney
    const handleLeadAttorneyChange = (value, option) => {
        console.log(`selected ${value}`);
        //----
        handleleadfilterdata('', option, [], '', '', '', '', '', '');
        setselectedattorneyobj(option)
    }

    const handleLeadAttorneyOnChange = (value, option) => {
        console.log(value)
        setfiltervalue({ channel: '', Attorney: value, CaseTypes: [], LeadName: '', LeadEmail: '', LeadContact: '', LeadLocation: '' })
        setselectedattorneyobj(option)
    }

    //case type
    const handleCaseTypeChange = (value) => {
        console.log('value ', value)
        setfiltervalue({ ...filtervalue, CaseTypes: value })
        handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, value, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, leadfilter.lead_filter.fromdate, leadfilter.lead_filter.todate)//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
    }

    //channel
    const handleChannelChange = (value) => {
        console.log(`selected ${value}`);
        setfiltervalue({ ...filtervalue, channel: value })
        handleleadfilterdata(value, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, leadfilter.lead_filter.fromdate, leadfilter.lead_filter.todate)//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
    }

    const handleChannelonChange = (value) => {
        console.log(value)
        setfiltervalue({ ...filtervalue, channel: value })
    }

    //location
    const handleLocationChange = (value) => {
        console.log(`selected ${value}`);
        setfiltervalue({ ...filtervalue, LeadLocation: value })
        handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, value, leadfilter.lead_filter.fromdate, leadfilter.lead_filter.todate)//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
    }

    const handleLocationonChange = (value) => {
        console.log(value)
        setfiltervalue({ ...filtervalue, LeadLocation: value })
    }

    //lead name
    const handleLeadNameChange = (value) => {
        console.log(`selected ${value}`);
        handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, value, leadfilter.lead_filter.LeadEmail, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, leadfilter.lead_filter.fromdate, leadfilter.lead_filter.todate)//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
    }

    const handleLeadNameOnChange = (value) => {
        console.log(value)
        setfiltervalue({ ...filtervalue, LeadName: value })
    }

    //lead email
    const handleLeadEmailChange = (value) => {
        console.log(`selected ${value}`);
        handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, value, leadfilter.lead_filter.LeadContact, leadfilter.lead_filter.LeadLocation, leadfilter.lead_filter.fromdate, leadfilter.lead_filter.todate)//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
    }

    const handleLeadEmailOnChange = (value) => {
        console.log(value)
        setfiltervalue({ ...filtervalue, LeadEmail: value })
    }

    //lead contact
    const handleLeadContactChange = (value) => {
        console.log(`selected ${value}`);
        handleleadfilterdata(leadfilter.lead_filter.channel, leadfilter.lead_filter.Attorney, leadfilter.lead_filter.CaseTypes, leadfilter.lead_filter.LeadName, leadfilter.lead_filter.LeadEmail, value, leadfilter.lead_filter.LeadLocation, leadfilter.lead_filter.fromdate, leadfilter.lead_filter.todate)//channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate
    }

    const handleLeadContactOnChange = (value) => {
        console.log(value)
        setfiltervalue({ ...filtervalue, LeadContact: value });
    }

    const onFilterBtn = () => {
        setdisplayfilter(!displayfilter);
        setedittableclicked(false)
    }

    const onEditBtn = () => {
        setdisplayfilter(false);
        setedittableclicked(!edittableclicked)
    }

    const handleDecBy20 = () => {
        if (minimizetablewidth - 10 < 20) {
            return handleTableWidthChange(20)
        }
        else {
            handleTableWidthChange(minimizetablewidth - 10)
        }
    }

    const handleIncBy20 = () => {
        if (minimizetablewidth + 10 > 50) {
            return handleTableWidthChange(50)
        }
        else {
            handleTableWidthChange(minimizetablewidth + 10)
        }
    }

    const clearAllState = () => {
        try {
            setfiltervalue({ channel: '', Attorney: '', CaseTypes: [], LeadName: '', LeadEmail: '', LeadContact: '', LeadLocation: '' });
            handleleadfilterdata('', {}, [], '', '', '', '', '', '')
        } catch (err) {

        }
    }

    return (
        <div style={{ width: '100%', padding: '10px 0 8px 0' }}>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Popover placement="bottomLeft" style={{ width: '100%' }} content={() => (
                    <div style={{ width: '100%', marginTop: '7px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                            <div style={{ width: '200px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Attorney</div>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={filteroptions.selectedAttorney}
                                    placeholder={filtervalue.Attorney === '' && Object.keys(leadfilter.lead_filter.Attorney).length !== 0 && leadfilter.lead_filter.Attorney.attorney_name !== '' ? leadfilter.lead_filter.Attorney.attorney_name : 'Select Attorney'}
                                    allowClear
                                    onClear={() => handleLeadAttorneyChange('', {})}

                                    value={filtervalue.Attorney}
                                    onChange={(value, option) => handleLeadAttorneyOnChange(value, option)}
                                    onSelect={(value, option) => handleLeadAttorneyChange(value, option)}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </div>

                            <div style={{ width: '200px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Location</div>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={filteroptions.selectLeadLocation}
                                    disabled={leadfilter.lead_filter.Attorney && Object.keys(leadfilter.lead_filter.Attorney).length !== 0}
                                    placeholder={filtervalue.LeadLocation === '' && leadfilter.lead_filter.LeadLocation !== '' ? leadfilter.lead_filter.LeadLocation : 'location'}
                                    allowClear
                                    onClear={() => handleLocationChange('')}
                                    value={filtervalue.LeadLocation}
                                    onChange={handleLocationonChange}
                                    onSelect={handleLocationChange}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </div>
                            <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button size={'small'} onClick={clearAllState}>Clear All</Button>
                            </div>
                        </div>


                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
                            <div style={{ width: '300px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Case Types</div>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    onClear={() => handleCaseTypeChange([])}
                                    placeholder="Please select"
                                    defaultValue={[]}
                                    value={leadfilter.lead_filter.CaseTypes}
                                    onChange={handleCaseTypeChange}
                                >
                                    {
                                        leadfilter.lead_filter.Attorney && Object.keys(leadfilter.lead_filter.Attorney).length !== 0 ? (leadfilter.lead_filter.Attorney.attorney_practice_areas.map(data => <Option key={data} value={data}>{data}</Option>)) : (filteroptions.selectedCaseTypes.map(data => (<Option key={data} value={data}>{data}</Option>)))
                                    }
                                </Select>
                            </div>
                            <div style={{ width: '150px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Channel</div>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    size={'medium'}
                                    allowClear
                                    onClear={() => handleChannelChange('')}
                                    value={filtervalue.channel === '' && leadfilter.lead_filter.channel !== '' ? leadfilter.lead_filter.channel : filtervalue.channel}
                                    placeholder="Select Channel"
                                    onSearch={handleChannelonChange}
                                    onChange={handleChannelChange}>
                                    {
                                        filteroptions.selectedchannel.map(data => (<Option key={data} value={data}>{data}</Option>))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
                            <div style={{ width: '200px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Lead Name</div>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={filteroptions.selectedLeadName}
                                    disabled={leadfilter.lead_filter.Attorney && Object.keys(leadfilter.lead_filter.Attorney).length !== 0}
                                    placeholder={filtervalue.LeadName === '' && leadfilter.lead_filter.LeadName !== '' ? leadfilter.lead_filter.LeadName : 'Enter Name'}
                                    allowClear
                                    onClear={() => handleLeadNameChange('')}
                                    value={filtervalue.LeadName}
                                    onChange={handleLeadNameOnChange}
                                    onSelect={handleLeadNameChange}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </div>
                            <div style={{ width: '200px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Lead Email</div>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={filteroptions.selectedLeadEmail}
                                    disabled={leadfilter.lead_filter.Attorney && Object.keys(leadfilter.lead_filter.Attorney).length !== 0}
                                    placeholder={filtervalue.LeadEmail === '' && leadfilter.lead_filter.LeadEmail !== '' ? leadfilter.lead_filter.LeadEmail : 'Enter Email'}
                                    allowClear
                                    onClear={() => handleLeadEmailChange('')}
                                    value={filtervalue.LeadEmail}
                                    onChange={handleLeadEmailOnChange}
                                    onSelect={handleLeadEmailChange}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </div>
                            <div style={{ width: '200px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Lead Contact</div>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={filteroptions.selectedLeadContact}
                                    disabled={leadfilter.lead_filter.Attorney && Object.keys(leadfilter.lead_filter.Attorney).length !== 0}
                                    placeholder={filtervalue.LeadContact === '' && leadfilter.lead_filter.LeadContact !== '' ? leadfilter.lead_filter.LeadContact : 'Lead Contact'}
                                    allowClear
                                    onClear={() => handleLeadContactChange('')}
                                    value={filtervalue.LeadContact}
                                    onChange={handleLeadContactOnChange}
                                    onSelect={handleLeadContactChange}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )} trigger="click">
                    <div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', fontWeight: '500', width: filtercount !== 0 ? '90px' : '70px' }}> <FilterOutlined /> Filter <span>{filtercount !== 0 && <Tag color="blue">{filtercount}</Tag>}</span></div>
                </Popover>

                <Popover placement="bottomLeft" style={{ width: '100%' }} content={() => (
                    <div style={{ width: '500px' }}>
                        <EditColumns selectedcolumnnames={selectedcolumnnames} allcolumns={allcolumns} setEditedColms={setEditedColms} />
                    </div>
                )} trigger="click">
                    <div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', fontWeight: '500', width: '90px', marginLeft: '10px' }}> <ControlOutlined /> Edit table</div>
                </Popover>


                <div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', marginLeft: '10px', fontWeight: '500' }} >
                    <Popover placement="bottom" title={`width ${minimizetablewidth}%`} style={{ width: '100%' }} content={() => (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Button size={'small'} style={{ marginRight: '5px' }} onClick={handleDecBy20}><AiOutlineMinus /></Button>
                            <Slider
                                min={20}
                                max={50}
                                defaultValue={50}
                                style={{ width: '200px' }}
                                onChange={handleTableWidthChange}
                                value={minimizetablewidth}
                            />
                            <Button size={'small'} style={{ marginLeft: '5px' }} onClick={handleIncBy20}><AiOutlinePlus /></Button>
                        </div>

                    )} trigger="click">
                        <div>Resize table</div>
                    </Popover>
                </div>
                <div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', marginLeft: '10px', fontWeight: '500' }} onClick={handleMinimizeTableChange}>Min Table</div>
                {
                    !minimizeCardDetails ? (<div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', marginLeft: '10px', fontWeight: '500' }} onClick={handleMinimizeCardDetailsChange}>Min Details</div>) :
                        (<div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', marginLeft: '10px', fontWeight: '500' }} onClick={handleMinimizeCardDetailsChange}>Max Details</div>)
                }
            </div>
        </div>
    )
}

FilterTable.propTypes = {
    handleleadfilterdata: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    leads: state.leads,
    allattorneys: state.leads.allattorneys,
    leadfilter: state.leadfilter,
});


export default connect(mapStateToProps, { handleleadfilterdata })(FilterTable)
