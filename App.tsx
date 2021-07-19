import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarChart from './Charts/BarChart';
import BarChartScreen from './Charts/DrawWithSvgD3';
export default function App() {
  const data = [
    { label: 'Jan', value: 500 },
    { label: 'Feb', value: 312 },
    { label: 'Mar', value: 424 },
    { label: 'Apr', value: 745 },
    { label: 'May', value: 89 },
    { label: 'Jun', value: 434 },
    { label: 'Jul', value: 650 },
    { label: 'Aug', value: 980 },
    { label: 'Sep', value: 123 },
    { label: 'Oct', value: 186 },
    { label: 'Nov', value: 689 },
    { label: 'Dec', value: 643 }
  ]

  return (
    <View style={styles.container}>
        {/* <BarChart data={data} round={100} unit="€"/> */}
        <BarChartScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
