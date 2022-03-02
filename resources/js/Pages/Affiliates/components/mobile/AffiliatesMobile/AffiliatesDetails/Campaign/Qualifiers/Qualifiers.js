import {useState} from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { Button, Typography, Card, Drawer, Select, Input } from 'antd';
import { FaLink } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import {MdClose} from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

const { Text } = Typography;
const { Option } = Select;

function Qualifiers() {

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
            parameter:'Were you injured',
            condition:'Equal To',
            value:'Yes'
        }
      ];

      function AddField(){
        return(
            <div>
                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Parameter'/>
                <Input style={{width:'100%', marginTop:10}} size='small' value='Equal To'  placeholder='Condition'/>
                <Select style={{marginTop:10, width:'100%'}} placeholder='Value' size='small'>
                    <Option value='Yes'>Yes</Option>
                    <Option value='No'>No</Option>
                </Select>

                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Create Qualifier</Button>
            </div>
        )
    }

    function EditDrawer() {
        return (
            <div>
                <Input style={{width:'100%', marginTop:10}} size='small' value={editData ? editData.parameter : ''}  placeholder='Parameter'/>
                <Input style={{width:'100%', marginTop:10}} size='small' value='Equal To'  placeholder='Condition'/>
                <Select style={{marginTop:10, width:'100%'}} placeholder='Value' defaultValue={editData? editData.value : ''} size='small'>
                    <Option value='Yes'>Yes</Option>
                    <Option value='No'>No</Option>
                </Select>
                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Save</Button>
            </div>
        )
    }

    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong style={{ fontSize: 15 }}>Lead Qualifiers <FaLink style={{ marginLeft: 5 }} />  <FaRegPaperPlane style={{ marginLeft: 5 }} /></Text>
                <Button size='small' type='primary' onClick={showAddDrawer}>Add</Button>
            </div>

            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Add Qualifier</Text></div>}
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
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Edit Qualifier</Text></div>}
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

            {data.map(item => 
            <Card size='small' style={{marginTop:10}} key={item.key}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div>
                        <div><Text style={{ fontSize: '12px' }} type='secondary'>Parameter: {item.parameter} </Text></div>
                        <div><Text style={{ fontSize: '12px' }} type='secondary' >Condition: {item.condition}</Text></div>
                        <div><Text style={{ fontSize: '12px' }} type='secondary'>Value: {item.value}</Text></div>
                    </div>

                    <div>
                        <FiEdit onClick={()=> showEditDrawer(item)} style={{ fontSize: 20, marginRight: 5 }} />
                        <RiDeleteBinLine style={{ fontSize: 20 }} />
                    </div>
                </div>
            </Card>
            )}
        </div>
    )
}

export default Qualifiers
