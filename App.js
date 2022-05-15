import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import DetailPage from './src/client/detail/DetailPage';
import StoragePage from './src/client/storage/StoragePage';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#c7ceea" barStyle="light-content"/>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        
      > */}
        <DetailPage />
        {/* <StoragePage /> */}
      {/* </ScrollView>       */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
