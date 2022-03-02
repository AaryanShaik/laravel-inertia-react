import { useState, useEffect} from 'react';
import { Switch, Checkbox, Table, Space, Radio } from 'antd';
import { Trans, useTranslation } from 'react-i18next';


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

const Notification = () => {

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
            title:t("Name"),
            dataIndex:'name',
            key:'name',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:t("EmailNotifications"),
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
            title:t("SMSNotifications"),
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
            title:t("NotificationType"),
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
            title:t("IncludeFirmEmail"),
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
            title:t("IncludeFirmPhone"),
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
    

const [t, i18n] = useTranslation('common'); 
    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%'}}>
                <div style={{fontSize:'18px',fontWeight:'500',marginBottom:'10px'}}>{t("notificationsToLawfirm")}</div>
                
                <div style={{width:'100%'}}>
                        <Table
                        columns={notificationLawFirmColumns} 
                        dataSource={notificationLawFirmdata} 
                        pagination={false}
                        size="small"
                    />
                </div>
            </div>

            <div style={{width:'100%',marginTop:'20px'}}>
                <div style={{fontSize:'18px',fontWeight:'500',marginBottom:'10px'}}>{t("notificationsToLeads")}</div>
               
                <div style={{width:'100%'}}>
                        <Table
                        columns={notificationLeadsColumns} 
                        dataSource={notificationLeadData} 
                        pagination={false}
                        size="small"
                    />
                </div>
            </div>
        </div>
    )
}

export default Notification;
