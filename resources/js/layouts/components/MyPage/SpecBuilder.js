import React from 'react'
import { Typography, Select, Button, Table, Space, Radio } from 'antd';

import { handleLogin, handleLogout } from '../../../store/actions/auth';

import { connect } from "react-redux";
import PropTypes from "prop-types";

// ant designs constants
const { Text } = Typography;
const { Option } = Select;

const SpecBuilder = ({ handleLogin, handleLogout, authenticated }) => {
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    console.log('authenticated', authenticated);

    const data = [
        {
            key: '1',
            name: 'How Long ago did the injury happen?',
            refKey: 'incident_ref_option_b',
            datatype: 'options',
            status: 'Required',
        },
        {
            key: '2',
            name: 'What is the cause of your injury?',
            refKey: 'injury_cause',
            datatype: 'options',
            status: 'Optional',
        },
    ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '15px' }}>{text}</span>,
        },
        {
            title: 'Ref Key',
            dataIndex: 'refKey',
            key: 'refKey',
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '15px' }}>{text}</span>,
        },
        {
            title: 'Data Type',
            dataIndex: 'datatype',
            key: 'datatype',
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '15px' }}>{text}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: text => <span style={{ padding: '0px', margin: '0px', fontSize: '15px' }}>{text}</span>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Button size={"small"} type={'danger'} onClick={() => deleteLocation(record)}>delete</Button>
                        </Radio.Group>
                    </Space>
                )
            },
        },
    ];

    const showData = () => {
        if (authenticated) {
            handleLogout()
        } else {
            handleLogin()
        }
    }
    return (
        <>
            <div>
                <Text>Api Spec Templates</Text>
                <Button onClick={showData}>See</Button>
                {
                    (authenticated) ?
                        <>
                            <div style={{ display: 'flex', width: '14vw', justifyContent: 'space-between' }}>
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                                <Button type="primary">Add Field</Button>
                            </div>
                            <div>
                                <Table columns={columns} dataSource={data} />
                            </div>
                        </>
                        :
                        "not logged in"
                }
            </div>

        </>
    )
}

SpecBuilder.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
});


export default connect(mapStateToProps, { handleLogin, handleLogout })(SpecBuilder);