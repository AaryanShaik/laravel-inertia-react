import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, Upload, Checkbox } from 'antd';
import { BiReceipt } from 'react-icons/bi';

const AttorneyBillingInformation = () => {

    const [openrefund, setopenrefund] = useState(false);
    const [currentrefundrecord, setcurrentrefundrecord] = useState();
    const [refundFullChecked, setrefundFullChecked] = useState(false);
    const [refundAmount, setrefundAmount] = useState('');
    const [refundReason, setrefundReason] = useState('');

    const handlePreview = () =>{
        console.log('Download')
    }

      const showrefundModal = (record) => {
        // console.log('record ',record)
        setcurrentrefundrecord(record);
        setopenrefund(true);
      };
    
      const handlerefundOk = () => {
        console.log('handlerefundOk')
        setcurrentrefundrecord();
        setopenrefund(false);
      };
    
      const handlerefundCancel = () => {
        console.log('handlerefundCancel');
        setcurrentrefundrecord();
        setopenrefund(false);
      };

      const handleRefundReasonChange = (value) => {
        // console.log(`selected `,value.target.value);
        setrefundReason(value.target.value);
      }

      const handleRefundAmountChange = (value) => {
        // console.log(`selected `, value.target.value);
        setrefundAmount(value.target.value);
      }

      const handlerefundFullChecked = (value) => {
        // console.log('handlerefundFullChecked value ',value.target.checked);
        setrefundFullChecked(value.target.checked);
      }

    const columns = [
        {
            title:'Month',
            align:'center',
            dataIndex:'month',
            key:'month',
            width:100,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Description',
            align:'center',
            dataIndex:'description',
            key:'description',
            width:150,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Status',
            align:'center',
            dataIndex:'status',
            key:'status',
            width:100,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Amount',
            align:'center',
            dataIndex:'amount',
            key:'amount',
            width:100,
            ellipsis: true,
            // responsive: ['sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>${text}</span>,
        },
        {
            title:'Request A Receipt',
            dataIndex:'requestareceipt',
            key:'requestareceipt',
            align:'center',
            width:150,
            ellipsis: true,
            // responsive: ['sm'],
            // render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Upload onDownload={handlePreview} disabled>
                                <Button type='primary' size={'small'} icon={<BiReceipt />}></Button>
                            </Upload>              
                        </Radio.Group>
                    </Space>
                )
            }
        },
        {
            title:'Actions',
            align:'center',
            dataIndex:'actions',
            key:'actions',
            width:200,
            // responsive: ['sm'],
            render: (_, record) =>{
                // console.log("_", _, " record ",record, " ",this)
                return (
                    <Space size="middle">
                        <Radio.Group>
                            <Button type='primary' size={'small'} onClick={()=>showrefundModal(record)} style={{marginRight:'2px'}}>Refund</Button>
                            <Button type='primary' size={'small'} style={{marginRight:'2px'}}>List Refund</Button>
                        </Radio.Group>

                        <Modal title="Refund" width={400} mask={false} maskClosable={false} visible={openrefund} onOk={handlerefundOk} footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                        <Button type={'primary'} onClick={()=>handlerefundOk()}>Refund</Button>
                                    </div>} onCancel={handlerefundCancel} key={record}>
                                {/* <p>{currentrefundrecord && currentrefundrecord.name}</p> */}
                                <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                                    <div style={{marginBottom:'10px',width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                                        <Checkbox value={refundFullChecked} onChange={handlerefundFullChecked} />
                                        <div style={{marginLeft:'10px'}}>Refund Full</div>
                                    </div>
                
                                    <Input value={refundAmount} placeholder={'Amount to Refund'} style={{marginBottom:'10px'}} onChange={(txt)=>handleRefundAmountChange(txt)}/>
                                    <Input value={refundReason} placeholder={'Reason (optional)'} style={{marginBottom:'10px'}} onChange={(txt)=>handleRefundReasonChange(txt)}/>
                                    {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                        <Button type={'primary'} onClick={()=>handlerefundOk()}>Refund</Button>
                                    </div> */}
                                </div>  
                            </Modal>
                    </Space>
                )
            },
        }
    ]

    const data = [
        {
            no:'1',
            month:'06/21/2021',
            description: 'accident.com monthly',
            status: 'Succeeded',
            amount: '150'
        },
        {
            no:'2',
            month:'06/21/2021',
            description: 'accident.com monthly',
            status: 'Succeeded',
            amount: '150'
        },
        {
            no:'3',
            month:'06/21/2021',
            description: 'accident.com monthly',
            status: 'Succeeded',
            amount: '150'
        },
        {
            no:'4',
            month:'06/21/2021',
            description: 'accident.com monthly',
            status: 'Succeeded',
            amount: '150'
        },
    ]


    // console.log('refundFullChecked ',refundFullChecked , ' refundAmount ', refundAmount , ' refundReason ',refundReason )

    return (
        <div style={{width:'100%'}}>
            <Table
                columns={columns} 
                dataSource={data} 
                pagination={false}
                size="small"
                // scroll={{ scrollToFirstRowOnChange: false }}
                scroll={{
                    x: 100
                }}
            />
        </div>
    )
}

export default AttorneyBillingInformation;
