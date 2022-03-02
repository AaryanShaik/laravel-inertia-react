import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, Tabs } from 'antd';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';
import { SearchOutlined } from '@ant-design/icons';
// import Mapbox from '../../../../../../../../Components/mapbox/mapbox';
import { MapDrawer } from '../../../../../index';
import Autocomplete from "react-google-autocomplete";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

const data = [

]

const AttorneyCampaignLocations = ({ user }) => {

  const [searchText, setsearchText] = useState('')
  const [searchedColumn, setsearchedColumn] = useState('');

  const [editon, setediton] = useState(false)
  const [value, setValue] = useState(null);
  const [locationdata, setlocationdata] = useState(data);
  // const [locationdata1, setlocationdata1] = useState(data);
  // useEffect(() => {

  // }, [locationdata])
  useEffect(() => {
    setlocationdata(data);
  }, []);

  let searchInput;

  // console.log('user ',user)

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              //   this.setState({
              //     searchText: selectedKeys[0],
              //     searchedColumn: dataIndex,
              //   });
              setsearchText(selectedKeys[0]);
              setsearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
    setsearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    // this.setState({ searchText: '' });
    setsearchText('');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      align: 'center',
      ...getColumnSearchProps('name'),
      ellipsis: true,
      // responsive: ['sm'],
      render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'center',
      ...getColumnSearchProps('type'),
      ellipsis: true,
      // responsive: ['sm'],
      render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>{text}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      width: 120,
      // responsive: ['sm'],
      render: (_, record) => {
        // console.log("_", _, " record ",record, " ",this)
        return (
          <Space size="middle">
            <Radio.Group>
              <Button size={"small"} disabled={!editon} type={'danger'} onClick={() => handleOnclickDeleteLocation(record)}><IoTrashBin /></Button>
            </Radio.Group>
          </Space>
        )
      },
    }
  ]

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleNewChanges = () => {
    setediton(true)
  }

  const handleSaveChanges = () => {
    setediton(false)
  }

  const onHandlePlaceSelected = (place) => {
    // console.log('place',place);
    let pl = place;
    // console.log('pl',pl);
    console.log('locationdata onHandlePlaceSelected', locationdata);
    let arrplace = [];
    let alllocations = [...locationdata];
    console.log('alllocations initial', alllocations)
    let name, type, short_name_state, postal_code, city, county, state, country;

    pl.address_components.map(p => {
      if (p.types.includes("administrative_area_level_1")) {
        state = p.long_name;
        short_name_state = p.short_name;
      }
      if (p.types.includes("locality")) {
        // name = p.long_name;
        city = p.long_name;
      }
      if (p.types.includes("administrative_area_level_2")) {
        county = p.long_name;
      }
      if (p.types.includes("country")) {
        country = p.long_name;
      }
      if (p.types.includes("postal_code")) {
        postal_code = p.long_name;
      }
    });

    if (country !== undefined) {
      name = country;
      type = 'Country'
    }

    if (state !== undefined) {
      name = state;
      type = 'State'
    }

    if (county !== undefined) {
      name = county;
      type = 'County'
    }

    if (city !== undefined) {
      name = city;
      type = 'City'
    }

    if (postal_code !== undefined) {
      name = postal_code;
      type = 'Postal code'
    }

    // alllocations.map(item=>{
    //     if(item.type === 'NY'){
    //         return
    //     }
    // })
    console.log(name, type, postal_code, city, county, state, country);
    data.push({ key: String(alllocations.length), name, type: type, postal_code, city, county, state, country });
    alllocations.push({ key: String(alllocations.length), name, type: type, postal_code, city, county, state, country });
    // console.log('alllocations',alllocations)
    setlocationdata(alllocations);
  }


  const handleOnclickDeleteLocation = (record) => {
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

  console.log('locationdata ', locationdata);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        {editon ? <Button onClick={handleSaveChanges} type={'primary'}>Save</Button> : <Button type={'primary'} onClick={handleNewChanges}>Edit</Button>}
      </div>
      {/* <div style={{width:'100%',height:'35vh',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <div style={{width:'60%',height:'100%'}}>
                <   Mapbox  />
                </div>
            </div>
            <div style={{width:'100%',margin:'10px 0 20px 0'}}>
                <Autocomplete
                    apiKey={'AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo'}
                    style={{width: "300px" ,padding:'2px 5px',borderRadius:'5px',border:'0.5px solid #ccc',outline:'none'}}
                    // value={""}
                    onPlaceSelected={(place) => {
                        console.log(place);
                        onHandlePlaceSelected(place);
                        // setValue()
                    }}
                    disabled={!editon}
                    options={{
                        types: ["(regions)"],
                        componentRestrictions: { country: "us" },
                    }}
                    placeholder={'Enter Place'}
                    defaultValue=""
                    />
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
            </div> */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%', height: '40vh' }}>
          {/* <Input placeholder={'Add Place'} style={{width:'80%'}} /> */}
          <div style={{ width: window.innerWidth <= 575 ? '100%' : '90%' }}>
            <Autocomplete
              apiKey={'AIzaSyB-StqGe3q3H3-jjZUNedeiDfVeqizufAo'}
              style={{ width: "280px", padding: '2px 5px', borderRadius: '5px', border: '0.5px solid #ccc', outline: 'none' }}
              // value={""}
              onPlaceSelected={(place) => {
                console.log(place);
                onHandlePlaceSelected(place);
                // setValue()
              }}
              disabled={!editon}
              options={{
                types: ["(regions)"],
                componentRestrictions: { country: "us" },
              }}
              placeholder={'Enter Place'}
              defaultValue=""
            />
          </div>
          <div style={{ width: '90%', margin: '10px 0' }}>
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
        <div style={{ width: '45%', height: '40vh' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <MapDrawer style={{ width: '100%', height: '100%' }} />
          </div>

        </div>
      </div>
      {
        user && user.usertype === 'admin' && (
          <div style={{ width: '100%', margin: '10px 0' }}>
            <div>Attorney Note</div>
            <div style={{ width: '100%' }}>
              <TextArea rows={4} placeholder={'Write Something Here'} disabled={!editon} />
            </div>
          </div>
        )
      }

    </div>
  )
}

export default AttorneyCampaignLocations;
