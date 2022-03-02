import { Table, Space, Button, Radio, Modal, Select, Input, Upload } from 'antd';
import { AiOutlineDownload } from 'react-icons/ai';
import { Trans, useTranslation } from 'react-i18next';
const { Option } = Select;

const History = () => {
    const [t, i18n] = useTranslation('common');
    const handlePreview = () =>{
        console.log('Download')
    }

    const columns = [
        {
            title:t("Month"),
            align:'center',
            dataIndex:'month',
            key:'month',
            // width:140,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:t("Download"),
            dataIndex:'download',
            key:'download',
            align:'center',
            // width:140,
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Upload onDownload={handlePreview} disabled>
                                <a href='/somefile.txt' download style={{}}><Button type='primary' size={'small'} icon={<AiOutlineDownload />}></Button></a> 
                            </Upload>  
                            {/* <div style={{marginLeft:'20px'}}>
                                <Upload onDownload={handlePreview} disabled>
                                    <a href='/somefile.txt' download style={{}}><Button type='primary' icon={<AiOutlineDownload />}></Button></a> 
                                </Upload> 
                            </div>             */}
                        </Radio.Group>
                    </Space>
                )
            }
        },
    ]

    const data = [
        {
            no:'1',
            month:'April 2021',
        },
        {
            no:'2',
            month:'May 2021',
        },
        {
            no:'3',
            month:'June 2021',
        },
        {
            no:'4',
            month:'July 2021',
        },
    ]

    const children = (
        <>
          <Option key="1">April 2021</Option>
          <Option key="2">May 2021</Option>
          <Option key="3">June 2021</Option>
          <Option key="4">July 2021</Option>
        </>
      );

      const handleChange = (value) => {
        console.log(`selected ${value}`);
        }

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%'}}>
                <div style={{width:'100%', fontSize:'18px'}}>
                    {t("MonthlyPurchaseHistory")}
                </div>
                <div style={{fontSize:'16px'}}>
                    {t("Trackthepurchasesmadebyyoueachmonth")}
                </div>
            </div>
            <div style={{width:'100%',marginTop:'20px',display:'flex',flexDirection:'row'}}>
                <Table
                    columns={columns} 
                    dataSource={data} 
                    pagination={false}
                    size="small"
                    scroll={{
                        y: '28vh'
                    }}
                />

                {/* <div>
                <Select style={{ width: '200px' }} size={'medium'} placeholder="Select Month" onChange={handleChange}>
                    {children}
                </Select>
                </div>
                <div style={{marginLeft:'20px'}}>
                    <Upload onDownload={handlePreview} disabled>
                        <a href='/somefile.txt' download style={{}}><Button type='primary' icon={<AiOutlineDownload />}></Button></a> 
                    </Upload> 
                </div> */}
            </div>
        </div>
    )
}

export default History;
