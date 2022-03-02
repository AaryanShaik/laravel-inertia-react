import {Checkbox, Typography} from 'antd';

const {Text} = Typography;


function PracticeArea() {
    return (
        <div>
            <div style={{display:'flex', width:'100%',  flexDirection:window.innerWidth > 575 ? 'row':'column', justifyContent:'space-between'}}>
            <div style={{width: window.innerWidth > 575 ? '48%': '100%', display:'flex',  justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Construction</Text>
                <Checkbox/>
            </div>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>House Repairs</Text>
                <Checkbox/>
            </div>
            </div>

            <div style={{display:'flex', width:'100%',  flexDirection:window.innerWidth > 575 ? 'row':'column', justifyContent:'space-between'}}>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Personal Injury</Text>
                <Checkbox/>
            </div>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text>Medical Malpractice</Text>
                <Checkbox/>
            </div>
            </div>

            <div style={{display:'flex', width:'100%',  flexDirection:window.innerWidth > 575 ? 'row':'column', justifyContent:'space-between'}}>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Wrongful Death</Text>
                <Checkbox/>
            </div>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>PIA</Text>
                <Checkbox/>
            </div>
            </div>

            <div style={{display:'flex', width:'100%',  flexDirection:window.innerWidth > 575 ? 'row':'column', justifyContent:'space-between'}}>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Auto Accident ES</Text>
                <Checkbox/>
            </div>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text>Sexual Assault</Text>
                <Checkbox/>
            </div>
            </div>

            <div style={{display:'flex', width:'100%',  flexDirection:window.innerWidth > 575 ? 'row':'column', justifyContent:'space-between'}}>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Product Liability</Text>
                <Checkbox/>
            </div>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text>Real Estate</Text>
                <Checkbox/>
            </div>
            </div>

            <div style={{display:'flex', width:'100%', flexDirection:window.innerWidth > 575 ? 'row':'column', justifyContent:'space-between'}}>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Mortgage Finance</Text>
                <Checkbox/>
            </div>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Auto Accident</Text>
                <Checkbox/>
            </div>
            </div>

            <div style={{display:'flex', width:'100%',  flexDirection:window.innerWidth > 575 ? 'row':'column', justifyContent:'space-between'}}>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Workers Compensation</Text>
                <Checkbox/>
            </div>
            <div style={{width:window.innerWidth > 575 ? '48%': '100%', display:'flex', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Others</Text>
                <Checkbox/>
            </div>
            </div>
        </div>
    )
}

export default PracticeArea
