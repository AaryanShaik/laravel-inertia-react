import {useState} from 'react'
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote,  } from '@ionic/react';
import {Typography, Button, Input, Select, Drawer, DatePicker, Collapse, Tabs, Card} from 'antd';
import {MdClose} from 'react-icons/md';
import {AiOutlineEye} from 'react-icons/ai';
import {BiDetail} from 'react-icons/bi';
import {TiDeleteOutline} from 'react-icons/ti';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import ReactJson from 'react-json-view'

const {Text} = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

function Leads({userType}) {
    const data = [
        {
            arrivedAt:'06/18/2021, 10:38',
            name: 'Test Name',
            status:'unsold',
            pixelResponse:'',
            email:'test@gmail.com',
            phone:'(123)123-1234',
            caseType:'Auto Accident',
            state:'WY',
        }
    ]

    const [visible, setVisible] = useState(false);
    const [eyeVisible, setEyeVisible] = useState(false);
    const [showDetailsVisible, setShowDetailsVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };

    function onChange(value) {
        console.log(`selected ${value}`);
      }

      const showEyeDrawer = () => {
        setEyeVisible(true);
      };
    
      const onEyeClose = () => {
        setEyeVisible(false);
      };

      const ShowDetailsDrawer = () => {
        setShowDetailsVisible(true);
      };
    
      const onShowDetailsClose = () => {
        setShowDetailsVisible(false);
      };

      const callLogs = [
        {
            createdAt:'23 July 2021, 07:23 AM',
            from:'+19172424212',
            to:'+18554612048',
            status:'completed',
            direction:'inbound',
            duration:'128',
            parentSid:'',
            callSid:'v124762b1476214n8679c67w3594c23',
            phoneSid:'',
            recordingSid:'a0s8dta8s6ba456234n23gyu4g32841',
            source:'sg'
        },
        {
            createdAt:'23 July 2021, 07:23 AM',
            from:'+19172424212',
            to:'+18554612048',
            status:'completed',
            duration:'128',
            direction:'inbound',
            parentSid:'',
            callSid:'v124762b1476214n8679c67w3594c23',
            phoneSid:'',
            recordingSid:'a0s8dta8s6ba456234n23gyu4g32841',
            source:'sg'
        }
      ]
      

      function CallLogs() {
          return (
                <div>
                    {
                        callLogs.map(call => 
                            
                    <Card size='small' style={{  borderLeft:call.status != "completed" ? '5px solid #00B0FF' : '5px solid #00E676'}}>
                        <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                            <Text style={{fontSize:12}}>From: {call.from}</Text>
                            <Text style={{fontSize:12}}>{call.createdAt}</Text>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}> 
                            <Text style={{fontSize:12}}>To: {call.to}</Text>
                            <Text style={{fontSize:12}}>Duration: {call.duration}</Text>
                        </div>
                       
                        <div style={{width:'100%', display:'flex', justifyContent:'space-between', marginBottom:10}}>
                            <Text style={{fontSize:12}}>Direction: {call.direction}</Text>
                            <AiOutlineEye style={{fontSize:20}}/>
                        </div>
                        
                    <audio
                    style={{height:40}}
                        controls
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3 ">
                        {/* /media/cc0-audio/t-rex-roar.mp3 */}
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                    </Card>
                   )}
                </div>
          )
        };


        function ApiDump() {
            return (
                  <div>
                      <Collapse>
                            <Panel header="data1" key="data1">
                                <ReactJson displayDataTypes={false} displayObjectSize={false}  src={dataDump} />
                            </Panel>
                        </Collapse>
                  </div>
            )
          }

        function ShowDetails(){
            return(
                <Tabs defaultActiveKey="1" >
                        <TabPane tab="Details" key="1">
                            <div style={{display:'flex', flexDirection:'column'}}>
                            {details.map(item=>
                                <div style={{marginBottom:10}}>
                                    <Text style={{fontSize:12, marginRight:5}}>{item.field}:</Text>
                                    <Text style={{fontSize:12}}>{item.value}</Text>
                                </div>
                            )}
                            </div>
                        </TabPane>
                        <TabPane tab="Summary" key="2">
                            {summary.map( item => 
                                <Card size='small'>
                                    <div>
                                        <Text style={{fontSize:12}}>{item.question}</Text>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                                        <Text style={{fontSize:12}}>You: {item.you}</Text>
                                        <Text style={{fontSize:12}}>Alert: {item.alert}</Text>
                                    </div>
                                </Card>    
                            )}
                        </TabPane>
                    </Tabs>
            )
        }

        
        const details = [
            {
                field:'Arrived On',
                value:'18 June 2021, 2:38 pm'
            },
            {
                field:'Case Type',
                value:'Auto Accident'
            },
            {
                field:'State',
                value:'Wyoming'
            },
            {
                field:'Alert Post On',
                value:'N/A'
            },
            {
                field:'Status',
                value:'N/A'
            },
            {
                field:'Result',
                value:'Rejected'
            },
            {
                field:'Reason',
                value:'No Affiliate deal found for practice area Auto Accident'
            },
            {
                field:'Customer ID',
                value:'Q87dljA4KOmVklrNb5xX9Pp6Z3yWrv'
            },
            {
                field:'Alert Lead Id',
                value:'N/A'
            }
        ]
        
      const summary = [
        {
            question:'Were you or a loved one Injured in an Accident that wasn’t your fault?',
            you:'Yes',
            alert:'N/A'
        },
        {
            question:'What caused your injury?',
            you:'Motorcycle Accident',
            alert:'N/A'
        },
        {
            question:'Do you currently have a lawyer representing your claim?',
            you:'No',
            alert:'N/A'
        },
        {
            question:'Did you sustain any of the following?',
            you:'Headaches',
            alert:'N/A'
        },
        {
            question:'Did the injury require hospitalization, medical treatment, surgery or cause you to miss work?',
            you:'Yes',
            alert:'N/A'
        },
        {
            question:'Select Year of Injury',
            you:'2020',
            alert:'N/A'
        },
        {
            question:'Describe your case	Test',
            you:'Description',
            alert:'N/A'
        }
    ];

    const dataDump = {
        "arrived_at": "2021-06-18T14:38:05Z",
        "test_mode": "false",
        "lead_first_name": "asdf sadf sdafdas fasdf asdfasdf",
        "lead_last_name": "asdf",
        "lead_email": "rudresh@yopmail.com",
        "lead_phone": "+19175405450",
        "case_type": "Auto Accident",
        "zip_code": "82001",
        "fields": [
           {
              "ref": "were_you_injured",
              "title": "Were you or a loved one Injured in an Accident that wasn’t your fault?",
              "answer": "yes"
           },
           {
              "ref": "injury_cause",
              "title": "What caused your injury?",
              "answer": "Motorcycle Accident"
           },
           {
              "ref": "have_attorney",
              "title": "Do you currently have a lawyer representing your claim?",
              "answer": "No"
           },
           {
              "ref": "primary_injury",
              "title": "Did you sustain any of the following?",
              "answer": "Headaches"
           },
           {
              "ref": "doctor_treatment",
              "title": "Did the injury require hospitalization, medical treatment, surgery or cause you to miss work?",
              "answer": "yes"
           },
           {
              "ref": "incident_date_option_b",
              "title": "Select Year of Injury",
              "answer": "2020"
           },
           {
              "ref": "comments",
              "title": "Describe your case",
              "answer": "test description"
           }
        ],
        "vendor_id": "yEj8J71lq9aXYMJlwxB6AR3rGLD2P0",
        "requestSlug": "create-lead",
        "type": "lead"
     }

    return (
        <div>
            <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <Button size='small' style={{marginBottom:10}} onClick={showDrawer}>Filter</Button>
            </div>

            <Drawer
                title="Filter"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width='100%'
            >
                <div onClick={onClose} style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                    <MdClose/>
                </div>

                <Input size='small' style={{width:'100%', marginBottom:10, marginTop:10}} placeholder='Name'/>
                <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Email'/>
                <Input size='small' style={{width:'100%', marginBottom:10}} placeholder='Phone'/>

                <RangePicker style={{width:'100%'}}/>

                <Select
                    showSearch
                    size='small'
                    style={{ width: '100%', marginBottom:10, marginTop:10}}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="All">All</Option>
                    <Option value="AA Deal">AA Deal</Option>
                    <Option value="PI Deal">PI Deal</Option>
                    <Option value="C Deal">C Deal</Option>
                </Select>

                <Button size='small' style={{width:'100%', marginTop:10}} onClick={onClose} type='primary'>Search</Button>
            </Drawer>

            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}><AiOutlineEye style={{fontSize:20, marginRight:5}}/> <Text style={{fontSize:15}}> - Quick View</Text></div>}
                placement="right"
                closable={false}
                onClose={onEyeClose}
                visible={eyeVisible}
                width='100%'
            >
                <div onClick={onEyeClose} style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                    <MdClose/>
                </div>

                <Collapse>
                    <Panel header="Call Logs" key="callLogs">
                        <CallLogs/>
                    </Panel>
                    <Panel header="API Dump" key="apiDump">
                        <ApiDump/>
                    </Panel>
                </Collapse>
            </Drawer>

            <Drawer
                title="Details"
                placement="right"
                closable={false}
                onClose={onShowDetailsClose}
                visible={showDetailsVisible}
                width='100%'
            >
                <div onClick={onShowDetailsClose} style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                    <MdClose/>
                </div>
                
                    <ShowDetails/>
            </Drawer>

            <IonList>
            { data.map((lead) => 
            <IonItemSliding id="item101">
                <IonItem style={{  borderLeft:lead.status == "sold" ? '5px solid #00B0FF' : '5px solid #00E676'}}>
                {/* <Card className="leadListCard" onClick={()=>handleLeadCard(lead)} style={{width:'100%', borderLeft:lead.status == "New" ? '5px solid #00E676' : '5px solid #00B0FF'}} > */}
                    {/* <Link to={'/'+lead.name}> */}
                    <IonLabel>
                    <div><Text style={{fontSize:'15px'}} strong type='secondary'>{lead.name} </Text></div>
                    <div><Text style={{fontSize:'12px'}} type='secondary'>{lead.state}</Text></div>
                    <div><Text style={{fontSize:'12px'}} type='secondary'>{lead.email}</Text></div>
                    <div><Text style={{fontSize:'12px'}} type='secondary'>{lead.caseType}</Text></div>
                    <div><Text style={{fontSize:'12px'}} type='secondary'>{lead.pixelResponse}</Text></div>
                    </IonLabel>
                   
                    <IonNote slot="end">
                        <div><Text style={{fontSize:'12px'}} type='secondary'>{lead.arrivedAt}</Text></div>
                        <div><Text style={{fontSize:'12px'}} type='secondary'>{lead.phone}</Text></div>
                        <div style={{marginTop:10, display:'flex'}}><AiOutlineEye onClick={showEyeDrawer} style={{fontSize:20, marginRight:15, display:userType == "admin" ? 'block' : 'none'}}/> <BiDetail onClick={ShowDetailsDrawer} style={{fontSize:20}}/></div>
                     
                    </IonNote>
                   
                </IonItem>

                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)'}}>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}} >
                    <TiDeleteOutline/>
                    {/* <AiOutlineEye onClick={() => setShowModal(true)} style={{color:'#191970', fontSize:25}}/> */}
                    </IonItemOption>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                        <Checkbox >Test</Checkbox>
                        
                        {/* <RiRefundLine  onClick={() => setShowRefundModal(true)} style={{color:'#191970', fontSize:25}}/> */}
                    </IonItemOption>
                </IonItemOptions>
                </IonItemSliding>
            )}
            </IonList>
        </div>
    )
}

export default Leads
