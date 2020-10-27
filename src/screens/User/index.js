import * as React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { Appbar } from 'react-native-paper'

export default () => {

    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');


    return (
        <SafeAreaView>
            <Appbar.Header theme={{ colors: { primary: '#3D2554', underlineColor: '#3D2554' } }}>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Perfil" subtitle="do usuário" />
                <Appbar.Action icon="magnify" onPress={_handleSearch} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Text>
                    Teste
            </Text>
            </View>
        </SafeAreaView>

    )
}