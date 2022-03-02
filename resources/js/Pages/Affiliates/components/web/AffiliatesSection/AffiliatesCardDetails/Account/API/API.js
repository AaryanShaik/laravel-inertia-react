import React from 'react';
import {Input} from 'antd';

const API = () => {
    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%'}}>
                <div style={{fontSize:'18px',marginBottom:'10px'}}>API</div>
                <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',flexWrap:'wrap',marginBottom:'20px'}}>
                    <div style={{minWidth:'200px',width:'48%'}}>
                        <div>API Key</div>
                        {/* <div>APIkey</div> */}
                        <Input.Password value={'dwdwdewfewecwecwecwecwe'}/>
                    </div>
                    <div style={{minWidth:'200px',width:'48%'}}>
                        <div>API Secret</div>
                        {/* <div>APIkey</div> */}
                        <Input.Password value={'dwdwdewfewecwecwecwecwe'}/>
                    </div>
                </div>

                <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',flexWrap:'wrap',marginTop:'20px'}}>
                    <div style={{minWidth:'200px',width:'48%'}}>
                        <div style={{fontSize:'18px'}}>End Point</div>
                        <a>www.google.com</a>
                    </div>
                    <div style={{minWidth:'200px',width:'48%'}}>
                        <div style={{fontSize:'18px'}}>Documentation</div>
                        <a>www.google.com</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default API
