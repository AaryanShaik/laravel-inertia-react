import React, { useState, useEffect } from 'react';
import { Card, Select, AutoComplete, Switch, Popover, Button, Slider, Tooltip } from 'antd';
import './FilterTable.css';
import { FilterOutlined, ControlOutlined } from '@ant-design/icons';
import EditColumns from '../../../../../../../CommonComponents/EditColumns/EditColumns';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { updateAffiliatesFilter } from '../../../../../../../store/actions/affiliates';

import { connect } from "react-redux";
import PropTypes from "prop-types";

const { Option } = Select;

const FilterTable = ({ updateAffiliatesFilter, temp_data, selectedcolumnnames, allcolumns, setEditedColms, handleTableWidthChange, minimizetablewidth, handleMinimizeTableChange, minimizetable }) => {
    const [displayfilter, setdisplayfilter] = useState(false);
    const [edittableclicked, setedittableclicked] = useState(false);
    const [tdata, setTdata] = useState(temp_data || [])
    const [locations, setLocations] = useState([])
    const [caseTypes, setCaseTypes] = useState([])
    const [names, setNames] = useState([])
    // const [children,setChildren] = useState([])
    console.log('data in affiliates ', temp_data);

    useEffect(() => {
        const unique_names = [...new Map(temp_data.map(v => [v.name, v])).values()]
        const unique_casetypes = [...new Map(temp_data.map(v => [v.casetype, v])).values()]
        const unique_locations = [...new Map(temp_data.map(v => [v.location, v])).values()]
        let new_locations = []
        let new_caseTypes = []
        let new_names = []
        // let new_childrens = [];

        setTdata(temp_data)

        unique_names.forEach((ele) => {
            new_names.push({ value: ele.name })
        })
        unique_casetypes.forEach((ele, index) => {
            new_caseTypes.push(<Option key={index} value={ele.casetype}>{ele.casetype}</Option>)
        })
        unique_locations.forEach((ele) => {
            new_locations.push({ value: ele.location })
        })
        setLocations(new_locations)
        setCaseTypes(new_caseTypes)
        setNames(new_names)


    }, [temp_data])

    //     const locations = [
    //         {
    //           value: 'Burns Bay Road',
    //         },
    //         {
    //           value: 'Downing Street',
    //         },
    //         {
    //           value: 'Wall Street',
    //         },
    //       ];

    // const customername = [
    //         {
    //           value: 'Ramsy Hock',
    //         },
    //         {
    //           value: 'Sam Tale',
    //         },
    //         {
    //           value: 'Ace Portgus',
    //         },
    //         {
    //             value: 'Jones Z.',
    //         },
    //         {
    //             value: 'Jessi M.',
    //         },
    //         {
    //             value: 'Rock James',
    //         },
    //         {
    //             value: 'Tony Stark',
    //         },
    //       ];

    // let casetypeoptions = [
    //         {
    //             id:1,
    //             value:'Construction'
    //         },
    //         {
    //             id:2,
    //             value:'PIA'
    //         },
    //         {
    //             id:3,
    //             value:'Real Estate'
    //         },
    //         {
    //             id:4,
    //             value:'House Repairs'
    //         },
    //         {
    //             id:5,
    //             value:'Auto Accident ES'
    //         },
    //         {
    //             id:6,
    //             value:'Mortgage Finance'
    //         },
    //         {
    //             id:7,
    //             value:'Personal Injury'
    //         },
    //         {
    //             id:8,
    //             value:'Sexual Assault'
    //         },
    //         {
    //             id:9,
    //             value:'Auto Accident'
    //         },
    //         {
    //             id:10,
    //             value:'Medical Malpractice'
    //         },
    //         {
    //             id:11,
    //             value:'Workers Compensation'
    //         },
    //         {
    //             id:12,
    //             value:'Wrongful Death'
    //         },
    //         {
    //             id:13,
    //             value:'Others'
    //         },
    //     ];

    // let children = [];
    // console.log('option ',casetypeoptions.length )
    // for (let i = 0; i < casetypeoptions.length; i++) {

    // children.push(<Option key={casetypeoptions[i].id} value={casetypeoptions[i].value}>{casetypeoptions[i].value}</Option>);

    // }

    const handleCaseTypeChange = (value) => {
        console.log('selected casetype', value);
        let tempobj = { value: value, type: "casetype" }
        updateAffiliatesFilter(tempobj)
    }

    const handleTypeChange = (value) => {
        console.log('selected type', value);
        let tempobj = { value: value, type: "type" }
        updateAffiliatesFilter(tempobj)
    }

    const onNameSelected = (value) => {
        console.log('selected name', value);
        let tempobj = { value: value, type: "name" }
        updateAffiliatesFilter(tempobj)
    }

    const onLocationSelected = (value) => {
        console.log('selected location', value);
        let tempobj = { value: value, type: "location" }
        updateAffiliatesFilter(tempobj)
    }

    const onFilterBtn = () => {
        setdisplayfilter(!displayfilter);
        setedittableclicked(false)
    }

    const onEditBtn = () => {
        setdisplayfilter(false);
        setedittableclicked(!edittableclicked)
    }

    const onActiveChange = (checked) => {
        console.log(`switch to ${checked}`);
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

    // console.log('children ',children )
    // ,handleMinimizeTableChange,minimizetable
    return (
        <div style={{ width: '100%', padding: '10px 0 8px 0' }}>
            {/* display when maximized */}
            {/* <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                        <div onClick={()=>onFilterBtn()} style={{cursor:'pointer',marginBottom:'3px',marginTop:'5px',fontWeight:'500',width:'60px'}}> <FilterOutlined /> Filter</div>
                        <div onClick={()=>onEditBtn()} style={{cursor:'pointer',marginBottom:'3px',marginTop:'5px',fontWeight:'500',width:'80px',marginLeft:'10px'}}> <ControlOutlined /> Edit table</div>
                        <div style={{cursor:'pointer',marginBottom:'3px',marginTop:'5px',marginLeft:'10px',fontWeight:'500'}} > 
                            <Popover placement="bottom" title={`width ${minimizetablewidth}%`} style={{width:'100%'}} content={()=>(
                                <div style={{display:'flex',flexDirection:'row', alignItems:'center'}}>
                                        <Button size={'small'} style={{marginRight:'5px'}} onClick={handleDecBy20}><AiOutlineMinus /></Button>
                                    <Slider
                                        min={20}
                                        max={50}
                                        defaultValue={50}
                                        style={{width:'200px'}}
                                        onChange={handleTableWidthChange}
                                        value={minimizetablewidth}
                                    />
                                        <Button size={'small'} style={{marginLeft:'5px'}} onClick={handleIncBy20}><AiOutlinePlus /></Button>
                                </div>
                                
                            )} trigger="click">
                                <div>Resize table</div>
                            </Popover>
                        </div>
                        <div style={{cursor:'pointer',marginBottom:'3px',marginTop:'5px',marginLeft:'10px',fontWeight:'500'}} onClick={handleMinimizeTableChange}>Minimize Table</div>
                    </div> */}

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Popover placement="bottomLeft" style={{ width: '100%' }} content={() => (
                    <div style={{ width: '100%', marginTop: '7px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                            <div style={{ width: '300px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Case Types</div>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={[]}
                                    onChange={handleCaseTypeChange}
                                >{caseTypes}</Select>
                            </div>
                            <div style={{ width: '200px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Affiliate Type</div>
                                <Select
                                    // mode="multiple"
                                    allowClear
                                    onClear={() => handleTypeChange("")}
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={[]}
                                    onChange={(type) => handleTypeChange(type)}
                                >
                                    <Option key={'Partner'} value={'Partner'}>Partner</Option>
                                    <Option key={'Free Trial'} value={'Free Trial'}>Free Trial</Option>
                                    <Option key={'All'} value={'All'}>All</Option>
                                </Select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
                            <div style={{ width: '200px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Affiliate Name</div>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    onSelect={(name) => onNameSelected(name)}
                                    allowClear
                                    onClear={() => onNameSelected("")}
                                    options={names}
                                    placeholder="Enter Name"
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
                                    onSelect={(location) => onLocationSelected(location)}
                                    allowClear
                                    onClear={() => onLocationSelected("")}
                                    options={locations}
                                    placeholder="location"
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                            </div>
                            <div style={{ width: '50px', margin: '5px' }}>
                                <div className="filterOptionHeaderName">Active</div>
                                <Switch defaultChecked onChange={onActiveChange} />
                            </div>
                        </div>

                    </div>
                )} trigger="click">
                    <div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', fontWeight: '500', width: '60px', display: 'flex', alignItems: 'center' }}> <FilterOutlined />&nbsp;Filter</div>
                </Popover>

                <Popover placement="bottomLeft" style={{ width: '100%' }} content={() => (
                    <div style={{ width: '500px' }}>
                        <EditColumns selectedcolumnnames={selectedcolumnnames} allcolumns={allcolumns} setEditedColms={setEditedColms} />
                    </div>
                )} trigger="click">
                    <div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', fontWeight: '500', width: '90px', marginLeft: '10px', display: 'flex', alignItems: 'center' }}> <ControlOutlined />&nbsp;Edit table</div>
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
                <div style={{ cursor: 'pointer', marginBottom: '3px', marginTop: '5px', marginLeft: '10px', fontWeight: '500' }} onClick={handleMinimizeTableChange}>Minimize Table</div>
            </div>


            {/* {
                displayfilter?
                (
                    <Card style={{width:'100%',marginTop:'7px'}}>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',flexWrap:'wrap',width:'100%'}}>
                            <div style={{ width:'300px',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Case Types</div>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={[]}
                                    onChange={handleChange}
                                    >{children}</Select>
                            </div>
                            <div style={{width:'200px',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Affiliate Type</div>
                                <Select
                                    // mode="multiple"
                                    // allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={[]}
                                    onChange={handleChange}
                                    >
                                        <Option key={'Partner'} value={'Partner'}>Partner</Option>
                                        <Option key={'Free Trial'} value={'Free Trial'}>Free Trial</Option>
                                        <Option key={'All'} value={'All'}>All</Option>
                                    </Select>
                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',width:'100%'}}>
                            <div style={{ width:'200px',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Affiliate Name</div>
                                <AutoComplete
                                style={{
                                width: '100%',
                                }}
                                options={customername}
                                placeholder="Enter Name"
                                filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                            </div>
                            <div style={{ width:'200px',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Location</div>
                                <AutoComplete
                                style={{
                                width: '100%',
                                }}
                                options={locations}
                                placeholder="location"
                                filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                            </div>
                            <div style={{width:'50px',margin:'5px'}}>
                                <div className="filterOptionHeaderName">Active</div>
                                <Switch defaultChecked onChange={onActiveChange} />
                            </div>
                        </div>            
                   
                    </Card>
                ):null
            }
            {
                edittableclicked?
                (
                    <EditColumns selectedcolumnnames={selectedcolumnnames} allcolumns={allcolumns} setEditedColms={setEditedColms}/>
                ):null
            } */}
        </div>
    )
}
FilterTable.propTypes = {
    updateAffiliatesFilter: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    temp_data: state.affiliates.temp_data
});


export default connect(mapStateToProps, { updateAffiliatesFilter })(FilterTable);