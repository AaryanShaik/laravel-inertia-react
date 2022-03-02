import { Button , Drawer, Input, Switch} from 'antd'
import React, {useState} from 'react'
import {MdClose} from 'react-icons/md';

function Filter() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
  
    return (
        <div>
            <Button onClick={showDrawer}>Filter</Button>
            <Drawer
                title="Filter"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width='100%'
            >
                <div onClick={onClose} style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                    <MdClose/>
                </div>
                <Input placeholder="Case Type" style={{marginTop:10}}></Input>
                <Input placeholder="Affiliate Type" style={{marginTop:10}}></Input>
                <Input placeholder="Affiliate Name" style={{marginTop:10}}></Input>
                <Input placeholder="Location" style={{marginTop:10}}></Input>
                <Switch  style={{marginTop:10}}/>
            </Drawer>
        </div>
    )
}

export default Filter
