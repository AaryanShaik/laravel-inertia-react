import {useState} from 'react';
import { Button, Select, DatePicker, Typography, Switch, Table } from 'antd';

const { RangePicker } = DatePicker;
const {Text} = Typography;
const { Option } = Select;

function AutomatedMails() {

    // const [claimsselected, setclaimsselected] = useState([]);
    const [claimsselectedarray, setclaimsselectedarray] = useState([]);
    // const [loading, setloading] = useState(false)

    let recipents = [
        {
            id:1,
            value:'test@gmail.com'
        },
        {
            id:2,
            value:'test2@gmail.com'
        },
        {
            id:3,
            value:'test3@gmail.com'
        }
    ];

    const deals = [
        {
            name:'AA Deal',
            attachLeads:true,
            attachDetailedLeads:true

        },
        {
            name:'PI Deal',
            attachLeads:true,
            attachDetailedLeads:true
        },
        {
            name:'C Deal',
            attachLeads:true,
            attachDetailedLeads:true
        }
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        let valarr = [];
        value.map(ite=>{
            valarr.push({name:ite,value: parseInt(100/value.length)});
        })
        setclaimsselectedarray(valarr);
        // setclaimsselected(value);
        // setloading(true);
    }

    let children = [];
        for (let i = 0; i < recipents.length; i++) {
            children.push(<Option key={recipents[i].id} value={recipents[i].value}>{recipents[i].value}</Option>);
        }

        const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
          },
          {
            title: 'Attach Leads',
            dataIndex: 'attachLeads',
            render: (text, row, index) => {
              return (
                  <div>
                      <Switch size='small' checked={row.attachLeads}/>
                  </div>
              )
            },
          },
          {
            title: 'Attach Detailed Leads',
            dataIndex: 'attachDetailedLeads',
            render: (text, row, index) => {
              return (
                  <div>
                      <Switch size='small' checked={row.attachDetailedLeads}/>
                  </div>
              )
          },
        }
        ]

    return (
        <div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <Text style={{fontSize:12, marginBottom:10}}>Deal</Text>
                <Select style={{ width: '100%' }} size={'medium'} placeholder="Select Prospects" >
                    <Option key={'1'} value={`AA Deal`}>{`AA Deal`}</Option>
                    <Option key={'2'} value={`PI Deal`}>{`PI Deal`}</Option>
                    <Option key={'3'} value={`C Deal`}>{`C Deal`}</Option>
                </Select>

            <div style={{display:'flex', flexDirection:'column', marginTop:20}}>
            <Text style={{fontSize:12, marginBottom:10}}>Date</Text>
                <RangePicker />
            </div>
              
                <Button size='small' type='primary' style={{marginTop:10, marginBottom:20}}>Preview</Button>
            </div>
            <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <Text style={{fontSize:12, marginBottom:10}}>Recipent</Text>
                <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select Recepients"
                defaultValue={[]}
                onChange={handleChange}
            >  
                {children}
            </Select>
            <Button type='primary' size='small' style={{marginTop:10, marginBottom:10}}>Send</Button>
            </div>
            
            <Table
                dataSource={deals}
                columns={columns}
                size='small'
            />
            {/* {
                deals.map(deal => 
                    <Card size='small'>
                       
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <Text strong style={{fontSize:15}}>{deal.name}</Text>
                        <Switch size='small'></Switch>
                        <Switch size='small'>Attach Detailed Leads</Switch>
                        </div>
                        
                    </Card>    
                )
            } */}
        </div>
    )
}

export default AutomatedMails
