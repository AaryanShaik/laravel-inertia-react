import React,{useState, useEffect} from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Divider, Menu, Tabs, Select, Input, Checkbox, Table, Space, Radio, Switch } from 'antd';
import { GrSend } from 'react-icons/gr';
import {FaLink} from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

const { TextArea } = Input;

let indexTDID = 0;
let indexCCDID = 0;

const CallCenter = ({editmode}) => {

    const [itemsTwilioDID, setitemsTwilioDID] = useState(['item 1', 'item 2']);
    const [newitemTwilioDID, setnewitemTwilioDID] = useState('');
    const [itemsCallCenterDID, setitemsCallCenterDID] = useState(['CC item 1', 'CC item 2']);
    const [newitemCallCenterDID, setnewitemCallCenterDID] = useState('');


    const onTwilioDIDNameChange = event => {
        setnewitemTwilioDID(event.target.value);
      };
    
    const addTwilioDIDItem = () => {
        console.log('addItem');
        // const { items, name } = this.state;
        setitemsTwilioDID([...itemsTwilioDID, newitemTwilioDID || `New item ${indexTDID++}`]);
        setnewitemTwilioDID('');
      };

      const onCallCenterDIDNameChange = event => {
        setnewitemCallCenterDID(event.target.value);
      };
    
    const addCallCenterDIDItem = () => {
        console.log('addItem');
        // const { items, name } = this.state;
        setitemsCallCenterDID([...itemsCallCenterDID, newitemCallCenterDID || `New item ${indexCCDID++}`]);
        setnewitemCallCenterDID('');
      };


    const onCallCenterTemplateChange = (value) =>{
        console.log(`selected ${value}`);
        // setcreatenewdealdata({...createnewdealdata, deal: value || ''});
      }
      
      const onCallCenterTemplateSearch = (val) => {
        console.log('search:', val);
      }


    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                <div style={{width:'50%'}}>
                    <div style={{fontSize:'18px',fontWeight:'500'}}>Data Setting</div>
                    <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'flex-end',flexWrap:'wrap'}}>
                        <div style={{marginRight:'20px',marginBottom:'10px'}}>
                            <div>Lead Source Provider Key</div>
                            <Input disabled={editmode}/>
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <Checkbox disabled={editmode}><span style={{fontSize:'16px'}}>Send Data to Call Center</span></Checkbox>
                        </div>
                    </div>
                </div>
                <div style={{width:'50%'}}>
                    <div style={{fontSize:'18px',fontWeight:'500'}}>Template Setting</div>
                    <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'flex-end',flexWrap:'wrap'}}>
                        <div style={{marginBottom:'10px'}}>
                            <div>Call Center Template</div>
                            {/* <Input /> */}
                            <Select
                                showSearch
                                allowClear
                                style={{ width: 200 }}
                                disabled={editmode}
                                // placeholder="Select Deal"
                                optionFilterProp="children"
                                onChange={onCallCenterTemplateChange}
                                onSearch={onCallCenterTemplateSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                >
                                <Option value="temp 1">temp 1</Option>
                                <Option value="temp 2">temp 2</Option>
                                <Option value="temp 3">temp 3</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width:'100%',marginTop:'10px'}}>
                <div style={{fontSize:'18px',fontWeight:'500'}}>Data Flow</div>
                <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                    <div>
                        <div>Direction</div>
                        <Select
                            showSearch
                            allowClear
                            style={{ width: 200 }}
                            disabled={editmode}
                            // placeholder="Select Deal"
                            optionFilterProp="children"
                            onChange={onCallCenterTemplateChange}
                            onSearch={onCallCenterTemplateSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            >
                            <Option value="temp 1">temp 1</Option>
                            <Option value="temp 2">temp 2</Option>
                            <Option value="temp 3">temp 3</Option>
                        </Select>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                        <div style={{marginRight:'10px'}}>
                            <div>Twilio DID</div>
                            {/* <Select
                                showSearch
                                allowClear
                                style={{ width: 200 }}
                                // placeholder="Select Deal"
                                optionFilterProp="children"
                                onChange={onCallCenterTemplateChange}
                                onSearch={onCallCenterTemplateSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                >
                                <Option value="temp 1">temp 1</Option>
                                <Option value="temp 2">temp 2</Option>
                                <Option value="temp 3">temp 3</Option>
                            </Select> */}
                            <Select
                                style={{ width: 240, marginRight:'20px' }}
                                placeholder="Select DID"
                                disabled={editmode}
                                onChange={onCallCenterTemplateChange}
                                onSearch={onCallCenterTemplateSearch}
                                dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                    <Input style={{ flex: 'auto' }} value={newitemTwilioDID} onChange={onTwilioDIDNameChange} />
                                    <Button
                                        // style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                        onClick={addTwilioDIDItem} 
                                        disabled={newitemTwilioDID === '' ? true :false}
                                        >
                                        <PlusOutlined /> Add
                                    </Button>
                                    </div>
                                </div>
                                )}
                            >
                                {itemsTwilioDID.map(item => (
                                <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </div>
                        {/* <Button type={'primary'}>ADD</Button> */}
                    </div>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                        <div style={{marginRight:'10px'}}>
                            <div>Call Center DID</div>
                            {/* <Select
                                showSearch
                                allowClear
                                style={{ width: 200 }}
                                // placeholder="Select Deal"
                                optionFilterProp="children"
                                onChange={onCallCenterTemplateChange}
                                onSearch={onCallCenterTemplateSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                >
                                <Option value="temp 1">temp 1</Option>
                                <Option value="temp 2">temp 2</Option>
                                <Option value="temp 3">temp 3</Option>
                            </Select> */}
                            <Select
                                style={{ width: 240, marginRight:'20px' }}
                                placeholder="Select DID"
                                disabled={editmode}
                                onChange={onCallCenterTemplateChange}
                                onSearch={onCallCenterTemplateSearch}
                                dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                    <Input style={{ flex: 'auto' }} value={newitemCallCenterDID} onChange={onCallCenterDIDNameChange} />
                                    <Button
                                        // style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                        onClick={addCallCenterDIDItem} 
                                        disabled={newitemCallCenterDID === '' ? true :false}
                                        >
                                        <PlusOutlined /> Add
                                    </Button>
                                    </div>
                                </div>
                                )}
                            >
                                {itemsCallCenterDID.map(item => (
                                <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </div>
                        {/* <Button type={'primary'}>ADD</Button> */}
                    </div>
                </div>                    
            </div>
            <div style={{width:'100%',marginTop:'10px',padding:'5px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',flexWrap:'wrap'}}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <div style={{marginRight:'10px',fontSize:'18px'}}>Script Details</div>
                    <div style={{marginRight:'10px'}}><FaLink size={18} /></div>
                    <div><GrSend size={18} /></div>
                </div>
            </div>
            <div style={{width:'100%'}}>
                <TextArea disabled={editmode} rows={5} />
            </div>
        </div>
    )
}

export default CallCenter;
