import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Switch, Table, Space, Radio } from 'antd';

const notificationdata = [
    {
        no:'1',
        name:'John Doe Martins',
        emailnotification: false,
    },
    {
        no:'2',
        name:'Doe Martins',
        emailnotification: false,
    },
]

const Notification = () => {

    const [renderswitchchnage, setrenderswitchchnage] = useState(false)

    useEffect(() => {

    }, [renderswitchchnage])

    const onActiveEmailNotificationChange = (checked,record) => {
        // console.log(`switch to ${checked}`, record);
        let findindex = notificationdata.findIndex(item=> item.no === record.no); 
        notificationdata[findindex].emailnotification = checked;
        console.log('findindex ',findindex, notificationdata[findindex])
        setrenderswitchchnage(!renderswitchchnage)
      }

    const onActiveSMSNotificationChange = (checked,record) => {
        // console.log(`switch to ${checked}`, record);
        let findindex = notificationdata.findIndex(item=> item.no === record.no); 
        console.log('findindex ',findindex, notificationdata[findindex])
        notificationdata[findindex].smsnotification = checked;
        setrenderswitchchnage(!renderswitchchnage)
    }

    const notificationColumns = [
        {
            title:'Partner',
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
    ]

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%',marginBottom:'20px',textAlign:'left'}}>
                    <div style={{fontSize:'18px'}}>Notifications to your Team</div>
                    <div style={{fontSize:'15px'}}>Choose how each partner will receive his or her notifications</div>
            </div>
            <div style={{width:'100%'}}>
                        <Table
                        columns={notificationColumns} 
                        dataSource={notificationdata} 
                        pagination={false}
                        size="small"
                        // scroll={{ scrollToFirstRowOnChange: false }}
                        // scroll={{
                        //     x: 800
                        // }}
                    />
                </div>
        </div>
    )
}

export default Notification;
