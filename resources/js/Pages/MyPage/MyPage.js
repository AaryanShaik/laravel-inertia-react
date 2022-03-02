import React from 'react'
import { Tabs } from 'antd';
import SpecBuilder from '../../layouts/components/MyPage/SpecBuilder'

const { TabPane } = Tabs;


function MyPage() {
    function callback(key) {
        console.log(key);
    }

    return (
        <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Tabs onChange={callback} type="card" style={{padding:'2vh',width:'70vw'}} centered>
            <TabPane tab="Setting" key="1">
                These are the Settings
            </TabPane>
            <TabPane tab="Locations" key="2">
                These are the Locations
            </TabPane>
            <TabPane tab="Reporting" key="3">
                These are Reporting
            </TabPane>
            <TabPane tab="Spec Builder" key="4">
                <SpecBuilder/>
            </TabPane>
        </Tabs>
        </div>
        </>
    )
}

export default MyPage