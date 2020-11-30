import React, { useContext, useState, useEffect } from 'react'
import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FAB, Card, Modal, Portal, Button, Provider } from 'react-native-paper';
import { TodasSalasContext } from '../../contexts/firebase'
import CardItem from '../../components/CardItem'
import { connect } from 'react-redux'
import firebase from 'firebase'
import config from '../../components/Firebase'



const Solicitacoes = ({ email }) => {

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
            todasSalasSolicitadasUpdate()


        }, [])
        const watchPersonData = () => {
            contasDb.on('child_added', snap => {
                let f = snap.val();
                f.key = snap.key;
                if (f.email == email) {
                    setPerfil(f)
                }
            })
        }



        const { todasSalasReservadas, removerReserva, updateBd, todasSalasSolicitadas, permitirReserva, negarReserva, todasSalasSolicitadasUpdate } = useContext(TodasSalasContext)


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
                return ( <
                    CardItem item = { item }
                    onPress = {
                        () => {
                            console.log(perfil.nome + "|" + item.reservaDe)

                            setSelectedSalaNome(item.nome);
                            setSelectedSalaKey(item.key);
                            showModal1();


                        }
                    }
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
            navigation.navigate('ReservationScreen')
        }
        const handleTimeLine = () => {
                navigation.navigate('MainTab');
            }
            //-----//

        return (

            < SafeAreaView >
            <View style = {
                { height: 580, marginTop: 25 } } >
            <Card>
            <View style = {{ height: 565 } } >


            <View>
                {
                (<FlatList data = { todasSalasSolicitadas }
                    extraData = { todasSalasSolicitadas }
                    renderItem = { renderItem }
                    keyExtractor = { item => item.key }
                    />)
                } 
            </View>


                <Provider>
                <Portal>
                <Modal visible = { visible1 }
                onDismiss = { hideModal1 }
                contentContainerStyle = { containerStyle } >
                <Text style = {
                    { color: '#000', fontSize: 20, fontWeight: 'bold', } } > Opções 
                    </Text>
                     <Text> { selectedSalaNome } </Text>

                <Button style = { styles.button }
                color = { "#fff" }
                onPress = { showModal2 } >
                Permitir reserva </Button> 
                </Modal> 
                <Modal visible = { visible2 }
                onDismiss = { hideModal2 }
                contentContainerStyle = { containerStyle } >
                <Text style = {
                    { color: '#000', fontSize: 20, fontWeight: 'bold', } } > { selectedSalaNome } </Text> 
                    <Text style = { { color: '#000', fontSize: 16, marginBottom: 10 } }> Permitir a reserva do { "(a)" } { selectedSalaNome } ? </Text> 
                    <Button style = { styles.button2 }
                color = { "#fff" }
                onPress = {
                    () => { permitirReserva(selectedSalaKey, handleTimeLine, hideModal1, hideModal2) } } > Sim </Button> 
                    <Button style = { styles.button2 }
                color = { "#fff" }
                onPress = {
                    () => { negarReserva(selectedSalaKey, handleTimeLine, hideModal1, hideModal2) } }> Não </Button> 
                    </Modal> 
                    </Portal> 
                    </Provider> 
                    </View> 
                    </Card> 
                    </View>

                <FAB
                style = { styles.fab }
                big
                icon = "reload"
                onPress = {
                    () => {
                        todasSalasSolicitadasUpdate();
                        handleTimeLine();
                    }
                }
                color = "#fff"/>
                </SafeAreaView>


            )

        }

        export default connect(state => ({
            email: state.user.email,
            nome: state.user.nome,
        }))(Solicitacoes)


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