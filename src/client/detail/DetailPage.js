import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function DetailPage() {

	const [isLoading, setLoading] = useState(true);
	const [list, setList] = useState([]);
	const [type, setType] = useState([]);
	const [author, setAuthor] = useState([]);
	const [steps, setSteps] = useState([]);

	const login = () => {
		fetch('http://192.168.16.102:3000', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'tvphuong10@gmail.com',
				password: '123456',
			})
		})
	}

	const getListFromAPI = async () => {
		try {
			const response = await fetch('http://192.168.16.102:3000/list/get_list?id=6');
			const json = await response.json();
			setList(json.result);
			console.log(json.result);
		  } catch (error) {
			console.error(error);
		  } 
		  
	}

	const getTypeFromAPI = async () => {
		try {
			const response = await fetch('http://192.168.16.102:3000/list/get_list?id=6');
			const json = await response.json();
			setType(json.result);
		  } catch (error) {
			console.error(error);
		  } 
	}

	const getAuthorFromAPI = async () => {
		try {
			if (list.author_id !== undefined) {
			const response = await fetch('http://192.168.16.102:3000/list/get_author?author_id=' + list.author_id);
			const json = await response.json();
			console.log('http://192.168.16.102:3000/list/get_author?author_id=' + list.author_id);
			setAuthor(json.result);
			// console.log(json.result);
			}
		  } catch (error) {
			console.error(error);
		  } 
	}

	const getStepsFromAPI = async () => {
		try {
			console.log(list.list_id);
			if (list.list_id !== undefined) {
			const response = await fetch('http://192.168.16.102:3000/list/get_step?list_id=' + list.list_id);
			const json = await response.json();
			console.log(list.list_id);
			console.log('http://192.168.16.102:3000/list/get_step?list_id=' + list.list_id);
			setSteps(json.result);
			console.log(steps);
			}

			// fetch('http://192.168.16.102:3000/list/get_step?list_id=' + list.list_id)
            //         .then(reponse => {
            //             return reponse.json();
            //         })
            //         .then(ret => {
			// 			console.log('http://192.168.16.102:3000/list/get_step?list_id=' + list.list_id)
			// 			setSteps(ret.result);
			// 			// console.log(steps);
			// 		})

		  } catch (error) {
			console.error(error);
		  } 
	}


	useEffect(() => {
		login();
		getListFromAPI();
		getStepsFromAPI();
		getTypeFromAPI();
		getAuthorFromAPI();
	}, []);

	const Step = ({ step, index }) => {
		return (
			<Text style={styles.mainStep} key={index}>
				{index}.{step.name}: 
			</Text>
		)
	}

	// const data = getFromAPI('http://192.168.16.102:3000/list/get_list?id=6');
	// console.log('aaa\n' + data);

	// var step = [];
	// for (let i = 0; i < list.step.length; i++) {
	// 	step.push(
	// 		<Text style={styles.mainStep} key={i}>
	// 			{i + 1}. {list.step[i].title}: <Text style={styles.desc}>{list.step[i].description}</Text>
	// 		</Text>
	// 	)
	// 	for (let j = 0; j < list.step[i].child.length; j++) {
	// 		var child = list.step[i].child[j];
	// 		var key = '' + j + i;
	// 		step.push(
	// 			<Text style={styles.childStep} key={child.title}>
	// 				{child.title}: <Text style={styles.desc}>{child.description}</Text>
	// 			</Text>
	// 		)
	// 	}
	// }

	return (
		<View style={styles.container}>
			<View style={styles.illustration}>
				<AntDesign name="leftcircle" size={24} color="black" style={styles.back} />
				{list.image !== '' && list.image !== null ?
					<Image style={styles.imgList} source={{ uri: list.image }} /> :
					<Image style={styles.imgList} source={require('../../../assets/default-image.jpg')} />
				}
			</View>
			<View style={styles.content}>
				<View style={styles.title}>
					<Text style={styles.mainTitle}>{list.name}</Text>
					<Text style={styles.desc}>{list.description}</Text>
				</View>
				<View style={styles.info}>
					<View style={styles.type}>
						<Text style={styles.type}>Thể loại: {}</Text>
						<Text style={styles.type}>Thời gian thực hiện: {}</Text>
						<Text style={styles.type}>Đánh giá: {list.view}</Text>
					</View>
					<View style={styles.row}>
						{author.image !== null && author.image !== '' ?
							<Image style={styles.author} source={{ uri: author.image }} /> :
							<Image style={styles.author} source={require('../../../assets/default-avatar.png')} />
						}
						<Text style={styles.desc}>{author.name}</Text>
					</View>
				</View>
				<SafeAreaView  style={styles.step}>
					
					{/* <FlatList
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						data={steps}
						keyExtractor={ ({ step_id}, index)}
						renderItem={ Step }
					/> */}
					
				</SafeAreaView >
			</View>
		</View>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontSize: 16,
	},

	// css hình ảnh giới thiệu của list
	illustration: {
		flex: 1,
		paddingTop: 30,
	},
	imgList: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		opacity: 0.5,
	},
	back: {
		position: 'absolute',
		left: 0,
		top: 30,
		backgroundColor: '#ffffff'
	},

	// css nội dung chính của list
	content: {
		flex: 2,
	},
	title: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},
	mainTitle: {
		fontSize: 32,
		paddingBottom: 7,
	},
	desc: {
		color: '#909090',
		fontWeight: 'normal',
	},

	// css thông tin thể loại, tác giả của list
	info: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: '#F1F1F1',
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
	author: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},

	// css các bước trong list
	step: {
		flex: 1,
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
	
});
