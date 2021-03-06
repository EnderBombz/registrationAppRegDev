import React, { useState,useEffect,useContext } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Card, Title, Paragraph, Appbar, List, Modal, Portal, Button, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import config from '../../components/Firebase';
import * as firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons'
import { TodasSalasContext } from '../../contexts/firebase'


import { connect } from 'react-redux'


if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config)
    } catch (err) {
        console.log(err)
    }
}
const db = firebase.database().ref();
const tabelaSalas = db.child('Salas');




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

const ReservationScreen = ({email}) => {

    const {updateBd} = useContext(TodasSalasContext)

    const dbf = firebase.database().ref();
    const contasDb = dbf.child('Contas');
    const [perfil, setPerfil] = useState([]);

    useEffect(() => {
        if (!firebase.apps.length) {
            try {
                firebase.initializeApp(config)
            } catch (err) {
                console.log(err)
            }
        }
        watchPersonData()

    }, [])
    const watchPersonData = () => {
        contasDb.on('child_added', snap => {
            let f = snap.val();
            f.key = snap.key;
            if (f.email == email) {
                console.log(email)
                setPerfil(f)
            }
        })
    }

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

    //constante que vai pegar a sala e o nome que foi selecionado
    const [selectedSalaNome, setSelectedSalaNome] = useState('');
    const [selectedSalaKey, setSelectedSalaKey] = useState('');
    //----//    

    //TouchableOpacity do flatlist
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();
    const LeftContent = props => <Avatar.Icon {...props} icon={() => <FontAwesome style={{ color: '#6200ee' }} name="user" size={24} color="black" />} />
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
            if (minutos == 0) {
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
            if (minutos == 0) {
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
            var teste = "teste 24";
            console.log(salaReservada);

            salaReservada.update({
                curso: perfil.curso,
                ocupado: "pendente",
                data: dataReserva,
                horaInicio: horaInicial,
                horaTermino: horaTermino,
                disciplina: perfil.disciplina,
                reservaDe: perfil.nome,
            });


            /*salaReservada.on("child_added", snap => {
                let f = snap.val();
                console.log(f)
                f.key = snap.key;
                teste.push(f);
                console.log(teste);
            });*/
            todasSalas = [];
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

            updateBd();
            handleTimeLine();
            alert("A Solicitação foi enviada para análise.")

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
                                <Card.Title title={perfil.nome} subtitle={perfil.ocupacao} left={() => <Avatar.Icon style={{ backgroundColor: '#6200ee' }} size={40} icon={() => <FontAwesome style={{ color: '#fff' }} name="user" size={20} color="black" />}></Avatar.Icon>} />
                                <Card.Content>
                                    <Title>{perfil.nome}</Title>

                                    <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Período: {perfil.turno}</Text>
                                    <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Curso: {perfil.curso}</Text>
                                    <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Disciplina: {perfil.disciplina}</Text>

                                </Card.Content>

                            </Card>

                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                    <View>
                                        <View>
                                            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', marginBottom: 15, }}>{selectedSalaNome}</Text>

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
                                            <Text style={{ fontSize: 15, }}>O{"(A) "}{selectedSalaNome} foi reservado{"(a)"} para data {dataReserva} das {horaInicial} horas até {horaTermino} horas</Text>
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
export default connect(state => ({
    email: state.user.email,
    nome: state.user.nome,
}))(ReservationScreen)
