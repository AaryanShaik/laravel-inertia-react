import  {useState, useEffect} from 'react'
import {Button, Input,Space, Radio, Table} from 'antd';
import Mapbox from '../../../../MasterWebComponents/mapbox/mapbox';
import Autocomplete from "react-google-autocomplete";
import { IoTrashBin } from 'react-icons/io5';
import { Trans, useTranslation } from 'react-i18next';
const {TextArea} = Input;

function Locations({userType}) {
    const [t, i18n] = useTranslation('common');

    const data = [
        {
            key:'0',
            name:'NY',
            type:`state`,
        },
        {
            key:'1',
            name:'OH',
            type:`state`,
        },
        {
            key:'2',
            name:'LA',
            type:`state`,
        },
        {
            key:'3',
            name:'CA',
            type:`state`,
        },
    ]

    const [locationdata, setlocationdata] = useState(data);

    useEffect(() => {
        setlocationdata(data);
    }, [])

    const columns = [
        {
            title:t("Name"),
            dataIndex:'name',
            key:'name',
            width:120,
            align:'center',
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:t("Type"),
            dataIndex:'type',
            key:'type',
            width:120,
            align:'center',
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:t("Actions"),
            dataIndex:'actions',
            key:'actions',
            align:'center',
            width:120,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Button size="small"  type={'danger'} onClick={()=>handleOnclickDeleteLocation(record)}><IoTrashBin /></Button>
                        </Radio.Group>
                    </Space>
                )
            },
        }
    ]

    const onHandlePlaceSelected = (place) =>{
        // console.log('place',place);
        let pl = place;
        // console.log('pl',pl);
        console.log('locationdata onHandlePlaceSelected',locationdata);
        let arrplace = [];
        let alllocations = [...locationdata];
        console.log('alllocations initial',alllocations)
        let name, type, short_name_state, postal_code, city, county, state, country;

        pl.address_components.map(p=>{
            if(p.types.includes("administrative_area_level_1")){
                state = p.long_name;
                short_name_state = p.short_name;
            }
            if(p.types.includes("locality")){
                // name = p.long_name;
                city = p.long_name;
            }
            if(p.types.includes("administrative_area_level_2")){
                county = p.long_name;
            }
            if(p.types.includes("country")){
                country = p.long_name;
            }
            if(p.types.includes("postal_code")){
                postal_code = p.long_name;
            }
        });

        if(country !== undefined){
            name = country;
            type = 'Country'
        }

        if(state !== undefined){
            name = state;
            type = 'State'
        }

        if(county !== undefined){
            name = county;
            type = 'County'
        }

        if(city !== undefined){
            name = city;
            type = 'City'
        }

        if(postal_code !== undefined){
            name = postal_code;
            type = 'Postal code'
        }
        console.log(name,type,postal_code, city, county, state, country);
        data.push({key:String(alllocations.length),name,type:type,postal_code, city, county, state, country});
        alllocations.push({key:String(alllocations.length),name,type:type,postal_code, city, county, state, country});
        // console.log('alllocations',alllocations)
        setlocationdata(alllocations);
    }


    const handleOnclickDeleteLocation = (record) =>{
        let dataarr = [...locationdata];
        const filteredarray = dataarr.filter((item) => item.name !== record.name);
        setlocationdata(filteredarray);
    }

    return (
        <div>
            <Input placeholder={t("EnterLocation")} style={{marginBottom:10}}/>
            <TextArea rows={4} style={{display:userType !== 'attorney' ? 'block' : 'none'}} placeholder={t("AttorneyNotes")} />
            <div style={{width:'100%',height:'40vh',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <Mapbox/>
            </div>
            <div style={{width:'100%',margin:'10px 0 20px 0'}}>
            <Autocomplete
                    apiKey={'AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo'}
                    style={{width: "100%" , height:34 ,padding:'2px 5px',borderRadius:'5px',border:'0.5px solid #ccc',outline:'none'}}
                    // value={""}
                    onPlaceSelected={(place) => {
                        console.log(place);
                        onHandlePlaceSelected(place);
                        // setValue()
                    }}
                    // disabled={!editon}
                    options={{
                        types: ["(regions)"],
                        componentRestrictions: { country: "us" },
                    }}
                    placeholder={t("EnterPlace")}
                    defaultValue=""
                    />
            </div>

            <div style={{width:'100%',margin:'10px 0'}}>
                <Table
                columns={columns} 
                dataSource={locationdata} 
                pagination={false}
                size="small"
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    y: '35vh'
                }}
            />
            </div>
        </div>
    )
}

export default Locations
