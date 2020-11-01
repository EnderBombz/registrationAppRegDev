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
var todasSalasReservadas = [];

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


tabelaSalas.on("child_added", snap => {
    let f = snap.val();
    console.log(f)
    f.key = snap.key;
    if (f.ocupado == 'sim') {
        todasSalasReservadas.push(f);
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
    button: {
        backgroundColor: '#3D2554',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 2,
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
    },
});

export default () => {

    //constante que vai pegar a sala e o nome que foi selecionado
    const [selectedSalaNome, setSelectedSalaNome] = useState('');
    const [selectedSalaKey, setSelectedSalaKey] = useState('');
    //----//    

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
                    setSelectedSalaNome(item.nome);
                    setSelectedSalaKey(item.key);
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

    const [horaInicial, setHoraInicial] = useState('');
    const [horaTermino, setHoraTermino] = useState('');
    const [dataReserva, setDataReserva] = useState('');

    const [switchModeData, setSwitchModeData] = useState(6);
    const [verificaDH, setVerificaDH] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        defineDates(selectedDate);
    };
    const defineDates = (selectedDate) => {
        if (switchModeData == 0) {
            let dia = selectedDate.getDate();
            let mes = (selectedDate.getMonth()) + 1; //+1 pois no getMonth Janeiro começa com zero.
            let ano = selectedDate.getFullYear();
            let dataSlice = dia + "/" + mes + "/" + ano;
            console.log(dataSlice);
            setDataReserva(dataSlice);
        }
        if (switchModeData == 1) {
            let hora = selectedDate.getHours();
            let minutos = selectedDate.getMinutes() * 10;
            (minutos >= 59 ? minutos = minutos / 10 : minutos);
            if(minutos == 0){
                minutos = "00";
            }

            let horaMinutosInicial = hora + ":" + minutos;
            console.log(horaMinutosInicial);
            setHoraInicial(horaMinutosInicial)
        }
        if (switchModeData == 2) {
            let hora = selectedDate.getHours();
            let minutos = selectedDate.getMinutes() * 10;
            (minutos >= 59 ? minutos = minutos / 10 : minutos);
            if(minutos == 0){
                minutos = "00";
            }

            let horaMinutosTermino = hora + ":" + minutos;
            console.log(horaMinutosTermino);
            setHoraTermino(horaMinutosTermino);
        }
    }

    const finalizarReserva = () => {
        if (dataReserva != '' && horaInicial != '' && horaTermino != '') {

                console.log("--------reserva concluída-------")
                console.log(selectedSalaKey);
                console.log(selectedSalaNome);
                console.log(dataReserva);
                console.log(horaInicial);
                console.log(horaTermino);
                console.log("---------------------------------")

                const db2 = firebase.database().ref();
                const salaReservada = db2.child("Salas/" + selectedSalaKey);
                var teste = [];
                console.log(salaReservada);

                salaReservada.update({
                    ocupado: "sim",
                    data: dataReserva,
                    horaInicio: horaInicial,
                    horaTermino: horaTermino,
                });


                salaReservada.on("child_changed", snap => {
                    let f = snap.val();
                    console.log(f)
                    f.key = snap.key;
                    teste.push(f);
                    console.log(teste);
                });

                handleTimeLine();
                alert("Por favor, atualize a lista.")
            
        } else {
            alert("É necessário informar todos os valores.");
        }
    }

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
                                    <View>
                                        <View>
                                            <Text>{selectedSalaNome}</Text>
                                            <Text>{selectedSalaKey}</Text>
                                        </View>

                                        <View>
                                            <TouchableOpacity onPress={() => { setSwitchModeData(0); showDatepicker(); }} style={styles.button}>
                                                <Text style={styles.title}>Data</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => { setSwitchModeData(1); showTimepicker(); }} style={styles.button}>
                                                <Text style={styles.title}>Hora de início</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>

                                            <TouchableOpacity onPress={() => { setSwitchModeData(2); showTimepicker(); }} style={styles.button}>
                                                <Text style={styles.title}>Hora de termino</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text>A {selectedSalaNome} foi reservada para data {dataReserva} das {horaInicial} horas até {horaTermino}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => { finalizarReserva() }} style={styles.button}>
                                                <Text style={styles.title}>Finalizar reserva</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode={mode}
                                                dateFormat="dayofweek day month"
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )}
                                    </View>
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


        </SafeAreaView >


    )

}
