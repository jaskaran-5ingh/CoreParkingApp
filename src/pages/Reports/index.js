import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text>Reports</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Index;
