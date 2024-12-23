import { View, Text } from 'react-native';
import React from 'react';
import { RoleProvider } from '../provider/RoleContext';
import RootNavigator from '../navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import AppLayout from './_layout';

const index = () => {
  return (
    <AppLayout/>
  );
};

export default index;
