import React,{useState, useEffect} from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Modal, Tabs, Select, Input, Checkbox, Table, Space, Radio, Switch } from 'antd';
import { GrSend } from 'react-icons/gr';
import {FaLink} from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';


const { TabPane } = Tabs;
const { Option, OptGroup } = Select;


const data = [
    {
        key:'1',
        frequency:'Daily',
        maxlimit:`150`,
    },
    {
        key:'2',
        frequency:'Monthly',
        maxlimit:`150`,
    },
    // {
    //     key:'3',
    //     frequency:'120',
    //     maxlimit:`150`,
    // },
    // {
    //     key:'4',
    //     frequency:'120',
    //     maxlimit:`150`,
    // },
]

const Settings = ({settingsdata,updatedCapsTableData,updatedSettingsData,editmode}) => {

    const [openAddCapsmodel, setopenAddCapsmodel] = useState(false);
    const [openEditCapsmodel, setopenEditCapsmodel] = useState(false);
    const [addCapsInputData, setaddCapsInputData] = useState({key:"",frequency:"Daily",maxlimit:""});
    const [currentEditCapsrecord, setcurrentEditCapsrecord] = useState();
    const [capstabledata, setcapstabledata] = useState([])
    const [settingsData, setsettingsData] = useState()

    // useEffect(() => {

    // }, [currentEditCapsrecord])

    useEffect(() => {
        setsettingsData(settingsdata);
        setcapstabledata(settingsdata.capstable)
    }, [settingsdata])

    //add model
    const handleopenAddCapsModal = () => {
        // setcurrentShowDetailrecord(record);
        setopenAddCapsmodel(true);
      };
    
      const handleAddCapsOk = () => {
        console.log('handleAddCapsOk')
        addCapsInputData.key = Math.floor(Math.random() * 100000000); //dummy for time being, will have it alpha numeric later
        let olddata = [...capstabledata,addCapsInputData];
        setcapstabledata(olddata);
        setaddCapsInputData({key:"",frequency:"Daily",maxlimit:""})
        setopenAddCapsmodel(false);
      };
    
      const handleAddCapsCancel = () => {
        console.log('handleAddCapsCancel');
        setaddCapsInputData({key:"",frequency:"Daily",maxlimit:""})
        setopenAddCapsmodel(false);
      };

      const onAddNewInputChange= (e) =>{
            setaddCapsInputData({...addCapsInputData, [e.target.name]: e.target.value});
        }

      const onFrequencyAddChange = (value) =>{
        console.log(`selected ${value}`);
        setaddCapsInputData({...addCapsInputData, frequency: value});
      }
      
      const onFrequencyAddSearch = (val) => {
        console.log('search:', val);
      }

      //edit
      const handleopenEditCapsModal = (record) => {
        setcurrentEditCapsrecord(record);
        setopenEditCapsmodel(true);
      };
    
      const handleEditCapsOk = () => {
        console.log('handleEditCapsOk')
        let olddata = [...capstabledata];
        let findindex = capstabledata.findIndex(item=> item.key === currentEditCapsrecord.key); 
        olddata[findindex] = currentEditCapsrecord;
        setcapstabledata(olddata);
        updatedCapsTableData(olddata);
        setcurrentEditCapsrecord();
        setopenEditCapsmodel(false);
      };
    
      const handleEditCapsCancel = () => {
        console.log('handleEditCapsCancel');
        setcurrentEditCapsrecord();
        setopenEditCapsmodel(false);
      };

      const onEditInputChange = (e) =>{
          if(currentEditCapsrecord){
            setcurrentEditCapsrecord({...currentEditCapsrecord, [e.target.name]: e.target.value});
          }
      }

      const onFrequencyEditChange = (value) =>{
        // console.log(`selected ${value}`);
        if(currentEditCapsrecord){
            setcurrentEditCapsrecord({...currentEditCapsrecord, frequency: value});
          }
      }
      
      const onFrequencyEditSearch = (val) => {
        console.log('search:', val);
      }

      //delete caps
      const handleOnclickDelete = (record) =>{
        let dataarr = [...capstabledata];
        const filteredarray = dataarr.filter((item) => item.key !== record.key);
        console.log(filteredarray)
        setcapstabledata(filteredarray);
        updatedCapsTableData(filteredarray);
      }

      //other inputs
      const onSettingsInputChange = (e) =>{
            if(settingsData){
                setsettingsData({...settingsData, [e.target.name]: e.target.value});
                updatedSettingsData({...settingsData, [e.target.name]: e.target.value});
            }
        }

        const oncheckDataApi = (e) =>{
            if(settingsData){
                setsettingsData({...settingsData, dataviaapi: e.target.checked});
                updatedSettingsData({...settingsData, dataviaapi: e.target.checked});
            }
        }

    const columns = [
        {
            title:'Frequency',
            dataIndex:'frequency',
            key:'frequency',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Max Limit',
            dataIndex:'maxlimit',
            key:'maxlimit',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
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
                            <Button size={"small"} type={'primary'} disabled={editmode} style={{marginRight:'1px'}} onClick={()=>handleopenEditCapsModal(record)}><AiFillEdit /></Button>
                            <Button size={"small"} type={'danger'} disabled={editmode} onClick={()=>handleOnclickDelete(record)} ><IoTrashBin /></Button>
                        </Radio.Group>
                        <Modal title="Edit Caps" mask={false} maskClosable={false} width={300} visible={openEditCapsmodel} footer={<div><Button type={'primary'} onClick={handleEditCapsOk}>Save</Button></div>} onOk={handleEditCapsOk} onCancel={handleEditCapsCancel}>
                            <div style={{width:'100%'}}>
                                {/* <Input style={{margin:'10px 0',width:'100%'}} placeholder={'Frequency'} /> */}
                                <Select
                                    showSearch
                                    // allowClear
                                    style={{ margin:'10px 0',width:'100%' }}
                                    placeholder="Frequenct"
                                    optionFilterProp="children"
                                    value={currentEditCapsrecord && currentEditCapsrecord.frequency}
                                    onChange={onFrequencyEditChange}
                                    onSearch={onFrequencyEditSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    >
                                    <Option value="Hourly">Hourly</Option>
                                    <Option value="Daily">Daily</Option>
                                    <Option value="Weekly">Weekly</Option>
                                    <Option value="Monthly">Monthly</Option>
                                </Select>
                                <Input style={{margin:'10px 0',width:'100%'}} name={'maxlimit'} onChange={onEditInputChange} value={currentEditCapsrecord && currentEditCapsrecord.maxlimit} placeholder={'Max Limit'} />    
                            </div>
                        </Modal>
                    </Space>
                )
            },
        }
    ]


    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',flexWrap:'wrap'}}>
                <div style={{display:'flex',flexDirection:'column',left:'0',width:'50%',flexWrap:'wrap'}}>
                    <div style={{fontSize:'16px'}}>General</div>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <div style={{marginRight:'10px',marginBottom:'10px'}}>
                            <div>Initials</div>
                            <Input disabled={editmode} onChange={onSettingsInputChange} name={'initials'} value={settingsData && settingsData.initials} />
                        </div>
                       <div style={{marginRight:'10px',marginBottom:'10px'}}>
                            <div>Buy Price</div>
                            <Input disabled={editmode} onChange={onSettingsInputChange} name={'buyprice'} value={settingsData && settingsData.buyprice} />
                       </div>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',left:'0',width:'50%',flexWrap:'wrap'}}>
                    <div style={{fontSize:'16px',marginTop:'-15px'}}>Channel</div>
                    <div style={{marginTop:'20px'}}>
                        <Checkbox >Web</Checkbox>
                        <Checkbox >API</Checkbox>
                        <Checkbox >Phone</Checkbox>
                    </div>
                </div>
            </div>

            <div style={{width:'100%'}}>
                <div>
                    <div style={{fontSize:'16px'}}>Deals Specific</div>
                    <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'flex-end',flexWrap:'wrap'}}>
                        <Button style={{marginBottom:'10px',marginRight:'10px'}} disabled={editmode} type={'primary'}>Create Landing Page</Button>
                        <div style={{marginRight:'10px',marginBottom:'10px',marginRight:'10px'}}>
                            <div>Buffer</div>
                            <Input disabled={editmode} onChange={onSettingsInputChange} name={'buffer'} value={settingsData && settingsData.buffer} />
                       </div>
                       <div style={{marginBottom:'10px',marginRight:'10px'}}>
                            <Checkbox disabled={editmode} onChange={oncheckDataApi} checked={settingsData && settingsData.dataviaapi} >Data via API</Checkbox>
                       </div>
                    </div>
                </div>
            </div>
            <div style={{width:'100%',margin:'10px 0'}}>
                <div style={{width:'100%',padding:'5px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
                    <div style={{marginRight:'10px',fontSize:'18px'}}>Cap Setting</div>
                    <div>
                        <Button type={'primary'} onClick={handleopenAddCapsModal} disabled={editmode}>Add Cap</Button>
                        <Modal title="Add Caps" mask={false} maskClosable={false} width={300} visible={openAddCapsmodel} footer={<div><Button type={'primary'} onClick={handleAddCapsOk}>Save</Button></div>} onOk={handleAddCapsOk} onCancel={handleAddCapsCancel}>
                            <div style={{width:'100%'}}>
                                {/* <Input style={{margin:'10px 0',width:'100%'}} placeholder={'Frequency'} /> */}
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ margin:'10px 0',width:'100%' }}
                                    placeholder="Frequenct"
                                    optionFilterProp="children"
                                    value={addCapsInputData && addCapsInputData.frequency}
                                    onChange={onFrequencyAddChange}
                                    onSearch={onFrequencyAddSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    >
                                    <Option value="Hourly">Hourly</Option>
                                    <Option value="Daily">Daily</Option>
                                    <Option value="Weekly">Weekly</Option>
                                    <Option value="Monthly">Monthly</Option>
                                </Select>
                                <Input style={{margin:'10px 0',width:'100%'}} name={'maxlimit'} onChange={onAddNewInputChange} value={addCapsInputData && addCapsInputData.maxlimit} placeholder={'Max Limit'} />    
                            </div>
                        </Modal>
                    </div>
                </div>
                <div style={{width:'100%',margin:'10px 0'}}>
                    <Table
                    columns={columns} 
                    dataSource={capstabledata}  //capstabledata //data
                    pagination={false}
                    size="small"
                    // scroll={{ scrollToFirstRowOnChange: false }}
                    scroll={{
                        // x: 800,
                        y: '25vh'
                    }}
                />
                </div>
            </div>
        </div>
    )
}

export default Settings;
