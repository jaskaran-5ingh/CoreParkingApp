import React, {useContext} from 'react';
import {StyleSheet, Text, View, ToastAndroid, ScrollView} from 'react-native';
import {InputComponent} from '../../components';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {COLORS, FONTS} from '../../constants';
import api from '../../api/services';
import AuthContext from '../../auth/Context';
const Index = () => {
  const [billOrVehicleNumber, setBillOrVehicleNumber] = React.useState('');
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [printButtonLoading, setPrintButtonLoading] = React.useState(false);
  const [parkingDetails, setParkingDetails] = React.useState(null);

  //Deceleration Of Context
  const authContext = React.useContext(AuthContext);

  async function exitVehicleHandler() {
    setPrintButtonLoading(true);
    try {
      let response = await api.exitVehicle({
        employeeId: authContext?.user?.id,
        parkingId: parkingDetails.id,
      });
      setPrintButtonLoading(false);
      console.log(response);
      ToastAndroid.showWithGravity(
        response.data.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } catch (err) {
      setPrintButtonLoading(false);
      ToastAndroid.showWithGravity(
        err.response.data.error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }

  async function handleFormSubmit() {
    setButtonLoading(true);
    if (billOrVehicleNumber !== '') {
      try {
        let response = await api.searchVehicle({
          billOrVehicleNumber: billOrVehicleNumber,
        });
        setButtonLoading(false);
        let data = response.data.data;
        setParkingDetails(data.parkingDetails);
        setBillOrVehicleNumber('');
        ToastAndroid.show(
          data.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } catch (err) {
        setButtonLoading(false);
        setParkingDetails(null);
        ToastAndroid.showWithGravity(
          err.response.data.error.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } else {
      setButtonLoading(false);
      setParkingDetails(null);
      ToastAndroid.showWithGravity(
        'Please enter vehicle number or bill number!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="never">
      <InputComponent
        required={true}
        label="Bill/Vehicle Number"
        leftIcon="bus"
        value={billOrVehicleNumber}
        onChangeText={value => setBillOrVehicleNumber(value)}
      />

      <Button
        title="Search"
        loading={buttonLoading}
        buttonStyle={styles.searchButton}
        onPress={handleFormSubmit}
      />

      <View style={styles.grayStrip}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <Text
            style={[
              FONTS.h4,
              {fontWeight: 'bold', color: COLORS.primary, textAlign: 'center'},
            ]}>
            Ticker Details
          </Text>
        </View>
      </View>
      {!(parkingDetails !== null) ? (
        <View style={styles.tickerContainer}>
          <Text style={styles.receiptHead}>Record Not Available</Text>
        </View>
      ) : (
        <>
          <View style={styles.tickerContainer}>
            <Text style={styles.title}>ISBT ASR</Text>

            {parkingDetails?.entry_date ? (
              <View style={styles.row}>
                <Text style={styles.cols}>Entry Date</Text>
                <Text style={styles.cols}>{parkingDetails?.entry_date}</Text>
              </View>
            ) : null}

            {parkingDetails?.out_date ? (
              <View style={styles.row}>
                <Text style={styles.cols}>Exit Date</Text>
                <Text style={styles.cols}>{parkingDetails?.out_date}</Text>
              </View>
            ) : null}

            {parkingDetails?.totaldays ? (
              <View style={styles.row}>
                <Text style={styles.cols}>Days</Text>
                <Text style={styles.cols}>{parkingDetails?.totaldays}</Text>
              </View>
            ) : null}

            <View style={styles.row}>
              <Text style={styles.cols}>Bill Number</Text>
              <Text style={styles.cols}>{parkingDetails?.bill_number}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cols}>Vehicle Type</Text>
              <Text style={styles.cols}>
                {parkingDetails?.get_vehicle_type_and_fare?.vehicle_type}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cols}>Vehicle Number</Text>
              <Text style={styles.cols}>{parkingDetails?.vehicle_number}</Text>
            </View>

            {parkingDetails?.amount ? (
              <View style={styles.row}>
                <Text style={styles.cols}>Amount</Text>
                <Text style={styles.cols}>{parkingDetails?.amount} RS</Text>
              </View>
            ) : null}

            <Text style={styles.receiptFooter}>
              *Double Amount, if slip lost*
            </Text>
          </View>
          <Button
            title="Print"
            buttonStyle={styles.printButton}
            loading={printButtonLoading}
            onPress={exitVehicleHandler}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.darkTransparent,
    textAlign: 'center',
    fontFamily: 'cosmic-bold',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cols: {
    fontSize: 13,
    color: COLORS.darkTransparent,
    textAlign: 'center',
  },
  receiptFooter: {
    fontSize: 14,
    marginTop: 30,
    color: COLORS.darkTransparent,
    textAlign: 'center',
  },
  receiptHead: {
    fontSize: 15,
    color: COLORS.darkTransparent,
    textAlign: 'center',
  },
  printButton: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
    borderRadius: 2,
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: COLORS.darkGreen,
    marginTop: 10,
    borderRadius: 2,
    paddingVertical: 8,
  },
  grayStrip: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGray,
    marginVertical: 10,
  },
  tickerContainer: {
    marginTop: 5,
    padding: 20,
    backgroundColor: COLORS.lightGray,
  },
});

export default Index;
