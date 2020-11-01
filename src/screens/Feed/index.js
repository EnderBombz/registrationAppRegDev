import React, { useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import config from '../../components/Firebase';
import * as firebase from 'firebase';
import { FAB, Avatar, Card, Title, Paragraph, Appbar, List, Modal, Portal, Button, Provider } from 'react-native-paper';

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

            <Card style={{ margin: 10, borderRadius: 5, padding: 10, }}>
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

    //----modal 1----//
    const [visible1, setVisible1] = React.useState(false);

    const showModal1 = () => setVisible1(true);
    const hideModal1 = () => setVisible1(false);

    //---------------//

    const containerStyle = { backgroundColor: 'white', padding: 20 };
    //----modal 2----//
    const [visible2, setVisible2] = React.useState(false);

    const showModal2 = () => setVisible2(true);
    const hideModal2 = () => setVisible2(false);

    //---------------//

    const [selectedSalaNome, setSelectedSalaNome] = useState('');
    const [selectedSalaKey, setSelectedSalaKey] = useState('');

    const renderItem = ({ item }) => {

        return (
            <Item
                item={item}
                onPress={() => {

                    setSelectedSalaNome(item.nome);
                    setSelectedSalaKey(item.key);
                    showModal1();

                }}
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
            zIndex: 15,
        },
        fab2: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 60,
            backgroundColor: '#3D2554',
            zIndex: 15,
        },
    })

    const navigation = useNavigation()

    const handleReservationScreen = () => {
        navigation.reset({
            routes: [{ name: 'ReservationScreen' }]
        })
    }
    const handleTimeLine = () => {
        navigation.reset({
            routes: [{ name: 'MainTab' }]
        })
    }

    const updateBd = () => {
        todasSalasReservadas = [];
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
    }
    const removerReserva = () => {
        const db2 = firebase.database().ref();
        const salaReservada = db2.child("Salas/" + selectedSalaKey);
        salaReservada.update({
            ocupado: "nao",
            data:"...",
            horaInicio:"...",
            horaTermino: "...",
        });
        updateBd();
        handleTimeLine();
    }

    return (

        <SafeAreaView>

            <View style={{ height: 580, marginTop: 15 }}>

                <Card>
                <View>
                    <ScrollView>
                       
                        <View>
                            {(
                                <FlatList
                                    data={todasSalasReservadas}
                                    extraData={todasSalasReservadas}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.key}
                                />)
                            }
                       </View>
 
                    </ScrollView>
                    <Provider>
                            <Portal>
                                <Modal visible={visible1} onDismiss={hideModal1} contentContainerStyle={containerStyle}>
                                    <Text>Opções</Text>
                                    <Text>{selectedSalaNome}</Text>
                                    <Text>{selectedSalaKey}</Text>
                                    <Button style={{ marginTop: 30 }} onPress={showModal2}>
                                        Liberar reserva
      </Button>
                                </Modal>
                                <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
                        <Text>Você tem certeza que deseja liberar a reserva do{"(a)"} {selectedSalaNome}?</Text>
                        <Button style={{ marginTop: 30 }} onPress={()=>{removerReserva()}}>
                                        Sim
      </Button>
      <Button style={{ marginTop: 30 }} onPress={hideModal2}>
                                        Não
      </Button>
                                </Modal>
                            </Portal>
                        </Provider>
                   </View>
                </Card>
            </View>
            <FAB
                style={styles.fab}
                big
                icon="plus"
                onPress={() => handleReservationScreen()}
                color="#fff"
            />
            <FAB
                style={styles.fab2}
                big
                icon="reload"
                onPress={() => {
                    updateBd();
                    handleTimeLine();
                }}
                color="#fff"
            />
        </SafeAreaView>


    )

}
