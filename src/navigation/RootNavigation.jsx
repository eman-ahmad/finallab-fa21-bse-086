// src/navigation/RootNavigator.jsx
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SellerStack from './SellerStack';
import BuyerStack from './BuyerStack';
import RoleScreen from '../components/RoleScreen';
import { RoleContext } from '../provider/RoleContext'; // Context to manage role

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { role } = useContext(RoleContext); // Get the role (parent or child)

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {role === null ? (
        // If role is null, show RoleScreen (could be a screen that asks user to select role)
        <RootStack.Screen name="RoleScreen" component={RoleScreen} />
      ) : role === 'seller' ? (
        // If role is 'child', show ChildStack
        <RootStack.Screen name="SellerStack" component={SellerStack} />
      ) : (
        // If role is 'parent', show ParentStack
        <RootStack.Screen name="BuyerStack" component={BuyerStack} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
