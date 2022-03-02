import { Button, Card, Input, Typography } from 'antd';
// import { Mapbox } from '@frontendmonorepo/mastercomponent';

const {Text} = Typography;

function Locations() {

    const locations = [
        {
            name:'NYC'
        },
        {
            name:'WY'
        },
        {
            name:'NYC'
        },
        {
            name:'WY'
        }
    ];

    return (
        <div>
             <div style={{width:'100%',height:'30vh',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                {/* <Mapbox/> */}
            </div>
            <div>
                <Input placeholder='Add new Location' size='small' style={{marginBottom:10}}/>

                <Input size='small' placeholder="Search" style={{marginBottom:5}}/>
                <div>
                    { locations.map(location => 
                        <Card size='small'>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Text>{location.name}</Text>
                                <Button size='small'>Delete</Button>
                            </div>
                            
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Locations
