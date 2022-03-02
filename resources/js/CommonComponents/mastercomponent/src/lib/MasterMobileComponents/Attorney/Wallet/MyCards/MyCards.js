import { useState } from 'react';
import { Button, Input, Typography, Drawer, Card, Form } from 'antd';
import { IonContent, IonModal } from '@ionic/react';
import CreditCardInput from 'react-credit-card-input';
// import CardDisplay from 'react-credit-card-display';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiArrowBack } from 'react-icons/bi';
import { Trans, useTranslation } from 'react-i18next';
const { Text } = Typography;

function MyCards() {
  const [t, i18n] = useTranslation('common');
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.value);
  };

  const handleCardExpiryChange = (e) => {
    setExpiry(e.value);
  };

  const handleCardCVCChange = (e) => {
    setCvc(e.value);
  };

  function AddCardHeader() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BiArrowBack style={{ fontSize: 20 }} onClick={onClose} />
        <Text style={{ marginLeft: 10 }}>{t("AddCard")}</Text>
      </div>
    );
  }

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text strong>Cards</Text>
        <Button onClick={showDrawer}>{t("Add")}</Button>
      </div>
      <Card
        size="small"
        style={{ display: 'flex', flexDirection: 'column', marginTop: 15 }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Text>VISA **** **** **** 1234 | exp: 04/22</Text>
            <Text type="success">{t("Default")}</Text>
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              marginTop: 10,
              justifyContent: 'space-between',
            }}
          >
            <Button style={{ width: '100%' }}>
              <AiOutlineEdit style={{ fontSize: 20 }} />
            </Button>
            <Button style={{ width: '100%' }}>
              <BsFillCheckSquareFill style={{ fontSize: 20 }} />
            </Button>
            <Button style={{ width: '100%' }}>
              <RiDeleteBin5Line style={{ fontSize: 20 }} />
            </Button>
          </div>
        </div>
      </Card>

      <IonContent>
        <IonModal isOpen={showModal} cssClass="my-custom-class">
          <div style={{ padding: 10 }}>
            <Input placeholder="Address Line 1" style={{ marginBottom: 10 }} />
            <Input placeholder="Address Line 2" style={{ marginBottom: 10 }} />
            <Input placeholder="City" style={{ marginBottom: 10 }} />
            <Input placeholder="State" style={{ marginBottom: 10 }} />
            <Input placeholder="Country" style={{ marginBottom: 10 }} />
            <Input placeholder="Name" style={{ marginBottom: 10 }} />

            <CreditCardInput
              cardNumberInputProps={{
                value: cardNumber,
                onChange: handleCardNumberChange,
              }}
              cardExpiryInputProps={{
                value: expiry,
                onChange: handleCardExpiryChange,
              }}
              cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
              fieldClassName="input"
            />
          </div>

          <Button onClick={() => setShowModal(false)}>Close</Button>
        </IonModal>
      </IonContent>

      <Drawer
        title={<AddCardHeader />}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="100%"
      >
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
            name="addressLine1"
            label="Address Line 1"
            rules={[
              {
                required: true,
                message: 'Please input your Address Line 1!',
              },
            ]}
          >
            <Input
              placeholder="Address Line 1"
            />
          </Form.Item>

          <Form.Item
            name="addressLine2"
            label="Address Line 2"
          // rules={[
          //   {
          //     type: 'email',
          //     message: 'The input is not valid E-mail!',
          //   },
          //   {
          //     required: true,
          //     message: 'Please input your E-mail!',
          //   },
          // ]}
          >
            <Input
              placeholder="Address Line 2"
            // style={{ marginBottom: 10 }}
            />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: 'Please input your City!',
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: 'Please input your State!',
              },
            ]}
          >
            <Input placeholder="State" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: 'Please input your Country!',
              },
            ]}
          >
            <Input placeholder="Country" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="card"
            label="Card"
            rules={[
              {
                required: true,
                message: 'Please input your Card!',
              },
            ]}
          >
            <CreditCardInput
              cardNumberInputProps={{
                value: cardNumber,
                onChange: handleCardNumberChange,
              }}
              cardExpiryInputProps={{
                value: expiry,
                onChange: handleCardExpiryChange,
              }}
              cardCVCInputProps={{
                value: cvc,
                onChange: handleCardCVCChange,
              }}
              fieldClassName="input"
            />
          </Form.Item>
        </Form>

        {/* <Input placeholder="Address Line 1" style={{ marginBottom: 10 }} /> */}
        {/* <Input placeholder="Address Line 2" style={{ marginBottom: 10 }} /> */}
        {/* <Input placeholder="City" style={{ marginBottom: 10 }} /> */}
        {/* <Input placeholder="State" style={{ marginBottom: 10 }} /> */}
        {/* <Input placeholder="Country" style={{ marginBottom: 10 }} /> */}
        {/* <Input placeholder="Name" style={{ marginBottom: 10 }} /> */}

        <Button style={{ width: '100%', marginTop: 10 }}>Add Card</Button>

      </Drawer>
    </div>
  );
}

export default MyCards;
