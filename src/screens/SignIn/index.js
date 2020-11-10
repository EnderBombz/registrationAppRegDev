import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native'
import { TextInput, Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'


export default () => {

    const [text, setText] = React.useState('');

    const navigation = useNavigation();

    const handleTimeLine = () => {
        navigation.reset({
            routes: [{ name: 'MainTab' }]
        })
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff',}}>
            <View style={{ backgroundColor: '#fff' }}>

                <View style={{ padding: 20, alignItems: 'center', marginTop: 20 }}>
                    <Avatar.Image size={250} source={require('../../../assets/avatar.png')} />
                </View>


                <View style={{

                    backgroundColor: '#fff',
                    padding: 20,
                    justifyContent: 'center',
                }}>

                    <TextInput
                        style={{ margin: 15 }}
                        label="Email"
                        value={text}
                        mode="outlined"
                        onChangeText={text => setText(text)}
                    />
                    <TextInput
                        style={{ marginLeft: 15, marginRight: 15, marginBottom: 15, }}
                        label="Senha"
                        value={text}
                        mode="outlined"
                        onChangeText={text => setText(text)}
                    />
                    <Button icon="check" mode="contained" onPress={()=>{handleTimeLine()}} style={{marginTop:10,margin:10,}}>
                        Login
            </Button>
                    <Button onPress={() => console.log('Pressed')} style={{marginBottom:30,marginTop:8,}}>
                        Não possuí uma conta?
            </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}