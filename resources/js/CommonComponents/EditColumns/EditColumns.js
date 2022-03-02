import React,{useEffect} from 'react';
import {Card, Select} from 'antd';

const { Option } = Select;

const EditColumns = ({selectedcolumnnames,allcolumns,setEditedColms}) =>{
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        // var res = value.split(",");
        console.log(`res`,value);
        setEditedColms(value);
        }
    const children = []
        allcolumns.map((item,index)=>{
            children.push(<Option key={index} value={item}>{item}</Option>);
        })
    return (
        <div style={{width:'100%',marginTop:'7px'}}>
            {/* <div style={{ width:'80%',margin:'5px'}}> */}
                    <div style={{marginBottom: '10px'}}>Add/Remove Columns</div>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={selectedcolumnnames}
                        onChange={handleChange}
                        >{children}</Select>
                {/* </div> */}
        </div>
    )
}

export default EditColumns;
