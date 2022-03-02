import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input } from 'antd';

const AttorneyAddCredits = () => {
    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%', fontSize:'18px'}}>
                Add Credit to Attorneys Wallet
            </div>
            <div style={{width:'100%', marginTop:'20px',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                <div style={{marginRight:'20px'}}>
                    <Input placeholder={'Number of Leads'} />
                </div>
                <div style={{marginRight:'20px'}}>
                    <Input placeholder={'Amount'} />
                </div>
                <div>
                    <Button type={'primary'}>Add</Button>
                </div>
            </div>
        </div>
    )
}

export default AttorneyAddCredits
