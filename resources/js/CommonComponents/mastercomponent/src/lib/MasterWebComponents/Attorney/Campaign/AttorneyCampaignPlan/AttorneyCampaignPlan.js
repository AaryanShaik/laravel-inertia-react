import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, Card, InputNumber, Popconfirm, Form, Typography, Checkbox } from 'antd';
import { AiOutlineCheck, AiFillEdit } from 'react-icons/ai';
import { isStyledComponent } from 'styled-components';
import AttorneySpecialization from '../../Account/Website/AttorneySpecialization/AttorneySpecialization';

const { TextArea } = Input;

const { Option } = Select;

const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      casetype: `Edrward ${i}`,
      price: 32,
      address: `London Park no. ${i}`,
    });
  }

let plansarray = [
    {
        key:1,
        casetype:'Construction',
        price: 1,
        checked: true,
    },
    {
      key:2,
      casetype:'PIA',
      price: 1,
      checked: true,
    },
    {
      key:3,
      casetype:'Real Estate',
      price: 1,
      checked: true,
    },
    {
      key:4,
      casetype:'House Repairs',
      price: 1,
      checked: true,
    },
    {
      key:5,
      casetype:'Auto Accident ES',
      price: 1,
      checked: true,
    },
    {
      key:6,
      casetype:'Mortgage Finance',
      price: 1,
      checked: true,
    },
    {
        key: 7,
        casetype: 'Personal Injury',
        price: 1,
        checked: true,
    },
    {
        key: 8,
        casetype: 'Sexual Assault',
        price: 1,
        checked: true,
    },
    {
        key: 9,
        casetype: 'Auto Accident',
        price: 1,
        checked: false,
    },
    {
        key: 10,
        casetype: 'Medical Malpractice',
        price: 1,
        checked: true,
    },
    {
        key: 11,
        casetype: 'Workers Compensation',
        price: 1,
        checked: false,
    },
    {
        key: 12,
        casetype: 'Wrongful Death',
        price: 1,
        checked: true,
    },
    {
        key: 13,
        casetype: 'Others',
        price: 0,
        checked: true,
    },
]

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


const AttorneyCampaignPlan = ({user}) => {

    const [form] = Form.useForm();
    const [data, setData] = useState(plansarray);
    const [editingKey, setEditingKey] = useState('');
    const [totalPlanCost, settotalPlanCost] = useState(0);
  
    useEffect(() => {
      let newarr = [...data];
      let totalprice = 0;
      newarr.map(data=>{
          if(data.checked === true){
            totalprice = totalprice + data.price;
          }
      })
      settotalPlanCost(totalprice);
    }, [data])

    const isEditing = (record) => record.key === editingKey;
  
    const edit = (record) => {
      form.setFieldsValue({
        name: '',
        age: '',
        address: '',
        ...record,
      });
      setEditingKey(record.key);
    };
  
    const cancel = () => {
      setEditingKey('');
    };
  
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const handleCheckChange = (e,record) => {
      let dataarr = [...data];
      console.log('e.checked ',e.target.checked ,record)
      let findindex = dataarr.findIndex(item=> item.casetype === record.casetype); 
      dataarr[findindex].checked = e.target.checked;
      console.log('findindex ',findindex, dataarr[findindex])
      setData(dataarr);
    }
  
    let columns = [
      {
        title: 'Case Type',
        dataIndex: 'casetype',
        width: '25%',
        editable: false,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        width: '15%',
        editable: true,
        align:'center',
      },
      {
        title: 'Selected',
        dataIndex: 'checked',
        width: '40%',
        align:'center',
        // editable: true,
        render: (_, record) => {
          // console.log('ch ',record.checked);
          const editable = isEditing(record);
          if(editable){
            console.log('editable ',editable, record);
          }
        //   return editable ? (
        //     <Checkbox  checked={record.checked} onChange={(txt)=>handleCheckChange(txt,record)}/>
        // ) : (
        //     <Checkbox checked={record.checked} disabled={!editable} />
        // )
                // console.log(record.active);
                return (
                  <Space size="middle">
                          <Radio.Group>
                            <Checkbox defaultChecked={record.checked} disabled={!editable} onChange={(e)=>handleCheckChange(e,record)} />
                          </Radio.Group>        
                    </Space>
                )
        },
      },
      {...( user && user.usertype === 'admin' && {
        title: 'Action',
        dataIndex: 'action',
        align:'center',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      })},
    ];

    columns =  columns.filter(value => Object.keys(value).length !== 0);

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          // inputType: col.dataIndex === 'price' ? 'number' :  col.dataIndex ===  'checked' ? 'checkbox': 'text',
          inputType: col.dataIndex === 'price' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });


    let casetypeoptions = [
        {
            id:1,
            value:'Plan 1'
        },
        {
            id:2,
            value:'Plan 2'
        },
        {
            id:3,
            value:'Plan 3'
        },
    ];

    let children = [];
    console.log('option ',casetypeoptions.length )
    for (let i = 0; i < casetypeoptions.length; i++) {
       
    children.push(<Option key={casetypeoptions[i].id} value={casetypeoptions[i].value}>{casetypeoptions[i].value}</Option>);
    
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        }

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%',margin:'10px 0 20px 0'}}>
                <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Plan"
                defaultValue={[]}
                onChange={handleChange}
                >{children}</Select>
            </div>
            <div style={{width:'100%',marginTop:'10px'}}>
            <Form form={form} component={false}>
            <Table
                components={{
                body: {
                    cell: EditableCell,
                },
                }}
                size={'small'}
                title={()=>(
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <div>Basic Plan</div>
                        <div>${totalPlanCost}/ month</div>
                    </div>
                )}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
            />
            </Form>
            </div>
        </div>
    )
}

export default AttorneyCampaignPlan;
