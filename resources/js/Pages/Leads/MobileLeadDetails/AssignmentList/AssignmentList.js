import React from 'react';
import {Card, Typography} from 'antd';
import {AiFillCheckCircle} from 'react-icons/ai';
import './AssignmentList.css';

const {Text} = Typography;

function AssignmentList({assignedAttorney, eligibleAttorneys}) {
    const data = [
        {
            name:'John Doe',
            type:'Attorney',
            price:'20',
            assigned:true,
        },
        {
            name:'Law Martins',
            type:'Attorney',
            price:'43',
            assigned:false
        },
        {
            name:'Chass Dias',
            type:'Attorney',
            price:'23',
            assigned:false
        },
        {
            name:'John F. Diaz',
            type:'Attorney',
            price:'24',
            assigned:false
        },
        {
            name:'Jessica M.',
            type:'Attorney',
            price:'442',
            assigned:false
        },
        {
            name:'Shawn Lake',
            type:'Attorney',
            price:'234',
            assigned:false
        },
        {
            name:'Ramsy Hock',
            type:'Attorney',
            price:'34',
            assigned:false
        },
        {
            name:'Sam Tale',
            type:'Attorney',
            price:'343',
            assigned:false
        },
        {
            name:'James D.',
            type:'Attorney',
            price:'64',
            assigned:false
        },
        {
            name:'Mack D.',
            type:'Attorney',
            price:'45',
            assigned:false
        },
        {
            name:'Ace Portgus',
            type:'Attorney',
            price:'24',
            assigned:false
        },
        {
            name:'Jones Z.',
            type:'Attorney',
            price:'52',
            assigned:false
        },
        {
            name:'Jessi M.',
            type:'Attorney',
            price:'25',
            assigned:false
        },
        {
            name:'Tom Hanks',
            type:'Attorney',
            price:'63',
            assigned:false
        },
        {
            name:'Rock James',
            type:'Attorney',
            price:'37',
            assigned:false
        },
        {
            name:'Sisui Hatake',
            type:'Attorney',
            price:'39',
            assigned:false
        },
        {
            name:'Tony Stark',
            type:'Attorney',
            price:'22',
            assigned:false
        },
        {
            name:'Robbin Diaz',
            type:'Attorney',
            price:'44',
            assigned:false
        },
        {
            name:'Shames Shaw',
            type:'Attorney',
            price:'55',
            assigned:false
        },
        {
            name:'Neon Blake',
            type:'Attorney',
            price:'66',
            assigned:false
        }
    ]
    return (
        <div>
            {eligibleAttorneys && eligibleAttorneys.map(item =>
                assignedAttorney && assignedAttorney.map( (aAttorney) => 
                <Card className="assignmentListCard" key={item.attorney_id}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Text type='secondary' style={{fontSize:14}} strong>{item.attorney_name}</Text>
                        <Text type='secondary' style={{fontSize:14}} strong>${item.balance}</Text>
                    </div>
                    <div  style={{display:'flex', justifyContent:'space-between'}}>
                        <Text type='secondary' style={{fontSize:14}}>{item.userTypeLabel}</Text>
                        <Text>{item.attorney_id == aAttorney.attorney_id ? <AiFillCheckCircle style={{ color:'rgb(0, 230, 118)'}}/>:''}</Text>
                    </div>
                </Card>  
                )  
            )}
        </div>
    )
}

export default AssignmentList
