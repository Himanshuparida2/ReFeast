const AWS=require('aws-sdk');
AWS.config.update({
    region:'us-east-1',
    accessKeyId:'AKIA6ODU2S7O27XWWE6A',
    secretAccessKey:'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'
})
const dynamodb=new AWS.DynamoDB.DocumentClient();
module.exports=dynamodb;