import {useState, useEffect} from 'react';
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote, IonContent, IonModal } from '@ionic/react';
import { Typography, Button, Drawer, Input, Select} from 'antd';
import {AiOutlineEye} from 'react-icons/ai';
import {RiRefundLine} from 'react-icons/ri';
import {MdClose} from 'react-icons/md';
import {BiArrowBack} from 'react-icons/bi';
import { useParams } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const { Text,  } = Typography;
const {TextArea} = Input;
const { Option } = Select;

function NewLeads({ handleGetCustomersDetailPurchasedLeadsById, config_test_mode, purchasedleads}) {
    //assigned at
    //name
    //api response
    //email
    //phone
    //casetype
    //actions
    const [t, i18n] = useTranslation('common');

    const [showModal, setShowModal] = useState(false);
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [reportLeadDrawerVisible, setReportLeadDrawerVisible] = useState(false);
    const [wrongCaseType, setWrongCaseType] = useState(false);
    const [wrongGeographicArea, setWrongGeographicArea] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const {customerId} = useParams(); 

    useEffect(async()=> {
        await handleGetCustomersDetailPurchasedLeadsById(customerId, config_test_mode);
        console.log(purchasedleads)
    },[])

    useEffect(async()=> {
        await handleGetCustomersDetailPurchasedLeadsById(customerId, config_test_mode);
        console.log(purchasedleads)
    },[config_test_mode])


    useEffect(()=> {
        console.log('purchased leads:',purchasedleads)
    },[purchasedleads])

    const showDrawer = (lead_id) => {
        setSelectedLead(lead_id)
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
      };

    const showReportLeadDrawer = () => {
        setReportLeadDrawerVisible(true);
    }

    const closeReportLeadDrawer = () => {
        setReportLeadDrawerVisible(false);
    }

    function onChange(value) {
        console.log(`selected ${value}`);
        if(value == "False or nonsensical information" || value == "Duplicate of a prior lead purchased" || value == "Already has attorney"){
            setWrongGeographicArea(false);
            setWrongCaseType(false)
        }

        if(value == "Wrong Case Type"){
            setWrongCaseType(true);
            setWrongGeographicArea(false);
        }

        if(value == "Wrong Geographic Area"){
            setWrongCaseType(false);
            setWrongGeographicArea(true);
        }
      }

    const data = [
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
        {
            assignedAt:'July 5',
            name: 'John Doe',
            apiRespone:'',
            email:'johndoe@gmail.com',
            phone:'(647)701-1444',
            caseType:'Auto Accident',

        },
    ]

    function ReportLeadHeader () {
        return (
            <div style={{display:'flex', alignItems:'center'}}>
                <BiArrowBack style={{fontSize:20}} onClick={closeReportLeadDrawer}/>
                <Text style={{marginLeft:10}}> {t("ReportLead")}</Text>
            </div>
        )
    }

    function EyeHeader () {
        return (
            <div style={{display:'flex', alignItems:'center'}}>
                <BiArrowBack style={{fontSize:20}} onClick={onClose}/>
                <Text style={{marginLeft:10}}>{t("LeadDetails")}</Text>
            </div>
        )
    }
    
    if(purchasedleads && purchasedleads.lead < 1){
        return(
            <div>
                <Text style={{fontSize:'15px'}} strong type='secondary'>No Leads Found</Text>
            </div>
        )
    }

    return (
        <div>
            <IonList>
            { purchasedleads && purchasedleads.length > 0 && purchasedleads.map((lead) => 
            <IonItemSliding id={lead.lead_id}>
                <IonItem>
                    <IonLabel>
                    <div><Text style={{fontSize:'15px'}} strong type='secondary'>{lead.lead_name} </Text></div>
                    <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.lead_email}</Text></div>
                    <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.lead_contact}</Text></div>
                    </IonLabel>
                   
                    <IonNote slot="end">
                        <Text className="leadListArrivalTime" style={{fontSize:'14px'}} type='secondary'>{lead.created_at}</Text>
                        <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.lead_case_type}</Text></div>
                    </IonNote>
                   
                </IonItem>

                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)'}}>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}} >
                    
                    <AiOutlineEye onClick={()=> showDrawer(lead.lead_id)} style={{color:'#191970', fontSize:30}}/>
                    </IonItemOption>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                        <RiRefundLine  onClick={() => setShowRefundModal(true)} style={{color:'#191970', display:'none', fontSize:25}}/>
                    </IonItemOption>
                </IonItemOptions>
                </IonItemSliding>
            )}
            </IonList>
            
            <Drawer
                title={<EyeHeader/>}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width='100%'
            >
                <div style={{padding:10}}>
                        <Text style={{fontSize:14}} strong>{t("CaseHistory")}:</Text>
                        {purchasedleads && purchasedleads.map((lead) => 
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

                   

                    <Button style={{width:'100%'}} onClick={showReportLeadDrawer}>{t("ReportLead")}</Button>
            </Drawer>

            <Drawer
                title={<ReportLeadHeader/>}
                placement="right"
                closable={false}
                onClose={closeReportLeadDrawer}
                visible={reportLeadDrawerVisible}
                width='100%'
            >
                <Select
                    showSearch
                    // size='small'
                    style={{ width: '100%', marginBottom:10, marginTop:10}}
                    placeholder="Select a Reason"
                    optionFilterProp="children"
                    onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="False or nonsensical information">{t("FalseorNonSensicalInformaiton")}</Option>
                    <Option value="Duplicate of a prior lead purchased">{t("DuplicateofapriorLeadPurchased")}</Option>
                    <Option value="Wrong Geographic Area">{t("WrongGeographicArea")}</Option>
                    <Option value="Wrong Case Type">{t("WrongCaseType")}</Option>
                    <Option value="Already has attorney">{t("AlreadyHasAttorney")}</Option>
                </Select>

                <Input placeholder={t("Location")} style={{width:'100%', marginTop:15, display:wrongGeographicArea ? 'block' : 'none'}}></Input>

                <Select
                    showSearch
                    // size='small'
                    style={{ width: '100%', marginBottom:10, marginTop:15, display:wrongCaseType ? 'block' : 'none'}}
                    placeholder={t("SelectCaseType")}
                    optionFilterProp="children"
                    onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="Sexual Abuse">{t("SexualAbuse")}</Option>
                    <Option value="Remortgage Finance">{t("RemortgageFinance")}</Option>
                    <Option value="Personal Injury">{t("PersonalInjury")}</Option>
                    <Option value="Auto Accident">{t("AutoAccident")}</Option>
                    <Option value="Medical Malpractice">{t("MedicalMalpractice")}</Option>
                    <Option value="Slip And Fall">{t("SlipAndFall")}</Option>
                    <Option value="Workers Compensation">{t("WorkersCompensation")}</Option>
                    <Option value="Wrongful Death">{t("WrongfulDeath")}</Option>
                    <Option value="Others">{t("Others")}</Option>
                </Select>

                <TextArea rows={4} placeholder={t("Comments")} style={{width:"100%", marginTop:15}}></TextArea>

                <Button style={{width:'100%', marginTop:15}}>{t("Report")}</Button>
            </Drawer>
        </div>
    )
}

export default NewLeads;
