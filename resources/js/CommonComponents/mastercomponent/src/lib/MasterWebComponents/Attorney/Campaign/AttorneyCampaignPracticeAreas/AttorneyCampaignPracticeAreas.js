import React,{ useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd';

const AttorneyCampaignPracticeAreas = () => {
    const [editonforpracticeareas, seteditonforpracticeareas] = useState(false);

    const handleNewChanges = () =>{
        seteditonforpracticeareas(true)
    }

    const handleSaveChanges = () =>{
        seteditonforpracticeareas(false)
    }

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%'}}>
                <div style={{fontSize:'18px'}}>Practice Areas</div>
                <div>You will only recieve these types of leads</div>
            </div>
            <div style={{width:'100%',marginTop:'20px', display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Construction</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>PIA</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Real Estate</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>House Repairs</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Auto Accident ES</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Mortgage Finance</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Personal Injury</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Sexual Assault</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Auto Accident</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Medical Malpractice</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Product Liability</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Workers Compensation</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Wrongful Death</span></Checkbox>
                </div>
                <div style={{width:'180px',padding:'0 5px',marginRight:'5px', marginTop:'5px'}}>
                    <Checkbox disabled={!editonforpracticeareas}><span style={{fontSize:'13px'}}>Others</span></Checkbox>
                </div>
            </div>
            <div style={{width:'100%',textAlign:'right',marginTop:'10px'}}>
                {editonforpracticeareas ? <Button onClick={handleSaveChanges} type={'primary'}>Save</Button> : <Button type={'primary'} onClick={handleNewChanges}>Edit</Button>}
            </div>
        </div>
    )
}

export default AttorneyCampaignPracticeAreas;
