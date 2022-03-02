import React, { useState, useEffect } from 'react';
import { Table, Typography, Switch, Menu, Dropdown, Space } from 'antd';
// import './InvitesTable.css';
import FilterTable from './FilterAffiliatesTable/FilterTable';
import { set } from 'date-fns';
import { DownOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {handleAffiliatesTempData} from '../../../../../../store/actions/affiliates'

const AffiliatesTable = ({ filter_name,filter_location,filter_casetype,filter_type,temp_data,handleAffiliatesTempData,collapsed, handleTableWidthChange, minimizetablewidth, handleMinimizeTableChange, minimizetable }) => {
    const [selectedcolumns, setselectedcolumns] = useState([]);
    const [allcolumns, setallcolumns] = useState();
    const [selectedcolumnnames, setselectedcolumnnames] = useState(['Location', 'Balance']);
    const [tdata, setTdata] = useState([
        {
            no: '1',
            name: 'John Doe Martins',
            status: 'Active',
            casetype: `Construction`,
            location: 'Wyoming, USA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '2',
            name: 'Law Martins',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: false,
            balance: '243',
        },
        {
            no: '3',
            name: 'Chass Dias',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '247',
        },
        {
            no: '4',
            name: 'John F. Diaz',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '252',
        },
        {
            no: '5',
            name: 'Jessica M.',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: false,
            balance: '242',
        },
        {
            no: '6',
            name: 'Shawn Lake',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: false,
            balance: '242',
        },
        {
            no: '7',
            name: 'Ramsy Hock',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '8',
            name: 'Sam Tale',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: false,
            balance: '242',
        },
        {
            no: '9',
            name: 'James D.',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '10',
            name: 'Mack D.',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '11',
            name: 'Ace Portgus',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '12',
            name: 'Jones Z.',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '13',
            name: 'Jessi M.',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '14',
            name: 'Tom Hanks',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '15',
            name: 'Rock James',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '16',
            name: 'Sisui Hatake',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '17',
            name: 'Tony Stark',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '18',
            name: 'Robbin Diaz',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '19',
            name: 'Shames Shaw',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        },
        {
            no: '20',
            name: 'Neon Blake',
            status: 'Active',
            casetype: `Auto Accident`,
            location: 'Los Angeles, CA',
            lastpaid: '07/14/2020, 02:24 AM',
            lastassigned: '07/15/2020, 02:24 AM',
            autorefill: true,
            balance: '242',
        }
    ])
    console.log('data in affiliates table',tdata);
    const columns = [
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: 120,
            ellipsis: true,
            // responsive: ['sm'],
            // filteredValue: filteredInfo.status || null,
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            width: 100,
            ellipsis: true,
            sorter: (a, b) => a.balance - b.balance,
            // responsive: ['lg'],
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
    ];

    const menu = (
        <Menu>
            <Menu.Item key="0">
                Backed Up
            </Menu.Item>
            <Menu.Item key="1">
                Budget Cap Confirmed
            </Menu.Item>
            <Menu.Item key="3">
                Pending Budget Increase
            </Menu.Item>
            <Menu.Item key="4">
                $0 Refill Authorized
            </Menu.Item>
        </Menu>
    );

    const fixedcolumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 130,
            ellipsis: true,
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
        {
            title: 'Case Type',
            dataIndex: 'casetype',
            key: 'casetype',
            width: 120,
            ellipsis: true,
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
        },
    ]

    useEffect(() => {
        handleTableColms();
    }, [selectedcolumnnames])

    useEffect(() => {
        handleTableColms();
        let allcolnamesarr = [];
        columns.map(col => {
            allcolnamesarr.push(col.title)
        })
        setallcolumns(allcolnamesarr);
        handleAffiliatesTempData(tdata)
    }, [])

    useEffect(()=>{
        setTdata(temp_data)
    },[temp_data])

    useEffect(()=>{
        console.log('use effect in filter called');
        setTdata(
            temp_data
            .filter((ele)=>{
                return (filter_name=="")?true:ele.name.includes(filter_name)
            })
            .filter((ele)=>{
                return (filter_location=="")?true:ele.location.includes(filter_location)
            })
            .filter((ele)=>{
                return (filter_casetype.length==0)?true:filter_casetype.includes(ele.casetype)
            })
        )
    },[filter_name,filter_location,filter_casetype,filter_type])

    const handleTableColms = () => {
        let colarr = [];
        columns.map(item => {
            if (selectedcolumnnames.includes(item.title)) {
                colarr.push(item);
            }
        });
        setselectedcolumns(colarr);
    }

    // const data = 

    const setEditedColms = (value) => {
        console.log('setEditedColms ', value);
        setselectedcolumnnames(value);
    }

    //     useEffect(()=>{
    //     console.log('filterdwd ', document.querySelector('.filterdwd').offsetHeight)
    // })
    // console.log('fixedcolumns ', ...fixedcolumns)
    // console.log('selectedcolumns ', ...selectedcolumns)

    return (
        <div style={{ padding: '0px 14px 5px 14px', background: 'rgb(244, 245, 247)', width: '100%', height: '100%' }}>
            <div className="filterdwd" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <FilterTable handleTableWidthChange={handleTableWidthChange} minimizetablewidth={minimizetablewidth} handleMinimizeTableChange={handleMinimizeTableChange} minimizetable={minimizetable} selectedcolumnnames={selectedcolumnnames} allcolumns={allcolumns} setEditedColms={setEditedColms} />
            </div>
            {/* <div> */}
            <Table
                className="tableclass"
                columns={[...fixedcolumns, ...selectedcolumns]}
                dataSource={tdata}
                pagination={false}
                size="small"
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { console.log('affiliates row data ', record) }, // click row
                        onDoubleClick: event => { }, // double click row
                        onContextMenu: event => { }, // right button click row
                        onMouseEnter: event => { }, // mouse enter row
                        onMouseLeave: event => { }, // mouse leave row
                    };
                }}
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    y: 'calc(-158px + 100vh)', //834 //78.5vh
                    x: 'calc(200px + 50%)',
                }}
            />
            {/* </div> */}
        </div>
    )
}

AffiliatesTable.propTypes = {
    handleAffiliatesTempData: PropTypes.func.isRequired
  };

const mapStateToProps = (state) => ({
    temp_data: state.affiliates.temp_data,
    filter_name:state.affiliates.filter_name,
    filter_location:state.affiliates.filter_location,
    filter_casetype:state.affiliates.filter_casetype,
    filter_type:state.affiliates.filter_type
});


export default connect(mapStateToProps, {handleAffiliatesTempData})(AffiliatesTable);