import {Input, Typography} from 'antd';

const {Text, Link} = Typography;

function Api() {
    return (
        <div>
            <Text strong style={{fontSize:15, marginBottom:10}}>API</Text>
            <br></br><br></br>
            <Text style={{marginTop:15}}>API Key</Text>
            <Input.Password placeholder="input password"  placeholder='API key' style={{marginBottom:10}}/>
            <Text style={{marginTop:10}}>API Secret</Text>
            <Input.Password placeholder="input password"  placeholder='API Secret'/>

            <div style={{display:'flex', flexDirection:'column'}}>
            <Text strong style={{fontSize:15, marginTop:20, marginBottom:10}}>End Point</Text>
            <Link href="#" target="_blank">
                https://api/accident.com/lead-create
            </Link> 
            </div>
            
            <div style={{display:'flex', flexDirection:'column'}}>
            <Text strong style={{fontSize:15, marginTop:20, marginBottom:10}}>Documentation</Text>
            <Link href="#" target="_blank">
                https://api/accident.com
            </Link>
            </div>
            
        </div>
    )
}

export default Api
