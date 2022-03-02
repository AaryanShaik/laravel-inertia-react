import {useState} from 'react';
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption,  IonNote, IonContent, IonModal } from '@ionic/react';
import { Typography, Button, Input, Select} from 'antd';
import {AiOutlineEye} from 'react-icons/ai';
import {RiRefundLine} from 'react-icons/ri';
import { Trans, useTranslation } from 'react-i18next';
const { Text} = Typography;
const { Option } = Select;

function BillingInformation({userType}) {
    const [t, i18n] = useTranslation('common');
    const data = [
        {
            month:'July 5, 2021',
            description: 'Accident.com monthly',
            status:'succeeded',
            amount:150

        }
    ]

    return (
        <div>
            <IonList>
            { data.map((lead) => 
            <IonItemSliding id="item101">
                <IonItem style={{  borderLeft:lead.status == "Succeeded" ? '5px solid #00B0FF' : '5px solid #00E676'}}>
                {/* <Card className="leadListCard" onClick={()=>handleLeadCard(lead)} style={{width:'100%', borderLeft:lead.status == "New" ? '5px solid #00E676' : '5px solid #00B0FF'}} > */}
                    {/* <Link to={'/'+lead.name}> */}
                    <IonLabel>
                    <div><Text style={{fontSize:'16px'}} strong type='secondary'>{lead.month} </Text></div>
                    <div><Text style={{fontSize:'14px'}} type='secondary'>{lead.description}</Text></div>
                    </IonLabel>
                   
                    <IonNote slot="end">
                        <div><Text style={{fontSize:'14px'}} type='secondary'>${lead.amount}</Text></div>
                    </IonNote>
                   
                </IonItem>

                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)' }}>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                        <RiRefundLine  onClick={() => alert("Success")} style={{color:'#191970', fontSize:25}}/>
                    </IonItemOption>
                </IonItemOptions>
                </IonItemSliding>
            )}
            </IonList>
            
        </div>
    )
}

export default BillingInformation
