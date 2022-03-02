import { useState } from 'react';
import { Switch, Input, Select, Divider,  Slider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Trans, useTranslation } from 'react-i18next';

const { Option } = Select;

let index = 0;

const Specialization = () => {
    const [t, i18n] = useTranslation('common');
    const [items, setitems] = useState(['item 1', 'item 2']);
    const [newitem, setnewitem] = useState('');

    const onNameChange = event => {
        setnewitem(event.target.value);
      };
    
    const addItem = () => {
        console.log('addItem');
        // const { items, name } = this.state;
        setitems([...items, newitem || `New item ${index++}`]);
        setnewitem('');
      };

      const handleChange = (value) => {
        console.log(`selected ${value}`);
        }

      let casetypeoptions = [
        {
            id:1,
            value:t("Construction")
        },
        {
            id:2,
            value:t("PIA")
        },
        {
            id:3,
            value:t("RealEstate")
        },
        {
            id:4,
            value:t("HouseRepairs")
        },
        {
            id:5,
            value:t("AutoAccidentES")
        },
        {
            id:6,
            value:t("MortgageFinance")
        },
        {
            id:7,
            value:t("PersonalInjury")
        },
        {
            id:8,
            value:t("SexualAssault")
        },
        {
            id:9,
            value:t("AutoAccident")
        },
        {
            id:10,
            value:t("MedicalMalpractice")
        },
        {
            id:11,
            value:t("WorkersCompensation")
        },
        {
            id:12,
            value:t("WrongfulDeath")
        },
        {
            id:13,
            value:t("Other")
        },
    ];

    let children = [];
    console.log('option ',casetypeoptions.length )
    for (let i = 0; i < casetypeoptions.length; i++) {
       
    children.push(<Option key={casetypeoptions[i].id} value={casetypeoptions[i].value}>{casetypeoptions[i].value}</Option>);
    
    }


    return (
        <div style={{width:'100%'}}>
             <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <div>{t("specialization")}</div>
                <Switch />
            </div>
            <div style={{marginTop:'10px',width:'100%',display:'flex',flexDirection:'row'}}>
                <Select
                    style={{ width: 240, marginRight:'20px' }}
                    placeholder={t("Specialization")}
                    dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: '4px 0' }} />
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input style={{ flex: 'auto' }} value={newitem} onChange={onNameChange} />
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
            <div style={{width:'100%',marginTop:'10px'}}>
                <Input placeholder={t("SpecializationSubHeading")} />
            </div>
            <div style={{width:'100%', display:'flex',flexDirection:'row', flexWrap:'wrap',justifyContent:'space-between'}}>
                <div style={{width:'48%',minWidth:'200px',marginTop:'10px',marginRight:'10px'}}>
                    <div style={{marginBottom:'5px'}}>{t("PracticeArea")}</div>
                    <Select
                        // mode="multiple"
                        // allowClear
                        style={{ width: '100%' }}
                        placeholder={t("Select")}
                        defaultValue={[]}
                        onChange={handleChange}
                        >{children}</Select>
                </div>
                <div style={{width:'48%',minWidth:'200px',marginTop:'10px'}}>
                    <div style={{marginBottom:'5px'}}>{t("Percentage")}</div>
                    <Slider defaultValue={50} />
                </div>
            </div>
        </div>
    )
}

export default Specialization;
