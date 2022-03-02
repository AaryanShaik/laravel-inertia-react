import { Switch, Input } from 'antd';
import { Trans, useTranslation } from 'react-i18next';

const { TextArea } = Input;

const About = () => {

    const [t, i18n] = useTranslation('common');

    return (
        <div style={{width:'100%'}}>
           <div style={{width:'100%',marginBottom:'10px',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row',minWidth:'230px',width:'100%', marginBottom:10}}>
                    <div style={{marginRight:'10px'}}>{t("LawfirmThankyouPage")}</div>
                    <Switch />
                </div>
                <div style={{display:'flex',justifyContent:'space-between', flexDirection:'row',minWidth:'230px',width:'100%'}}>
                    <div style={{marginRight:'10px'}}>{t("PersonalInformation")}</div>
                    <Switch />
                </div>
           </div>
           <div style={{width:'100%',marginBottom:'10px'}}>
            <TextArea rows={4} placeholder={t("About")} />
           </div>
        </div>
    )
}

export default About;
