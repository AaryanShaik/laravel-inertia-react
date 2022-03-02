import {useState} from 'react';
import { Input, Select, Button, Form } from 'antd';
import Password from 'antd/lib/input/Password';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { Trans, useTranslation } from 'react-i18next';
import './AccountInformation.css'

const { Option, OptGroup } = Select;

const renderOptions = () => {
  const timezones = moment.tz.names();
  let mappedValues = {};
  let regions = [];

  timezones.map((timezone) => {
    const splitTimezone = timezone.split('/');
    const region = splitTimezone[0];
    if (!mappedValues[region]) {
      mappedValues[region] = [];
      regions.push(region);
    }
    mappedValues[region].push(timezone);
  });
  return regions.map((region) => {
    const options = mappedValues[region].map((timezone) => {
      return <Option key={timezone}>{timezone}</Option>;
    });
    return (
      <OptGroup
        key={region}
        title={<div style={{ fontSize: 30 }}>{region}</div>}
      >
        {options}
      </OptGroup>
    );
  });
};



const CustomizedForm = ({ onChange, fields, t, onSaveAccountInformation, setFieldsDisabled, fieldsDisabled }) => (
 
  
  <Form
    name="global_state"
    layout="inline"
    style={{width:'100%'}}
    fields={fields}
    onFinish={onSaveAccountInformation}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
<Form.Item
            name="firstName"
            label={t("FirstName")}
            style={{width:'100%'}}
            rules={[
              {
                required: true,
                message: "PleaseinputyourFirstName",
              },
            ]}
          >
            <Input 
              disabled={fieldsDisabled}
              placeholder={"FirstName"} 
              style={{ marginBottom: 10, width:'100%'}}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={"LastName"}
            style={{width:'100%'}}
            rules={[
              {
                required: true,
                message: "PleaseinputyourLastName",
              },
            ]}
          >
            <Input
              disabled={fieldsDisabled}
              placeholder={"LastName"}
              style={{ marginBottom: 10, width:'100%' }}
            />
          </Form.Item>

          <Form.Item
            name="Mobile"
            label={"Mobile"}
            style={{width:'100%'}}
            rules={[
              {
                type: 'number',
                message: "TheinputhastobeaNumber",
              },
              {
                required: true,
                message: "PleaseinputyourNumber",
              },
            ]}
          >
            <Input
              disabled={fieldsDisabled}
              placeholder={"Mobile"}
              style={{ marginBottom: 10, width:'100%' }}
            />
          </Form.Item>

          <Form.Item
            name="Email"
            label={"Email"}
            style={{width:'100%'}}
            rules={[
              {
                type: 'email',
                message: "TheinputisnotvalidE-mail",
              },
              {
                required: true,
                message: "PleaseinputyourE-mail",
              },
            ]}
          >
            <Input
              disabled={fieldsDisabled}
              placeholder={"Email"}
              style={{ marginBottom: 10, width:'100%' }}
            />
          </Form.Item>

            <Form.Item
            name="Timezone"
            label={"Timezone"}
            style={{width:'100%'}}
            >
            <Select
              disabled={fieldsDisabled}
              style={{ width: '100%' }}
              defaultValue={momentTimezone.tz.guess()}
            >
              {renderOptions()}
            </Select>
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

function AccountInformation({customerdetails}) {
  const [t, i18n] = useTranslation('common');
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [fields, setFields] = useState([
    {
      name: ['firstName'],
      value: customerdetails && customerdetails.attorney_first_name,
    },
    {
      name:['lastName'],
      value: customerdetails && customerdetails.attorney_last_name,
    },
    {
      name:['Mobile'],
      value:customerdetails && customerdetails.attorney_phone == false ? '' :  customerdetails.attorney_phone
    },
    {
      name:['Email'],
      value:customerdetails && customerdetails.attorney_email
    },
    {
      name:['Timezone'],
      value:customerdetails && customerdetails.attorney_timezone
    }
  ]);


  const onSaveAccountInformation = (fields) => {
    console.log('Received values of Account Information: ', fields);
  };

  const onFinish = (fields) => {
    console.log('Received values of form: ', fields);
  };
  const [form] = Form.useForm();

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', marginBottom: '5px', fontSize: '16px' }}>
          {t("PersonalInformation")}
        </div>

        {/* <Form
          form={form}
          name="register"
          onFinish={onFinish}
          size="middle"
          scrollToFirstError
        >
          
        </Form> */}
        <CustomizedForm
        t={t}
        fields={fields}
        fieldsDisabled={fieldsDisabled}
        setFieldsDisabled={setFieldsDisabled}
        onSaveAccountInformation={onSaveAccountInformation}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      </div>

      <div style={{ width: '100%' }}>
        <div
          style={{
            width: '100%',
            marginTop: '10px',
            marginBottom: '5px',
            fontSize: '16px',
          }}
        >
          {t("ChangePassword")}
        </div>
           <Form
          form={form}
          name="register"
          onFinish={onFinish}
          size="middle"
          //   initialValues={{
          //     residence: ['zhejiang', 'hangzhou', 'xihu'],
          //     prefix: '86',
          //   }}
          scrollToFirstError
        >
          <Form.Item
            name="currentPassword"
            label={t("CurrentPassword")}
            rules={[
              {
                required: true,
                message: t("PleaseinputyourCurrentPassword"),
              },
            ]}
          >
            <Input.Password placeholder={t("CurrentPassword")} />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={t("NewPassword")}
            rules={[
              {
                required: true,
                message: t("PleaseinputyourNewPassword"),
              },
            ]}
          >
            <Input.Password placeholder={t("NewPassword")}/>
          </Form.Item>

          <Form.Item
            name="passwordConfirm"
            label={t("ConfirmPassword")}
            rules={[
              {
                required: true,
                message: t("PleaseConfirmPassword"),
              },
            ]}
          >
            <Input.Password placeholder={t("ConfirmPassword")} />
          </Form.Item>
            
          </Form>
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
        {/* </div> */}
      </div>
      <div style={{ width: '100%' }}>{t("BillingDate")}: July 27th 2021</div>
    </div>
  );
}

export default AccountInformation;
