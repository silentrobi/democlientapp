import request from 'superagent';

const BASE_URL = "http://localhost:3600/api/server/";

class ApiService {

    static getQrCode() {
        return request.post(BASE_URL + '/get-qrcode')
            .send();
    }

    static makePayment(qrCode, amount) {
        return request.post(BASE_URL + '/payment')
            .send();
    }
    createRecord(record) {
        return request.post(BASE_URL + '/record')
            .set(authHeader())
            .send(record);
    }

    getRecords() {
        return request.get(BASE_URL + '/record')
            .set(authHeader());
    }

    getRecord(id) {
        return request.get(BASE_URL + `/record/${id}`)
            .set(authHeader());
    }

    getUploadApiSignature(attrs) {
        return request.post(BASE_URL + '/upload-api-sign-request')
            .set(authHeader())
            .send(attrs);
    }

    updateRecord(attrs, id) {
        return request.patch(BASE_URL + `/record/${id}`)
            .set(authHeader())
            .send(attrs);
    }

    deleteRecord(id) {
        return request.delete(BASE_URL + `/record/${id}`)
            .set(authHeader());
    }

}

const recordService = new RecordService();
export default recordService;