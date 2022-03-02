import {useState} from 'react';
import {Button, Card, Typography, Drawer, Select, Input} from 'antd';
import {FiEdit} from 'react-icons/fi';
import {RiDeleteBinLine} from 'react-icons/ri';
import {MdClose} from 'react-icons/md';

const {Text} = Typography;
const {Option} = Select;

function PixelCenter() {

    const [addClientVisible, setAddClientVisible] = useState(false);
    const [addServerVisible, setAddServerVisible] = useState(false);

    const [editClientVisible, setEditClientVisible] = useState(false);
    const [editServerVisible, setEditServerVisible] = useState(false);

    const [ediClientData, setEditClientData] = useState(null);
    const [editServerData, setEditServerData] = useState(null);

    const showAddClientDrawer = () => {
        setAddClientVisible(true);
      };
    
    const showAddServerDrawer = () => {
        setAddServerVisible(true);
      };
    
      const onAddClientClose = () => {
        setAddClientVisible(false);
      };

      const onAddServerClose = () => {
        setAddServerVisible(false);
      };

    const showEditClientDrawer = (item) => {
        setEditClientData(item);
        setEditClientVisible(true);
      };

      const showEditServerDrawer = (item) => {
        setEditServerData(item);
        setEditServerVisible(true);
      };
    
      const onEditClientClose = () => {
        setEditClientVisible(false);
      };

      const onEditServerClose = () => {
        setEditServerVisible(false);
      };

    const clientSidePixels = [
        {
            landingPage:'xxx-pb1',
            pixel:'<script></script>'
        },
        {
            landingPage:'xxx-pb1-thankyou',
            pixel:'<script></script>'
        }
    ];

    const serverSidePixels = [
        {
            event:'xxx-pb1',
            method:'POST',
            url:'https://beeceptor.io/aousydga'
        },
        {
            event:'xxx-pb1-thankyou',
            method:'POST',
            url:'https://beeceptor.io/aousydga'
        }
    ];

    function AddClient(){
        return(
            <div>
                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Landing Page'/>
                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Pixel'/>
                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Add</Button>
            </div>
        )
    }

    function AddServer(){
        return(
            <div>
                 <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Event'/>
                <Select style={{marginTop:10, width:'100%'}} placeholder='Method' size='small'>
                    <Option value='POST'>POST</Option>
                    <Option value='GET'>GET</Option>
                    <Option value='PUT'>PUT</Option>
                </Select>
                <Input style={{width:'100%', marginTop:10}} size='small'  placeholder='Link'/>
                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Add</Button>
            </div>
        )
    }

    function EditClientDrawer(){
        return(
            <div>
                <Input style={{width:'100%', marginTop:10}} size='small' value={ediClientData.landingPage} placeholder='Landing Page'/>
                <Input style={{width:'100%', marginTop:10}} size='small' value={ediClientData.pixel}  placeholder='Pixel'/>
                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Save</Button>
            </div>
        )
    }

    function EditServerDrawer(){
        return(
            <div>
                 <Input style={{width:'100%', marginTop:10}} size='small' value={editServerData? editServerData.event : ''}  placeholder='Event'/>
                <Select style={{marginTop:10, width:'100%'}} defaultValue={editServerData? editServerData.method : ""} placeholder='Method' size='small'>
                    <Option value='POST'>POST</Option>
                    <Option value='GET'>GET</Option>
                    <Option value='PUT'>PUT</Option>
                </Select>
                <Input style={{width:'100%', marginTop:10}} size='small' value={editServerData? editServerData.url : ''}  placeholder='Link'/>
                <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Save</Button>
            </div>
        )
    }

    return (
        <div>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <Text strong style={{fontSize:15}}>Client Side Pixels</Text>
                <Button size='small' type='primary' onClick={showAddClientDrawer}>Add</Button>
            </div>
            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Add Client</Text></div>}
                placement="right"
                closable={false}
                onClose={onAddClientClose}
                visible={addClientVisible}
                width='100%'
            >
                <div onClick={onAddClientClose} style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                    <MdClose/>
                </div>
                <AddClient/>
            </Drawer>

            {/* Edit field */}
            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Edit Client</Text></div>}
                placement="right"
                closable={false}
                onClose={onEditClientClose}
                visible={editClientVisible}
                width='100%'
            >
                <div onClick={onEditClientClose} style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                    <MdClose/>
                </div>

                <EditClientDrawer/>
            </Drawer>
                <div>
                    {
                        clientSidePixels.map(item => 
                            <Card size='small'>
                                <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                                    <div>

                                    
                                <div><Text style={{fontSize:'15px'}} strong type='secondary'>{item.landingPage} </Text></div>
                                <div><Text style={{fontSize:'12px'}} type='secondary'>{item.pixel}</Text></div>
                                </div>
                                <div>

                                
                                <FiEdit onClick={()=> showEditClientDrawer(item)} style={{ fontSize:20, marginRight:5}}/>
                                <RiDeleteBinLine style={{ fontSize:20}}/>
                                </div>
                                </div>
                            </Card>    
                        )
                    }

                    {/* <IonList>
                        {
                            clientSidePixels.map(item => 
                            <IonItemSliding id="item101">
                                <IonItem>
                                    <IonLabel>
                                    <div><Text style={{fontSize:'15px'}} strong type='secondary'>{item.landingPage} </Text></div>
                                    <div><Text style={{fontSize:'12px'}} type='secondary'>{item.pixel}</Text></div>
                                    </IonLabel>
                                </IonItem>
                
                                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)'}}>
                                    <IonItemOption style={{background:'rgb(244, 245, 247)'}} >
                                        <FiEdit style={{color:'#191970', fontSize:25}}/>
                                    </IonItemOption>

                                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                                        <RiDeleteBinLine style={{color:'#191970', fontSize:25}}/>
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                            )
                        }
                    </IonList> */}
                </div>
            

            <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10, marginBottom:5}}>
                <Text strong style={{fontSize:15}}>Server Side Pixels</Text>
                <Button size='small' type='primary' onClick={showAddServerDrawer}>Add</Button>
                </div>
                <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Add Server</Text></div>}
                placement="right"
                closable={false}
                onClose={onAddServerClose}
                visible={addServerVisible}
                width='100%'
            >
                <div onClick={onAddServerClose} style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                    <MdClose/>
                </div>
                <AddServer/>
            </Drawer>

            {/* Edit field */}
            <Drawer
                title={<div style={{display:'flex', alignItems:'flex-end'}}> <Text style={{fontSize:15}}>Edit Field</Text></div>}
                placement="right"
                closable={false}
                onClose={onEditServerClose}
                visible={editServerVisible}
                width='100%'
            >
                <div onClick={onEditServerClose} style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                    <MdClose/>
                </div>

                <EditServerDrawer/>
            </Drawer>
                <div>
                    {
                        serverSidePixels.map(item => 
                            <Card size='small'>
                                <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                                    <div>
                                <div><Text style={{fontSize:'15px'}} strong type='secondary'>{item.event} </Text></div>
                                <div><Text style={{fontSize:'12px'}} type='secondary' strong>{item.method}</Text></div>
                                <div><Text style={{fontSize:'12px'}} type='secondary'>{item.url}</Text></div>
                                </div>
                                <div>
                                <FiEdit onClick={()=> showEditServerDrawer(item)} style={{ fontSize:20, marginRight:5}}/>
                                <RiDeleteBinLine style={{ fontSize:20}}/>
                                </div>
                                </div>
                            </Card>    
                        )
                    }
                {/* <IonList>
                        {
                            serverSidePixels.map(item => 
                            <IonItemSliding id="item101">
                                <IonItem>
                                    <IonLabel>
                                    <div><Text style={{fontSize:'15px'}} strong type='secondary'>{item.event} </Text></div>
                                    <div><Text style={{fontSize:'12px'}} type='secondary' strong>{item.method}</Text></div>
                                    <div><Text style={{fontSize:'12px'}} type='secondary'>{item.url}</Text></div>
                                    </IonLabel>
                                </IonItem>
                
                                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)'}}>
                                    <IonItemOption style={{background:'rgb(244, 245, 247)'}} >
                                        <FiEdit style={{color:'#191970', fontSize:25}}/>
                                    </IonItemOption>

                                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                                        <RiDeleteBinLine style={{color:'#191970', fontSize:25}}/>
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                            )
                        }
                    </IonList> */}
                </div>
            
        </div>
    )
}

export default PixelCenter
