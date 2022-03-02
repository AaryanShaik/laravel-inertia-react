import { useState } from 'react';
import {Button, Input, Select, Tabs} from 'antd';
import Fields from './Fields/Fields'
import CallCenter from './CallCenter/CallCenter';
import Locations from './Locations/Locations';
// import Locations from '../../../../Layout/Layout/sub4/Affiliates/AffiliatesSection/AffiliatesCardDetails/Campaign/Locations/Locations';
import PixelCenter from './PixelCenter/PixelCenter';
import Settings from './Settings/Settings';
import Qualifiers from './Qualifiers/Qualifiers';
import Reporting from './Reporting/Reporting';
// import Reporting from '../../../../Layout/Layout/sub4/Affiliates/AffiliatesSection/AffiliatesCardDetails/Campaign/Reporting/Reporting';

const {Option} = Select;
const { TabPane } = Tabs;

function Campaign() {

    const [dealType, setDealType] = useState(null);
    const [leadType, setLeadType] = useState(null);

    function onChange(value) {
        console.log(`selected ${value}`);
      }

      const [deals, setDeals] = useState([
          {
              key:1,
              name:'AA Deal',
              vertical:'Funder',
              leadType:'Auto Accident',
              dealType:'End Point'
          },
          {
            key:2,
            name:'PI Deal',
            vertical:'Attorney',
            leadType:'Personal Injury',
            dealType:'Click'
          }
      ]);

      const onChangeDealType = (value) => {
        setDealType(value);
      }

      const onChangeLeadType = (value)=> {
        setLeadType(value);
      }

      const handleCreateDeal = () => {
          let key = deals.length;
          setDeals([...deals, {
              key:key+1,
              name:'new deal'+(key+1),
              vertical:'',
              leadType:leadType,
              dealType:dealType
          }])
      };


      const onChangeDeal = () => {
        console.log()
      }
      	
    return (
        <div>
            <div style={{marginBottom:20}}>
                <div style={{display:'flex', width:'100%', marginBottom:10, justifyContent:'space-between'}}> 

                
            <Select
                size='small'
                showSearch
                style={{ width:'48%' }}
                placeholder="Lead Type"
                optionFilterProp="children"
                onChange={onChangeLeadType}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
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

            <Select
                size='small'
                showSearch
                style={{ width:'48%' }}
                placeholder="Deal Type"
                optionFilterProp="children"
                onChange={onChangeDealType}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
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
                <Button type='primary' size='small' style={{width:'100%'}} onClick={handleCreateDeal}>Create</Button>
                {/* <IoCreateOutline style={{fontSize:20}}/> */}
            </div>
            
            <Select
                size='small'
                showSearch
                style={{ width:'100%', marginBottom:10 }}
                placeholder="Select Deal"
                optionFilterProp="children"
                onChange={onChange}
                onSelect={()=> onChangeDeal()}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    deals.map(deal => 
                        <Option key={deal.key} value={deal.name}>{deal.name}</Option>
                    )
                }

            </Select>

            <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                <Input placeholder='Deal Name' style={{width:'48%'}} size='small'/>
                <Select
                size='small'
                showSearch
                style={{ width:'48%' }}
                placeholder="Vertical"
                optionFilterProp="children"
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Attorney">Attorney</Option>
                <Option value="Funder">Funder</Option>
            </Select>
            </div>

            <div style={{display:'flex', width:'100%', marginTop:10, justifyContent:'space-between'}}>
            <Select
                size='small'
                showSearch
                style={{ width:'48%' }}
                placeholder="Lead Type"
                optionFilterProp="children"
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
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

            <Select
                size='small'
                showSearch
                style={{ width:'48%'}}
                placeholder="Deal Type"
                optionFilterProp="children"
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
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
            <Button size='small' type='primary' style={{marginTop:10, width:'100%'}}>Save</Button>

            <Tabs className="tabs" size='small' style={{   overflow:'scroll',  background:'white', marginTop:10, marginBottom:64}} defaultActiveKey="1" >
                <TabPane tab="Fields" key="fields">
                    <Fields/>
                </TabPane>
                <TabPane tab="Settings" key="settings">
                    <Settings/>
                </TabPane>
                <TabPane tab="Call Center" key="call center">
                    <CallCenter/>
                </TabPane>
                <TabPane tab="Locations" key="Locations">
                    {/* <Locations/> */}
                </TabPane>
                <TabPane tab="Qualifiers" key="Qualifiers">
                    <Qualifiers/>
                </TabPane>
                <TabPane tab="Pixel Center" key="Pixel Center">
                    <PixelCenter/>
                </TabPane>
                <TabPane tab="Reporting" key="Reporting">
                    <Reporting/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Campaign
