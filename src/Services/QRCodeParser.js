class QRCodeParser {

    static parseQrCode(qrCode) {

        var tags = [];
        var i = 0;

        while (i < qrCode.length) {
            var tag = qrCode.substring(i, i + 2);
            i += 2;
            var valueLength = Number(qrCode.substring(i, i + 2));
            i += 2;
            var value = qrCode.substring(i, i + valueLength);
            i += valueLength;
            tags.push({ tag: tag, length: valueLength, value: value });
        }

        return tags;
    }

    static parseAmount(qrCode) {

        var parsedQrCode = QRCodeParser.parseQrCode(qrCode);
        return parsedQrCode[2].value;
    }
    
    static convertDotToComma = (value) => {

        return value.replace('.', ',');
    }
}

export default QRCodeParser;