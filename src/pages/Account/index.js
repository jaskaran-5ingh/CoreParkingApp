import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import AuthContext from '../../auth/Context';
import {COLORS, FONTS} from '../../constants';
import Layout from '../Layout';
function ListItem({label, value}) {
  return (
    <View>
      <Text style={[FONTS.body2, {marginBottom: 10}]}>{label}</Text>
      <View
        style={{
          backgroundColor: COLORS.lightGray,
          borderRadius: 10,
          padding: 5,
          marginBottom: 15,
          justifyContent: 'center',
        }}>
        <Text style={[FONTS.body3, {marginBottom: 8, color: COLORS.darkgray}]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const Index = () => {
  //Deceleration Of Context
  const authContext = useContext(AuthContext);

  return (
    <Layout>
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 30,
          }}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
            }}
          />
          <Text style={[FONTS.body2, {marginTop: 10}]}>{authContext?.user?.name}</Text>
        </View>

        <ListItem label="Name" value={authContext?.user?.name} />
        <ListItem label="Mobile" value={authContext?.user?.mobile} />
        <ListItem label="Email" value={authContext?.user?.email} />
        <View style={{marginTop: 25}}>
          <Button
            title="Logout"
            buttonStyle={{
              borderRadius: 20,
              paddingVertical: 12,
              backgroundColor: COLORS.red,
            }}
            onPress={() => authContext.setUser(null)}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default Index;
