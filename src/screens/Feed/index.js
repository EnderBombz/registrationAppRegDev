import * as React from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import config from '../../components/Firebase';
import * as firebase from 'firebase';
import {FAB, Avatar, Card, Title, Paragraph, Appbar, List, Modal, Portal, Button, Provider } from 'react-native-paper';

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config)
    } catch (err) {
        console.log(err)
    }
}
const db = firebase.database().ref();
const tabelaSalas = db.child('Salas');

var todasSalasReservadas = [];
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Item = ({ item, onPress }) => (
    <View>
        <TouchableOpacity onPress={onPress} >

            <Card style={{margin:10,borderRadius:5,padding:10,}}>
                <Card.Title title={item.reservaDe} subtitle={item.cargo} left={LeftContent} />
                <Card.Content>

                    <Title>{item.nome}</Title>

                    <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Curso: {item.curso}</Text>
                    <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Disciplina: {item.disciplina}</Text>
                    <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Data de reserva: {item.data}</Text>
                    <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Das {item.horaInicio} horas até {item.horaTermino} horas</Text>

                </Card.Content>

            </Card>
        </TouchableOpacity>

    </View>
);

tabelaSalas.on("child_added", snap => {
    let f = snap.val();
    console.log(f)
    f.key = snap.key;
    if (f.ocupado == 'sim') {
        todasSalasReservadas.push(f);
    } else {

    }

    console.log(todasSalasReservadas);
});


export default () => {

    const renderItem = ({ item }) => {
       
        return (
            <Item
                item={item}
                onPress={() => {console.log("deu certo!!");}}
            />
        );
    };

    const styles = StyleSheet.create({
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#3D2554',
        },
    })

    const navigation = useNavigation()

    const handleReservationScreen = () => {
        navigation.reset({
            routes: [{ name: 'ReservationScreen' }]
        })
    }
    return (

        <SafeAreaView>
            <FAB
                style={styles.fab}
                big
                icon="plus"
                onPress={() => handleReservationScreen()}
                color="#fff"
            />
            <View style={{ height: 365, marginTop: 15 }}>
                
                <Card>
                    <ScrollView>
                        <View>
                            <FlatList
                                data={todasSalasReservadas}
                                extraData={todasSalasReservadas}
                                renderItem={renderItem}
                                keyExtractor={item => item.key}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </View>
        </SafeAreaView>


    )

}
