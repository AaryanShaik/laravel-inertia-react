import React,{useState, useEffect} from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Modal, Tabs, Select, Input, Checkbox, Table, Space, Radio, Switch } from 'antd';
import { GrSend } from 'react-icons/gr';
import {FaLink} from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';
// import MapBox from '../../../../../../../../Components/mapbox/mapbox';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Autocomplete from "react-google-autocomplete";
// import { Mapbox } from '@frontendmonorepo/mastercomponent';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

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
    // {
    //     key:'5',
    //     name:'NY',
    //     type:`state`,
    // },
    // {
    //     key:'6',
    //     name:'NY',
    //     type:`state`,
    // },
    // {
    //     key:'7',
    //     name:'NY',
    //     type:`state`,
    // },
]

const Locations = ({editmode}) => {

    const [value, setValue] = useState(null);
    const [locationdata, setlocationdata] = useState(data);
    // const [locationdata1, setlocationdata1] = useState(data);
    // useEffect(() => {
     
    // }, [locationdata])
    useEffect(() => {
        setlocationdata(data);
    }, [])

    const columns = [
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            width:120,
            align:'center',
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Type',
            dataIndex:'type',
            key:'type',
            width:120,
            align:'center',
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Actions',
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
                            <Button size={"small"} disabled={editmode} type={'danger'} onClick={()=>handleOnclickDeleteLocation(record)}><IoTrashBin /></Button>
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

        // alllocations.map(item=>{
        //     if(item.type === 'NY'){
        //         return
        //     }
        // })
        console.log(name,type,postal_code, city, county, state, country);
        data.push({key:String(alllocations.length),name,type:type,postal_code, city, county, state, country});
        alllocations.push({key:String(alllocations.length),name,type:type,postal_code, city, county, state, country});
        // console.log('alllocations',alllocations)
        setlocationdata(alllocations);
    }


    const handleOnclickDeleteLocation = (record) =>{
        let dataarr = [...locationdata];
        const filteredarray = dataarr.filter((item) => item.name !== record.name);
        // let newkeys = [...colkeys];
        // //to remove col name
        // var indexofcol = newkeys.indexOf(record.column);
        //     if (indexofcol !== -1) {
        //         newkeys.splice(indexofcol, 1);
        //     }
        setlocationdata(filteredarray);
      }

    console.log('locationdata ',locationdata);

    return (
        <div style={{width:'100%',display:'flex',flexDirection:window.innerWidth <= 575?'column-reverse':'row'}}>
            <div style={{width:window.innerWidth <= 575? '100%':'40%',height:'40vh'}}>
                {/* <Input placeholder={'Add Place'} style={{width:'80%'}} /> */}
                <div style={{width:window.innerWidth <= 575?'100%':'90%'}}>
                <Autocomplete
                    apiKey={'AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo'}
                    style={{width: "100%" ,padding:'2px 5px',borderRadius:'5px',border:'0.5px solid #ccc',outline:'none'}}
                    // value={""}
                    onPlaceSelected={(place) => {
                        console.log(place);
                        onHandlePlaceSelected(place);
                        // setValue()
                    }}
                    disabled={editmode}
                    options={{
                        types: ["(regions)"],
                        componentRestrictions: { country: "us" },
                    }}
                    defaultValue=""
                    />
                    {/*  */}
                    {/* <GooglePlacesAutocomplete
                    apiKey="AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo"
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log('data',data);
                        console.log('details ',details);
                    }}
                    onClick={(txt)=>{
                        console.log('text',txt);
                    }}
                    // filterReverseGeocodingByTypes={[
                    //     // 'locality',
                    //     '(regions)',
                    //     // 'administrative_area_level_1',
                    // ]}
                    types={['(regions)']}
                    apiOptions={{ language: 'en', region: 'us' }}
                    autocompletionRequest={{
                        componentRestrictions: {
                        country: ['us'],
                        }
                      }}
                    selectProps={{
                        value:'',
                        onChange: setValue,
                        placeholder:'Select Place'
                        }}
                    /> */}
                    {/* <GooglePlacesAutocomplete
                        placeholder="Search"
                        minLength={2} // minimum length of text to search
                        autoFocus=reset{false}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log('data',data);
                            console.log('details ',details);
                        }}
                        getDefaultValue={() => {
                            return ''; // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo',//'VALID_API_KEY',
                            language: 'en', // language of the results
                        }}
                        styles={{
                            description: {
                            fontWeight: 'bold',
                            },
                            predefinedPlacesDescription: {
                            color: '#1faadb',
                            },
                            listView: {
                            color: 'black', //To see where exactly the list is
                            zIndex: 1000, //To popover the component outwards
                            position: 'absolute',
                            top: 45
                            },
                        }}
                       // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                       // currentLocationLabel="Current location"
                       // nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={
                            {
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }
                        }
                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                        }}
                        filterReverseGeocodingByTypes={[
                            'locality',
                            'administrative_area_level_3',
                        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        // predefinedPlaces={[homePlace, workPlace]}
                        predefinedPlacesAlwaysVisible={true}
                        /> */}
                </div>
                <div style={{width:window.innerWidth <= 575?'100%':'90%',margin:'10px 0'}}>
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
            <div style={{width:window.innerWidth <= 575?'100%':'60%',height:'40vh'}}>
                <div style={{width:'100%',height:'100%'}}>
                    {/* <Mapbox  style={{width:'100%',height:'100%'}}/> */}
                </div>
            
            </div>
        </div>
    )
}

export default Locations;
