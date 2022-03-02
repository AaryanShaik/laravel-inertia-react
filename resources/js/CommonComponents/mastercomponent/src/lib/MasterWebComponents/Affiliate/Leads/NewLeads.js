import React,{ useState, useEffect, useRef} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, Menu, Dropdown, Tooltip, Collapse, Tabs } from 'antd';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiFillEye, AiFillInfoCircle } from 'react-icons/ai';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';
import CallLogsTable from './CallLogsTable/CallLogsTable';

import {useTranslation} from "react-i18next";

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

const { Panel } = Collapse;

const NewLeads = ({user,handlesubmitnoofleadchange}) => {

    const {t, i18n} = useTranslation('common');
     
    const [searchText, setsearchText] = useState('')
    const [searchedColumn, setsearchedColumn] = useState('');

    const [openShowDetailsmodel, setopenShowDetailsmodel] = useState(false);
    const [currentShowDetailrecord, setcurrentShowDetailrecord] = useState();
    

    const showDetailsModal = (record) => {
        // console.log('record ',record)
        setcurrentShowDetailrecord(record);
        setopenShowDetailsmodel(true);
      };
    
      const handleShowDetailsOk = () => {
        console.log('handleShowDetailsOk')
        setcurrentShowDetailrecord();
        setopenShowDetailsmodel(false);
      };
    
      const handleShowDetailsCancel = () => {
        console.log('handleShowDetailsCancel');
        setcurrentShowDetailrecord();
        setopenShowDetailsmodel(false);
      };

    const DataExploreObj = {
      arrived_at: "2021-06-25T09:17:50Z",
      test_mode: "false",
      lead_first_name: "testRequali03",
      lead_last_name: "testRequali03",
      lead_email: "testRequali03@accident.com",
      lead_phone: "+16467011444",
      case_type: "Auto Accident",
      zip_code: "65483",
      deal: "Ld3azYW8eAyXnk2x5174BoQpORJ0mD",
      fields: [
          {
              ref: "were_you_injured",
              title: "Were you or a loved one Injured in an Accident that wasn't",
              answer: "Yes"
          },
          {
              ref: "were_you_at_fault",
              title: "Were you or a loved one Injured in an Accident that wasn't",
              answer: "no"
          },
          {
              ref: "abuser_power",
              title: "What caused your injury?",
              answer: "Motorcycle Accident"
          },
          {
              ref: "have_attorney",
              title: "Do you currently have a lawyer representing your claim?",
              answer: "no"
          },
          {
              ref: "primary_injury",
              title: "Did you sustain any of the following?",
              answer: "Other"
          },
          {
              ref: "doctor_treatment",
              title: "Did the injury require hospitalization, medical treatment",
              answer: "Yes"
          },
          {
              ref: "incident_date_option_b",
              title: "Select Year of Injury",
              answer: "less than 1 year"
          },
          {
              ref: "comments",
              title: "describe your case",
              answer: "I was in a motorcyycle accident on June 14 2020. I had a few injuries but the worst one is my broken foot. I did not have insurance and I couldnt work any more and my foot is so bad off that I dont thinm I will ever be able to walk cometelynormalagain and"
          }
      ],
      vendor_id: "d4xEPD3X8NJGV5oRwamAjLYr071b6K",
      requestSlug: "lead-create",
      type: "lead"
      }
    
    let searchInput;

      const menu = () => (
        <Menu>
          <Menu.Item key="1">{t('MarkAsTest')}</Menu.Item>
          <Menu.Item key="2">{t('Reject')}</Menu.Item>
        </Menu>
      );

     const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                //   this.setState({
                //     searchText: selectedKeys[0],
                //     searchedColumn: dataIndex,
                //   });
                  setsearchText(selectedKeys[0]);
                  setsearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select(), 100);
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // this.setState({
        //   searchText: selectedKeys[0],
        //   searchedColumn: dataIndex,
        // });
        setsearchText(selectedKeys[0]);
        setsearchedColumn(dataIndex);
      };
    
      const handleReset = clearFilters => {
        clearFilters();
        // this.setState({ searchText: '' });
        setsearchText('');
      };


      const summarydata = [
        {
            question:`Were you or a loved one Injured in an Accident that wasn't your fault?`,
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
            question:'Describe your case  Test',
            you:'Description',
            alert:'N/A'
        }
    ];

    const summarycolumns = [
      {
          title:t('Question'),
          dataIndex:'question',
          key:'question',
          // align:'center',
          width:400,
          // ellipsis: true,
          // responsive: ['sm'],
          render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
      },
      {
        title: t('You'),
        dataIndex:'you',
        key:'you',
        // align:'center',
        width:100,
        ellipsis: true,
        // responsive: ['sm'],
        render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
      },
      {
        title: t('Alert'),
        dataIndex:'alert',
        key:'alert',
        // align:'center',
        width:100,
        ellipsis: true,
        // responsive: ['sm'],
        render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
      },
    ]
    

    let columns = [
        {
            title: t('Arrivedat'),
            dataIndex:'arrivedat',
            key:'arrivedat',
            align:'center',
            width:140,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
          title: t('Source'),
          dataIndex:'source',
          key:'source',
          align:'center',
          width:70,
          ellipsis: true,
          // ...getColumnSearchProps('source'),
          // responsive: ['sm'],
          render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title: t('Name'),
            dataIndex:'name',
            key:'name',
            align:'center',
            width:120,
            ellipsis: true,
            ...getColumnSearchProps('name'),
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {...(user && user.usertype === 'admin' && {
          title: t('PixelResponse'),
          dataIndex:'pixelresponse',
          key:'pixelresponse',
          align:'center',
          width:120,
          ellipsis: true,
          // responsive: ['sm'],
          render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
      })},
        // {
        //     title:'Pixel Response',
        //     dataIndex:'pixelresponse',
        //     key:'pixelresponse',
        //     align:'center',
        //     width:120,
        //     ellipsis: true,
        //     // responsive: ['sm'],
        //     render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        // },
        {
            title: t('Email'),
            dataIndex:'email',
            key:'email',
            align:'center',
            width:150,
            ellipsis: true,
            ...getColumnSearchProps('email'),
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title: t('Phone'),
            dataIndex:'phone',
            key:'phone',
            align:'center',
            width:120,
            ellipsis: true,
            ...getColumnSearchProps('phone'),
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title: t('CaseType'),
            dataIndex:'casetype',
            key:'casetype',
            align:'center',
            width:120,
            ellipsis: true,
            filters: [
                { text: 'Construction', value: 'Construction' },
                { text: 'PIA', value: 'PIA' },
                { text: 'Real Estate', value: 'Real Estate' },
                { text: 'House Repairs', value: 'House Repairs' },
                { text: 'Auto Accident ES', value: 'Auto Accident ES' },
                { text: 'Mortgage Finance', value: 'Mortgage Finance' },
                { text: 'Personal Injury', value: 'Personal Injury' },
                { text: 'Sexual Assault', value: 'Sexual Assault' },
                { text: 'Auto Accident', value: 'Auto Accident' },
                { text: 'Medical Malpractice', value: 'Medical Malpractice' },
                { text: 'Workers Compensation', value: 'Workers Compensation' },
                { text: 'Wrongful Death', value: 'Wrongful Death' },
                { text: 'Others', value: 'Others' },
              ],
            onFilter: (value, record) => {
                return record.casetype.indexOf(value) === 0
            },
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title: t('Status'),
            dataIndex:'status',
            key:'status',
            align:'center',
            width:150,
            filters: [
                { text: 'Sold', value: 'Sold' },
                { text: 'Unsold', value: 'Unsold' },
              ],
            onFilter: (value, record) => {
                return record.status.indexOf(value) === 0
            },
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}<Tooltip><AiFillInfoCircle /></Tooltip></span>,
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <span style={{padding:'0px',margin:'0px 5px 0 0',fontSize:'12px'}}>{record.status}</span>
                        <Tooltip title={record.i}><AiFillInfoCircle /></Tooltip>
                    </div>
                )
            }
        },
        {
            title: t('State'),
            dataIndex:'state',
            key:'state',
            align:'center',
            width:150,
            ...getColumnSearchProps('state'),
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title: t('Actions'),
            dataIndex:'actions',
            key:'actions',
            align:'center',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                      <Dropdown.Button overlay={menu} onClick={()=>showDetailsModal(record)} >{t('ShowDetails')}</Dropdown.Button>
                      <Modal title="Show Details" mask={false} maskClosable={false} width={700} visible={openShowDetailsmodel} footer={<div><Button type={'primary'} onClick={handleShowDetailsCancel}>{t('Close')}</Button></div>} onOk={handleShowDetailsOk} onCancel={handleShowDetailsCancel} key={record}>
                            {/* {currentShowDetailrecord && currentShowDetailrecord.name} */}
                            <div style={{width:'100%'}}>
                                <Tabs defaultActiveKey="1" size={'small'}> 
                                  <TabPane tab={t(`Details`)} key="1" style={{margin:'0px',padding:'0px',width:'100%',height:'100%'}}>
                                    <div style={{width:'100%',height:'35vh',overflowY:'scroll'}}>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('ArrivedOn')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>18 June 2021 2:38 pm</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('CaseType')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>Auto Accident</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('State')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>Wyoming</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('AlertPostOn')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>N/A</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('Status')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>N/A</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('Result')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>Rejected</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('Reason')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>No Affiliate deal found for practice area Auto Accident</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('CustomerID')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>xqwecv3tg4fcdcwc3cw3qwxe3dwd2</div>
                                      </div>
                                      <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <div style={{width:'30%',marginBottom:'10px'}}>{t('AlertLeadID')}</div>
                                        <div style={{width:'70%',marginBottom:'10px'}}>N/A</div>
                                      </div>
                                    </div>
                                  </TabPane>
                                  <TabPane tab={t("Summary")} key="2" style={{margin:'0px',padding:'0px',width:'100%',height:'100%'}} >
                                  <div style={{width:'100%',height:'35vh',overflowY:'scroll'}}>
                                    <Table
                                        columns={summarycolumns} 
                                        dataSource={summarydata} 
                                        pagination={false}
                                        size="small"
                                        // scroll={{ scrollToFirstRowOnChange: false }}
                                        // scroll={{
                                        //     x: 800
                                        //   }}
                                    />
                                    </div>
                                  </TabPane>
                                </Tabs>
                            </div>
                        </Modal>
                    </Space>
                )
            }
        },
    ]

    columns =  columns.filter(value => Object.keys(value).length !== 0);

    const data = [
        {
            key:'1',  //key variable is important
            name:'John Doe Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Unsold',
            source:'OPT1',
            i:'Rejected',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
        {
            key:'2',
            name:'Doe Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Sold',
            source:'OPT2',
            i:'Accepted',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
        {
            key:'3',
            name:'Luke Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Unsold',
            source:'OPT1',
            i:'Rejected',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
        {
            key:'4',
            name:'John Doe Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Sold',
            source:'OPT1',
            i:'Accepted',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
        {
            key:'5',
            name:'John Doe Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Unsold',
            source:'OPT1',
            i:'Rejected',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
        {
            key:'6',
            name:'John Doe Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Sold',
            source:'OPT1',
            i:'Accepted',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
        {
            key:'7',
            name:'John Doe Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Sold',
            source:'OPT1',
            i:'Accepted',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
        {
            key:'8',
            name:'John Doe Martins',
            casetype:`Auto Accident`,
            arrivedat:'07/14/2020, 02:24 AM',
            status: 'Unsold',
            source:'OPT1',
            i:'Rejected',
            state: 'WY',
            email:'johndoe@gmail.com',
            phone:'+1234567890'
        },
    ]

    const handleonnoofleadschange = (num) =>{
      try{
        console.log(num);
        handlesubmitnoofleadchange(num);
      }catch(err){
        console.log('err',err)
      }
    }

    return (
        <div style={{width:'100%',height:'100%'}}>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:'100%',margin:"10px 0"}}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <div style={{marginRight:'10px'}}>No. of leads</div>
                <Select defaultValue="10" onChange={handleonnoofleadschange} style={{ width: 120 }}>
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                  <Option value="50">50</Option>
                  <Option value="100">100</Option>
                  <Option value="150">150</Option>
                  <Option value="200">200</Option>
                  <Option value="300">300</Option>
                  <Option value="350">350</Option>
                  <Option value="400">400</Option>
                  <Option value="500">500</Option>
                  <Option value="700">700</Option>
                  <Option value="1000">1000</Option>
                </Select>
            </div>
          
          </div>
            <Table
                columns={columns} 
                dataSource={data} 
                pagination={false}
                size="small"
                expandable={user && user.usertype === 'admin'?{ 
                  expandedRowRender: record => (
                  // <p style={{ margin: 0 }}>{record.i}</p>
                  <Collapse accordion>
                    <Panel header="Call Logs" key="1">
                      {/* <p>{record.i}</p> */}
                      <CallLogsTable />
                    </Panel>
                    <Panel header="API Dump" key="2">
                      <Collapse accordion>
                        <Panel header="API Dump data 1" key="1">
                          <ReactJson src={DataExploreObj} displayDataTypes={false} displayObjectSize={false}/>
                        </Panel>
                      </Collapse>
                    </Panel>
                  </Collapse>
                  ),
                  // rowExpandable: record => record.name !== 'Not Expandable',
                }:null}
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    x: 800
                  }}
            />
        </div>
    )
}

export default NewLeads;
