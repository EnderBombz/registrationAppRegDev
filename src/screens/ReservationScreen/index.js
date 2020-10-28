import React, { useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Appbar, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import config from '../../components/Firebase';
import * as firebase from 'firebase';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
]; // Esta constante será alimentada pelos dados no BD do firebase


const Item = ({ title }) => (
    <List.Item

        title={title}
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
    />
);
export default () => {

    if (!firebase.apps.length) {
        try {
            firebase.initializeApp(config)
        } catch (err) {
            console.log(err)
        }
    }
    const db = firebase.database().ref();
    const tabelaSalas = db.child('Salas');

    let todasSalas = [];
    
    tabelaSalas.on("child_added", snap => {
        let f = snap.val();
        console.log(f)
        f.key = snap.key;
        todasSalas.push(f);
        console.log(todasSalas);
    });


    const navigation = useNavigation();

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    const handleTimeLine = () => {
        navigation.reset({
            routes: [{ name: 'MainTab' }]
        })
    }

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (

        <SafeAreaView>
            <Appbar.Header theme={{ colors: { primary: '#3D2554', underlineColor: '#3D2554' } }}>
                <Appbar.BackAction onPress={() => handleTimeLine()} />
                <Appbar.Content title="Reserva" subtitle="de salas" />
            </Appbar.Header>
            <ScrollView>
                <View style={{ height: 760, }}>
                    <View>
                        <Card>
                            <Card.Title title="José Augusto" subtitle="Professor" left={LeftContent} />
                            <Card.Content>
                                <Title>José Augusto</Title>

                                <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Período: Matutino</Text>
                                <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Curso: Análise e desenvolvimento de sistemas</Text>
                                <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Disciplina: Algorítimo</Text>

                            </Card.Content>

                        </Card>
                        <View style={{ height: 300, marginTop: 15 }}>
                            <Card>
                                <ScrollView>
                                    <View>
                                        <FlatList
                                            data={DATA}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                        />
                                    </View>
                                </ScrollView>
                            </Card>

                        </View>
                        <View>
                            <View>
                                <Button style={{ margin: 15 }} onPress={showDatepicker} mode="contained" title="Show date picker!">DATA</Button>
                            </View>
                            <View>
                                <Button style={{ margin: 15 }} onPress={showTimepicker} mode="contained" title="Show time picker!">HORA</Button>
                            </View>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <View>
                                <Button style={{ margin: 15 }} onPress={handleTimeLine} mode="contained" title="Show time picker!">Reservar</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>


    )

}
