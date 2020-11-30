import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Card, Avatar, Title } from 'react-native-paper';
import {FontAwesome} from '@expo/vector-icons'


const CardItem = ({ item, onPress }) => {

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (
        <View>
            <TouchableOpacity onPress={onPress} >

                <Card style={{ margin: 10, borderRadius: 5, padding: 10, }}>
                    <Card.Title title={item.reservaDe} subtitle={item.ocupacao} left={() => <Avatar.Icon style={{backgroundColor:'#6200ee'}}size={40} icon={()=><FontAwesome style={{ color: '#fff'}} name="user" size={20} color="black" />}></Avatar.Icon>} />
                    <Card.Content>
                        <View>
                            <Title>{item.nome}</Title>

                            <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Curso: {item.curso}</Text>
                            <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Disciplina: {item.disciplina}</Text>
                            <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Data de reserva: {item.data}</Text>
                            <Text style={{ flex: 1, flexDirection: 'row', textAlign: 'left' }}>Das {item.horaInicio} horas até {item.horaTermino} horas</Text>

                        </View>
                    </Card.Content>

                </Card>
            </TouchableOpacity>

        </View>
    )
}


export default CardItem