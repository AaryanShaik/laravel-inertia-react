import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, Menu, Dropdown, Tooltip } from 'antd';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiFillEye, AiFillInfoCircle } from 'react-icons/ai';

import {useTranslation} from "react-i18next";
import moment from "moment";

const { Option } = Select;

const callLogData = [
    {
        no:'1',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        no:'2',
        name:'Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        no:'3',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        no:'4',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        no:'5',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        no:'6',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        no:'7',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        no:'8',
        name:'John Doe Martins',
        casetype:`Auto Accident`,
        created_at:'07/14/2020, 02:24 AM',
        call_status: 'Completed',
        call_from:'+1234567890',
        call_to:'+2234567890',
        call_duration:'144',
        call_direction:'inbound',
        recording_uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
]


const CallLogsTable = ({call_logs}) => {

    const {t, i18n} = useTranslation('common');

    const [openeyemodel, setopeneyemodel] = useState(false);
    const [currenteyerecord, setcurrenteyerecord] = useState();
    const [data, setdata] = useState([]);

    useEffect(() => {
        if(call_logs){
            setdata( call_logs || [] );
        }
    }, [call_logs])

    const showeyeModal = (record) => {
        // console.log('record ',record)
        setcurrenteyerecord(record);
        setopeneyemodel(true);
      };
    
      const handleeyeOk = () => {
        console.log('handleeyeOk')
        setcurrenteyerecord();
        setopeneyemodel(false);
      };
    
      const handleeyeCancel = () => {
        console.log('handleeyeCancel');
        setcurrenteyerecord();
        setopeneyemodel(false);
      };

      const menu = () => (
        <Menu>
          <Menu.Item key="1">Mark As Test</Menu.Item>
          <Menu.Item key="2">Reject</Menu.Item>
        </Menu>
      );

    const columns = [
        {
            title:'Created',
            dataIndex:'created_at',
            key:'created_at',
            align:'center',
            width:140,
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{moment(text).tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss')}</span>,//momentTimezone
        },
        {
            title:'From',
            dataIndex:'call_from',
            key:'call_from',
            align:'center',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'To',
            dataIndex:'call_to',
            key:'call_to',
            align:'center',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Status',
            dataIndex:'call_status',
            key:'call_status',
            align:'center',
            width:150,
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text.charAt(0).toUpperCase() + text.slice(1)}</span>,
            // render: (_, record) =>{
            //     // console.log("_", _, " record ",record, " ",this)
            //     return (
            //         <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            //             <span style={{padding:'0px',margin:'0px 5px 0 0',fontSize:'12px'}}>{record.status}</span>
            //             <Tooltip title={record.i}><AiFillInfoCircle /></Tooltip>
            //         </div>
            //     )
            // }
        },
        {
            title:'Duration',
            dataIndex:'call_duration',
            key:'call_duration',
            align:'center',
            width:150,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Direction',
            dataIndex:'call_direction',
            key:'call_direction',
            align:'center',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>, //string.charAt(0).toUpperCase() + string.slice(1);
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text.charAt(0).toUpperCase() + text.slice(1)}</span>,
        },
        {
            title:'Recording',
            dataIndex:'recording_uri',
            key:'recording_uri',
            align:'center',
            width:250,
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
            render: text => <span style={{width:'350px'}}>
                <audio
                    controls
                    // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    src={text}
                    style={{width:'300px',height:'40px'}}
                    >
                    {/* /media/cc0-audio/t-rex-roar.mp3 */}
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>
                </span>,
        },
        {
            title:'Actions',
            dataIndex:'actions',
            key:'actions',
            align:'center',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Button type='primary' size={'small'} onClick={()=>showeyeModal(record)} icon={<AiFillEye size={18} />}></Button>
                        </Radio.Group>
                        <Modal title="Call Detail" mask={false} width={550} visible={openeyemodel} footer={<div><Button type={'primary'} onClick={handleeyeCancel}>Close</Button></div>} onOk={handleeyeOk} onCancel={handleeyeCancel} key={record}>
                            {/* {currenteyerecord && currenteyerecord.no} */}
                            <div style={{width:'100%'}}>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                    <div style={{width:'40%',marginBottom:'10px'}}>Parent Sid</div>
                                    <div style={{width:'60%',marginBottom:'10px'}}>{currenteyerecord && currenteyerecord.parent_call_sid || '-'}</div>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                    <div style={{width:'40%',marginBottom:'10px'}}>Call Sid</div>
                                    <div style={{width:'60%',marginBottom:'10px'}}>{currenteyerecord && currenteyerecord.call_sid || '-'}</div> 
                                    {/* xqwecv3tg4fcdcwc3cw3qwxe3dwd2 */}
                                </div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                    <div style={{width:'40%',marginBottom:'10px'}}>Phone Sid</div>
                                    <div style={{width:'60%',marginBottom:'10px'}}>{currenteyerecord && currenteyerecord.phone_sid || '-'}</div>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                    <div style={{width:'40%',marginBottom:'10px'}}>Recording Sid</div>
                                    <div style={{width:'60%',marginBottom:'10px'}}>{currenteyerecord && currenteyerecord.recording_sid || '-'}</div>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                    <div style={{width:'40%',marginBottom:'10px'}}>Source </div>
                                    <div style={{width:'60%',marginBottom:'10px'}}>{currenteyerecord && currenteyerecord.source || '-'}</div>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                    <div style={{width:'40%',marginBottom:'10px'}}>Deal</div>
                                    <div style={{width:'60%',marginBottom:'10px'}}>View</div>
                                </div>
                            </div>
                        </Modal>
                    </Space>
                )
            }
        },
    ]

    
    return (
        <div style={{width:'100%',height:'100%'}}>
            <Table
                columns={columns} 
                dataSource={data.length > 0 ? data : callLogData} 
                pagination={false}
                size="small"
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    x: 800
                  }}
            />
        </div>
    )
}

export default CallLogsTable;
