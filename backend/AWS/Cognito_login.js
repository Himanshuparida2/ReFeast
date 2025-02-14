const { Amplify, Auth } = require('aws-amplify');
const AWS = require('aws-sdk');
const express=require('express')
const route=express.Router()
const crypto = require('crypto');
require('dotenv').config()

Amplify.configure({
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_6foH8V9b9',
      userPoolWebClientId: 'lkll40gaiu81fu3f7o9vc41eu',
      clientSecret: process.env.CLIENT_SECRET,
      identityPoolId: 'us-east-1:d77e4364-09c2-43db-96fd-82d80efdd69f',
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    },
  });
//console.log(process.env.CLIENT_SECRET)
  function calculateSecretHash(username) {
    const clientSecret = process.env.CLIENT_SECRET;
    const message = username + 'lkll40gaiu81fu3f7o9vc41eu';
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(message);
    return hmac.digest('base64');
  }

  const Login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      const dynamodb = new AWS.DynamoDB();
      const param = {
        TableName: "ReFeast_User",
        Key: {
          "username": { S: username }
        }
      };
  
      const data = await dynamodb.getItem(param).promise();
      const secretHash=calculateSecretHash(username)
      const user = await Auth.signIn({
        username: username,
        password: password,
        clientMetadata: {
          SECRET_HASH: secretHash
        }
      });
  
      const cred = await Auth.currentCredentials();
      AWS.config.update({
        region: "us-east-1",
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1:d77e4364-09c2-43db-96fd-82d80efdd69f",
          Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_6foH8V9b9': user.signInUserSession.idToken.jwtToken
          }
        })
      });
      res.status(200).json({
        message: "Login successful",
        user: {
          username: user.username,
          email: user.attributes?.email,
          tokens: {
            idToken: user.signInUserSession.idToken.jwtToken,
            accessToken: user.signInUserSession.accessToken.jwtToken,
            refreshToken: user.signInUserSession.refreshToken?.token
          }
        },credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken
        }
      });
  
    } catch (err) {
          console.error(err);
          const statusCode = err.code === 'NotAuthorizedException' ? 401 : 
          err.code === 'UserNotFoundException' ? 404 : 500;

          res.status(statusCode).json({
          error: err.code || 'LoginFailed',
          message: err.message
    });
  };
}
  
  route.post('/', Login);
module.exports=route;
