import {React, useState} from 'react'
import {
    View, 
    Text,
    Switch,
    StyleSheet,
} from 'react-native'



export default function ToDoListItem(props) {

    // Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.item}>
        <View style={styles.todo}>
          {/* <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.timeStart}>{props.timeStart}</Text> */}
        </View>
        <View style={styles.status}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        </View>
      </View>
    );
}


const styles = StyleSheet.create({ 
    item: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#E5E5E5',
        height: 100,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
      },

      todo: {
        flex: 3,
      },
      status: {
        flex: 1,
      },

})