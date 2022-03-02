import {useState} from 'react';
import {Input, Typography, Checkbox, Button, Card, Select, Drawer} from 'antd';
import {FiEdit} from 'react-icons/fi';
import {RiDeleteBinLine} from 'react-icons/ri';
import {MdClose} from 'react-icons/md';

const {Text} = Typography;
const {Option} = Select;

function Settings() {

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
            frequency:'Daily',
            maxLimit:'150',
        }
      ];
      
      function AddField(){
        return(
            <div>
                <Select style={{marginTop:10, width:'100%'}} placeholder='Frequency' size='small'>
                    <Option value='Daily'>Daily</Option>
                    <Option value='Weekly'>Weekly</Option>
                    <Option value='Weekly'>Monthly</Option>
                </Select>
                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Max Limit'/>
                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Add</Button>
            </div>
        )
    }

    function EditDrawer() {
        return (
            <div>
                <Select style={{marginTop:10, width:'100%'}} placeholder='Frequency' defaultValue={editData? editData.frequency : ''} size='small'>
                    <Option value='Daily'>Daily</Option>
                    <Option value='Weekly'>Weekly</Option>
                    <Option value='Weekly'>Monthly</Option>
                </Select>
                <Input style={{width:'100%', marginTop:10}} size='small' value={editData ? editData.maxLimit : ''}  placeholder='Max Limit'/>
                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Save</Button>
            </div>
        )
    }

    return (
        <div>
            <Text strong>General</Text>
            <div>
                <Input style={{marginBottom:10}} size='small' placeholder='Initials'/>
                <Input style={{marginBottom:10}} size='small' placeholder='Buy Price'/>
            </div>

            <Text  strong style={{marginTop:10}}>Channels</Text>
            <div style={{marginBottom:10}}>
                <Checkbox>Web</Checkbox>
                <Checkbox>API</Checkbox>
                <Checkbox>Phone</Checkbox>
            </div>

            <Text strong>Deal Specifics</Text>
            <div style={{marginTop:5}}>
                <Button style={{width:'100%'}} size='small' type='primary'>Create Landing Page</Button>
                <div style={{marginTop:10, display:'flex', justifyContent:'space-between', width:'100%'}} >
                <Input style={{width:'64%'}} size='small' placeholder='Buffer'/>
                <Checkbox style={{width:'35%'}}>Data Via Api</Checkbox>
                </div>
                
            </div>
            <div style={{width:'100%', display:'flex', marginTop:10, justifyContent:'space-between', alignItems:'center'}}>
                <Text strong>Cap Settings</Text>
                <Button size='small' type='primary' onClick={showAddDrawer}>Create Cap</Button>
            </div>

            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Create Cap</Text></div>}
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
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Edit Cap</Text></div>}
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

            
                <div style={{marginTop:5}}>
                    {/* <Card size='small'>
                        <Select 
                        size='small'
                        placeholder='Frequency'
                        >
                            <Option>Daily</Option>
                            <Option>Weekly</Option>
                            <Option>Monthly</Option>
                        </Select>
                    </Card> */}

            { data.map (item => 
                    <Card size='small' key={item.key}>
                        <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                            <Text style={{fontSize:12}}>Frequency: {item.frequency}</Text>

                            <div>
                                <FiEdit onClick={()=> showEditDrawer(item)} style={{ fontSize:20, marginRight:5}}/>
                                <RiDeleteBinLine style={{ fontSize:20}}/>
                            </div>
                            
                        </div>


                        <div style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'flex-end'}}>
                            
                        <Text style={{fontSize:12}}>Max Limit: {item.maxLimit}</Text>
                        </div>
                        
                    </Card>
                 )}
                </div>
            
        </div>
    )
}

export default Settings
