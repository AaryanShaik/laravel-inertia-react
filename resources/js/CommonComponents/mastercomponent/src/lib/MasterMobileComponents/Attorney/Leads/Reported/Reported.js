import {useState, useEffect} from 'react';
import {ImCancelCircle} from 'react-icons/im';
import {AiOutlineEye} from 'react-icons/ai';
import {RiRefundLine} from 'react-icons/ri';
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote, IonContent,  IonModal } from '@ionic/react';
import {Typography, Button, Input, Select, Drawer} from 'antd';
import {BiArrowBack} from 'react-icons/bi';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
const {Title, Text} = Typography;
const { Option } = Select;

function Reported({handleGetCustomersDetailReportedLeadsById, reportedleads, config_test_mode}) {
    const [t, i18n] = useTranslation('common');
    const [showModal, setShowModal] = useState(false);
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [eyeVisible, setEyeVisible] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const {customerId} = useParams(); 

    useEffect(async()=> {
        await handleGetCustomersDetailReportedLeadsById(customerId, config_test_mode);
        console.log("reportedleads",reportedleads)
    },[])

    useEffect(async()=> {
        await handleGetCustomersDetailReportedLeadsById(customerId, config_test_mode);
        console.log("reportedleads",reportedleads)
    },[config_test_mode])

    const data = [
        {
            reportedAt:'06/16/2021, 03:18 AM',
            assignedAt:'06/09/2021, 06:11 AM',
            name: 'John Doe',
            caseType:'Auto Accident',
            reason:'False or nonsensical information',
            status:'In Progress'
        }
    ]


    const eyeDrawer = (lead_id) => {
        setSelectedLead(lead_id)
        setEyeVisible(true);
      };
    
      const closeEyeDrawer = () => {
        setEyeVisible(false);
      };

    function EyeHeader () {
        return (
            <div style={{display:'flex', alignItems:'center'}}>
                <BiArrowBack style={{fontSize:20}} onClick={closeEyeDrawer}/>
                <Text style={{marginLeft:10}}>{t("Lead Details")}</Text>
            </div>
        )
    }

    return (
        <div>
             <IonList>
            { reportedleads && reportedleads.length > 0 && reportedleads.map((lead) => 
            <IonItemSliding id={lead.lead_id}>
                <IonItem>
                {/* <Card className="leadListCard" onClick={()=>handleLeadCard(lead)} style={{width:'100%', borderLeft:lead.status == "New" ? '5px solid #00E676' : '5px solid #00B0FF'}} > */}
                    {/* <Link to={'/'+lead.name}> */}
                    <IonLabel>
                    <div><Text style={{fontSize:'15px'}} strong type='secondary'>{lead.lead_name} </Text></div>
                    <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.lead_case_type}</Text></div>
                    {/* <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.status}</Text></div> */}
                    {/* <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.reason}</Text></div> */}
                    </IonLabel>
                   
                    <IonNote slot="end">
                        <Text style={{fontSize:'14px'}} type='secondary'>{lead.created_at}</Text>
                        <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.created_at}</Text></div>
                    </IonNote>
                   
                </IonItem>

                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)'}}>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}} >
                    
                    <AiOutlineEye onClick={()=> eyeDrawer(lead.lead_id)} style={{color:'#191970', fontSize:30}}/>
                    </IonItemOption>
                    {/* <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                        <RiRefundLine  onClick={() => setShowRefundModal(true)} style={{color:'#191970', display:'none', fontSize:25}}/>
                    </IonItemOption>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                        <ImCancelCircle style={{color:'#191970', display:'none', fontSize:25}}/>
                    </IonItemOption> */}
                </IonItemOptions>
                </IonItemSliding>
            )}
            </IonList>
            {/* <IonContent>
                <IonModal isOpen={showModal} cssClass='my-custom-class'>
                    <div style={{padding:10}}>
                        <div style={{marginBottom:7, marginTop:10, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Lead Location:	Cheyenne, WY 82001</Text>
                        </div>
                        <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>Your Comment:	Admin initiated refund</Text>
                        </div>
                        
                    </div>
                        <Button onClick={() => setShowModal(false)}>Close</Button>
                </IonModal>
                            
                <IonModal isOpen={showRefundModal} cssClass='my-custom-class'>
                    <div style={{padding:10, display:'flex', flexDirection:'column'}}>
                        <Text strong style={{fontSize:15, marginBottom:10}} type='secondary'> Refund Lead</Text> 
                        <Text style={{fontSize:14}} type='secondary'>{t("Reason")}</Text>
                        <Select size="small" defaultValue='False or Non Sensical Information' style={{ width:'82%', marginBottom:10, fontSize:14, marginTop:5, color:'gray' }}>
                            <Option value="Backed Up">False or Non Sensical Information</Option>
                            <Option value="Budget Cap Confirmed">Option 2</Option>
                            <Option value="Pending Budget Increase">Option 3</Option>
                            <Option value="$0 Refill Authorized">Option 4</Option>
                        </Select>
                        <Text style={{fontSize:14}} type='secondary'>Refund Type</Text>
                        <Select size="small" defaultValue='Refund' style={{ width:'82%', fontSize:14,marginBottom:10, marginTop:5, color:'gray' }} >
                            <Option value="Backed Up">Refund</Option>
                            <Option value="Budget Cap Confirmed">Option 2</Option>
                            <Option value="Pending Budget Increase">Option 3</Option>
                            <Option value="$0 Refill Authorized">Option 4</Option>
                        </Select>

                        <Text style={{fontSize:14}} type='secondary'>Your Comment</Text>
                        <Input/>
                    </div>
                        <Button onClick={() => setShowRefundModal(false)}>Close</Button>
                </IonModal>
            </IonContent> */}
            
            <Drawer
                title={<EyeHeader/>}
                placement="right"
                closable={false}
                onClose={eyeDrawer}
                visible={eyeVisible}
                width='100%'
            >
                <div style={{padding:10}}>
                        <Text style={{fontSize:14}} strong>{t("CaseHistory")}:</Text>
                        {reportedleads && reportedleads.map((lead) => 
                            selectedLead == lead.lead_id ?
                            lead.raw_data.map((item, index)=>
                                <div key={index}  style={{marginBottom:7, marginTop:10, display:'flex', flexDirection:'column'}}>
                                    {/* <Text style={{fontSize:14}} type='secondary'>Q: {t("Q1")}</Text>
                                    <Text style={{fontSize:14}} type='secondary'>A: {t("Q1Answer1")}</Text> */}
                                    <Text style={{fontSize:14}} type='secondary'>Q: {item.question}</Text>
                                    <Text style={{fontSize:14}} type='secondary'>A: {item.answer}</Text>
                                </div> 
                             ): ''
                        )}
                       
                    </div>

                {reportedleads && reportedleads.length > 0 && reportedleads.map((lead) => 
                            selectedLead == lead.lead_id ?
                <div style={{padding:10}}>
                
                    <div style={{marginBottom:7, marginTop:10, display:'flex', flexDirection:'column'}}>
                        <Text style={{fontSize:14}} type='secondary'>{t("LeadLocation")}:	{lead.lead_location}</Text>
                    </div>
                    
                    <div style={{marginBottom:7, display:'flex', flexDirection:'column'}}>
                        <Text style={{fontSize:14}} type='secondary'>{t("YourComment")}:	Admin initiated refund</Text>
                    </div> 
                </div> : ""
                    )}

                <div style={{padding:10}}>
                        <Text style={{fontSize:14}} strong>{t("Dispute")}:</Text>
                        <div style={{marginBottom:7, marginTop:10, display:'flex', flexDirection:'column'}}>
                        {reportedleads && reportedleads.map((lead) => 
                            selectedLead == lead.lead_id ?
                            // <Text style={{fontSize:14}} type='secondary'>{t("Case Type")}: {t("AutoAccident")} </Text>
                            <Text style={{fontSize:14}} type='secondary'>{t("Case Type")}: {lead.lead_case_type} </Text>
                             : ''
                        )}
                        </div>
                    </div>
                    {reportedleads && reportedleads.map((lead) => 
                            selectedLead == lead.lead_id ?
                    <div style={{padding:10}}>
                        <Text style={{fontSize:14}} strong>{t("Details")}:</Text>
                        
                        <div style={{marginBottom:7, marginTop:10, display:'flex', flexDirection:'column'}}>
                        
                            <Text style={{fontSize:14}} type='secondary'>{t("DisputeStatus")}: {lead.status}</Text>
                        </div>

                        <div style={{marginBottom:7, marginTop:10, display:'flex', flexDirection:'column'}}>
                            <Text style={{fontSize:14}} type='secondary'>{t("DisputeComments")}: {lead.dispute_comment}</Text>
                        </div>
                        
                    </div>
                     : ''
                     )}
            </Drawer>
        </div>
    )
}

export default Reported
