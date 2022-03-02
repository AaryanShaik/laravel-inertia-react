import React,{useState, useEffect} from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Tabs, Select, Input, Checkbox, Table, Space, Radio, Switch } from 'antd';
import Fields from './Fields/Fields';
import Settings from './Settings/Settings';
import CallCenter from './CallCenter/CallCenter';
import Qualifiers from './Qualifiers/Qualifiers';
import Reporting from './Reporting/Reporting';
import Locations from './Locations/Locations';
import PixelCenter from './PixelCenter/PixelCenter';
import testdeal from './testdeals.json';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

const Campaign = () => {

    const [createnewdealdata, setcreatenewdealdata] = useState({dealtype:'',leadtype:''});
    const [dealarray, setdealarray] = useState(testdeal);
    const [deals, setdeals] = useState([]);
    const [selecteddeal, setselecteddeal] = useState(testdeal[0].deal_name);
    const [selecteddealobj, setselecteddealobj] = useState(testdeal[0]);

    useEffect(() => {
        let darr = [];
        // console.log(dealarray);
        if(dealarray.length > 0){
            dealarray.map(data=>{
               darr.push(<Option value={data.deal_name}>{data.deal_name}</Option>) 
            })
            setdeals(darr);
        }
    }, [dealarray])

    useEffect(() => {
        let darr = [];
        if(dealarray.length > 0){
            dealarray.map(data=>{
                data.deal_selected = false;
                if(data.deal_name === selecteddeal){
                    data.deal_selected = true;
                    setselecteddealobj(data);
                }
            })
            // setdealarray(darr);
        }
    }, [selecteddeal]);

    // useEffect(() => {
    //     let darr = [];
    //     if(dealarray.length > 0){
    //         dealarray.map(data=>{
    //             data.deal_selected = false;
    //             if(data.deal_name === selecteddeal){
    //                 data.deal_selected = true;
    //                 // setselecteddealobj(data);
    //             }
    //         })
    //         setdealarray(darr);
    //     }
    // }, [selecteddealobj])


    const onDealChange = (value) =>{
        console.log(`selected ${value}`);
        setselecteddeal(value);
        // updatedealobjhandler();
        // let darr = [];
        // if(dealarray.length > 0){
        //     dealarray.map(data=>{
        //         data.deal_selected = false;
        //         if(data.deal_name === selecteddeal){
        //             data.deal_selected = true;
        //             setselecteddealobj(data);
        //         }
        //     })
        //     setdealarray(darr);
        // }
        // setcreatenewdealdata({...createnewdealdata, deal: value || ''});
      }

      const onEditSwitchChange = () =>{
          if(selecteddealobj){
            setselecteddealobj({...selecteddealobj,deal_edittable:!selecteddealobj.deal_edittable})
          } 
      }
      
      const onDealSearch = (val) => {
        console.log('search:', val);
      }

      const onNewDealTypeChange = (value) =>{
        console.log(`selected ${value}`);
        setcreatenewdealdata({...createnewdealdata, dealtype: value});
      }
      
      const onNewDealTypeSearch = (val) => {
        console.log('search:', val);
      }

      const onNewLeadTypeChange = (value) =>{
        // console.log(`selected ${value}`);
        setcreatenewdealdata({...createnewdealdata, leadtype: value});
      }
      

        const onNewLeadTypeSearch = (val) => {
            console.log('search:', val);
        }

        const onHandleCreateDeal = () => {
            console.log('createnewdealdata ', createnewdealdata);
        }

        //   inside the deal card
        const ondealnameChangeHandler = (txt) =>{
            console.log(txt)
            if(selecteddealobj){
                setselecteddealobj({...selecteddealobj,deal_name: txt.target.value})
              } 
        }

      const onDealTypeChange = (value) =>{
        console.log(`selected ${value}`);
        if(selecteddealobj){
            setselecteddealobj({...selecteddealobj,deal_type: value})
          } 
      }
      
      const onDealTypeSearch = (val) => {
        console.log('search:', val);
      }

      const onLeadTypeChange = (value) =>{
        // console.log(`selected ${value}`);
        if(selecteddealobj){
            setselecteddealobj({...selecteddealobj,lead_type: value})
          } 
      }
      
      const onLeadTypeSearch = (val) => {
        console.log('search:', val);
      }

      //update the latest fieldtable
      const updatedFieldData = (data) =>{
        if(selecteddealobj){
            setselecteddealobj({...selecteddealobj,deal_data: {...selecteddealobj.deal_data, field:{...selecteddealobj.deal_data.field,fieldtable:[...data]}}})
          } 
      }

      //settings functions
      const updatedCapsTableData = (data) =>{
        if(selecteddealobj){
            setselecteddealobj({...selecteddealobj,deal_data: {...selecteddealobj.deal_data, settings:{...selecteddealobj.deal_data.settings,capstable:[...data]}}})
          } 
      }

      const updatedSettingsData = (data) =>{
        if(selecteddealobj){
            setselecteddealobj({...selecteddealobj,deal_data: {...selecteddealobj.deal_data, settings: data}})
          } 
      }

      console.log('selecteddealobj ',selecteddealobj)

    return (
        <div style={{width:'100%'}}>
             <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
                <div style={{marginBottom:'10px'}}>
                    <div>Deal</div>
                    <Select
                    showSearch
                    // allowClear
                    style={{ width: 200 }}
                    value={selecteddeal}
                    placeholder="Select Deal"
                    optionFilterProp="children"
                    onChange={onDealChange}
                    onSearch={onDealSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                    {/* <Option value="Deal 1">Deal 1</Option>
                    <Option value="Deal 2">Deal 2</Option>
                    <Option value="Deal 3">Deal 3</Option> */}
                    {deals}
                    </Select>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                <div style={{marginBottom:'10px',marginRight:'10px'}}>
                    <div>Deal Type</div>
                    <Select
                        showSearch
                        allowClear
                        style={{ width: 200 }}
                        // value={selecteddealobj && selecteddealobj.deal_type || ''}
                        placeholder="Select Deal Type"
                        optionFilterProp="children"
                        onChange={onNewDealTypeChange}
                        onSearch={onNewDealTypeSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {/* <Option value="Deal Type 1">Deal Type 1</Option>
                        <Option value="Deal Type 2">Deal Type 2</Option>
                        <Option value="Deal Type 3">Deal Type 3</Option> */}
                        <Option value="AA Deal">End Point</Option>
                        <Option value="PI Deal">Click</Option>
                        <Option value="C Deal">Conversion</Option>
                        <Option value="Call Center Lead">Call Center Lead</Option>
                        <Option value="Sold Lead">Sold Lead</Option>
                        <Option value="Live Transfer">Live Transfer</Option>
                        <Option value="Optin">Optin</Option>
                    </Select>
                </div>
                <div style={{marginBottom:'10px',marginRight:'10px'}}>
                    <div>Lead Type</div>
                    <Select
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Select Lead Type"
                    optionFilterProp="children"
                    onChange={onNewLeadTypeChange}
                    onSearch={onNewLeadTypeSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                    {/* <Option value="Lead Type 1">Lead Type 1</Option>
                    <Option value="Lead Type 2">Lead Type 2</Option>
                    <Option value="Lead Type 3">Lead Type 3</Option> */}
                    <Option value="Auto Accident">Auto Accident</Option>
                    <Option value="Personal Injury">Personal Injury</Option>
                    <Option value="Construction">Construction</Option>
                    <Option value="PIA">PIA</Option> 
                    <Option value="Real Estate">Real Estate</Option>
                    <Option value="House Repairs">House Repairs</Option>
                    <Option value="Auto Accident ES">Auto Accident ES</Option> 
                    <Option value="Sexual Assualt">Sexual Assualt</Option> 
                    <Option value="Medical Malpractice">Medical Malpractice</Option>
                    <Option value="Product Liability">Product Liability</Option>
                    <Option value="Workers Compensation">Workers Compensation</Option>
                    <Option value="Wrongful Death">Wrongful Death</Option>
                    </Select>
                </div>
                <div style={{margin:'10px 0',display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Button onClick={onHandleCreateDeal} style={{marginTop:'10px'}} type={'primary'}>Create Deal</Button>
                </div>
                </div>
            </div>
            {/* card code start */}
            <div style={{width:'100%',margin:'10px 0',border: '1px solid #ccc',borderRadius:'10px',padding:'10px'}}>
                <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                    <div style={{fontSize:'18px',marginBottom:'10px'}}>{selecteddealobj && selecteddealobj.deal_name || 'Auto Accident'}</div>
                    <div style={{background:'gray',fontSize:'14px',color:'white',padding:'2px 3px',borderRadius:'2px',margin:'10px'}}>{selecteddealobj && selecteddealobj.deal_code || 'XXX-PB1'}</div>
                </div>
                   { selecteddealobj && !selecteddealobj.deal_edittable ? <Button type={'primary'} onClick={onEditSwitchChange} style={{marginBottom:'10px'}}>Edit</Button>:<Button type={'primary'} onClick={onEditSwitchChange} style={{marginBottom:'10px'}}>Save</Button> }
                </div>
                <div style={{width:'100%'}}>
                    <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
                    {/* <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}> */}
                        <div style={{marginBottom:'10px',marginRight:'10px',minWidth:'250px',width:'22%'}}>
                            <div>Name</div>
                            <Input disabled={ selecteddealobj && !selecteddealobj.deal_edittable } value={selecteddealobj && selecteddealobj.deal_name} onChange={txt=>ondealnameChangeHandler(txt)} name={'deal_name'} placeholder={'Name'} style={{width:'100%'}}/>
                        </div>
                        <div style={{marginBottom:'10px',marginRight:'10px',minWidth:'250px',width:'22%'}}>
                        <div>Vertical</div>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select Verticle"
                            optionFilterProp="children"
                            value={selecteddealobj && selecteddealobj.vertical}
                            disabled={ selecteddealobj && !selecteddealobj.deal_edittable }
                            onChange={onLeadTypeChange}
                            onSearch={onLeadTypeSearch}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Auto Accident">Auto Accident</Option>
                            <Option value="Personal Injury">Personal Injury</Option>
                            <Option value="Construction">Construction</Option>
                            <Option value="PIA">PIA</Option> 
                            <Option value="Real Estate">Real Estate</Option>
                            <Option value="House Repairs">House Repairs</Option>
                            <Option value="Auto Accident ES">Auto Accident ES</Option> 
                            <Option value="Sexual Assualt">Sexual Assualt</Option> 
                            <Option value="Medical Malpractice">Medical Malpractice</Option>
                            <Option value="Product Liability">Product Liability</Option>
                            <Option value="Workers Compensation">Workers Compensation</Option>
                            <Option value="Wrongful Death">Wrongful Death</Option>
                        </Select>
                        </div>
                    {/* </div> */}

                    {/* <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}> */}
                        <div style={{marginBottom:'10px',marginRight:'10px',minWidth:'250px',width:'22%'}}>
                        <div>Lead Type</div>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select Lead Type"
                            optionFilterProp="children"
                            value={selecteddealobj && selecteddealobj.lead_type}
                            disabled={ selecteddealobj && !selecteddealobj.deal_edittable }
                            onChange={onLeadTypeChange}
                            onSearch={onLeadTypeSearch}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Auto Accident">Auto Accident</Option>
                            <Option value="Personal Injury">Personal Injury</Option>
                            <Option value="Construction">Construction</Option>
                            <Option value="PIA">PIA</Option> 
                            <Option value="Real Estate">Real Estate</Option>
                            <Option value="House Repairs">House Repairs</Option>
                            <Option value="Auto Accident ES">Auto Accident ES</Option> 
                            <Option value="Sexual Assualt">Sexual Assualt</Option> 
                            <Option value="Medical Malpractice">Medical Malpractice</Option>
                            <Option value="Product Liability">Product Liability</Option>
                            <Option value="Workers Compensation">Workers Compensation</Option>
                            <Option value="Wrongful Death">Wrongful Death</Option>
                        </Select>
                        </div>
                        <div style={{marginBottom:'10px',marginRight:'10px',minWidth:'250px',width:'22%'}}>
                            <div>Deal Type</div>
                            <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select Deal Type"
                            optionFilterProp="children"
                            value={selecteddealobj && selecteddealobj.deal_type}
                            disabled={ selecteddealobj && !selecteddealobj.deal_edittable }
                            onChange={onDealTypeChange}
                            onSearch={onDealTypeSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            >
                            <Option value="AA Deal">End Point</Option>
                            <Option value="PI Deal">Click</Option>
                            <Option value="C Deal">Conversion</Option>
                            <Option value="Call Center Lead">Call Center Lead</Option>
                            <Option value="Sold Lead">Sold Lead</Option>
                            <Option value="Live Transfer">Live Transfer</Option>
                            <Option value="Optin">Optin</Option>
                            </Select>
                        </div>                         
                    {/* </div> */}
                    </div>  
                    <div style={{width:'100%',margin:'10px 0'}}>
                        <Tabs defaultActiveKey="1" type="card" size={'small'}>
                            <TabPane tab="Fields" key="1">
                                <Fields fieldsdata={selecteddealobj && selecteddealobj.deal_data.field} updatedFieldData={updatedFieldData} editmode={ selecteddealobj && !selecteddealobj.deal_edittable } />
                            </TabPane>
                            <TabPane tab="Setting" key="2">
                                <Settings settingsdata={selecteddealobj && selecteddealobj.deal_data.settings} updatedCapsTableData={updatedCapsTableData} updatedSettingsData={updatedSettingsData} editmode={ selecteddealobj && !selecteddealobj.deal_edittable } />
                            </TabPane>
                            <TabPane tab="Call Center" key="3">
                                {/* Call Center */}
                                <CallCenter editmode={ selecteddealobj && !selecteddealobj.deal_edittable } />
                            </TabPane>
                            <TabPane tab="Location" key="4">
                                {/* Location */}
                                <Locations editmode={ selecteddealobj && !selecteddealobj.deal_edittable } />
                            </TabPane>
                            <TabPane tab="Qualifiers" key="5">
                                {/* Qualifiers */}
                                <Qualifiers editmode={ selecteddealobj && !selecteddealobj.deal_edittable } />
                            </TabPane>
                            <TabPane tab="Pixel Center" key="6">
                                {/* Pixel Center */}
                                <PixelCenter editmode={ selecteddealobj && !selecteddealobj.deal_edittable } />
                            </TabPane>
                            <TabPane tab="Reporting" key="7">
                                {/* Reporting */}
                                <Reporting editmode={ selecteddealobj && !selecteddealobj.deal_edittable } />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>    
            {/* card code start */}
        </div>
    )
}

export default Campaign;
