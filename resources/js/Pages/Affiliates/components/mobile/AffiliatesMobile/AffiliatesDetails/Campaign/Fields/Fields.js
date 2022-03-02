import {useState} from 'react';
import {FaRegPaperPlane} from 'react-icons/fa';
import {FaLink} from 'react-icons/fa';
import {Button, Card, Typography, Drawer, Input, Select} from 'antd';
import {FiEdit} from 'react-icons/fi';
import {RiDeleteBinLine} from 'react-icons/ri';
import {MdClose} from 'react-icons/md';

const {Option} = Select;
const {Text} = Typography;

function Fields() {

    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const [editData, setEditData] = useState(null);


    const showAddDrawer = () => {
        setAddVisible(true);
      };
    
      const onAddClose = () => {
        setAddVisible(false);
      };

    const showEditDrawer = (item) => {
        setEditData(item);
        setEditVisible(true);
      };
    
      const onEditClose = () => {
        setEditVisible(false);
      };

      const data = [
        {
            key:'1',
            nameanddesc:'First Name',
            refkey:`lead_first_name`,
            assignedat:'07/14/2020, 02:24 AM',
            datatype: 'String',
            status:'Required',
        },
        {
            key:'2',
            nameanddesc:'Last Name',
            refkey:`lead_first_name`,
            assignedat:'07/14/2020, 02:24 AM',
            datatype: 'String',
            status:'Required',
        },
        {
            key:'3',
            nameanddesc:'Email',
            refkey:`lead_first_name`,
            assignedat:'07/14/2020, 02:24 AM',
            datatype: 'String',
            status:'Required',
        },
        {
            key:'4',
            nameanddesc:'Phone',
            refkey:`lead_first_name`,
            assignedat:'07/14/2020, 02:24 AM',
            datatype: 'Number',
            status:'Required',
        },
    ]

    function AddField(){
        return(
            <div>
                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Name and Description'/>
                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Ref Key'/>
                <Select style={{marginTop:10, width:'100%'}} placeholder='Data Type' size='small'>
                    <Option value='Number'>Number</Option>
                    <Option value='String'>String</Option>
                </Select>

                <Select style={{marginTop:10, width:'100%'}} placeholder='Status' size='small'>
                    <Option value='Required'>Required</Option>
                    <Option value='Not Required'>Not Required</Option>
                </Select>

                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Add</Button>
            </div>
        )
    }

    function EditDrawer() {
        return (
            <div>
                <Input style={{width:'100%', marginTop:10}} size='small' value={editData? editData.nameanddesc : ''} placeholder='Name and Description'/>
                <Input style={{width:'100%', marginTop:10}} size='small' value={editData? editData.refkey : ''} placeholder='Ref Key'/>
                <Select style={{marginTop:10, width:'100%'}} placeholder='Data Type' defaultValue={editData? editData.datatype : 'Number'} size='small'>
                    <Option value='Number'>Number</Option>
                    <Option value='String'>String</Option>
                </Select>

                <Select style={{marginTop:10, width:'100%'}} placeholder='Status' defaultValue={editData? editData.status : 'Required'} size='small'>
                    <Option value='Required'>Required</Option>
                    <Option value='Not Required'>Not Required</Option>
                </Select>

                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Save</Button>
            </div>
        )
    }

    return (
        <div>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Text strong style={{fontSize:15}}>API Docs <FaLink style={{marginLeft:5}}/> <FaRegPaperPlane style={{marginLeft:5}}/></Text>
                <Button size='small' type='primary' onClick={showAddDrawer}>Add</Button>
            </div>
            {/* Add field */}
            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Add Field</Text></div>}
                placement="right"
                closable={false}
                onClose={onAddClose}
                visible={addVisible}
                width='100%'
            >
                <div onClick={onAddClose} style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                    <MdClose/>
                </div>
                <AddField/>
            </Drawer>

            {/* Edit field */}
            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Edit Field</Text></div>}
                placement="right"
                closable={false}
                onClose={onEditClose}
                visible={editVisible}
                width='100%'
            >
                <div onClick={onEditClose} style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                    <MdClose/>
                </div>

                <EditDrawer/>
            </Drawer>

            <div style={{marginTop:10}}>
                {data.map(item => 
                    <Card size='small' key={item.key}>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <Text>Name and Desc: {item.nameanddesc}</Text>
                        <Text>Data Type: {item.datatype}</Text>
                    </div>

                    <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Text>Ref Key: {item.refkey}</Text>
                            <Text>Status: {item.status}</Text>
                        </div>
                        <div>
                            <FiEdit onClick={() => showEditDrawer(item)} style={{ fontSize:20, marginRight:5}}/>
                            <RiDeleteBinLine style={{ fontSize:20}}/>
                        </div>
                    </div>
                </Card>
                )}
            </div>
        </div>
    )
}

export default Fields
