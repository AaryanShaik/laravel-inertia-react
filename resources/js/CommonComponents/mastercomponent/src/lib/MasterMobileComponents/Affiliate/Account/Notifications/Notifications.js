import {Card, Switch, Typography} from 'antd';
import './Notifications.css';

const {Text} = Typography;

function Notifications() {

    const partners = [
        {
            name:'Test Name',
            notification:true
        }
    ];

    return (
        <div>
            <Text style={{fontSize:15}}>Notifications to your Team</Text>
            <Text style={{fontSize:12, marginBottom:20}}>Choose how each partner will recieve his or her notification</Text>

            {
                partners.map(partner => 
                    <Card size='small' style={{display:'flex', width:'100%', marginTop:10}}>
                        <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                            <div>
                                <Text style={{fontSize:12}}>{partner.name}</Text>
                            </div>
                            <div>
                                <Switch size='small' checked={partner.notification}/>
                            </div>
                          
                         
                        </div>
                        
                    </Card>    
                )
            }
        </div>
    )
}

export default Notifications
