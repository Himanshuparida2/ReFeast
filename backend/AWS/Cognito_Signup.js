const { Amplify } = require('aws-amplify');
const { Auth } = require('aws-amplify');
const crypto = require('crypto');
const AWS = require('aws-sdk');
const express = require('express');
const route = express.Router();
//const bcrypt = require('bcryptjs');
const dynamodb = require('./DynamoDB');
require('dotenv').config();


Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_6foH8V9b9',
    userPoolWebClientId: 'lkll40gaiu81fu3f7o9vc41eu',
    clientSecret: process.env.CLIENT_SECRET,
    identityPoolId: 'us-east-1:d77e4364-09c2-43db-96fd-82d80efdd69f',
    mandatorySignIn: true,
    oauth: {
      domain: 'us-east-16foh8v9b9.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:5050/',
      redirectSignOut: 'http://localhost:5050/',
      responseType: 'code'
    }
  }
});


const SaveIntoDynamoDB = async (username, name, email, phone) => {
  try {
    const param=({
      TableName: 'ReFeast_User',
      Item: {
        username,
        name,
        email,
        phone,
        CreatedAt: new Date().toISOString()
      }
    })
    await dynamodb.put(param).promise();
    
    console.log('User data stored successfully');
  } catch (error) {
    console.error('DynamoDB Error:', error);
    throw error; 
  }
};

const clientId = 'lkll40gaiu81fu3f7o9vc41eu';

function calculateSecretHash(username) {
    const clientSecret = process.env.CLIENT_SECRET;
    const message = username + clientId;
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(message);
    return hmac.digest('base64');
  }

  //const cognito = new AWS.CognitoIdentityServiceProvider();

  const SignUp = async (req, res) => {
  const { username, name, email, password, phone } = req.body;

  try {
    const response = await Auth.signUp({
      username, 
      password, 
      attributes: {
        name,
        email,
        phone_number: phone
      },
      clientMetadata: {
        SECRET_HASH: calculateSecretHash(username)
      }
    });

    console.log('Cognito sign-up response:', user);
    await SaveIntoDynamoDB(username, name, email, phone);

    res.status(201).json({
      message: 'Registration successful - confirm via email',
      data: {
        userId: response.UserSub,
        deliveryMedium: response.CodeDeliveryDetails?.DeliveryMedium
      }
    });
  } catch (err) {
    console.error('Signup Error:', err);
    const statusCode = err.statusCode || 500;
    const errorMap = {
      'InvalidParameterException': 400,
      'UsernameExistsException': 409,
      'InvalidPasswordException': 400,
      'CodeDeliveryFailureException': 424
    };

    res.status(errorMap[err.code] || statusCode).json({
      error: err.code || 'RegistrationFailed',
      message: err.message
    });
  }
};


route.post('/', SignUp);
module.exports = route;