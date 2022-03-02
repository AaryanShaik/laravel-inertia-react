import React,{useState, useEffect} from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Modal, Tabs, Select, Input, InputNumber, Form, Typography, Popconfirm, Checkbox, Table, Space, Radio, Switch } from 'antd';
import { GrSend } from 'react-icons/gr';
import {FaLink} from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';

const originData = []

for (let i = 0; i < 1; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

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
    // console.log('inputNode',record)
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
                required: dataIndex !=='pixel'? true : false,
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


  const EditableCellServerPixel = ({
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
    // console.log('inputNode',record)
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
                required: dataIndex !=='urlandmethod'? true : false,
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


const PixelCenter = () => {


    const clientpixeldata = [
        {
            key:'1',
            landingpage:'xxx-pb1',
            pixel:''
        },
        {
            key:'2',
            landingpage:'xxx-pb1-thank-you',
            pixel:''
        },
    ];

    const serverpixeldata = [
        {
            key:'1',
            event:'xxx-pb1',
            urlandmethod:'POST https://www.google.com'
        },
        {
            key:'2',
            event:'xxx-pb1-thank-you',
            urlandmethod:'POST https://www.google.com'
        },
    ];

    const [form] = Form.useForm();
    const [data, setData] = useState(clientpixeldata);
    const [editingKey, setEditingKey] = useState('');

    const [formserver] = Form.useForm();
    const [dataServerPixel, setdataServerPixel] = useState(serverpixeldata);
    const [editingKeyserver, seteditingKeyserver] = useState('');

    const [openAddClientPixelmodel, setoopenAddClientPixelmodel] = useState(false);
    const [openAddServerPixelmodel, setopenAddServerPixelmodel] = useState(false);

    //add client pixel model
    const handleopenAddClientPixelModal = () => {
      setoopenAddClientPixelmodel(true);
    };
    
    const handleAddClientPixelOk = () => {
      console.log('handleAddClientPixelOk')
      setoopenAddClientPixelmodel(false);
    };
  
    const handleAddClientPixelCancel = () => {
      console.log('handleAddClientPixelCancel');
      setoopenAddClientPixelmodel(false);
    };

    //add Server pixel model
    const handleopenAddServerPixelModal = () => {
      setopenAddServerPixelmodel(true);
    };
    
    const handleAddServerPixelOk = () => {
      console.log('handleAddServerPixelOk')
      setopenAddServerPixelmodel(false);
    };
  
    const handleAddServerPixelCancel = () => {
      console.log('handleAddServerPixelCancel');
      setopenAddServerPixelmodel(false);
    };

  const isEditing = (record) => record.key === editingKey;

  const isEditingServerPixel = (record) => record.key === editingKeyserver;

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

    const columns = [
        {
        title: 'Landing Page',
        dataIndex: 'landingpage',
        width: '25%',
        editable: true,
        },
        {
        title: 'Pixel',
        dataIndex: 'pixel',
        width: '40%',
        align:'center',
        editable: true,
        render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{`<script>`+text+`<script>`}</span>,
        },
        {
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
                <>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        {/* Edit */}
                        <Button size="small" type={'primary'} style={{marginRight:'1px'}}><AiFillEdit /></Button>    
                    </Typography.Link>
                    <Button size="small" type={'danger'}><IoTrashBin /></Button>
                </>
            );
        },
        },
    ];




    const columnsServerPixel = [
        {
        title: 'Event',
        dataIndex: 'event',
        width: '25%',
        editable: true,
        },
        {
        title: 'URL & Method',
        dataIndex: 'urlandmethod',
        width: '40%',
        align:'center',
        editable: true,
        render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
        title: 'Action',
        dataIndex: 'action',
        align:'center',
        render: (_, record) => {
            const editable = isEditingServerPixel(record);
            return editable ? (
            <span>
                <a
                href="javascript:;"
                onClick={() => saveServerPixel(record.key)}
                style={{
                    marginRight: 8,
                }}
                >
                Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancelServerPixel}>
                <a>Cancel</a>
                </Popconfirm>
            </span>
            ) : (
                <>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => editServerPixel(record)}>
                        {/* Edit */}
                        <Button size={"small"} type={'primary'} style={{marginRight:'1px'}}><AiFillEdit /></Button>    
                    </Typography.Link>
                    <Button size={"small"} type={'danger'}><IoTrashBin /></Button>
                </>
            );
        },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
        return col;
        }

        return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    });


    const editServerPixel = (record) => {
        formserver.setFieldsValue({
          name: '',
          age: '',
          address: '',
          ...record,
        });
        seteditingKeyserver(record.key);
      };
    
      const cancelServerPixel = () => {
        seteditingKeyserver('');
      };
    
      const saveServerPixel = async (key) => {
        try {
          const row = await formserver.validateFields();
          const newData = [...dataServerPixel];
          const index = newData.findIndex((item) => key === item.key);
    
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setdataServerPixel(newData);
            seteditingKeyserver('');
          } else {
            newData.push(row);
            setdataServerPixel(newData);
            seteditingKeyserver('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };

    const mergedColumnsServerPixel = columnsServerPixel.map((col) => {
        if (!col.editable) {
        return col;
        }

        return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditingServerPixel(record),
        }),
        };
    });

    return (
        <div style={{width:'100%',padding:'10px'}}>
            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'18px',fontWeight:'bold'}}>Client Side Pixels</div>
                <Button type={'primary'} onClick={handleopenAddClientPixelModal}>Add</Button>
                <Modal title="Add Client Side Pixel" mask={false} maskClosable={false} width={400} visible={openAddClientPixelmodel} footer={<div><Button type={'primary'} onClick={handleAddClientPixelOk}>Create Pixel</Button></div>} onOk={handleAddClientPixelOk} onCancel={handleAddClientPixelCancel}>
                    <div style={{width:'100%'}}>
                        <Input style={{width:'100%', marginTop:10}} size='small' placeholder={'Landing Page'}/>
                        <Input style={{width:'100%', marginTop:10}} size='small' placeholder={'Pixel'}/>
                    </div>
                </Modal>
            </div>
            <div style={{width:'100%',marginTop:'10px'}}>
            <Form form={form} component={false}>
                <Table
                    components={{
                    body: {
                        cell: EditableCell,
                    },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                />
                </Form>
            </div>

            <div style={{width:'100%',marginTop:'20px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'18px',fontWeight:'bold'}}>Server Side Pixels</div>
                <Button type={'primary'} onClick={handleopenAddServerPixelModal}>Add</Button>
                <Modal title="Add Server Side Pixel" mask={false} maskClosable={false} width={400} visible={openAddServerPixelmodel} footer={<div><Button type={'primary'} onClick={handleAddServerPixelOk}>Create Pixel</Button></div>} onOk={handleAddServerPixelOk} onCancel={handleAddServerPixelCancel}>
                    <div style={{width:'100%'}}>
                        <Input style={{width:'100%', marginTop:10}} size='small' placeholder={'Event'}/>
                        <Input style={{width:'100%', marginTop:10}} size='small' placeholder={`URL & Method`}/>
                    </div>
                </Modal>
            </div>
            <div style={{width:'100%',marginTop:'10px'}}>
            <Form form={formserver} component={false}>
                <Table
                    components={{
                    body: {
                        cell: EditableCellServerPixel,
                    },
                    }}
                    bordered
                    dataSource={dataServerPixel}
                    columns={mergedColumnsServerPixel}
                    rowClassName="editable-row"
                    pagination={false}
                />
                </Form>
            </div>
        </div>
    )
}

export default PixelCenter;
