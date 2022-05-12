import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Switch } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ToDoListItem from './component/ToDoListItem';


const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];


const StoragePage = () => {

  // StatusBar
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

  // Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  // Lấy các ghi chú trong data
  var items = [];
  for (let i = 0; i < list.length; i++) {
    items.push(
      <View style={styles.item} key={i}>
        <View style={styles.todo}>
          <Text style={styles.title}>{list[i].title}</Text>
          <Text style={styles.timeStart}>{list[i].timeStart}</Text>
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
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden} />
      <Text></Text>
      <View style={styles.type}>
        <Feather name="save" size={24} color="black" />
        <AntDesign name="cloudo" size={32} color="black" />
      </View>
      
      <View style={styles.typeStorage}>
      {/* {items} */}
      <ToDoListItem />
      <Ionicons name="md-add-circle-sharp" size={40} color="#ffffff" style={styles.add}/>
      </View>
      
    </View>
  );
}

export default StoragePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    width: '100%'
  },
  typeStorage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  type: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
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
  title: {
    fontSize: 23,
  },
  todo: {
    flex: 3,
  },
  status: {
    flex: 1,
  },
  iconStatus: {
    
  }
});

const list = [
  {
    id: "1",
    title: "Đăng ký tạm trú",
    type: ["Công việc"],
    timeStart: "23-06-2022",
    execution_time: '3 ngày',
    image: "https://cdn.tgdd.vn/Files/2021/07/04/1365678/cach-dang-ky-thuong-tru-tam-tru-online_1280x720-800-resize.jpg",
    description: "Sau đây là thủ tục đăng ký tạm trú mới nhất theo Luật Cư trú năm 2020",
    vote: 2.5,
    status: 'onl',
    author: {
      image: "https://i.pinimg.com/564x/f8/0a/58/f80a5849262061401d61ff166bd4642c.jpg",
      name: "TV. Phương"
    },
    step: [
      {
        title: "Chuẩn bị tiền, hồ sơ",
        description: "",
        time: "",
        child: [
          {
            title: "Tờ khai thay đổi thông tin cư trú",
            description: " mẫu CT01 ban hành kèm theo Thông tư số 56/2021/TT-BCA",
            time: ""
          },
          {
            title: "Giấy tờ chứng minh chỗ ở hợp pháp",
            description: "",
            time: ""
          },
          {
            title: "Lệ phí đăng ký",
            description: "không quá 20.000 đồng",
            time: ""
          },
        ]
      },
      {
        title: "Nộp hồ sơ tại Công an cấp xã, nộp lệ phí đăng ký",
        description: "",
        child: []
      },
      {
        title: "Nhận thông báo kết quả giải quyết thủ tục đăng ký",
        description: "",
        child: []
      },
    ]
  },
  {
    id: "2",
    title: "Hoàn thành bài tập",
    type: ["Học tập"],
    timeStart: "20:30 07-04-2022",
    execution_time: '5 ngày',
    image: "https://cdn.tgdd.vn/Files/2021/07/04/1365678/cach-dang-ky-thuong-tru-tam-tru-online_1280x720-800-resize.jpg",
    description: "",
    vote: 3.5,
    status: 'off',
    author: {
      image: "https://i.pinimg.com/564x/f8/0a/58/f80a5849262061401d61ff166bd4642c.jpg",
      name: "UET-VNU"
    },
    step: [

    ]
  },
  {
    id: "3",
    title: "Dọn nhà",
    type: ["Việc nhà"],
    timeStart: "13:30 08-04-2022",
    execution_time: '1 ngày',
    image: "https://cdn.tgdd.vn/Files/2021/07/04/1365678/cach-dang-ky-thuong-tru-tam-tru-online_1280x720-800-resize.jpg",
    description: "",
    status: 'onl',
    vote: 2.5,
    author: {
      image: "https://i.pinimg.com/564x/f8/0a/58/f80a5849262061401d61ff166bd4642c.jpg",
      name: "TV. Phương"
    },
    step: [

    ]
  },
]
