import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton, Colors } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';


const list = {
    title: "Đăng ký tạm trú",
	type: ["Công việc"],
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
			time:"",
			child: [
				{
					title: "Tờ khai thay đổi thông tin cư trú",
					description:" mẫu CT01 ban hành kèm theo Thông tư số 56/2021/TT-BCA",
					time:""
				},
				{
					title: "Giấy tờ chứng minh chỗ ở hợp pháp",
					description:"",
					time:""
				},
				{
					title: "Lệ phí đăng ký",
					description:"không quá 20.000 đồng",
					time:""
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
}

export default function DetailPage() {

	const [image, setImage] = useState(null);
	

	var step = [];
	for (let i = 0; i < list.step.length; i++) {
		step.push(
			<Text style={styles.mainStep} key={i}>
				{i + 1}. {list.step[i].title}: <Text style={styles.desc}>{list.step[i].description}</Text>
			</Text>
		)
		for (let j = 0; j < list.step[i].child.length; j++) {
			var child = list.step[i].child[j];
			var key = '' + j + i;
			step.push(
				<Text style={styles.childStep} key={child.title}>
					{child.title}: <Text style={styles.desc}>{child.description}</Text>
				</Text>
			)
		}
	}
	

    return (
        <View style={styles.container}>
            <View style={styles.illustration}>
				<AntDesign name="leftcircle" size={24} color="black" style={styles.back}/>
                {list.image !== '' ?
                <Image style={styles.img} source={{ uri: list.image }} /> :
                <Image style={styles.img} source={require('../../../assets/default-image.jpg')} /> 
                }
            </View>
			<View style={styles.content}>
				<View style={styles.title}>
					<Text style={styles.mainTitle}>{list.title}</Text>
					<Text style={styles.desc}>{list.description}</Text>
				</View>
				<View style={styles.info}>
					<View style={styles.type}>
						<Text style={styles.type}>Thể loại: {list.type}</Text>
						<Text style={styles.type}>Thời gian thực hiện: {list.execution_time}</Text>
						<Text style={styles.type}>Đánh giá: {list.vote}</Text>
					</View>
					<View style={styles.row}>
						{list.author.image !== '' ?
						<Image style={styles.author} source={{ uri: list.author.image }} /> :
						<Image style={styles.author} source={require('../../../assets/default-avatar.png')} /> 
						}
						<Text style={styles.desc}>{list.author.name}</Text>
					</View>
				</View>
				<View style={styles.step}>
					{step}
				</View>
			</View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
	  fontSize: 16,
    },
	illustration: {
		flex: 1,
		paddingTop: 30,
	},
	content: {
		flex: 2,
	},
	img: {
		width: '100%',
		height: 200,
		resizeMode: 'contain',
		opacity: 0.5,
	},
	camera: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
	title: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 20,
	},
	mainTitle: {
		fontSize: 32,
		// fontWeight: 'bold',
		paddingBottom: 7,
	},
	desc: {
		color: '#909090',
		fontWeight: 'normal',
	},
	info: {
		flex: 1,
		flexDirection: "row",
    	flexWrap: "wrap",
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: '#F1F1F1',
		height: 100,
	},
	author: {
		width: 70,
		height: 70,
		borderRadius: 35,	
	},
	type: {
		flex: 2,
		justifyContent: 'center',
        paddingHorizontal: 10,
		fontSize: 15,
		color: '#303030',
	},
	row: {
		flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
		borderLeftWidth: 1,
		borderLeftColor: '#959595',
	},
	step: {
		paddingHorizontal: 10,
		paddingVertical: 15,
		paddingHorizontal: 10,
		lineHeight: 18,
	},
	mainStep: {
		fontWeight: 'bold',
		lineHeight: 30,
	},
	childStep: {
		fontWeight: 'bold',
		paddingLeft: 30,
		color: '#000000',
	},
	back: {
		position: 'absolute',
    	left: 0,
    	top: 30,
		backgroundColor: '#ffffff'
	}
  });
  