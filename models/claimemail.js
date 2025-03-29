const mongoose=require('mongoose')

const claimemailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: String,
    mailgunResponseId: String,
    sentAt: String,
    subject: String,
    type: String,
    to: String,
    messages: String,
    body: String,
    bodyPlain: String,
    bodyHtml: String,
    text: String,
    userId:String
});

module.exports=mongoose.model('Claimemail',claimemailSchema)