import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const Tab = createMaterialTopTabNavigator();

const TABS = [
  {
    id:1,
    name: 'Parking 1',
    component: TopTabComponent,
    user:{
      id:11,
      name: 'User 1',
      collection :140,
      inHouseVehicles:15
    }
  },
  {
    id:2,
    name: 'Parking 2',
    component: TopTabComponent,
    user:{
      id:12,
      name: 'User 2',
      collection :134,
      inHouseVehicles:25
    }
  },
  {
    id:3,
    name: 'Parking 3',
    component: TopTabComponent,
    user:{
      id:13,
      name: 'User 3',
      collection :174,
      inHouseVehicles:95
    },
  },
  {
    id:4,
    name: 'Parking 4',
    component: TopTabComponent,
    user:{
      id:14,
      name: 'User 4',
      collection :114,
      inHouseVehicles:55
    },
  },
];

function Card({title='Title',value=0}) {
  return (
    <View
      style={{
        backgroundColor: COLORS.lightGray,
        padding: 20,
        marginTop: 10,
        width: '45%',
        borderRadius: 15,
        elevation: 2,
        alignItems: 'center',
      }}>
      <Text
        style={{
          backgroundColor: COLORS.primary,
          padding: 10,
          width: 150,
          borderRadius: 10,
          color: COLORS.white,
        }}>
        {title}
      </Text>
      <Text
        style={{
          marginTop: 10,
          fontSize: 40,
          color: COLORS.primary,
          fontWeight: 'bold',
        }}>
        {value}$
      </Text>
    </View>
  );
}

function TopTabComponent({route}) {
  let user = route.params;
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: COLORS.lightGray,
          marginVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={FONTS.h4}>Active User</Text>
          <Text style={FONTS.h4}>{user.name}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Card title="Today's Collection" value={user.collection}/>
        <Card title="In House Vehicles" value={user.inHouseVehicles}/>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: COLORS.lightGray,
          marginVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'flex-start',
          }}>
          <Text style={[FONTS.h4,{
          color: COLORS.primary,
          fontWeight: 'bold',
          }]}>Generate Ticket</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const Index = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        <Text style={FONTS.h3}>Dashboard</Text>
      </View>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialRouteName="Parking"
            screenOptions={{
              tabBarLabelStyle: {fontSize: 13, fontWeight: 'bold'},
              tabBarStyle: {backgroundColor: 'white', elevation: 0},
              tabBarActiveTintColor: COLORS.white,
              tabBarInactiveTintColor: COLORS.darkgray,
              tabBarAllowFontScaling: false,
              tabBarItemStyle: {width: 120},
              tabBarScrollEnabled: true,
              swipeEnabled: true,
              tabBarIndicatorStyle: {
                height: '100%',
                backgroundColor: COLORS.primary,
                borderRadius: 100,
              },
            }}>
              {TABS.map(tab => {
                return (
                  <Tab.Screen
                    key={tab.id}
                    name={tab.name}
                    component={TopTabComponent}
                    initialParams={tab.user}
                    options={{
                      title: tab.name,
                    }}
                  />);
              })}
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Index;
