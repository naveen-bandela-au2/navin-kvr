var postmark = require("postmark");

const sendEmail =async (email,otp)=>{
    try{
      var client = new postmark.ServerClient(process.env.postmark_api_key);
      client.sendEmail({
        "From": "info@kvrestates.in",
        "To": email,
        "Subject": `welcome ${email} your otp is........`,
        "HtmlBody": `<html><body><h3>welcome ${email} your otp is ${otp}</h3></body></html>`,
        "MessageStream": "outbound"
      });
    }
    catch(error){
        console.log(error)
    }
}


module.exports={
    sendEmail 
}
