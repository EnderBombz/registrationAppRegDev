import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native'
import { TextInput, Avatar, Button, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { ReactComponent as User } from '../../../assets/userIcon.svg';
import config from './../../components/Firebase'
import firebase from 'firebase'

import { connect } from 'react-redux'
import * as CourseActions from '../../store/actions/course'
import * as UserActions from '../../store/actions/user'

const SignIn = ({ email, nome, togglePerfil }) => {

    const db = firebase.database().ref();
    const contasDb = db.child('Contas');
    const [contas, setContas] = useState([]);



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
            setContas(contas => [...contas, f])

        })
    }

    const [login, setLogin] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [perfil, setPerfil] = React.useState('')

    const verificaLogin = () => {
        let i = 0;
        let cont = 0;
        let val = 0;
        for (i = 0; i < contas.length; i++) {
            if (login == contas[i].email && senha == contas[i].senha) {
                setPerfil(contas[i]);
                togglePerfil(login, senha)
                cont = 1
                handleTimeLine()
            }else{
                val++;
            }
        }
        if (val == contas.length) {
            alert("A conta não existe.");
        }
    }





    const navigation = useNavigation();

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    }

    const handleTimeLine = () => {
        navigation.reset({ routes: [{ name: 'MainTab', params: { perfil } }] }, perfil)
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', }}>
            <View style={{ backgroundColor: '#fff' }}>

                <View style={{ padding: 20, alignItems: 'center', marginTop: 20 }}>
                    <Image style={{ width: 250, height: 250 }} source={require('../../../assets/userLogin.png')} />

                </View>


                <View style={{

                    backgroundColor: '#fff',
                    padding: 20,
                    justifyContent: 'center',
                }}>

                    <TextInput
                        style={{ margin: 15 }}
                        label="Email"
                        value={login}
                        mode="outlined"
                        onChangeText={login => setLogin(login)}
                    />
                    <TextInput
                        style={{ marginLeft: 15, marginRight: 15, marginBottom: 15, }}
                        label="Senha"
                        value={senha}
                        mode="outlined"
                        secureTextEntry={true}
                        onChangeText={senha => setSenha(senha)}
                    />
                    <Button icon="check" mode="contained" onPress={verificaLogin} style={{ marginTop: 10, margin: 10, }}>
                        Login
            </Button>
                    <Button onPress={handleSignUp} style={{ marginBottom: 30, marginTop: 8, }}>
                        Não possuí uma conta?
            </Button>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);