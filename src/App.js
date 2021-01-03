import { React, useState} from 'react';
import './App.css';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert
} from 'react-bootstrap';

import ApiService from './Services/ApiService';
import QRCodeParser from './Services/QRCodeParser';

function App() {

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [payment, setPayment] = useState({
    qrCode: '',
    amount: '',
    errorMessage: ''
  });

  const handleGetQrCode = (event) => {
    event.preventDefault();
    ApiService.getQrCode()
      .then(res => {
        setPayment({
          ...payment,
          amount: QRCodeParser.parseAmount(res.body.QRdata),
          qrCode: res.body.QRdata
        });
      });
  };

  const handlePayment = (event) => {
    event.preventDefault();
    ApiService.makePayment(payment.qrCode, payment.amount).then(
      res => {
        if (res.body.returnCode === 1000) {
          setShowSuccessDialog(true);
        } else {
          setShowErrorDialog(true);
          setPayment({
            ...payment,
            errorMessage: res.body.returnDesc
          });
        }
      }
    );
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12}>
            <Button variant="outline-primary" size='lg' onClick={handleGetQrCode}><b>Get QR Code!</b></Button>{' '}
          </Col>
          <Col xs={12}>
            <Form>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control readOnly type="amount" placeholder="Amount to pay" value={QRCodeParser.convertDotToComma(payment.amount) || ''} />
              </Form.Group>

              {!showSuccessDialog &&
                !showErrorDialog &&
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handlePayment}
                  className="btn-custom"
                > Pay </Button>
              }

              <Alert show={showSuccessDialog} variant='success'>
                Payment is successful! Payment amount is <b>{QRCodeParser.convertDotToComma(payment.amount)}</b>
                <div className="d-flex justify-content-end">
                  <Button onClick={() => setShowSuccessDialog(false)} variant="outline-success">
                    Close!
                  </Button>
                </div>
              </Alert>

              <Alert show={showErrorDialog} variant='danger'>
                <b>{payment.errorMessage}</b>
                <div className="d-flex justify-content-end">
                  <Button onClick={() => setShowErrorDialog(false)} variant="outline-danger">
                    Close!
                  </Button>
                </div>
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
