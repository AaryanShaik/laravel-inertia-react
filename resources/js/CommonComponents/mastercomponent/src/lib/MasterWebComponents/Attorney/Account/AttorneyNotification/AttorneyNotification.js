import React,{ useState, useEffect} from 'react';
import { Switch, Checkbox, Table, Space, Radio } from 'antd';

const notificationLawFirmdata = [
    {
        no:'1',
        name:'John Doe Martins',
        emailnotification: false,
        smsnotification: true,
    },
    {
        no:'2',
        name:'Doe Martins',
        emailnotification: false,
        smsnotification: true,
    },
    // {
    //     no:'3',
    //     name:'John Doe Martins',
    //     emailnotification: false,
    //     smsnotification: true,
    // },
    // {
    //     no:'4',
    //     name:'John Doe Martins',
    //     emailnotification: false,
    //     smsnotification: true,
    // },
    // {
    //     no:'5',
    //     name:'John Doe Martins',
    //     emailnotification: false,
    //     smsnotification: true,
    // },
    // {
    //     no:'6',
    //     name:'John Doe Martins',
    //     casetype:`Auto Accident`,
    //     assignedat:'07/14/2020, 02:24 AM',
    //     apiresponse: '',
    //     email:'johndoe@gmail.com',
    //     phone:'+1234567890'
    // },
    // {
    //     no:'7',
    //     name:'John Doe Martins',
    //     casetype:`Auto Accident`,
    //     assignedat:'07/14/2020, 02:24 AM',
    //     apiresponse: '',
    //     email:'johndoe@gmail.com',
    //     phone:'+1234567890'
    // },
    // {
    //     no:'8',
    //     name:'John Doe Martins',
    //     casetype:`Auto Accident`,
    //     assignedat:'07/14/2020, 02:24 AM',
    //     apiresponse: '',
    //     email:'johndoe@gmail.com',
    //     phone:'+1234567890'
    // },
]

const notificationLeadData = [
    {
        no:'1',
        notificationtype:'Email',
        checked:false,
        includefirmemail: false,
        includefirmphone: true,
    },
    {
        no:'2',
        notificationtype:'SMS',
        checked:false,
        includefirmemail: true,
        includefirmphone: false,
    },
]

const AttorneyNotification = () => {

    const [renderswitchchnage, setrenderswitchchnage] = useState(false)

    useEffect(() => {

    }, [renderswitchchnage])

    const onActiveEmailNotificationChange = (checked,record) => {
        // console.log(`switch to ${checked}`, record);
        let findindex = notificationLawFirmdata.findIndex(item=> item.no === record.no); 
        notificationLawFirmdata[findindex].emailnotification = checked;
        console.log('findindex ',findindex, notificationLawFirmdata[findindex])
        setrenderswitchchnage(!renderswitchchnage)
      }

    const onActiveSMSNotificationChange = (checked,record) => {
        // console.log(`switch to ${checked}`, record);
        let findindex = notificationLawFirmdata.findIndex(item=> item.no === record.no); 
        console.log('findindex ',findindex, notificationLawFirmdata[findindex])
        notificationLawFirmdata[findindex].smsnotification = checked;
        setrenderswitchchnage(!renderswitchchnage)
    }

    const onActiveFirmEmailNotificationChange = (checked,record) => {
        console.log(`switch to ${checked}`);
        let findindex = notificationLeadData.findIndex(item=> item.no === record.no); 
        notificationLeadData[findindex].includefirmemail = checked;
        console.log('findindex ',findindex, notificationLeadData[findindex])
        setrenderswitchchnage(!renderswitchchnage)
      }

    const onActiveFirmPhoneNotificationChange = (checked,record) => {
        console.log(`switch to ${checked}`);
        let findindex = notificationLeadData.findIndex(item=> item.no === record.no); //.emailnotification = checked
        notificationLeadData[findindex].includefirmphone = checked;
        console.log('findindex ',findindex, notificationLeadData[findindex])
        setrenderswitchchnage(!renderswitchchnage)
    }

    const onEmailCheckChange = (e,record) => {
        console.log(`checked = ${e.target.checked}`);
        let findindex = notificationLeadData.findIndex(item=> item.no === record.no); //.emailnotification = checked
        notificationLeadData[findindex].checked = e.target.checked;
        console.log('findindex ',findindex, notificationLeadData[findindex])
        setrenderswitchchnage(!renderswitchchnage)
      }

      const notificationLawFirmColumns = [
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Email Notification',
            dataIndex:'emailnotification',
            key:'emailnotification',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Switch checked={record.emailnotification} onChange={(txt)=>onActiveEmailNotificationChange(txt,record)} />
                            </Radio.Group>        
                    </Space>
                )
            }
        },
        {
            title:'SMS Notification',
            dataIndex:'smsnotification',
            key:'smsnotification',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Switch checked={record.smsnotification} onChange={(txt)=>onActiveSMSNotificationChange(txt,record)} />
                            </Radio.Group>        
                    </Space>
                )
            }
        },
    ]


    const notificationLeadsColumns = [
        {
            title:'Notification Type',
            dataIndex:'notificationtype',
            key:'notificationtype',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Checkbox checked={record.checked} onChange={(txt)=>onEmailCheckChange(txt,record)}>{record.notificationtype}</Checkbox>
                            </Radio.Group>        
                    </Space>
                )
            }
        },
        {
            title:'Include Firm Email',
            dataIndex:'includefirmemail',
            key:'includefirmemail',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Switch checked={record.includefirmemail} onChange={(txt)=>onActiveFirmEmailNotificationChange(txt,record)} />
                            </Radio.Group>        
                    </Space>
                )
            }
        },
        {
            title:'Include Firm Phone',
            dataIndex:'includefirmphone',
            key:'includefirmphone',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Switch checked={record.includefirmphone} onChange={(txt)=>onActiveFirmPhoneNotificationChange(txt,record)} />
                            </Radio.Group>        
                    </Space>
                )
            }
        },
    ]
    
    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%'}}>
                <div style={{fontSize:'18px',fontWeight:'500',marginBottom:'10px'}}>Notifications to Law Firms</div>
                {/* <div style={{width:'100%', display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',border:'1px solid #ccc'}}>
                    <div style={{width:'33.33%',textAlign:'center'}}>
                        <div style={{padding:'5px'}}>Partner</div>
                        <div style={{padding:'5px'}}>John Doe (Owner)</div>
                    </div>
                    <div style={{width:'33.33%',textAlign:'center'}}>
                        <div style={{padding:'5px'}}>Email Notification</div>
                        <div style={{padding:'5px'}}><Switch onChange={onActiveEmailNotificationChange} /></div>
                    </div>
                    <div style={{width:'33.33%',textAlign:'center'}}>
                        <div style={{padding:'5px'}}>SMS Notification</div>
                        <div style={{padding:'5px'}}><Switch onChange={onActiveSMSNotificationChange} /></div>
                    </div>
                </div> */}
                <div style={{width:'100%'}}>
                        <Table
                        columns={notificationLawFirmColumns} 
                        dataSource={notificationLawFirmdata} 
                        pagination={false}
                        size="small"
                        // scroll={{ scrollToFirstRowOnChange: false }}
                        // scroll={{
                        //     x: 800
                        // }}
                    />
                </div>
            </div>

            <div style={{width:'100%',marginTop:'20px'}}>
                <div style={{fontSize:'18px',fontWeight:'500',marginBottom:'10px'}}>Notifications to Leads</div>
                {/* <div style={{width:'100%', display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',border:'1px solid #ccc'}}>
                    <div style={{width:'33.33%',textAlign:'center'}}>
                        <div style={{padding:'5px'}}>Notification Type</div>
                        <div style={{padding:'5px'}}><Checkbox onChange={onEmailCheckChange}>Email</Checkbox></div>
                    </div>
                    <div style={{width:'33.33%',textAlign:'center'}}>
                        <div style={{padding:'5px'}}>Include Firm Email</div>
                        <div style={{padding:'5px'}}><Switch onChange={onActiveFirmEmailNotificationChange} /></div>
                    </div>
                    <div style={{width:'33.33%',textAlign:'center'}}>
                        <div style={{padding:'5px'}}>Include Firm Phone</div>
                        <div style={{padding:'5px',margin:'0'}}><Switch onChange={onActiveFirmPhoneNotificationChange} /></div>
                    </div>
                </div> */}
                <div style={{width:'100%'}}>
                        <Table
                        columns={notificationLeadsColumns} 
                        dataSource={notificationLeadData} 
                        pagination={false}
                        size="small"
                        // scroll={{ scrollToFirstRowOnChange: false }}
                        // scroll={{
                        //     x: 800
                        // }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AttorneyNotification;
