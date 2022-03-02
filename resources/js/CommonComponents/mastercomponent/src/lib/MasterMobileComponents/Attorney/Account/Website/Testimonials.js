import { useState } from 'react';
import { Switch, Input, Select, Divider, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Trans, useTranslation } from 'react-i18next';
const { TextArea } = Input;
const { Option } = Select;

let index = 0;

const Testimonials = () => {
    const [t, i18n] = useTranslation('common');
    const [items, setitems] = useState(['item 1', 'item 2']);
    const [newitem, setnewitem] = useState('');


    const onDateChange = (date, dateString) => {
        console.log(date, dateString);
      }

    const onNameChange = event => {
        setnewitem(event.target.value);
      };
    
    const addItem = () => {
        console.log('addItem');
        // const { items, name } = this.state;
        setitems([...items, newitem || `New item ${index++}`]);
        setnewitem('');
      };

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <div>{t("Testimonials")}</div>
                <Switch />
            </div>
            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'5px 0'}}>
                    <div>{t("ShowImage")}</div>
                    <Switch />
                </div>
            {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Input />
                <Input />
            </div> */}
            <div style={{marginTop:'10px',width:'100%',display:'flex',flexDirection:'row'}}>
                <Select
                    style={{ width: 240, marginRight:'20px' }}
                    placeholder={t("Testimonials")}
                    dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: '4px 0' }} />
                        <div style={{ display: 'flex',  width:'100%', flexWrap: 'nowrap', padding: 8 }}>
                        <Input style={{ flex: 'auto', width:'100%' }} value={newitem} onChange={onNameChange} />
                        <span
                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                            onClick={addItem} >
                            <PlusOutlined /> {t("Add")}
                        </span>
                        </div>
                    </div>
                    )}
                >
                    {items.map(item => (
                    <Option key={item}>{item}</Option>
                    ))}
                </Select>
                
            </div>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',width:'100%',margin:'5px 0 0 0'}}>
                <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'5px'}}>
                    <Input placeholder={t("Name")} />
                </div>
                <div style={{minWidth:'200px',width:'48%',marginRight:'1px',marginTop:'5px'}}>
                    <DatePicker onChange={onDateChange} style={{width:'100%'}} />
                </div>
                <div style={{width:'100%',marginTop:'10px',marginBottom:'10px'}}>
                    <TextArea rows={4} placeholder={t("About")} />
                </div>
            </div>
        </div>
    )
}

export default Testimonials;
