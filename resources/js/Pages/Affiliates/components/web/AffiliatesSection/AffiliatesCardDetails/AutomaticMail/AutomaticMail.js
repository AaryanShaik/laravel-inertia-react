import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Switch, Table, Space, Radio, DatePicker } from 'antd';
// import { TagsInput } from "react-tag-input-component";

const { RangePicker } = DatePicker;
const { Option } = Select;

const dealsdata = [
    {
        no:'1',
        dealname:'Auto Accident',
        attachleads: false,
        attachdetailslead: true,
    },
    {
        no:'2',
        dealname:'PIA',
        attachleads: false,
        attachdetailslead: true,
    },
]

const AutomaticMail = () => {

    const [renderswitchchnage, setrenderswitchchnage] = useState(false);
    const [emailarr, setemailarr] = useState([]);

    useEffect(() => {

    }, [renderswitchchnage])

    const handleEmailChange = (value) => {
        console.log(`Selected: ${value}`);
      }

    const onActiveAttachLeadsChange = (checked,record) => {
        // console.log(`switch to ${checked}`, record);
        let findindex = dealsdata.findIndex(item=> item.no === record.no); 
        dealsdata[findindex].attachleads = checked;
        console.log('findindex ',findindex, dealsdata[findindex])
        setrenderswitchchnage(!renderswitchchnage)
      }

    const onActiveAttachDetailsLeadChange = (checked,record) => {
        // console.log(`switch to ${checked}`, record);
        let findindex = dealsdata.findIndex(item=> item.no === record.no); 
        console.log('findindex ',findindex, dealsdata[findindex])
        dealsdata[findindex].attachdetailslead = checked;
        setrenderswitchchnage(!renderswitchchnage)
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    const ValidateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const onDatePickerChange = (dates, dateStrings) => {
        if(dates && dates.length > 0 ){
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        }
      }

    const handleEmailInputs = (value) =>{
        let inputemailarr = [];
        let placeholderarray = [...value];
        placeholderarray.map(data=>{
            if(ValidateEmail(data)){
                inputemailarr.push(data);
            }
        })
        // console.log('email ',inputemailarr);
        setemailarr(inputemailarr);
    }

    const dealsColumns = [
        {
            title:'Deal',
            dataIndex:'dealname',
            key:'dealname',
            width:120,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Attach Leads',
            dataIndex:'attachleads',
            key:'attachleads',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Switch checked={record.attachleads} onChange={(txt)=>onActiveAttachLeadsChange(txt,record)} />
                            </Radio.Group>        
                    </Space>
                )
            }
        },
        {
            title:'Attach Details Lead',
            dataIndex:'attachdetailslead',
            key:'attachdetailslead',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                            <Radio.Group>
                                <Switch checked={record.attachdetailslead} onChange={(txt)=>onActiveAttachDetailsLeadChange(txt,record)} />
                            </Radio.Group>        
                    </Space>
                )
            }
        },
    ]

    const children = [];
    for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}@gmail.com</Option>);
    }
  

// console.log(emailarr)
    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%', display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <div style={{marginRight:'10px',width:'80px'}}>Deal Type</div>
                        <Select showSearch defaultValue="AA deal- 1" style={{ width: 300 }} onChange={handleChange}>
                            <Option value="AA deal- 1">AA deal- 1</Option>
                            <Option value="AA deal- 2">AA deal- 2</Option>
                            <Option value="AA deal- 3">AA deal- 3</Option>
                        </Select>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginTop:'10px'}}>
                        <div style={{marginRight:'10px',width:'80px'}}>Date</div>
                        <RangePicker
                            // ranges={{
                            //     Today: [moment(), moment()],
                            //     'This Month': [moment().startOf('month'), moment().endOf('month')],
                            // }}
                            style={{width:300}}
                            onChange={onDatePickerChange}
                            />
                    </div>
                </div>
                <div style={{ display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap'}}>
                    <div>
                        <Button type={'primary'}>Preview</Button>
                    </div>
                </div>
            </div>
            <div style={{width:'100%',border:'1px solid #ccc',textAlign:'center',marginTop:'20px'}}>
                No Data Found
            </div>
            <div style={{width:'100%',marginTop:'20px',display:'flex',flexDirection:'row',alignItems:'center'}}>
                <div style={{marginRight:'10px'}}>Recepients</div>
                {/* <Input style={{width:'250px'}} /> */}
                {/* <TagsInput
                    value={emailarr}
                    onChange={handleEmailInputs}
                    name="Email"
                    placeHolder="Enter Email"
                    style={{marginRight:'10px'}}
                /> */}
                 <Select
                    mode="tags"
                    // size={'small'}
                    placeholder="Please select the Email"
                    defaultValue={["a10", "c12"]}
                    onChange={handleEmailChange}
                    style={{ width: "100%" }}
                >
                    {children}
                </Select>

                <Button type={'primary'} style={{marginLeft:'20px'}}>Send</Button>
            </div>
            <div style={{width:'100%',marginTop:'20px'}}>
                <Table
                    columns={dealsColumns} 
                    dataSource={dealsdata} 
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

export default AutomaticMail;
