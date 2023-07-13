const axios = require('axios');
const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendEmail =async (email,otp)=>{
    try{
        let defaultClient = SibApiV3Sdk.ApiClient.instance;
        
        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.brevo_api_key;
        
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        
        sendSmtpEmail.subject = "welcome user your otp is........";
        sendSmtpEmail.htmlContent = `<html><body><h3>welcome user your otp is ${otp}</h3></body></html>`;
        sendSmtpEmail.sender = {"name":"kVR Projects","email":"b.naveen2085@gmail.com"};
        sendSmtpEmail.to = [{"email":email}];
        sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
        
        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
          console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function(error) {
          console.error(error);
        });

    }
    catch(error){
        console.log(error)
    }
}


module.exports={
    sendEmail 
}
