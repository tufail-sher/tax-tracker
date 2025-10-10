import { Tabs } from 'expo-router';
import React from 'react';
import CustomTabBar from '../../src/home/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          title: 'Invoices',
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}