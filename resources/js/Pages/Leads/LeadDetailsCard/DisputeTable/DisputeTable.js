import React,{ useState, useEffect } from 'react';
import { Table, Space, Radio, Button,Tooltip, Popconfirm } from 'antd';
import { CheckCircleTwoTone, CheckSquareOutlined } from '@ant-design/icons';
import {ImCross, ImCheckmark} from 'react-icons/im';
// import './LeadsTable.css';


import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const disputedata = [
    {
        name:'John Doe',
        reason:'False or nonsensical information',
        status:'Open',
    },
    {
        name:'Law Martins',
        reason:'False or nonsensical information',
        status:'Rejected',
    },
    {
        name:'Chass Dias',
        reason:'False or nonsensical information',
        status:'Refunded',
    },
    {
        name:'John F. Diaz',
        reason:'False or nonsensical information',
        status:'Refunded',
    },
    {
        name:'Jessica M.',
        reason:'False or nonsensical information',
        status:'Rejected',
    },
    {
        name:'Shawn Lake',
        reason:'False or nonsensical information',
        status:'Open',
    },
    {
        name:'Ramsy Hock',
        reason:'False or nonsensical information',
        status:'Refunded',
    },
    {
        name:'Sam Tale',
        reason:'False or nonsensical information',
        status:'Rejected',
    },
    {
        name:'James D.',
        reason:'False or nonsensical information',
        status:'Rejected',
    },
    {
        name:'Mack D.',
        reason:'False or nonsensical information',
        status:'Refunded',
    },
    {
        name:'Ace Portgus',
        reason:'False or nonsensical information',
        status:'Open',
    },
    {
        name:'Jones Z.',
        reason:'False or nonsensical information',
        status:'Rejected',
    },
    {
        name:'Jessi M.',
        reason:'False or nonsensical information',
        status:'Refunded',
    },
    {
        name:'Tom Hanks',
        reason:'False or nonsensical information',
        status:'Open',
    },
    {
        name:'Rock James',
        reason:'False or nonsensical information',
        status:'Rejected',
    },
    {
        name:'Sisui Hatake',
        reason:'False or nonsensical information',
        status:'Open',
    },
    {
        name:'Tony Stark',
        reason:'False or nonsensical information',
        status:'Rejected',
    },
    {
        name:'Robbin Diaz',
        reason:'False or nonsensical information',
        status:'Refunded',
    },
    {
        name:'Shames Shaw',
        reason:'False or nonsensical information',
        status:'Open',
    },
    {
        name:'Neon Blake',
        reason:'False or nonsensical information',
        status:'Rejected',
    }
]

const DisputeTable = ({collapsed,lead_disputes,leads}) =>{

   const [data, setdata] = useState([])

    // useEffect(() => {
    //     if(lead_disputes.length > 0){
    //       return setdata(lead_disputes);
    //     }
    //     else{
    //         setdata(disputedata);
    //     }
    // }, [])

    useEffect(() => {
        if(lead_disputes.length > 0){
            // console.log('lead_disputes ',lead_disputes)
            setdata(lead_disputes);
        }
        else{
            setdata([]);
        }
    }, [leads])

    const columns = [
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            width:80,
            ellipsis: true,
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
            render: (_, record) =>{
                return (
                    <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{record.attorney_details[0].attorney_name}</span>
                )
            }
        },
        {
            title:'Reason',
            dataIndex:'reason',
            key:'reason',
            align:'center',
            llipsis: true,
            width:100,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Status',
            dataIndex:'status_value',
            key:'status_value',
            align:'center',
            llipsis: true,
            width:30,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Action',
            dataIndex:'action',
            key:'action',
            align:'center',
            width:50,
            render: (_, record) =>{
                return (
                    <Space size="middle">
                          <Radio.Group>
                              {/* <Button 
                              onClick={() => edit(record)}
                              > 
                                  <ImCheckmark style={{color:'gray'}} />
                              </Button>  
                                  <Button> 
                                      <ImCross style={{color:'gray'}} /> 
                                  </Button> */}
                                  <Button size='small' style={{color:'#f44336'}} icon={<ImCross/>}></Button>
                        <Button size='small' style={{color:'#00e676'}} icon={<ImCheckmark/>}></Button>
                          </Radio.Group>
                    </Space>
                )
            }
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text=== true ? <CheckCircleTwoTone style={{fontSize:'14px'}} twoToneColor="#00C851"/>:null}</span>,
        },
        
    ];


    return (
        <div style={{width:'100%'}}>
            <Table
                // className="tableclass"
                columns={columns} 
                dataSource={data} 
                pagination={false}
                size="small"
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    x: 400
                  }}
            />
        </div>
    )
}

DisputeTable.propTypes = {
    
  };

const mapStateToProps = (state) => ({
    leads: state.leads
});


export default connect(mapStateToProps, {})(DisputeTable);
