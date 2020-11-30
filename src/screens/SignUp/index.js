import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, ScrollView } from 'react-native'
import { TextInput, Avatar, Button, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { RadioButton, List } from 'react-native-paper';
import DropPicker from '../../components/DropPicker'
import RNPickerSelect from 'react-native-picker-select';

import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import config from '../../components/Firebase'
import firebase from 'firebase'


export default () => {

    useEffect(() => {
        if (!firebase.apps.length) {
            try {
                firebase.initializeApp(config)
            } catch (err) {
                console.log(err)
            }
        }
    }, [])
    const db = firebase.database().ref();

    const [checked, setChecked] = React.useState('aluno');
    const navigation = useNavigation();



    const [email, setEmail] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmaSenha, setConfirmaSenha] = React.useState('');

    const [select, setSelect] = React.useState('');

    const [expanded1, setExpanded1] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);
    const [expanded3, setExpanded3] = React.useState(false);
    const [expanded4, setExpanded4] = React.useState(false);


    const handlePress1 = () => setExpanded1(!expanded1);
    const handlePress2 = () => setExpanded2(!expanded2);
    const handlePress3 = () => setExpanded3(!expanded3);
    const handlePress4 = () => setExpanded4(!expanded4);



    const [ocup, setOcup] = React.useState('Aluno')
    const [ocupIco, setOcupIco] = React.useState();

    const [curso, setCurso] = React.useState('Selecione o curso');
    const [discip, setDiscip] = React.useState('Selecione a disciplina');

    const [periodo, setPeriodo] = React.useState('Selecione o turno');
    const contas = db.child('Contas')

    const enviaConta = () => {

        if (email != '' && nome != '') {
            if (senha == confirmaSenha) {
                if (ocup == 'Aluno') {
                    if (curso != 'Selecione o curso') {
                        if (periodo != 'Selecione o turno') {
                            contas.push({
                                email: email,
                                nome: nome,
                                senha: senha,
                                ocupacao: ocup,
                                curso: curso,
                                disciplina: "...",
                                turno: periodo,
                            })
                            handleSignIn()
                        } else {
                            alert('Selecione o turno.')
                        }
                    } else {
                        alert('Selecione o curso.')
                    }
                }
                if (ocup == 'Professor') {
                    if (curso != 'Selecione o curso') {
                        if (discip != 'Selecione a disciplina') {
                            if (periodo != 'Selecione o turno') {
                                contas.push({
                                    email: email,
                                    nome: nome,
                                    senha: senha,
                                    ocupacao: ocup,
                                    curso: curso,
                                    disciplina: discip,
                                    turno: periodo,
                                })
                                handleSignIn()
                            } else {
                                alert('Selecione o turno.')
                            }
                        }else{
                            alert('Selecione a disciplina')
                        }
                    } else {
                        alert('Selecione o curso.')
                    }
                }
            } else {
                alert('A confirmação da senha não está combinando.')
            }
        } else {
            alert('Existem campos não preenchidos.')
        }


    }


    const handleSignIn = () => {
        navigation.navigate("SignIn");
    }

    return (
        <ScrollView >
            <View style={{ height: 1600, padding: 15 }}>
                <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 20, textAlign: 'left' }}>Cadastro</Text>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 14, textAlign: 'justify' }}>Este formulário é reponsável por cadastrar um novo usuário para possibilitar a solicitação de reserva de salas.</Text>
                    </View>
                </View>

                <TextInput
                    style={{ margin: 15 }}
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={email => setEmail(email)}
                />
                <TextInput
                    style={{ margin: 15 }}
                    label="Nome"
                    value={nome}
                    mode="outlined"
                    onChangeText={nome => setNome(nome)}
                />
                <TextInput
                    style={{ margin: 15 }}
                    label="Senha"
                    value={senha}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={senha => setSenha(senha)}
                />
                <TextInput
                    style={{ margin: 15 }}
                    label="Confirmar senha"
                    value={confirmaSenha}
                    secureTextEntry={true}
                    mode="outlined"
                    onChangeText={confirmaSenha => setConfirmaSenha(confirmaSenha)}
                />

                <View>
                    <List.Section title="Ocupação?">
                        <List.Accordion
                            title={ocup}
                            onPress={handlePress1}
                            expanded={expanded1}
                            left={props => <List.Icon {...props} icon={() => <FontAwesome style={{ color: '#6200ee' }} name="user" size={24} color="black" />} />}>
                            <List.Item title="Aluno" onPress={() => { setOcup('Aluno');setDiscip('Selecione a disciplina');setExpanded1(false) }} />
                            <List.Item title="Professor" onPress={() => { setOcup('Professor'); setExpanded1(false) }} />
                        </List.Accordion>
                    </List.Section>
                </View>

                <View>
                    <List.Section title="Curso">
                        <List.Accordion
                            title={curso}
                            onPress={handlePress2}
                            expanded={expanded2}
                            left={props => <List.Icon {...props} icon={() => <MaterialCommunityIcons style={{ color: '#6200ee' }} name="google-classroom" size={24} color="black" />} />}>
                            <List.Item title="Análise e desenvolvimento de sistemas" onPress={() => { setCurso('Análise e desenvolvimento de sistemas'); setExpanded2(false) }} />
                            <List.Item title="Eventos" onPress={() => { setCurso('Eventos'); setExpanded2(false) }} />
                            <List.Item title="Mecatrônica" onPress={() => { setCurso('Mecatrônica'); setExpanded2(false) }} />
                            <List.Item title="Gestão de tecnologia e informação" onPress={() => { setCurso('Gestão de tecnologia e informação'); setExpanded2(false) }} />
                        </List.Accordion>
                    </List.Section>
                </View>

                <View>
                    {ocup != 'Aluno' ? <List.Section title="Disciplina">
                        <List.Accordion
                            title={discip}
                            onPress={handlePress3}
                            expanded={expanded3}
                            left={props => <List.Icon {...props} icon={() => <Entypo style={{ color: '#6200ee' }} name="book" size={24} color="black" />} />}>
                            <List.Item title="Calculo I" onPress={() => { setDiscip('Calculo I'); setExpanded3(false) }} />
                            <List.Item title="Calculo II" onPress={() => { setDiscip('Calculo II'); setExpanded3(false) }} />
                            <List.Item title="Administração" onPress={() => { setDiscip('Administração'); setExpanded3(false) }} />
                            <List.Item title="Micro-informática" onPress={() => { setDiscip('Micro-informática'); setExpanded3(false) }} />
                            <List.Item title="Engenharia de software I" onPress={() => { setDiscip('Engenharia de software I'); setExpanded3(false) }} />
                            <List.Item title="Engenharia de software II" onPress={() => { setDiscip('Engenharia de software II'); setExpanded3(false) }} />
                            <List.Item title="Engenharia de software III" onPress={() => { setDiscip('Engenharia de software III'); setExpanded3(false) }} />
                            <List.Item title="Publicidade" onPress={() => { setDiscip('Publicidade'); setExpanded3(false) }} />
                            <List.Item title="..." onPress={() => { setDiscip('...'); setExpanded3(false) }} />
                        </List.Accordion>
                    </List.Section> : <View />}
                </View>
                <View>
                    <List.Section title="Turno">
                        <List.Accordion
                            title={periodo}
                            onPress={handlePress4}
                            expanded={expanded4}
                            left={props => <List.Icon {...props} icon={() => <Entypo style={{ color: '#6200ee' }} name="time-slot" size={24} color="black" />} />}>
                            <List.Item title="Manhã" onPress={() => { setPeriodo('Manhã'); setExpanded4(false) }} />
                            <List.Item title="Tarde" onPress={() => { setPeriodo('Tarde'); setExpanded4(false) }} />
                            <List.Item title="Noite" onPress={() => { setPeriodo('Noite'); setExpanded4(false) }} />
                        </List.Accordion>
                    </List.Section>
                </View>
                <Button icon="check" mode="contained" onPress={enviaConta} style={{ marginTop: 10, margin: 10, }}>
                    Cadastrar
            </Button>
            </View>
        </ScrollView>
    )
}