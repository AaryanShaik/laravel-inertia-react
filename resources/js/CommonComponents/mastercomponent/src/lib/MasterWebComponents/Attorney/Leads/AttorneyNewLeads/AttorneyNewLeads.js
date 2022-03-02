import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, DatePicker, Upload, message  } from 'antd';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { SearchOutlined } from '@ant-design/icons';
import CaseHistory from '../CaseHistory/CaseHistory';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import moment from "moment";

import ReportLead from './ReportLead/ReportLead';

const { RangePicker } = DatePicker;
const { Option } = Select;

let newleaddatadata = [
  {
      key:'1',
      lead_name:'John Doe Martins',
      lead_case_type:`Auto Accident`,
      created_at:'07/14/2020, 02:24 AM',
      api_response_code: '',
      lead_email:'johndoe@gmail.com',
      lead_contact:'+1234567890'
  },
  {
      key:'2',
      name:'Doe Martins',
      casetype:`Auto Accident`,
      assignedat:'07/14/2020, 02:24 AM',
      apiresponse: '',
      email:'johndoe@gmail.com',
      phone:'+1234567890'
  },
  {
      key:'3',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      assignedat:'07/14/2020, 02:24 AM',
      apiresponse: '',
      email:'johndoe@gmail.com',
      phone:'+1234567890'
  },
  {
      key:'4',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      assignedat:'07/14/2020, 02:24 AM',
      apiresponse: '',
      email:'johndoe@gmail.com',
      phone:'+1234567890'
  },
  {
      key:'5',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      assignedat:'07/14/2020, 02:24 AM',
      apiresponse: '',
      email:'johndoe@gmail.com',
      phone:'+1234567890'
  },
  {
      key:'6',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      assignedat:'07/14/2020, 02:24 AM',
      apiresponse: '',
      email:'johndoe@gmail.com',
      phone:'+1234567890'
  },
  {
      key:'7',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      assignedat:'07/14/2020, 02:24 AM',
      apiresponse: '',
      email:'johndoe@gmail.com',
      phone:'+1234567890'
  },
  {
      key:'8',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      assignedat:'07/14/2020, 02:24 AM',
      apiresponse: '',
      email:'johndoe@gmail.com',
      phone:'+1234567890'
  },
]

const AttorneyNewLeads = ({user,purchasedleads}) => {

    const [searchText, setsearchText] = useState('')
    const [searchedColumn, setsearchedColumn] = useState('');

    const [openeyemodel, setopeneyemodel] = useState(false);
    const [currenteyerecord, setcurrenteyerecord] = useState();
    const [openrefund, setopenrefund] = useState(false);
    const [currentrefundrecord, setcurrentrefundrecord] = useState();
    const [refundReason, setrefundReason] = useState('');
    const [refundType, setrefundType] = useState('');
    const [refundcomment, setrefundcomment] = useState('');
    // const [data, setdata] = useState(newleaddatadata);
    const [data, setdata] = useState(purchasedleads||[]);

    const [openReportLead, setopenReportLead] = useState(false);
    const [currentReportLeadrecord, setcurrentReportLeadrecord] = useState();

    const [EyeopenReportLead, setEyeopenReportLead] = useState(false);
    const [EyecurrentReportLeadrecord, setEyecurrentReportLeadrecord] = useState();

    const [ReportReason, setReportReason] = useState('False or nonsensical information');
    const [falseornoncen, setfalseornoncen] = useState('Other');

    useEffect(() => {
      if(purchasedleads){
        purchasedleads.map(data=>data.key = data.lead_id)
      }
      setdata(purchasedleads);
    }, [purchasedleads])

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

      const showrefundModal = (record) => {
        // console.log('record ',record)
        setcurrentrefundrecord(record);
        setopenrefund(true);
      };
    
      const handlerefundOk = () => {
        console.log('handlerefundOk')
        setcurrentrefundrecord();
        setopenrefund(false);
      };
    
      const handlerefundCancel = () => {
        console.log('handlerefundCancel');
        setcurrentrefundrecord();
        setopenrefund(false);
      };

      const handleRefundReasonChange = (value) => {
        console.log(`selected ${value}`);
        setrefundReason(value);
      }

      const handleReportReasonChange = (value) => {
        console.log(`selected ${value}`);
        setReportReason(value);
      }

      const handleRefundTypeChange = (value) => {
        console.log(`selected ${value}`);
        setrefundType(value);
      }

      const handlerefundcomment = (value) => {
        console.log('value ',value);
        setrefundcomment(value);
      }


      //Report Lead Expandable
      const showReportLeadModal = (record) => {
        // console.log('record ',record)
        setcurrentReportLeadrecord(record);
        setopenReportLead(true);
      };
    
      const handleReportLeadOk = () => {
        console.log('handleReportLeadOk')
        setcurrentReportLeadrecord();
        setopenReportLead(false);
      };
    
      const handleReportLeadCancel = () => {
        console.log('handleReportLeadCancel');
        setcurrentReportLeadrecord();
        setopenReportLead(false);
      };

      const handleFONSIChange = (value) => {
        setfalseornoncen(value);
      }

      //Report Lead on eye click
      const showEyeReportLeadModal = (record) => {
        // console.log('record ',record)
        setEyecurrentReportLeadrecord(record);
        setEyeopenReportLead(true);
      };
    
      const handleEyeReportLeadOk = () => {
        console.log('handleReportLeadOk')
        setEyecurrentReportLeadrecord();
        setEyeopenReportLead(false);
      };
    
      const handleEyeReportLeadCancel = () => {
        console.log('handleReportLeadCancel');
        setEyecurrentReportLeadrecord();
        setEyeopenReportLead(false);
      };

      const handleEyeFONSIChange = (value) => {
        setfalseornoncen(value);
      }

    
      let searchInput;

      // console.log('user ',user)

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

    let columns = [
        {
            title:'Name',
            dataIndex:'lead_name',
            key:'lead_name',
            width:120,
            fixed:'left',
            ellipsis: true,
            align:'center',
            ...getColumnSearchProps('lead_name'),
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {...(user && user.usertype === "admin" && {
            title:'API Response',
            dataIndex:'api_response_code',
            key:'api_response_code',
            width: 120,
            ellipsis: true,
            align:'center',
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
          })},
        {
            title:'Email',
            dataIndex:'lead_email',
            key:'lead_email',
            width:150,
            ellipsis: true,
            align:'center',
            ...getColumnSearchProps('lead_email'),
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Phone',
            dataIndex:'lead_contact',
            key:'lead_contact',
            width:120,
            ellipsis: true,
            align:'center',
            ...getColumnSearchProps('lead_contact'),
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Case Type',
            dataIndex:'lead_case_type',
            key:'lead_case_type',
            width:120,
            ellipsis: true,
            align:'center',
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
                return record.lead_case_type.indexOf(value) === 0
            },
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
          title:'Assigned at',
          dataIndex:'assigned_at',
          key:'assigned_at',
          width:140,
          ellipsis: true,
          align:'center',
          // ...getColumnSearchProps('name'),
          // responsive: ['sm'],
          sorter: (a, b) => new Date(a.assigned_at) !== 'Invalid date' && new Date(b.assigned_at) !== 'Invalid date' && new Date(a.assigned_at) - new Date(b.assigned_at), //moment(text).tz("America/New_York")
          render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{!!text && moment(text).tz("America/New_York").format() !== 'Invalid Date' && moment(text).tz("America/New_York").format('MM-DD-YYYY HH:mm:ss')}</span>,//momentTimezone //'Asia/Calcutta'
          // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Actions',
            dataIndex:'actions',
            key:'actions',
            width:120,
            align:'center',
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Button type='primary' size={'small'} style={{marginRight:'1px'}} onClick={()=>showeyeModal(record)} ><AiFillEye /></Button>
                               {user && user.usertype === 'admin' ? <Button type='primary' size={'small'} onClick={()=>showrefundModal(record)}><FaMoneyBillAlt /></Button>:null}        
                            </Radio.Group>
                            <Modal title="Preview" visible={openeyemodel} mask={false} maskClosable={false} width={1000} footer={<div><Button type={'primary'} onClick={handleeyeCancel}>Cancel</Button></div>} onOk={handleeyeOk} onCancel={handleeyeCancel} key={record}>
                                {/* <p>{currenteyerecord && currenteyerecord.name}</p> */}
                                <div style={{width:'100%',height:'300px',overflowY:'scroll', marginTop:'10px'}}>
                                    <CaseHistory case_history={currenteyerecord && currenteyerecord.raw_data}/>
                                    <div style={{width:'100%',margin:'10px 0',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                      <div>
                                        <span style={{fontWeight:'bold',marginRight:'10px'}}>Location</span>
                                        <span>{currenteyerecord && currenteyerecord.lead_location || 'CY, WV'}</span>
                                      </div>
                                      <div style={{paddingRight:'20px'}}>
                                        <div onClick={()=>showEyeReportLeadModal()} style={{color:'#48A9FF',cursor:'pointer'}}>Report Lead</div>
                                        <ReportLead record={record} openReportLead={EyeopenReportLead} handleReportLeadOk={handleEyeReportLeadOk} handleReportLeadCancel={handleEyeReportLeadCancel} />        
                                      </div>
                                    </div>
                                </div>
                            </Modal>
                            
                    </Space>
                )
            }
        },
    ]

    columns =  columns.filter(value => Object.keys(value).length !== 0);

    const onDateTimeChange = (value, dateString) =>{
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    }
    
    const onOk = (value) => {
      console.log('onOk: ', value);
    }

    const uploadFileprops = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    // console.log('columns ',columns)

    return (
        <div style={{width:'100%',height:'100%'}}>
            <Table
                columns={columns} 
                dataSource={data} 
                pagination={false}
                size="small"
                expandable={{ 
                    expandedRowRender: record => (
                    // <p style={{ margin: 0 }}>{record.i}</p>
                    <div style={{width:'100%'}}>
                       <CaseHistory case_history={record && record.raw_data} />
                       <div style={{width:'100%',margin:'10px 0',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                          <div>
                            <span style={{fontWeight:'bold',marginRight:'10px'}}>Location</span>
                            <span>{record && record.lead_location || 'CY, WV'}</span>
                          </div>
                          <div style={{paddingRight:'20px'}}>
                            <div onClick={()=>showReportLeadModal()} style={{color:'#48A9FF',cursor:'pointer'}}>Report Lead</div>
                          </div>
                        </div>
                        <ReportLead record={record} openReportLead={openReportLead} handleReportLeadOk={handleReportLeadOk} handleReportLeadCancel={handleReportLeadCancel} />
                    </div>
                    ),
                    // rowExpandable: record => record.name !== 'Not Expandable',
                  }}
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    x: 800
                  }}
            />
        </div>
    )
}

export default AttorneyNewLeads;
