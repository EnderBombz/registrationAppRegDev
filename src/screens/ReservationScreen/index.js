import React, { useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Card, Title, Paragraph, Appbar, List, Modal, Portal, Button, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import config from '../../components/Firebase';
import * as firebase from 'firebase';

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config)
    } catch (err) {
        console.log(err)
    }
}
const db = firebase.database().ref();
const tabelaSalas = db.child('Salas');

var todasSalas = [];

tabelaSalas.on("child_added", snap => {
    let f = snap.val();
    console.log(f)
    f.key = snap.key;
    if (f.ocupado == 'nao') {
        todasSalas.push(f);
    } else {

    }

    console.log(todasSalas);
});


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.nome}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({

    item: {
        backgroundColor: '#3D2554',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
    },
});

export default () => {

    //TouchableOpacity do flatlist
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    //----//

    //modal
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    //----//

    //Estilo do item que vai ser renderizado no flatlist de salas disponíveis
    const renderItem = ({ item }) => {
        const backgroundColor = item.key === selectedId ? "#993c99" : "#3D2554";

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.key)
                    showModal();
                }}
                style={{ backgroundColor }}
            />
        );
    };
    //----//

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
                <View>
                    <Provider>
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

                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                                </Modal>
                            </Portal>
                            <View style={{ height: 365, marginTop: 15 }}>
                                <Card>
                                    <ScrollView>
                                        <View>
                                            <FlatList
                                                data={todasSalas}
                                                extraData={todasSalas}
                                                renderItem={renderItem}
                                                keyExtractor={item => item.key}
                                            />
                                        </View>
                                    </ScrollView>
                                </Card>
                            </View>
                        </View>
                    </Provider>
                </View>
            </ScrollView>


        </SafeAreaView>


    )

}
