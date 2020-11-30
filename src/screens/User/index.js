import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, Button, Alert,StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import config from '../../components/Firebase'
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import {Restart} from 'fiction-expo-restart';


import { connect } from 'react-redux'
import * as UserActions from '../../store/actions/user'

const User = ({ nome, email,togglePerfil }) => {

    const db = firebase.database().ref();
    const contasDb = db.child('Contas');
    const [perfil, setPerfil] = useState([]);

    const navigation = useNavigation();


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
                setPerfil(f)
            }
        })
    }

    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');

    const handleSignIn = () => {
        navigation.reset({ routes: [{ name: 'SignIn' }] })
    }
  
   //Estilos do App
const styles = StyleSheet.create({
    titulo: {
        fontSize: 18,
        fontWeight:'bold',
        textAlign:'left',
        marginBottom:2,
    },
content: {
        fontSize: 14,
        marginBottom:10,
        textAlign:'left',
    },
   
})
    return (
        <SafeAreaView>
            <View style={{ marginBottom: 15, }}>
                <Appbar.Header theme={{ colors: { primary: '#3D2554', underlineColor: '#3D2554' } }}>
                    <Appbar.Content title="Perfil" subtitle="do usuário" />
                    <Appbar.Action icon={() => <AntDesign name="logout" size={24} color="white" />} onPress=
                        {
                            () => {
                                Alert.alert(
                                    'Logout',
                                    'Tem certeza que deseja sair?',
                                    [
                                        { text: 'Não', onPress: () => console.log('Não Pressed'), style: 'cancel' },
                                        { text: 'Sim', onPress: () => {togglePerfil('', '');handleSignIn();}},

                                    ]
                                );
                            }
                        } />
                </Appbar.Header>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
              
                padding: 15,
                textAlign:'left',
            }}>

                <Text style={styles.titulo}>Nome</Text>
                <Text style={styles.content}>{perfil.nome}</Text>
                <Text style={styles.titulo}>Email</Text>
                <Text style={styles.content}>{perfil.email}</Text>
                <Text style={styles.titulo}>Ocupação</Text>
                <Text style={styles.content}>{perfil.ocupacao}</Text>
                <Text style={styles.titulo}>Curso</Text>
                <Text style={styles.content}>{perfil.curso}</Text>
                <Text style={styles.titulo}>Turno</Text>
                <Text style={styles.content}>{perfil.turno}</Text>
                <Text style={styles.titulo}>Disciplina</Text>
                <Text style={styles.content}>{perfil.disciplina}</Text>


            </View>
        </SafeAreaView>

    )
    
}
const mapStateToProps = state =>
    ({
        email: state.user.email,
        nome: state.user.nome,
    })
const mapDispatchToProps = dispatch => ({
    togglePerfil: (login, senha) => dispatch(UserActions.toggleUser(login, senha))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)