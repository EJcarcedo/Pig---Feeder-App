
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function StartScreen( {navigation} ) {
  return (
    <TouchableOpacity  onPress={() => navigation.navigate('Type')} style={styles.container}>
    <View style={styles.container}>
    <Image source={require('../Images/1.png')} style={{width: 400, height: 400, alignItems: 'center',}} />
    <Text style={styles.text1}>Smart Swine Feeder</Text>
    </View>
    </TouchableOpacity>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01D062',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 35,
    marginBottom: 100,
    fontWeight: 'bold',
    color: '#01D062 ',
    


  }

});
