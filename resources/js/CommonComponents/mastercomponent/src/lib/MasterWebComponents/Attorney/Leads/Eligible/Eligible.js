import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, Dropdown, Menu } from 'antd';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { DownOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;

let eligibleleaddata = [
  {
      key:'1',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
  {
      key:'2',
      name:'Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
  {
      key:'3',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
  {
      key:'4',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
  {
      key:'5',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
  {
      key:'6',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
  {
      key:'7',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
  {
      key:'8',
      name:'John Doe Martins',
      casetype:`Auto Accident`,
      arrivaldate:'07/14/2020, 02:24 AM',
      location: 'Los Angeles, CA',
  },
]


const Eligible = ({eligibleleads}) => {

    const [searchText, setsearchText] = useState('')
    const [searchedColumn, setsearchedColumn] = useState('');
    // const [data, setdata] = useState(eligibleleaddata);
    const [data, setdata] = useState(eligibleleads||[]);

    const [openassignmodel, setopenassignmodel] = useState(false);
    const [currentAssignRecord, setcurrentAssignRecord] = useState();
    // const [openrefund, setopenrefund] = useState(false);
    // const [currentrefundrecord, setcurrentrefundrecord] = useState();
    // const [refundReason, setrefundReason] = useState('');
    // const [refundType, setrefundType] = useState('');
    // const [refundcomment, setrefundcomment] = useState('');

    useEffect(() => {
      if(eligibleleads){
        eligibleleads.map(data=>data.key = data.lead_id)
      }
      setdata(eligibleleads);
    }, [eligibleleads])

    const showAssignModal = (record) => {
        // console.log('record ',record)
        setcurrentAssignRecord(record);
        setopenassignmodel(true);
      };
    
      const handleAssignOk = () => {
        console.log('handleAssignOk')
        setcurrentAssignRecord();
        setopenassignmodel(false);
      };
    
      const handleAssignCancel = () => {
        console.log('handleAssignCancel');
        setcurrentAssignRecord();
        setopenassignmodel(false);
      };

    //   const showrefundModal = (record) => {
    //     // console.log('record ',record)
    //     setcurrentrefundrecord(record);
    //     setopenrefund(true);
    //   };
    
    //   const handlerefundOk = () => {
    //     console.log('handlerefundOk')
    //     setcurrentrefundrecord();
    //     setopenrefund(false);
    //   };
    
    //   const handlerefundCancel = () => {
    //     console.log('handlerefundCancel');
    //     setcurrentrefundrecord();
    //     setopenrefund(false);
    //   };

    //   const handleRefundReasonChange = (value) => {
    //     console.log(`selected ${value}`);
    //     setrefundReason(value);
    //   }

    //   const handleRefundTypeChange = (value) => {
    //     console.log(`selected ${value}`);
    //     setrefundType(value);
    //   }

    //   const handlerefundcomment = (value) => {
    //     console.log('value ',value);
    //     setrefundcomment(value);
    //   }

      const handleMenuClick =(e) =>{
        console.log('handleMenuClick ', e);
     }

     const handleActionMenuClick =(e) =>{
        console.log('handleActionMenuClick ', e);
     }

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

      const menu = (record) =>{
        //   console.log('menu record ',record);
        return(
            <Menu onClick={()=>handleMenuClick(record)}>
              <Menu.Item key="1">{ record.lead_contact ||'+1234567890'}</Menu.Item>
            </Menu>
          );
      } 


      const Actionmenu = (record) =>{
        // console.log('menu record ',record);
      return(
        <Menu onClick={(txt)=>handleActionMenuClick(txt)}>
          <Menu.Item key="1" onClick={()=>console.log('Actionmenu Quick View',record)}>
            Quick View
          </Menu.Item>
          <Menu.Item key="2" onClick={()=>console.log('Actionmenu View Details',record)}>
            View Details
          </Menu.Item>
          <Menu.Item key="3" onClick={()=>console.log('Actionmenu Delete',record)}>
            <span style={{color:'red'}}>Delete</span>
          </Menu.Item>
        </Menu>
      );
    } 
     

    const columns = [
        {
            title:'Name',
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
            title:'Location',
            dataIndex:'lead_location',
            key:'lead_location',
            width:120,
            ellipsis: true,
            ...getColumnSearchProps('lead_location'),
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Case Type',
            dataIndex:'lead_case_type',
            key:'lead_case_type',
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
                return record.lead_case_type.indexOf(value) === 0
            },
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
          title:'Arrival Date',
          dataIndex:'arrival_date',
          key:'arrival_date',
          width:140,
          ellipsis: true,
          // responsive: ['sm'],
          sorter: (a, b) => new Date(a.arrival_date) !== 'Invalid date' && new Date(b.arrival_date) !== 'Invalid date' && new Date(a.arrival_date) - new Date(b.arrival_date), //moment(text).tz("America/New_York")
          render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{!!text && moment(text).tz("America/New_York").format() !== 'Invalid Date' && moment(text).tz("America/New_York").format('MM-DD-YYYY HH:mm:ss')}</span>,//momentTimezone //'Asia/Calcutta'
          // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Actions',
            dataIndex:'actions',
            key:'actions',
            width:230,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Button type='primary' size={'small'} style={{marginRight:'2px'}} onClick={()=>showAssignModal(record)}>Assign</Button>
                                <Dropdown.Button type='primary' size={'small'} style={{marginRight:'2px'}} overlay={()=>menu(record)} onClick={()=>console.log('pressed action',record)}>Call</Dropdown.Button>
                                {/* <Button type='primary' size={'small'} onClick={()=>showrefundModal(record)}>Actions</Button>         */}
                                <Dropdown overlay={()=>Actionmenu(record)}>
                                    <Button type={'primary'} size={'small'}>
                                        Actions <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Modal title="Confirm" visible={openassignmodel} maskStyle={{outline:'none'}} mask={false} maskClosable={false} width={800} closable={false} footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                        <Button type={'primary'} style={{marginRight:'10px'}} onClick={()=>handleAssignCancel()}>Cancel</Button>
                                        <Button type={'primary'} onClick={()=>handleAssignOk()}>Assign</Button>
                                  </div>} onOk={handleAssignOk} 
                            // onCancel={handleAssignCancel} 
                            key={record}>
                                {/* <p>{currentAssignRecord && currentAssignRecord.name}</p> */}
                                {/* <div style={{width:'100%'}}>
                                    <div style={{color:'green',padding:'10px'}}>Confirm</div>
                                </div> */}
                                <div style={{width:'100%'}}>
                                    <div style={{fontWeight:'bold'}}>Do you want to assign the <b>John Doe</b> to Attorney <b>{ currentAssignRecord && currentAssignRecord.lead_name ||'testStagging attorneycms'}</b>?</div>
                                    <div style={{width:'100%',marginTop:'10px',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                                        <div style={{width:'50%'}}>
                                            <div>Lead Cost</div>
                                            <div>{currentAssignRecord && currentAssignRecord.lead_cost ||'-'}</div>
                                        </div>
                                        <div style={{width:'50%'}}>
                                            <div>Wallet Banlace</div>
                                            <div>{currentAssignRecord && currentAssignRecord.wallent_balance ||'-'}</div>
                                        </div>
                                    </div>
                                    <div style={{width:'100%',marginTop:'10px',marginBottom:'10px'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                    when an unknown printer took a galley of type and scrambled it to make a type 
                                    specimen book. It has survived not only five centuries, but also the leap 
                                    into electronic typesetting, remaining essentially unchanged. 
                                    It was popularised in the 1960s with the release of Letraset sheets containing 
                                    Lorem Ipsum passages, and more recently with desktop publishing software like
                                    Aldus PageMaker including versions of Lorem Ipsum.
                                    </div>
                                    {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                        <Button type={'primary'} style={{marginRight:'10px'}} onClick={()=>handleAssignCancel()}>Cancel</Button>
                                        <Button type={'primary'} onClick={()=>handleAssignOk()}>Assign</Button>
                                  </div> */}
                                </div>
                            </Modal>
                            </Radio.Group>
                            
                            {/* <Modal title="Refund Lead" width={400} visible={openrefund} onOk={handlerefundOk} footer={<></>} onCancel={handlerefundCancel} key={record}>
                                <p>{currentrefundrecord && currentrefundrecord.name}</p>
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
                                  <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                        <Button type={'primary'} onClick={()=>handlerefundOk()}>Refund</Button>
                                  </div>
                                </div>  
                            </Modal> */}
                    </Space>
                )
            }
        },
    ]

    
    return (
        <div style={{width:'100%',height:'100%'}}>
            <Table
                columns={columns} 
                dataSource={data} 
                pagination={false}
                size="small"
                // expandable={{ 
                //   expandedRowRender: record => (
                //   // <p style={{ margin: 0 }}>{record.i}</p>
                //   <div style={{width:'100%'}}>
                //       <div style={{width:'100%', marginTop:'10px'}}>
                //           <div style={{fontWeight:'bold'}}>Case History:</div>
                //           <div style={{width:'100%',marginTop:'10px'}}>
                //               <p>
                //                   <div> Q1. How long ago did the injury happen?</div>
                //                   <div> A: Less than 1 year</div>
                //               </p>

                //               <p>
                //                   <div> Q2. Did the injury require hospitalization, medical treatment, or surgery?</div>
                //                   <div> A: Yes</div>
                //               </p>

                //               <p>
                //                   <div> Q3. Were you at fault for the accident?</div>
                //                   <div> A: No</div>
                //               </p>

                //               <p>
                //                   <div> Q4. Do you already have a lawyer representing you?</div>
                //                   <div> A: No</div>
                //               </p>

                //               <p>
                //                   <div> Q5. What is the primary type of injury?</div>
                //                   <div> A: Other</div>
                //               </p>

                //               <p>
                //                   <div> Q6. Were you injured?</div>
                //                   <div> A: Yes</div>
                //               </p>

                //               <p>
                //                   <div> Q7. Position of power held by the abuser?</div>
                //                   <div> A: Motorcycle Accident</div>
                //               </p>

                //               <p>
                //                   <div>  Q8. Describe your case</div>
                //                   <div> A: I was in a motorcyycle accident on June 14 2020. I had a few injuries but the worst one is my broken foot. I did not have insurance and I couldnt work any more and my foot is so bad off that I dont thinm I will ever be able to walk cometelynormalagain and</div>
                //               </p>

                //               <p>
                //                   <div>  Q9. Please read and accept our Terms of Service</div>
                //                   <div> A: I accept</div>
                //               </p>
                //           </div>
                //       </div>
                //   </div>
                //   ),
                //   // rowExpandable: record => record.name !== 'Not Expandable',
                // }}
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    x: 800
                  }}
            />
        </div>
    )
}

export default Eligible;
