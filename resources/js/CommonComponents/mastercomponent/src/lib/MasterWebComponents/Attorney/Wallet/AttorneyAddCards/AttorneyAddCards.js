import React,{ useState, useEffect} from 'react';
import { Table, Space, Button, Radio, Modal, Select, Input, Checkbox } from 'antd';
import { IoAddCircleSharp, IoTrashBin } from 'react-icons/io5';
import CreditCardInput from 'react-credit-card-input';
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai';

const AttorneyAddCards = () => {
    const [openAddCard, setopenAddCard] = useState(false);
    const [openEditCard, setopenEditCard] = useState(false);
    const [modalinputdata, setmodalinputdata] = useState({addresslineone:'',addresslinetwo:'',city:'',state:'',country:'',name:'',cardNumber:'',expiry:'',cvc:'',setdefaultcheck:false});
    const [modalEditCarddata, setmodalEditCarddata] = useState({addresslineone:'',addresslinetwo:'',city:'',state:'',country:'',name:'',expiry:'',setdefaultcheck:false});

    const { addresslineone,addresslinetwo,city,state,country,name,cardNumber,expiry,cvc, setdefaultcheck } = modalinputdata;
    const { editaddresslineone, editaddresslinetwo, editcity, editstate, editcountry, editname, editexpiry, editsetdefaultcheck } = modalEditCarddata;

    const handleOpenAddCardModel = () => {
        setopenAddCard(true);
    }

    const handleInputAddCard = e => setmodalinputdata({...modalinputdata, [e.target.name]: e.target.value});

    const handleAddCardModelOk = () => {
        console.log('handlerefundOk')
        setopenAddCard(false);
    };
    
    const handleAddCardModelCancel = () => {
        console.log('handlerefundCancel');
        setopenAddCard(false);
    };

    const handleCardNumberChange = (e) =>{
        // console.log('e ',e)
        setmodalinputdata({...modalinputdata, cardNumber: e.target.value})
    }

    const handleCardExpiryChange = (e) =>{
        setmodalinputdata({...modalinputdata, expiry: e.target.value})
    }

    const handleCardCVCChange = (e) =>{
        setmodalinputdata({...modalinputdata, cvc: e.target.value})
    }

    const handlerefundFullChecked = (e) => {
        setmodalinputdata({...modalinputdata, setdefaultcheck: e.target.checked})
      }

    const handleSaveCard = () =>{
        setopenAddCard(false);
        setmodalinputdata({addresslineone:'',addresslinetwo:'',city:'',state:'',country:'',name:'',cardNumber:'',expiry:'',cvc:'',setdefaultcheck:false})
    }

    //editcard functions
    const handleOpenEditCardModel = (editcard) => {
        console.log('editcard ',editcard)
        //modalEditCarddata({addresslineone:'',addresslinetwo:'',city:'',state:'',country:'',name:'',expiry:'',setdefaultcheck:false})
        setopenEditCard(true);
    }

    const handleEditCardModelOk = () => {
        console.log('handlerefundOk')
        setopenEditCard(false);
    };
    
    const handleEditCardModelCancel = () => {
        console.log('handleEditCardModelCancel');
        setopenEditCard(false);
    };

     const handleEditCardInput = e => setmodalEditCarddata({...modalEditCarddata, [e.target.name]: e.target.value});

    const handleEditSave = () =>{
        setopenEditCard(false);
        setmodalEditCarddata({addresslineone:'',addresslinetwo:'',city:'',state:'',country:'',name:'',expiry:'',setdefaultcheck:false})
    }

    const handleEditSetDefault = () =>{
        setopenEditCard(false);
        //set this card as default
        // setmodalEditCarddata({addresslineone:'',addresslinetwo:'',city:'',state:'',country:'',name:'',expiry:'',setdefaultcheck:false})
    }

    const handleEditDelete = () =>{
        setopenEditCard(false);
        //delete this card
        // setmodalEditCarddata({addresslineone:'',addresslinetwo:'',city:'',state:'',country:'',name:'',expiry:'',setdefaultcheck:false})
    }


        let cardarr = [
            {
                id:1,
                cardnumber: '1234 1234 1234 1234',
                cardType:'Visa',
                cardexp:'12/21',
                defaultcard: true,
            },
            {
                id:2,
                cardnumber: '1111 1234 1234 1234',
                cardType:'Master',
                cardexp:'12/21',
                defaultcard: false,
            },
            {
                id:3,
                cardnumber: '1222 1234 1234 1234',
                cardType:'Visa',
                cardexp:'12/21',
                defaultcard: false,
            }
        ]

        console.log('modalinputdata ',modalinputdata)
    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%', marginBottom:'10px',display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontWeight:'500'}}>Add Card</div>
                <div style={{paddingRight:'20px'}}>
                    <IoAddCircleSharp size={'25'} color={'#42A9FE'} onClick={handleOpenAddCardModel} style={{cursor:'pointer'}}/>
                    <Modal title="Add Card" width={380} visible={openAddCard} onOk={handleAddCardModelOk} footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <Button type={'primary'} onClick={handleSaveCard}>Save Card</Button>
                            </div>} onCancel={handleAddCardModelCancel}>
                        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                            <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                                <Input placeholder={'Address line 1'} name="addresslineone" value={addresslineone} onChange={handleInputAddCard} style={{width:'160px',marginBottom:'10px'}} />
                                <Input placeholder={'Address line 2'} name="addresslinetwo" value={addresslinetwo} onChange={handleInputAddCard} style={{width:'160px',marginBottom:'10px'}} />
                            </div>
                            <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                                <Input placeholder={'City'} name="city" value={city} onChange={handleInputAddCard} style={{width:'160px',marginBottom:'10px'}} />
                                <Input placeholder={'State'} name="state" value={state} onChange={handleInputAddCard} style={{width:'160px',marginBottom:'10px'}} />
                            </div>
                            <div style={{width:'100%',marginBottom:'10px'}}>
                                <Input placeholder={'Country'} name="country" value={country} onChange={handleInputAddCard} />
                            </div>

                            <div style={{width:'100%',marginBottom:'10px'}}>
                                <Input placeholder={'Name'} name="name" value={name} onChange={handleInputAddCard} />
                            </div>
                            
                            <div style={{width:'100%',marginBottom:'10px'}}>
                                {/* <div style={{width:'100%',border:'1px solid #ccc'}}> */}
                                    <CreditCardInput
                                    cardNumberInputProps={{ value: cardNumber, onChange: handleCardNumberChange }}
                                    cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
                                    cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
                                    fieldClassName="input"
                                    />
                                {/* </div> */}
                            </div>

                            <div style={{marginBottom:'10px',width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                                <Checkbox onChange={handlerefundFullChecked} />
                                <div style={{marginLeft:'10px'}}>Set As Default</div>
                            </div>
        
                            {/* <Input value={refundAmount} placeholder={'Amount to Refund'} style={{marginBottom:'10px'}} onChange={(txt)=>handleRefundAmountChange(txt)}/>
                            <Input value={refundReason} placeholder={'Reason (optional)'} style={{marginBottom:'10px'}} onChange={(txt)=>handleRefundReasonChange(txt)}/> */}
                        </div>  
                    </Modal>
                </div>
            </div>
            <div style={{width:'100%',marginTop:'20px'}}>
                        {/* <div style={{width:'100%',padding:'10px 0',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                            <div style={{marginRight:'10px'}}>Visa</div>
                            <div style={{marginRight:'10px'}}>1234 1234 1234 1234</div>
                            <div style={{marginRight:'10px'}}>exp: 12/21</div>
                            <div style={{marginRight:'20px',padding:'0 4px',background:'green',color:'white'}}>Default</div>
                            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                                <Button size="small" type={'primary'} style={{marginRight:'1px'}}><AiFillEdit /></Button>
                                <Button size="small" type={'primary'} style={{marginRight:'1px'}}><AiOutlineCheck /></Button>
                                <Button size="small" type={'danger'}><IoTrashBin /></Button>
                            </div>
                        </div> */}
                        {
                           cardarr.length > 0 ? cardarr.map(carddata =>(
                            <div key={carddata} style={{width:'100%',padding:'10px 0',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                                <div style={{marginRight:'10px',minWidth:'50px'}}>{carddata.cardType}</div>
                                <div style={{marginRight:'10px'}}>{'**** **** **** '+carddata.cardnumber.substring(14)}</div>
                                <div style={{marginRight:'10px'}}>exp: {carddata.cardexp}</div>
                                <div style={{marginRight:'20px',minWidth:'60px',textAlign:'center',padding:'0 4px',background: carddata.defaultcard?'green':'white',color:'white'}}>{carddata.defaultcard? 'Default' : null}</div>
                                <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                                    <Button size="small" type={'primary'} style={{marginRight:'1px'}} onClick={()=>handleOpenEditCardModel(carddata)}><AiFillEdit /></Button>
                                    <Button size="small" type={'primary'} style={{marginRight:'1px'}}><AiOutlineCheck /></Button>
                                    <Button size="small" type={'danger'}><IoTrashBin /></Button>
                                </div>
                            </div>
                           )) : null
                        }
                        <Modal title="Edit Card" width={380} visible={openEditCard} onOk={handleEditCardModelOk} footer={<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <Button type={'primary'} onClick={handleSaveCard}>Save Changes</Button>
                            </div>} onCancel={handleEditCardModelCancel}>
                        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                            <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                                <Input placeholder={'Address line 1'} name="editaddresslineone" value={editaddresslineone} onChange={handleEditCardInput} style={{width:'160px',marginBottom:'10px'}} />
                                <Input placeholder={'Address line 2'} name="editaddresslinetwo" value={editaddresslinetwo} onChange={handleEditCardInput} style={{width:'160px',marginBottom:'10px'}} />
                            </div>
                            <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                                <Input placeholder={'City'} name="editcity" value={editcity} onChange={handleEditCardInput} style={{width:'160px',marginBottom:'10px'}} />
                                <Input placeholder={'State'} name="editstate" value={editstate} onChange={handleEditCardInput} style={{width:'160px',marginBottom:'10px'}} />
                            </div>
                            <div style={{width:'100%',marginBottom:'10px'}}>
                                <Input placeholder={'Country'} name="editcountry" value={editcountry} onChange={handleEditCardInput} />
                            </div>

                            <div style={{width:'100%',marginBottom:'10px'}}>
                                <Input placeholder={'Name'} name="editname" value={editname} onChange={handleEditCardInput} />
                            </div>

                            <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                                <Input placeholder={'Card Exp'} name="editexpiry" value={editexpiry} onChange={handleEditCardInput} style={{width:'160px',marginBottom:'10px'}} />                             
                            </div>
                            
                            {/* <div style={{marginBottom:'10px',width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                                <Checkbox onChange={handlerefundFullChecked} />
                                <div style={{marginLeft:'10px'}}>Set As Default</div>
                            </div> */}
        
                            {/* <Input value={refundAmount} placeholder={'Amount to Refund'} style={{marginBottom:'10px'}} onChange={(txt)=>handleRefundAmountChange(txt)}/>
                            <Input value={refundReason} placeholder={'Reason (optional)'} style={{marginBottom:'10px'}} onChange={(txt)=>handleRefundReasonChange(txt)}/> */}
                        </div>  
                    </Modal>
            </div>
        </div>
    )
}

export default AttorneyAddCards;
