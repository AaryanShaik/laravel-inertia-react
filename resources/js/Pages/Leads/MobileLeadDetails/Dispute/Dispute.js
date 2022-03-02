import React, { useState, useEffect } from 'react';
import {Card, Button,Radio, Typography} from 'antd';
import './Dispute.css';
import {ImCross, ImCheckmark} from 'react-icons/im';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const {Text} = Typography;

const datad = [
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



function Dispute({lead_disputes,leads}) {

    const [data, setdata] = useState([])

    useEffect(() => {
        if(lead_disputes.length > 0){
            // console.log('lead_disputes ',lead_disputes)
            setdata(lead_disputes);
        }
        else{
            setdata([]);
        }
    }, [leads])

    return (
        <div>
            {data.map(item => 
                <Card className="disputeListCard">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Text style={{fontSize:14}} strong type='secondary'>{item.name}</Text>
                        <div style={{display:'flex'}}>
                        <Button size='small'  style={{ border:'1px solid #f44336', color:'#f44336'}} icon={<ImCross/>}></Button>
                        <Button size='small'  style={{ border:'1px solid #00e676', color:'#00e676'}} icon={<ImCheckmark/>}></Button>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <Text style={{fontSize:14}} type='secondary'>{item.status_value}</Text>
                        <Text type='secondary' style={{fontSize:14}} >{item.reason}</Text>
                    </div>
                </Card>    
            )}
        </div>
    )
}

Dispute.propTypes = {}

const mapStateToProps = (state) => ({
    leads: state.leads
});

export default connect(mapStateToProps, {})(Dispute);
