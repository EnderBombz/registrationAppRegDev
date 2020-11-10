import React, { useContext, useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FAB, Card, Modal, Portal, Button, Provider } from 'react-native-paper';
import { TodasSalasContext } from '../../contexts/firebase'
import CardItem from '../../components/CardItem'



const Feed = () => {

    const { todasSalasReservadas, removerReserva, updateBd } = useContext(TodasSalasContext)

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
        if (item.key) {
            return (
                <CardItem
                    item={item}
                    onPress={() => {
                        setSelectedSalaNome(item.nome);
                        setSelectedSalaKey(item.key);
                        showModal1();
                    }}
                />
            )
        } else {
            return null
        }
    };
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

    return (

        <SafeAreaView>
            <View style={{ height: 580, marginTop: 25 }}>
                <Card>
                    <View style={{ height: 565 }}>


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


                        <Provider>
                            <Portal>
                                <Modal visible={visible1} onDismiss={hideModal1} contentContainerStyle={containerStyle}>
                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', }}>Opções</Text>
                                    <Text>{selectedSalaNome}</Text>

                                    <Button style={styles.button} color={"#fff"} onPress={showModal2}>
                                        Liberar reserva
      </Button>
                                </Modal>
                                <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', }}>{selectedSalaNome}</Text>
                                    <Text style={{ color: '#000', fontSize: 16, marginBottom: 10 }}>Você tem certeza que deseja liberar a reserva do{"(a)"} {selectedSalaNome}?</Text>
                                    <Button style={styles.button2} color={"#fff"} onPress={() => { removerReserva(selectedSalaKey,handleTimeLine) }}>Sim</Button>
                                    <Button style={styles.button2} color={"#fff"} onPress={hideModal2}>Não</Button>
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

export default Feed


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
        marginTop: 30,
    },
    button2: {
        backgroundColor: '#3D2554',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 2,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
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