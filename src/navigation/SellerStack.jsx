import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SellerCode from '../components/SellerCode';
import SellerInfo from '../components/SellerInfo';

const SellerStack = createStackNavigator();

const SellerNavigator = () => (
  <SellerStack.Navigator initialRouteName="SellerInfo">
    <SellerStack.Screen name="SellerInfo" component={SellerInfo} />
    <SellerStack.Screen name="SellerCode" component={SellerCode} />
  </SellerStack.Navigator>
);

export default SellerNavigator;
