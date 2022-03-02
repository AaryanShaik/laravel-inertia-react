import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, DatePicker, Upload, message  } from 'antd';

import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportLead = ({record,openReportLead,handleReportLeadOk,handleReportLeadCancel}) => {

    const [searchText, setsearchText] = useState('')
    const [searchedColumn, setsearchedColumn] = useState('');

    const [openeyemodel, setopeneyemodel] = useState(false);
    const [currenteyerecord, setcurrenteyerecord] = useState();
    const [openrefund, setopenrefund] = useState(false);
    const [currentrefundrecord, setcurrentrefundrecord] = useState();
    const [refundReason, setrefundReason] = useState('');
    const [refundType, setrefundType] = useState('');
    const [refundcomment, setrefundcomment] = useState('');

    // const [openReportLead, setopenReportLead] = useState(false);
    const [currentReportLeadrecord, setcurrentReportLeadrecord] = useState();

    const [ReportReason, setReportReason] = useState('False or nonsensical information');
    const [falseornoncen, setfalseornoncen] = useState('Other');

    // const showeyeModal = (record) => {
    //     // console.log('record ',record)
    //     setcurrenteyerecord(record);
    //     setopeneyemodel(true);
    //   };
    
    //   const handleeyeOk = () => {
    //     console.log('handleeyeOk')
    //     setcurrenteyerecord();
    //     setopeneyemodel(false);
    //   };
    
    //   const handleeyeCancel = () => {
    //     console.log('handleeyeCancel');
    //     setcurrenteyerecord();
    //     setopeneyemodel(false);
    //   };

    //   const showrefundModal = (record) => {
    //     // console.log('record ',record)
    //     setcurrentrefundrecord(record);
    //     setopenrefund(true);
    //   };
    
    //   const handlerefundOk = () => {
    //     console.log('handlerefundOk')
    //     setcurrentrefundrecord();
    //     setopenrefund(false);
    //   };
    
    //   const handlerefundCancel = () => {
    //     console.log('handlerefundCancel');
    //     setcurrentrefundrecord();
    //     setopenrefund(false);
    //   };

      const handleRefundReasonChange = (value) => {
        console.log(`selected ${value}`);
        setrefundReason(value);
      }

      const handleReportReasonChange = (value) => {
        console.log(`selected ${value}`);
        setReportReason(value);
      }

      const handleRefundTypeChange = (value) => {
        console.log(`selected ${value}`);
        setrefundType(value);
      }

      const handlerefundcomment = (value) => {
        console.log('value ',value);
        setrefundcomment(value);
      }


    //   //Report Lead
    //   const showReportLeadModal = (record) => {
    //     // console.log('record ',record)
    //     setcurrentReportLeadrecord(record);
    //     setopenReportLead(true);
    //   };
    
    //   const handleReportLeadOk = () => {
    //     console.log('handleReportLeadOk')
    //     setcurrentReportLeadrecord();
    //     setopenReportLead(false);
    //   };
    
    //   const handleReportLeadCancel = () => {
    //     console.log('handleReportLeadCancel');
    //     setcurrentReportLeadrecord();
    //     setopenReportLead(false);
    //   };

      const handleFONSIChange = (value) => {
        setfalseornoncen(value);
      }


      const onDateTimeChange = (value, dateString) =>{
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }
      
      const onOk = (value) => {
        console.log('onOk: ', value);
      }
  
      const uploadFileprops = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };


    return (
        <div style={{width:'100%',zIndex:'10'}}>
            <Modal title="Report Lead" mask={false} maskClosable={false} width={600} visible={openReportLead} onOk={handleReportLeadOk} footer={
                          <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                            <Button type={'primary'} onClick={()=>handleReportLeadOk()}>Report</Button>
                          </div>
                        } onCancel={handleReportLeadCancel} key={record}>
                          <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                            <div>
                                <div>Reason</div>
                                <Select showSearch placeholder={'Report Type'} defaultValue={ReportReason} style={{ width: '250px',marginBottom:'10px' }} onChange={handleReportReasonChange}>
                                  <Option value="False or nonsensical information">False or nonsensical information</Option>
                                  <Option value="Duplicate of a prior lead purchased">Duplicate of a prior lead purchased</Option>
                                  <Option value="Wrong geographic area">Wrong geographic area</Option>
                                  <Option value="Wrong case type">Wrong case type</Option>
                                  <Option value="Already has attorney">Already has attorney</Option>
                                </Select>
                            </div>

                            {
                              ReportReason === 'False or nonsensical information' && (
                                <div>
                                    <div>
                                      <Select defaultValue={falseornoncen} style={{ width: '200px',margin:'10px 0' }} onChange={handleFONSIChange}>
                                        <Option value={'Unreachable'}>{'Unreachable'}</Option>
                                        <Option value={'Other'}>{'Other'}</Option>
                                      </Select>
                                    </div>

                                   { falseornoncen === 'Unreachable' && (
                                    <div style={{margin:'5px 0'}}>
                                        <div style={{margin:'10px 0'}}>Please tell us the 6 times you attempted contact 'full name', within 72 business hours of receipt.</div>
                                        <div style={{margin:'10px 0'}}>
                                          <div style={{display:'flex', flexDirection:'row',alignItems:'center',margin:'10px 0'}}>
                                            <div style={{marginRight:'10px'}}>Attempt 1</div>
                                            <DatePicker format="MM-DD-YYYY HH:mm" showTime onChange={onDateTimeChange} onOk={onOk} />
                                          </div>
                                          <div style={{display:'flex', flexDirection:'row',alignItems:'center',margin:'10px 0'}}>
                                            <div style={{marginRight:'10px'}}>Attempt 2</div>
                                            <DatePicker format="MM-DD-YYYY HH:mm" showTime onChange={onDateTimeChange} onOk={onOk} />
                                          </div>
                                          <div style={{display:'flex', flexDirection:'row',alignItems:'center',margin:'10px 0'}}>
                                            <div style={{marginRight:'10px'}}>Attempt 3</div>
                                            <DatePicker format="MM-DD-YYYY HH:mm" showTime onChange={onDateTimeChange} onOk={onOk} />
                                          </div>
                                          <div style={{display:'flex', flexDirection:'row',alignItems:'center',margin:'10px 0'}}>
                                            <div style={{marginRight:'10px'}}>Attempt 4</div>
                                            <DatePicker format="MM-DD-YYYY HH:mm" showTime onChange={onDateTimeChange} onOk={onOk} />
                                          </div>
                                          <div style={{display:'flex', flexDirection:'row',alignItems:'center',margin:'10px 0'}}>
                                            <div style={{marginRight:'10px'}}>Attempt 5</div>
                                            <DatePicker format="MM-DD-YYYY HH:mm" showTime onChange={onDateTimeChange} onOk={onOk} />
                                          </div>
                                          <div style={{display:'flex', flexDirection:'row',alignItems:'center',margin:'10px 0'}}>
                                            <div style={{marginRight:'10px'}}>Attempt 6</div>
                                            <DatePicker format="MM-DD-YYYY HH:mm" showTime onChange={onDateTimeChange} onOk={onOk} />
                                          </div>
                                        </div>
                                        <div style={{margin:'5px 0'}}>
                                          <div style={{margin:'10px 0'}}>Please include any files that will support your claim and streamline our review.</div>
                                          <div style={{margin:'10px 0'}}>
                                            <Upload {...uploadFileprops}>
                                              <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                            </Upload>
                                          </div>
                                        </div>

                                    </div>
                                   )
                                  }
                                </div>
                              )
                            }

                            {
                              ReportReason === 'Wrong geographic area' && (
                                <div>
                                <div>Location</div>
                                <Input placeholder={`Enter Zip or city of Claimant's Accident`} />
                            </div>
                              )
                            }

                              {
                              ReportReason === 'Wrong case type' && (
                                <div>
                                <div>Case Type</div>
                                <Select showSearch placeholder={'Select Case Type'} style={{ width: '250px',marginBottom:'10px' }}>
                                  <Option value="Sexual Abuse">Sexual Abuse</Option>
                                  <Option value="Remortgage Finance">Remortgage Finance</Option>
                                  <Option value="Personal Injury">Personal Injury</Option>
                                  <Option value="Auto Accident">Auto Accident</Option>
                                  <Option value="Medical Malpractice">Medical Malpractice</Option>
                                  <Option value="Slip And Fall">Slip And Fall</Option>
                                  <Option value="Workers Compensation">Workers Compensation</Option>
                                  <Option value="Wrongful Death">Wrongful Death</Option>
                                  <Option value="Other">Other</Option>
                              </Select>
                            </div>
                              )
                            } 

                              {/* <Select placeholder={'Refund Type'} style={{ width: '250px',marginBottom:'10px' }} onChange={handleRefundTypeChange}>
                                  <Option value="jack">Jack</Option>
                                  <Option value="lucy">Lucy</Option>
                                  <Option value="Yiminghe">yiminghe</Option>
                              </Select> */}
                              <div style={{width:'100%'}}>
                                <div>Report Reason</div>
                                <TextArea rows={3} />
                              </div>
                          </div>  
                      </Modal>
        </div>
    )
}

export default ReportLead
