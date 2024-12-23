import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BuyerLogin from '../components/BuyerLogin';
import BuyerSignup from '../components/BuyerSignup';
import EmailVerification from '../components/EmailVerification';

const BuyerStack = createStackNavigator();

const BuyerNavigator = () => (
  <BuyerStack.Navigator initialRouteName="BuyerLogin">
    <BuyerStack.Screen name="BuyerLogin" component={BuyerLogin} />
    <BuyerStack.Screen name="BuyerSignup" component={BuyerSignup} />
    <BuyerStack.Screen name="EmailVerification" component={EmailVerification} />
  </BuyerStack.Navigator>
);

export default BuyerNavigator;
