import request from 'superagent';

const BASE_URL = "http://localhost:3600/api/server/";

class ApiService {

    static getQrCode() {
        return request.post(BASE_URL + 'get-qrcode')
            .send({});
    }

    static makePayment(qrCode, amount) {
        return request.post(BASE_URL + 'payment')
            .send({
                'qrData': qrCode,
                'amount': amount
            });
    }
}

export default ApiService;