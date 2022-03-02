import {useState} from 'react';
import {Typography, InputNumber, Input, Select, Card, Button, Drawer} from 'antd';
import {BsCheck} from 'react-icons/bs';
import {AiOutlineEdit} from 'react-icons/ai';
import { IonModal, IonContent} from '@ionic/react';
import {BiArrowBack} from 'react-icons/bi';
import { Trans, useTranslation } from 'react-i18next';
// import './Plan.css';

const {Text} = Typography;
const { Option } = Select;

function Plan() {
    const [t, i18n] = useTranslation('common');
    const [plan, setPlan] = useState('Basic Plan');
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState();
    const [editPlanVisible, setEditPlanVisible] = useState(false);

    const showEditPlanDrawer = () => {
        setEditPlanVisible(true);
      };
    
      const closeEditPlanDrawer = () => {
        setEditPlanVisible(false);
      };

      function EditPlanHeader () {
        return (
            <div style={{display:'flex', alignItems:'center'}}>
                <BiArrowBack style={{fontSize:20}} onClick={closeEditPlanDrawer}/>
                <Text style={{marginLeft:10}}>{t("LeadDetails")}</Text>
            </div>
        )
    }

    const [planData, setPlanData] = useState({
        caseTypes:[
            {
                name:t("PersonalInjury"),
                price: 12
            },
        {
            name:t("SexualAssault"),
            price:1
        },
        {name:t("AutoAccident"),price:120},
        {name:t("MedicalMalpractice"),price:1},
        {name:t("ProductLiability"),price:1},
        {name:t("WorkersCompensation"),price:1},
        {name:t("WrongfulDeath"),price:1},
        {name:t("Other"),price:0}
    ]})
    function onChange(value) {
        setPlan(value);
        console.log(`selected ${value}`);
      }

    return (
        <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center'}}>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
             <Select
                showSearch
                style={{ width:'100%' }}
                placeholder={t("SelectPlan")}
                optionFilterProp="children"
                onChange={onChange}
                defaultValue='Plan 1'
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Plan 1">Plan 1</Option>
                <Option value="Plan 2">Plan 2</Option>
                <Option value="Plan 3">Plan 3</Option>
            </Select>
            </div>

            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <Card size='small' style={{width:window.innerWidth > 575 ? '60%' : "100%", paddingLeft:10, paddingRight:10, marginTop:20}}>
            <div className="planCard">
                <div style={{display:'flex', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
                    <h4 >Plan 1</h4>
                    <AiOutlineEdit onClick={showEditPlanDrawer} style={{alignSelf:'center',  fontSize:20}}/>
                </div>
                
          
          <div className="planPrice" style={{display:'flex', alignItems:'center'}}>
            <p className="rupee" style={{marginRight:5}}>$</p>
            <h2  style={{marginRight:5}}>999</h2>
            <p>/mo</p>
          </div>
          <div className="planDetails" >
              {planData.caseTypes.map(item =>
                <div className="planDetail"  style={{display:'flex', justifyContent:'center'}}>
                <BsCheck className="check"  style={{marginRight:15, fontSize:20}}/>
                <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                  <p>{item.name}  </p>
                  <p>${item.price}/{t("Lead")}</p>
                </div>
                
              </div>
            )}
          </div>
        </div>
        </Card>
        </div>
        <IonContent>
            <IonModal isOpen={showModal} cssClass='my-custom-class'>          
                <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <Text style={{fontSize:16}} strong>{t("EditPlan")}</Text>
                </div>
                    {/* <Card size='small'> */}
                    {planData.caseTypes.map(item =>
                    <div>
                        <Text style={{fontSize:14}}>{item.name}</Text>
                        <Input placeholder={item.name} value={item.price} style={{marginBottom:15}}></Input>
                    </div>
                    )}
                    {/* </Card> */}
                <Button onClick={() => setShowModal(false)}>{t("Close")}</Button>
            </IonModal>
        </IonContent>

        <Drawer
                title={<EditPlanHeader/>}
                placement="right"
                closable={false}
                onClose={closeEditPlanDrawer}
                visible={editPlanVisible}
                width='100%'
            >
                
                    {planData.caseTypes.map(item =>
                    <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                        <Text style={{fontSize:14}}>{item.name}</Text>
                        <InputNumber  value={item.price} min={0} style={{marginBottom:15}}></InputNumber>
                    </div>
                    )}
                <div
            style={{
              minWidth: '200px',
              width: '100%',
              marginRight: '1px',
              textAlign: 'right',
              marginTop: '5px',
            }}
          >
            <Button type={'primary'}>{t("Save")}</Button>
        </div>
            </Drawer>
        </div>
    )
}

export default Plan
