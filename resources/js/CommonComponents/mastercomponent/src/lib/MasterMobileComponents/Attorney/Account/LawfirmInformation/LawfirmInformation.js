import { useState } from 'react';
import { Input, Button, Modal, Card, Typography, Drawer, Form } from 'antd';
import { IoAddCircleSharp } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import { Trans, useTranslation } from 'react-i18next';

const { Text } = Typography;

const CustomizedForm = ({ onChange, fields, t, onSaveLawFirmInformation, setFieldsDisabled, fieldsDisabled }) => (
 
  <Form
    name="global_state"
    layout="inline"
    style={{width:'100%'}}
    fields={fields}
    onFinish={onSaveLawFirmInformation}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
<Form.Item
              name="firmName"
              label={t("FirmName")}
              style={{width:'100%'}}
              rules={[
                {
                  required: true,
                  message: t("PleaseinputyourFirmName"),
                },
              ]}
            >
              <Input
                disabled={fieldsDisabled}
                placeholder={t("FirmName")}
                style={{ marginBottom: 10, width: '100%'  }}
              />
            </Form.Item>

            <Form.Item
              name="Mobile"
              label={t("FirmMobile")}
              style={{width:'100%'}}
              rules={[
                {
                  type: 'number',
                  message: t("TheinputhastobeaNumber"),
                },
                {
                  required: true,
                  message: t("PleaseinputyourFirmMobile"),
                },
              ]}
            >
              <Input
                disabled={fieldsDisabled}
                placeholder={t("FirmMobile")}
                style={{ marginBottom: 10 , width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="Email"
              label={t("FirmEmail")}
              style={{width:'100%'}}
              rules={[
                {
                  type: 'email',
                  message: t("TheinputisnotvalidE-mail"),
                },
                {
                  required: true,
                  message: t("PleaseinputyourFirmE-mail"),
                },
              ]}
            >
              <Input
                disabled={fieldsDisabled}
                placeholder={t("FirmEmail")}
                style={{ marginBottom: 10 , width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label={t("FirmAddress")}
              style={{width:'100%'}}
              rules={[
                {
                  required: true,
                  message: t("PleaseinputyourFirmAddress"),
                },
              ]}
            >
              <Input
                disabled={fieldsDisabled}
                placeholder={t("FirmAddress")}
                style={{ marginBottom: 10, width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="firmWebsite"
              label={t("FirmWebsite")}
              style={{width:'100%'}}
              rules={[
                {
                  required: true,
                  message: t("PleaseinputFirmWebsite"),
                },
              ]}
            >
              <Input disabled={fieldsDisabled} style={{ width: '100%' }} type="url" placeholder={t("FirmWebsite")}></Input>
            </Form.Item>
            <Form.Item
            style={{
              minWidth: '200px',
              width: '100%',
              marginRight: '1px',
              textAlign: 'right',
              marginTop: '10px',
            }}
          >
            {
              fieldsDisabled == true ? <Button type={'primary'} onClick={()=> setFieldsDisabled(false)}>{t("edit")}</Button> : 
                <div style={{display:'flex', width:"100%", justifyContent:'flex-end'}}>
                  <Button type={'primary'} style={{marginRight:10}} onClick={()=> setFieldsDisabled(true)} htmlType="submit">{t("cancel")}</Button>
                  <Button type={'primary'} onClick={()=> setFieldsDisabled(true)} htmlType="submit">{t("save")}</Button>
                </div>
                
            }
            </Form.Item>
  </Form>
);

const AddPartnerForm = ({ onChange, t, addPartnerFields, onAddPartner, onClose, setAddPartnerFields}) => (
 
  <Form
    name="global_state"
    layout="inline"
    style={{width:'100%'}}
    addPartnerFields={addPartnerFields}
    onFinish={onAddPartner}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
<Form.Item
              name="name"
              label={t("Name")}
              style={{width:'100%'}}
              rules={[
                {
                  required: true,
                  message: t("PleaseinputyourName"),
                },
              ]}
            >
              <Input
                placeholder={t("Name")}
                style={{ marginBottom: 10 }}
              />
            </Form.Item>

            <Form.Item
              name="Email"
              label={t("Email")}
              style={{width:'100%'}}
              rules={[
                {
                  type: 'email',
                  message: t("TheinputisnotvalidE-mail"),
                },
                {
                  required: true,
                  message: t("PleaseinputyourE-mail"),
                },
              ]}
            >
              <Input
                placeholder={t("Email")}
                style={{ marginBottom: 10 }}
              />
            </Form.Item>

            <Form.Item
              name="Mobile"
              label={t("Mobile")}
              style={{width:'100%'}}
              rules={[
                {
                  type: 'number',
                  message: t("TheinputhastobeaNumber"),
                },
                {
                  required: true,
                  message: t("PleaseinputyourNumber"),
                },
              ]}
            >
              <Input
                placeholder={t("Mobile")}
                style={{ marginBottom: 10 }}
              />
            </Form.Item>
            <Form.Item
              name="state"
              label={t("State")}
              style={{width:'100%'}}
              rules={[
                {
                  required: true,
                  message: t("PleaseinputState"),
                },
              ]}
            >
              <Input
                placeholder={t("State")}
                style={{ marginBottom: 10 }}
              />
            </Form.Item>
           <Form.Item
            style={{width:'100%'}}
           >
             <div 
              style={{display:'flex', width:'100%',justifyContent:'flex-end'}}
             >
             <Button style={{marginRight:10}} onClick={()=> {setAddPartnerFields([
               {
                name:['name'],
                value:''
              },
              {
                name:['Email'],
                value:''
              },
              {
                name:['Mobile'],
                value:''
              },
              {
                name:['state'],
                value:''
              }
             ]); onClose();}}>Cancel</Button>
             <Button htmlType='submit' type='primary'>Add Partner</Button>
             </div>
           </Form.Item>
  </Form>
);

function LawfirmInformation({ customerdetails}) {
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [fields, setFields] = useState([
    {
      name:['firmName'],
      value:customerdetails.firmInfo.attorney_firm_name == false ? '' : customerdetails.firmInfo.attorney_firm_name
    },
    {
      name:['Mobile'],
      value:customerdetails.firmInfo.law_firm_phone == false ? '' : customerdetails.firmInfo.law_firm_phone
    },
    {
      name:['Email'],
      value:customerdetails.attorney_address == false ? '' : customerdetails.attorney_address
    },
    {
      name:['address'],
      value:customerdetails.firmInfo.law_firm_phone == false ? '' : customerdetails.firmInfo.law_firm_phone
    },
    {
      name:['firmWebsite'],
      value:customerdetails.firmInfo.law_firm_website == false ? '' : customerdetails.firmInfo.law_firm_website
    },
  ]);
  const [addPartnerFields, setAddPartnerFields] = useState([
    {
      name:['name'],
      value:''
    },
    {
      name:['Email'],
      value:''
    },
    {
      name:['Mobile'],
      value:''
    },
    {
      name:['state'],
      value:''
    }
  ])
  
  const [visible, setVisible] = useState(false);

  const [t, i18n] = useTranslation('common');


  const onSaveLawFirmInformation = (fields) => {
    console.log('Received values of Account Information: ', fields);
  };


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  const [form] = Form.useForm();

  const onAddPartner = (values) => {
    console.log('Received values of form: ', values);
  };

  const data = [
    {
      no: '1',
      name: 'John Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
    {
      no: '2',
      name: 'Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
    {
      no: '3',
      name: 'John Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
    {
      no: '4',
      name: 'John Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
    {
      no: '5',
      name: 'John Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
    {
      no: '6',
      name: 'John Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
    {
      no: '7',
      name: 'John Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
    {
      no: '8',
      name: 'John Doe Martins',
      casetype: `Auto Accident`,
      assignedat: '07/14/2020, 02:24 AM',
      apiresponse: '',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
    },
  ];

  function AddPartnerHeader() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BiArrowBack style={{ fontSize: 20 }} onClick={onClose} />
        <Text style={{ marginLeft: 10 }}>{t("AddPartner")}</Text>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', marginBottom: '5px', fontSize: '16px' }}>
          {t("FirmInformation")}
        </div>
        <CustomizedForm
        t={t}
        fields={fields}
        fieldsDisabled={fieldsDisabled}
        setFieldsDisabled={setFieldsDisabled}
        onSaveAccountInformation={onSaveLawFirmInformation}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
          
          
      </div>
      <div style={{ width: '100%', marginTop: '20px' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: '16px' }}>{t("AccountPartner")}</div>
          <div>
            <IoAddCircleSharp
              size={'30'}
              color={'#1890FF'}
              onClick={showDrawer}
              style={{ cursor: 'pointer' }}
            />
            
          </div>
        </div>
        {customerdetails && customerdetails.attorneyPartners && customerdetails.attorneyPartners.length > 0 && customerdetails.attorneyPartners.map((item) => (
          <Card size="small" key={item.partnerId}>
            <Text strong>{item.name}</Text>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text>{item.email}</Text>
              <Text>{item.phone}</Text>
            </div>
          </Card>
        ))}
      </div>
      <Drawer
        title={<AddPartnerHeader />}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="100%"
      >
        <div
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
      
      <AddPartnerForm
        t={t}
        addPartnerFields={addPartnerFields}
        onAddPartner={onAddPartner}
        onClose={onClose}
        setAddPartnerFields={setAddPartnerFields}
        onChange={(newFields) => {
          setAddPartnerFields(newFields);
        }}
      />
        </div>
      </Drawer>
    </div>
  );
}

export default LawfirmInformation;
