import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input } from 'antd';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import {ImCross, ImCheckmark} from 'react-icons/im';
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment";

import CaseHistory from '../CaseHistory/CaseHistory';

const { Option } = Select;

let reportedleaddata = [
  {
      key:'1',
      lead_name:'John Doe Martins',
      lead_case_type:`Auto Accident`,
      reported_at:'07/14/2020, 01:24 AM',
      assigned_at:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
  {
      key:'2',
      leadname:'Doe Martins',
      casetype:`Auto Accident`,
      reportedat:'07/14/2020, 01:24 AM',
      assignedat:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
  {
      key:'3',
      leadname:'John Doe Martins',
      casetype:`Auto Accident`,
      reportedat:'07/14/2020, 01:24 AM',
      assignedat:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
  {
      key:'4',
      leadname:'John Doe Martins',
      casetype:`Auto Accident`,
      reportedat:'07/14/2020, 01:24 AM',
      assignedat:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
  {
      key:'5',
      leadname:'John Doe Martins',
      casetype:`Auto Accident`,
      reportedat:'07/14/2020, 01:24 AM',
      assignedat:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
  {
      key:'6',
      leadname:'John Doe Martins',
      casetype:`Auto Accident`,
      reportedat:'07/14/2020, 01:24 AM',
      assignedat:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
  {
      key:'7',
      leadname:'John Doe Martins',
      casetype:`Auto Accident`,
      reportedat:'07/14/2020, 01:24 AM',
      assignedat:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
  {
      key:'8',
      leadname:'John Doe Martins',
      casetype:`Auto Accident`,
      reportedat:'07/14/2020, 01:24 AM',
      assignedat:'07/14/2020, 02:24 AM',
      reason:'False or nonsensical information',
      status: 'In Progress',
  },
]

const Reported = ({user,reportedleads}) => {

    const [searchText, setsearchText] = useState('')
    const [searchedColumn, setsearchedColumn] = useState('');
    const [data, setdata] = useState(reportedleads||[]); //reportedleaddata

    const [openeyemodel, setopeneyemodel] = useState(false);
    const [currenteyerecord, setcurrenteyerecord] = useState();
    const [openrefund, setopenrefund] = useState(false);
    const [currentrefundrecord, setcurrentrefundrecord] = useState();
    const [openResolveModel, setopenResolveModel] = useState(false);
    const [currentResolveRecord, setcurrentResolveRecord] = useState();
    const [refundReason, setrefundReason] = useState('');
    const [refundType, setrefundType] = useState('');
    const [refundcomment, setrefundcomment] = useState('');


    useEffect(() => {
      if(reportedleads && reportedleads.length>0){
        reportedleads.map(item=>{item.key = item.lead_id});
        setdata(reportedleads);
      }
    }, [reportedleads])

     // preview/eye funtions
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

       // refund funtions
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

      const handleRefundTypeChange = (value) => {
        console.log(`selected ${value}`);
        setrefundType(value);
      }

      const handlerefundcomment = (value) => {
        console.log('value ',value);
        setrefundcomment(value);
      }

      // resolve funtions
      const showrresolveModal = (record) => {
        // console.log('record ',record)
        setcurrentResolveRecord(record);
        setopenResolveModel(true);
      };
    
      const handleresolveOk = () => {
        console.log('handleresolveOk')
        setcurrentResolveRecord();
        setopenResolveModel(false);
      };
    
      const handleresolveCancel = () => {
        console.log('handleresolveCancel');
        setcurrentResolveRecord();
        setopenResolveModel(false);
      };
      //

      let searchInput;

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

    const columns = [
        {
            title:'Lead Name',
            dataIndex:'lead_name',
            key:'lead_name',
            width:120,
            ellipsis: true,
            fixed:'left',
            ...getColumnSearchProps('lead_name'),
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
            title:'Reason',
            dataIndex:'reason',
            key:'reason',
            width:120,
            ellipsis: true,
            align:'center',
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Status',
            dataIndex:'status',
            key:'status',
            width:150,
            ellipsis: true,
            align:'center',
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
          title:'Reported at',
          dataIndex:'reported_at',
          key:'reported_at',
          width:140,
          ellipsis: true,
          align:'center',
          // responsive: ['sm'],
          sorter: (a, b) => new Date(a.reported_at) !== 'Invalid date' && new Date(b.reported_at) !== 'Invalid date' && new Date(a.reported_at) - new Date(b.reported_at), //moment(text).tz("America/New_York")
          render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{!!text && moment(text).tz("America/New_York").format() !== 'Invalid Date' && moment(text).tz("America/New_York").format('MM-DD-YYYY HH:mm:ss')}</span>,//momentTimezone //'Asia/Calcutta'
          // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Assigned at',
            dataIndex:'assigned_at',
            key:'assigned_at',
            width:140,
            ellipsis: true,
            align:'center',
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
                                <Button type='primary' size={'small'} style={{marginRight:'1px'}} onClick={()=>showeyeModal(record)} icon={<AiFillEye />}></Button>
                                {user && user.usertype === 'admin' ? <Button type='primary' size={'small'} style={{marginRight:'1px'}} onClick={()=>showrresolveModal(record)} icon={<ImCross />}></Button> : null }
                                {user && user.usertype === 'admin' ? <Button type='primary' size={'small'} onClick={()=>showrefundModal(record)} icon={<FaMoneyBillAlt />}></Button> : null}       
                            </Radio.Group>
                            <Modal title="Preview" visible={openeyemodel} mask={false} width={user && user.usertype === 'admin' ? 1000: 500} footer={<Button type={'primary'} onClick={handleeyeCancel} >Cancel</Button>} onOk={handleeyeOk} onCancel={handleeyeCancel} key={record}>
                                {/* <p>{currenteyerecord && currenteyerecord.leadname}</p> */}
                                

                                  { user && user.usertype === 'admin' ? 
                                  (<div style={{width:'100%',height:'300px',overflowY:'scroll', marginTop:'10px'}}>
                                    <CaseHistory case_history={currenteyerecord && currenteyerecord.raw_data} />
                                    <div style={{width:'100%',marginTop:'10px'}}>
                                      <div style={{width:'100%',marginBottom:'10px'}}>
                                        <div style={{fontWeight:'bold',marginRight:'10px'}}>Dispute</div>
                                        <div>
                                          <span style={{marginRight:'10px'}}>Case type:</span>
                                          <span>{ currenteyerecord && currenteyerecord.lead_case_type || 'Auto Accident'}</span>
                                        </div>
                                      </div>

                                      <div style={{width:'100%',marginBottom:'10px'}}>
                                        <div style={{fontWeight:'bold',marginRight:'10px'}}>Dispute Status</div>
                                        <div>
                                          <span style={{marginRight:'10px'}}>Status:</span>
                                          <span>Refunded Partially</span>
                                        </div>
                                      </div>
                                      
                                      <div style={{width:'100%',marginBottom:'10px'}}>
                                        <div style={{fontWeight:'bold',marginRight:'10px'}}>Dispute Comment</div>
                                        <div>
                                          <span style={{marginRight:'10px'}}>Comment:</span>
                                          <span>{ currenteyerecord && currenteyerecord.dispute_comment || 'wdqwefefwefwefwcewccec'}</span>
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                    ):
                                    (<div style={{width:'100%'}}>
                                      <div>
                                        <span style={{fontWeight:'bold',marginRight:'10px'}}>Lead Location</span>
                                        <span>{currenteyerecord && currenteyerecord.lead_location || 'CY, WV'}</span>
                                      </div>
                                      <div>
                                        <span style={{fontWeight:'bold',marginRight:'10px'}}>Your Comment</span>
                                        <span>Admin Intended refund</span>
                                      </div>
                                    </div>)
                                    }
                                    {/* <div style={{fontWeight:'bold'}}>Case History:</div>
                                    <div style={{width:'100%',marginTop:'10px'}}>
                                        <p>
                                            <div> Q1. How long ago did the injury happen?</div>
                                            <div> A: Less than 1 year</div>
                                        </p>

                                        <p>
                                            <div> Q2. Did the injury require hospitalization, medical treatment, or surgery?</div>
                                            <div> A: Yes</div>
                                        </p>

                                        <p>
                                            <div> Q3. Were you at fault for the accident?</div>
                                            <div> A: No</div>
                                        </p>

                                        <p>
                                            <div> Q4. Do you already have a lawyer representing you?</div>
                                            <div> A: No</div>
                                        </p>

                                        <p>
                                            <div> Q5. What is the primary type of injury?</div>
                                            <div> A: Other</div>
                                        </p>

                                        <p>
                                            <div> Q6. Were you injured?</div>
                                            <div> A: Yes</div>
                                        </p>

                                        <p>
                                            <div> Q7. Position of power held by the abuser?</div>
                                            <div> A: Motorcycle Accident</div>
                                        </p>

                                        <p>
                                            <div>  Q8. Describe your case</div>
                                            <div> A: I was in a motorcyycle accident on June 14 2020. I had a few injuries but the worst one is my broken foot. I did not have insurance and I couldnt work any more and my foot is so bad off that I dont thinm I will ever be able to walk cometelynormalagain and</div>
                                        </p>

                                        <p>
                                            <div>  Q9. Please read and accept our Terms of Service</div>
                                            <div> A: I accept</div>
                                        </p>
                                    </div> */}
                                {/* </div> */}
                            </Modal>

                            <Modal title="Resolve Dispute" maskClosable={false} mask={false} width={400} visible={openResolveModel} onOk={handleresolveOk} 
                                footer={ <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                        <Button style={{background:'#777',color:'white',marginRight:'10px'}} onClick={()=>handleresolveCancel()}><ImCross /><span style={{marginLeft:'5px'}}>Cancel</span></Button>
                                        <Button type={'primary'} onClick={()=>handleresolveOk()}><ImCheckmark /><span style={{marginLeft:'5px'}}>Yes</span></Button>
                                  </div>} onCancel={handleresolveCancel} key={record}>
                                {/* <p>{currentResolveRecord && currentResolveRecord.leadname}</p> */}
                                <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                                    <div style={{width:'100%',marginBottom:'20px'}}>
                                        Are you sure, you want to reject/resolve this Attorney's dispute?
                                    </div>
                                  {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                        <Button style={{background:'#777',color:'white',marginRight:'10px'}} onClick={()=>handleresolveCancel()}><ImCross /><span style={{marginLeft:'5px'}}>Cancel</span></Button>
                                        <Button type={'primary'} onClick={()=>handleresolveOk()}><ImCheckmark /><span style={{marginLeft:'5px'}}>Yes</span></Button>
                                  </div> */}
                                </div>  
                            </Modal>

                            <Modal title="Refund Lead" maskClosable={false} mask={false} width={400} visible={openrefund} onOk={handlerefundOk} footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                        <Button type={'primary'} onClick={()=>handlerefundOk()}>Refund</Button>
                                  </div>} onCancel={handlerefundCancel} key={record}>
                                {/* <p>{currentrefundrecord && currentrefundrecord.leadname}</p> */}
                                <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                                    <Select placeholder={'Refund Reason'} style={{ width: '250px',marginBottom:'10px' }} onChange={handleRefundReasonChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>

                                    <Select placeholder={'Refund Type'} style={{ width: '250px',marginBottom:'10px' }} onChange={handleRefundTypeChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    
                                  <Input value={refundcomment} placeholder={'Refund Comment'} style={{marginBottom:'10px'}} onChange={(txt)=>handlerefundcomment(txt)}/>
                                  {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                        <Button type={'primary'} onClick={()=>handlerefundOk()}>Refund</Button>
                                  </div> */}
                                </div>  
                            </Modal>
                    </Space>
                )
            }
        },
    ]

  console.log('user ',user)
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
                    {user && user.usertype === 'admin' ? (
                      <div style={{width:'100%'}}>
                          <CaseHistory case_history={record && record.raw_data} />
                          <div style={{width:'100%',marginTop:'10px'}}>
                            <div style={{width:'100%',marginBottom:'10px'}}>
                              <div style={{fontWeight:'bold',marginRight:'10px'}}>Dispute</div>
                              <div>
                                <span style={{marginRight:'10px'}}>Case type:</span>
                                <span>{ record && record.lead_case_type || 'Auto Accident'}</span>
                              </div>
                            </div>

                            <div style={{width:'100%',marginBottom:'10px'}}>
                              <div style={{fontWeight:'bold',marginRight:'10px'}}>Dispute Status</div>
                              <div>
                                <span style={{marginRight:'10px'}}>Status:</span>
                                <span>Refunded Partially</span>
                              </div>
                            </div>
                            
                            <div style={{width:'100%',marginBottom:'10px'}}>
                              <div style={{fontWeight:'bold',marginRight:'10px'}}>Dispute Comment</div>
                              <div>
                                <span style={{marginRight:'10px'}}>Comment:</span>
                                <span>{ record && record.dispute_comment || 'wdqwefefwefwefwcewccec'}</span>
                              </div>
                            </div>
                          </div>
                      </div>
                      
                      ):
                      (<div style={{width:'100%'}}>
                        <div>
                          <span style={{fontWeight:'bold',marginRight:'10px'}}>Lead Location</span>
                          <span>{currenteyerecord && currenteyerecord.lead_location || 'CY, WV'}</span>
                        </div>
                        <div>
                          <span style={{fontWeight:'bold',marginRight:'10px'}}>Your Comment</span>
                          <span>Admin Intended refund</span>
                        </div>
                      </div>)
                    }
                    
                      {/* <div style={{width:'100%', marginTop:'10px'}}> */}
                          {/* <div style={{fontWeight:'bold'}}>Case History:</div>
                          <div style={{width:'100%',marginTop:'10px'}}>
                              <p>
                                  <div> Q1. How long ago did the injury happen?</div>
                                  <div> A: Less than 1 year</div>
                              </p>

                              <p>
                                  <div> Q2. Did the injury require hospitalization, medical treatment, or surgery?</div>
                                  <div> A: Yes</div>
                              </p>

                              <p>
                                  <div> Q3. Were you at fault for the accident?</div>
                                  <div> A: No</div>
                              </p>

                              <p>
                                  <div> Q4. Do you already have a lawyer representing you?</div>
                                  <div> A: No</div>
                              </p>

                              <p>
                                  <div> Q5. What is the primary type of injury?</div>
                                  <div> A: Other</div>
                              </p>

                              <p>
                                  <div> Q6. Were you injured?</div>
                                  <div> A: Yes</div>
                              </p>

                              <p>
                                  <div> Q7. Position of power held by the abuser?</div>
                                  <div> A: Motorcycle Accident</div>
                              </p>

                              <p>
                                  <div>  Q8. Describe your case</div>
                                  <div> A: I was in a motorcyycle accident on June 14 2020. I had a few injuries but the worst one is my broken foot. I did not have insurance and I couldnt work any more and my foot is so bad off that I dont thinm I will ever be able to walk cometelynormalagain and</div>
                              </p>

                              <p>
                                  <div>  Q9. Please read and accept our Terms of Service</div>
                                  <div> A: I accept</div>
                              </p>
                          </div> */}
                      {/* </div> */}
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

export default Reported;
