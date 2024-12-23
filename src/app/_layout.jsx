// src/app/_layout.jsx
import React from 'react';
import RootNavigator from '../navigation/RootNavigation';
import { RoleProvider } from '../provider/RoleContext';

export default function AppLayout() {
  return (
    <RoleProvider>
      <RootNavigator />
    </RoleProvider>
  );
}
