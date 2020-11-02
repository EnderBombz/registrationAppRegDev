import React, { useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import config from '../../components/Firebase';
import * as firebase from 'firebase';
import { FAB, Avatar, Card, Title, Modal, Portal, Button, Provider } from 'react-native-paper';

//Inicializa a configuração pré-definida no componente "Firebase.js"
if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config)
    } catch (err) {
        console.log(err)
    }
}
//-----//

//Referência a key "Salas" no firebase 
const db = firebase.database().ref();
const tabelaSalas = db.child('Salas');
//-----//

//Váriavel que tem propósito de armazenar o JSON para exibir no flatlist
var todasSalasReservadas = [];
//-----//

//Estrutura do card que será exibido no "Feed" do app
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
//-----//

//Inserção dos dados no Array "todasSalasReservadas" ao iniciar o app
tabelaSalas.on("child_added", snap => {
    let f = snap.val();
    console.log(f)
    f.key = snap.key;
    if (f.ocupado == 'sim') {
        todasSalasReservadas.push(f);
    }
    console.log(todasSalasReservadas);
});
//-----//



export default () => {

    //Hooks do modal que permite liberar uma reserva//
    const [visible1, setVisible1] = React.useState(false);
    const showModal1 = () => setVisible1(true);
    const hideModal1 = () => setVisible1(false);

    //-----//

    //Estilo do modal
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    //-----//

    //Hooks do modal que solicita a confirmação de liberação de reserva//
    const [visible2, setVisible2] = React.useState(false);
    const showModal2 = () => setVisible2(true);
    const hideModal2 = () => setVisible2(false);
    //-----//

    //Hooks que armazenam a "key" e o "nome" de cada reserva
    const [selectedSalaNome, setSelectedSalaNome] = useState('');
    const [selectedSalaKey, setSelectedSalaKey] = useState('');
    //-----//

    //Função que renderiza o Card de cada sala reservada no "Feed"
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
    //-----//


    //Estilos do App
    const styles = StyleSheet.create({
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 10,
            backgroundColor: '#3D2554',
            zIndex: 15,
        },
        fab2: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 70,
            backgroundColor: '#3D2554',
            zIndex: 15,
        },
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
            marginTop:30,
        },
         button2: {
            backgroundColor: '#3D2554',
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 2,
            color: '#fff',
            fontWeight: 'bold',
            marginTop:5,
        },
        title: {
            fontSize: 18,
            textAlign: 'left',
            color: '#fff',
        },
        subtitle: {
            fontSize: 12,
            textAlign: 'left',
            color: '#fff',
        },
    })
    //-----//


    //Handles que possibilitam a navegação entre as telas que estão no "MainStack"
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
    //-----//

    //Função que atualiza o Array que está armazenando o JSON do Firebase
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
    //-----//

    /**Esta função possibilita remover a reserva existente, atualizando os atributos "Ocupado","Data","horaInicio",
     * "horaTermino", para poder realizar uma nova reserva utilizando a mesma sala */ 
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
    //-----//

    return (

        <SafeAreaView>
            <View style={{ height: 580, marginTop: 25 }}>
                <Card>
                <View style={{height: 565}}>
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
                                    <Text style={{color:'#000',fontSize:20,fontWeight:'bold',}}>Opções</Text>
                                    <Text>{selectedSalaNome}</Text>
                                    
                                    <Button style={styles.button}color={"#fff"} onPress={showModal2}>
                                        Liberar reserva
      </Button>
                                </Modal>
                                <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
                                    <Text style={{color:'#000',fontSize:20,fontWeight:'bold',}}>{selectedSalaNome}</Text>
                        <Text style={{color:'#000',fontSize:16,marginBottom:10}}>Você tem certeza que deseja liberar a reserva do{"(a)"} {selectedSalaNome}?</Text>
                        <Button style={styles.button2} color={"#fff"} onPress={()=>{removerReserva()}}>Sim</Button>
      <Button style={styles.button2}color={"#fff"}  onPress={hideModal2}>Não</Button>
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
