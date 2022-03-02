
import {Typography} from 'antd';
import {RiDeleteBinLine} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi';
import {handleAffiliatesData} from '../../../../../../store/actions/affiliates';
import Filter from './Filter/Filter';

import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote } from '@ionic/react';

import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
import { InertiaLink } from '@inertiajs/inertia-react'

const { Text} = Typography;

function AffiliatesList({handleAffiliatesData}) {

    const data = [
        {
            name:'Optin', 
            caseTypes:'Mortgage Finance',
            locations:'NYC', 
            balance:99
        },
        {
            name:'Test', 
            caseTypes:'Mortgage Finance',
            locations:'MT', 
            balance:59
        }
    ]

    const handleAffiliatesCard = (item) => {
        console.log(item)
        handleAffiliatesData(item);
    }

    return (
        <div>
            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginBottom:5, marginTop:5}}>
                <Filter/>
            </div>
            
            <IonList>
            { data.map((item) => 
            // <Link to={'/affiliates/'+item.name}>
            <InertiaLink href='/affDet'>
            <IonItemSliding id="item100">
                
                <IonItem href={'/affiliates/'+item.name} onClick={()=>handleAffiliatesCard(item)}>
                <IonLabel >
                    <div>
                    <Text className="leadListTitle" style={{fontSize:'15px'}} strong type='secondary'>{item.name}</Text>
                    </div>
                     
                        <div style={{display:'flex'}}>
                            <Text className="leadListCaseType" style={{fontSize:'12px'}} type='secondary'>{item.locations}</Text>
                        </div>
                        <div>
                            <Text style={{fontSize:'12px'}} type='secondary'>{item.caseTypes}</Text>
                        </div>
                        <Text className="leadListArrivalTime" style={{fontSize:'12px'}} type='secondary'>${item.balance}</Text>
                        
                    </IonLabel>
                </IonItem>


                <IonNote slot="end">
                    <div>
                        
                    </div>
                    
                </IonNote>

                <IonItemOptions side="end" style={{background:'rgb(244, 245, 247)'}}>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}} >
                        <RiDeleteBinLine style={{color:'#ff4d4f', fontSize:25}}/>
                    </IonItemOption>
                    <IonItemOption style={{background:'rgb(244, 245, 247)'}}>
                        <FiEdit style={{color:'#191970', fontSize:25}}/>
                    </IonItemOption>
                </IonItemOptions>

            </IonItemSliding>
            {/* // </Link> */}
            </InertiaLink>
            )}
            </IonList>
        </div>
    )
}

AffiliatesList.propTypes = {
    handleAffiliatesData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {handleAffiliatesData})(AffiliatesList);
