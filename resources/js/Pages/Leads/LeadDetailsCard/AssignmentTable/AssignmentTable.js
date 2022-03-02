import React,{useEffect, useState} from 'react';
import { Table } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
// import './LeadsTable.css';

import { getAssignedAttorney } from '../../../../store/actions/lead';

import { connect, useStore } from "react-redux";
import PropTypes from "prop-types";

const assignmentdata = [
    {
        name:'John Doe',
        type:'Attorney',
        price:'$20',
        assigned:true,
    },
    {
        name:'Law Martins',
        type:'Attorney',
        price:'$43',
        assigned:false
    },
    {
        name:'Chass Dias',
        type:'Attorney',
        price:'$23',
        assigned:false
    },
    {
        name:'John F. Diaz',
        type:'Attorney',
        price:'$24',
        assigned:false
    },
    {
        name:'Jessica M.',
        type:'Attorney',
        price:'$442',
        assigned:false
    },
    {
        name:'Shawn Lake',
        type:'Attorney',
        price:'$234',
        assigned:false
    },
    {
        name:'Ramsy Hock',
        type:'Attorney',
        price:'$34',
        assigned:false
    },
    {
        name:'Sam Tale',
        type:'Attorney',
        price:'$343',
        assigned:false
    },
    {
        name:'James D.',
        type:'Attorney',
        price:'$64',
        assigned:false
    },
    {
        name:'Mack D.',
        type:'Attorney',
        price:'$45',
        assigned:false
    },
    {
        name:'Ace Portgus',
        type:'Attorney',
        price:'$24',
        assigned:false
    },
    {
        name:'Jones Z.',
        type:'Attorney',
        price:'$52',
        assigned:false
    },
    {
        name:'Jessi M.',
        type:'Attorney',
        price:'$25',
        assigned:false
    },
    {
        name:'Tom Hanks',
        type:'Attorney',
        price:'$63',
        assigned:false
    },
    {
        name:'Rock James',
        type:'Attorney',
        price:'$37',
        assigned:false
    },
    {
        name:'Sisui Hatake',
        type:'Attorney',
        price:'$39',
        assigned:false
    },
    {
        name:'Tony Stark',
        type:'Attorney',
        price:'$22',
        assigned:false
    },
    {
        name:'Robbin Diaz',
        type:'Attorney',
        price:'$44',
        assigned:false
    },
    {
        name:'Shames Shaw',
        type:'Attorney',
        price:'$55',
        assigned:false
    },
    {
        name:'Neon Blake',
        type:'Attorney',
        price:'$66',
        assigned:false
    }
]

const AssignmentTable = ({collapsed,eligibleAttorneys, assignedAttorney, tabskeyvalue, getAssignedAttorney, lead_details}) =>{

    const [data, setdata] = useState([]);
    const [toggle, settoggle] = useState(false);

    const columns = [
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            // align: 'center',
            width:50,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Type',
            dataIndex:'type',
            key:'type',
            align: 'center',
            width:30,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Price',
            dataIndex:'price',
            key:'price',
            align: 'center',
            width:30,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>$ {text}</span>,
        },
        {
            title:'Assigned',
            dataIndex:'assigned',
            key:'assigned',
            align: 'center',
            width:50,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text=== true ? <CheckCircleTwoTone style={{fontSize:'14px'}} twoToneColor="#00C851"/>:null}</span>,
        },
        
    ];

    useEffect(() => {
        // console.log('Assignment EMPTY');
        settoggle(false);
        setdata([]);
    },[lead_details])

    // useEffect(() => {
    //     console.log('Assignment tab useeffect');
    // },[])

    // useEffect(()=>{
    // if(eligibleAttorneys && assignedAttorney){
    //     let arr = [];
    //     eligibleAttorneys.map(item =>{
    //         assignedAttorney && assignedAttorney.map( (aAttorney) => {
    //             arr.push({name: item.attorney_name, type: item.userTypeLabel, price: item.balance, assigned: (item.attorney_id == aAttorney.attorney_id)})
    //         })
    //     })
    //     setdata(arr);
    // }
    // },[])

    // two useeffect because there might be few cases where eligibleAttorneys or assignedAttorney is the same
    useEffect(()=>{
        if(eligibleAttorneys && eligibleAttorneys.length > 0 && assignedAttorney){
            let arr = [];
            eligibleAttorneys.map(item =>{
                assignedAttorney.map( (aAttorney) => {
                    arr.push({name: item.attorney_name, type: item.userTypeLabel, price: item.balance, assigned: (item.attorney_id == aAttorney.attorney_id)})
                })
            })
            arr.sort((x, y) => {
                // true values first
                return (x.assigned === y.assigned)? 0 : x.assigned? -1 : 1;
                // false values first
                // return (x === y)? 0 : x? 1 : -1;
            });
            setdata(arr);
        }
    },[eligibleAttorneys])


    useEffect(()=>{
        if(eligibleAttorneys && eligibleAttorneys.length > 0 && assignedAttorney){
            let arr = [];
            eligibleAttorneys.map(item =>{
                assignedAttorney.map( (aAttorney) => {
                    arr.push({name: item.attorney_name, type: item.userTypeLabel, price: item.balance, assigned: (item.attorney_id == aAttorney.attorney_id)})
                })
            })
            arr.sort((x, y) => {
                // true values first
                return (x.assigned === y.assigned)? 0 : x.assigned? -1 : 1;
                // false values first
                // return (x === y)? 0 : x? 1 : -1;
            });
            setdata(arr);
        }
    },[assignedAttorney])
    // console.log('assignedAttorney ',assignedAttorney)

    // useEffect(() => {
    //     // var tableContent = document.querySelector('.tableclass')
    //     window.addEventListener("scroll", handleNvEnter);
    //     return () => {
    //         window.removeEventListener("scroll", handleNvEnter);
    //     }
    // }, [])

    // const isBottom = (el) =>{
    //     return el.getBoundingClientRect().bottom <= window.outerHeight;
    //   }
    

    // const handleNvEnter = (event) => {
    //     console.log('yes, I am listening')
    //     // let maxScroll = event.target.scrollHeight - event.target.clientHeight
    //     // let currentScroll = event.target.scrollTop
    //     // if (currentScroll === maxScroll) {
    //     //    // load more data
    //     // }
    //     const wrappedElement = document.querySelector('.tableclass');
    //     if (isBottom(wrappedElement)) {
    //         console.log('header bottom reached');
    //         document.removeEventListener('scroll', handleNvEnter);
    //     }
    //     // console.log("Nv Enter:", event);
    //   }

      
    // console.log('tabskeyvalue ',tabskeyvalue)
    // console.log('data.length === 0 ',data.length === 0);
    // console.log('data.length === 0 ------------',leadid)
    if(tabskeyvalue == 'Assignments' && !toggle == true ){ //data.length === 0 && assignedAttorney.length === 0
        try{
            // console.log('Assignment tab if');
            getAssignedAttorney(lead_details.lead_id);
            settoggle(true);
        }catch(err){
            console.log(err)
        }
        
    }


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

AssignmentTable.propTypes = {
    getAssignedAttorney: PropTypes.func.isRequired, 
  };

const mapStateToProps = (state) => ({
    leads: state.leads,
    lead_details: state.leads.lead_details,
});


export default connect(mapStateToProps, {getAssignedAttorney})(AssignmentTable)
