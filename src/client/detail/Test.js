import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
// import styles from './RecordStepstyle';
import Swipeout from 'react-native-swipeout';

export const WarnFlatList = () => {
    const [records, setRecords] = useState([]);
    const [stepWarnInrecords, setstepWarnInrecords] = useState([]);
    const [isWarnRender, setisWarnRender] = useState(false);
    const RecordsUse = []; // lấy ra cá các Record use
    // Ko bị gọi khi render
    useEffect(() => {
        function login() {
            fetch('http://192.168.12.101:3000/', {
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
        function getRecord(callback) {
            fetch('http://192.168.12.101:3000/search/getall')
                .then(reponse => {
                    return reponse.json();
                })
                .then(callback)
        }
        function getRecordUse(ret, callback) {
            setRecords(ret);
            // console.log(records);
            records.forEach(record => {
                if (record.list_id == 5 || record.list_id == 6) {
                    record.use = true;
                }
            })
            records.forEach(record => {
                if (record.use == true) {
                    RecordsUse.push(record);
                }
            })
            callback();
        }
        function getstepInrecords() {
            var Steps = [];
            RecordsUse.forEach((RecordUse, indexReCord) => {
                fetch(`http://192.168.12.101:3000/list/get_step?list_id=${RecordUse.list_id}}`)
                    .then(reponse => {
                        return reponse.json();
                    })
                    .then(ret => {
                        ret.result.forEach((step, index) => {
                            var step_number = index + 1;
                            var StepInRecord = {
                                id_step: RecordUse.list_id + 'B' + step_number,
                                RecordName: RecordUse.name,
                                indexReCord: indexReCord + 1,
                                name: step.name,
                                step_number: step_number,
                                totalRecordNumber: ret.result.length
                            }
                            Steps.push(StepInRecord);
                        })
                        setstepWarnInrecords(Steps);
                    })
            })
        }
        login();
        getRecord(function (ret) {
            getRecordUse(ret, function () {
                getstepInrecords();
            });
        });
    }, [])
    console.log(stepWarnInrecords);
    const WarnItem = ({ item, index }) => {
        return (
            <Swipeout style={{ backgroundColor: 'rgba(0 , 0 , 0 , 0.2)' }} autoClose={true}
                onClose={() => {
                }}
                onOpen={() => {
                }}
                right={[
                    {
                        component: (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    backgroundColor: 'rgba(0, 255 , 131 , 0.8)',
                                    marginBottom: 10,
                                    borderRadius: 8
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>Thực Hiện</Text>
                            </View>
                        ),
                        onPress: () => {
                            console.log(`${item.id_step}`);
                            var indexDo = 0;
                            stepWarnInrecords.forEach((step, index) => {
                                if (step.id_step == item.id_step) {
                                    indexDo = index;
                                }
                            });
                            stepWarnInrecords.splice(indexDo, 1);
                            var NewstepWarnInrecords = stepWarnInrecords.map(Step => {
                                return Step;
                            })
                            console.log('-------------');
                            setstepWarnInrecords(NewstepWarnInrecords);
                            setisWarnRender(!isWarnRender);
                        },
                        backgroundColor: 'rgba(0 , 0 , 0 , 0.1)'
                    }
                ]}>
                <View style={styles.task}>
                    <Text style={styles.taskLeft}>
                        {item.indexReCord} | {item.step_number}/{item.totalRecordNumber}
                    </Text>
                    <View style={styles.taskCenter}>
                        <Text style={styles.ttCTop}>{item.RecordName}</Text>
                        <Text style={styles.ttCBottom}>{item.name}</Text>
                    </View>
                </View>
            </Swipeout>
        );
    }
    return (
        <View>
            <FlatList data={stepWarnInrecords}
                renderItem={WarnItem}
                extraData={isWarnRender}>
            </FlatList>
        </View>
    )
}
export const Test = () => {
    return (
        <View>
            <Text>Test</Text>
        </View>
    )
}