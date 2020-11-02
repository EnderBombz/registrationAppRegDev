import * as React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { Appbar } from 'react-native-paper'

export default () => {

    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');


    return (
        <SafeAreaView>
            <View style={{marginBottom:15,}}>

            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                padding:15,
            }}>
                <Text>
                    Usuário
            </Text>
            </View>
        </SafeAreaView>

    )
}