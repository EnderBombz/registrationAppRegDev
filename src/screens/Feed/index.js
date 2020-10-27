import * as React from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet} from 'react-native'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default () => {


    const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: -580,
        backgroundColor: '#3D2554',
    },
})

const navigation = useNavigation()

const handleReservationScreen = () => {
    navigation.reset({
        routes: [{ name: 'ReservationScreen' }]
    })
}
    return (

        <SafeAreaView>
            <FAB
                style={styles.fab}
                big
                icon="plus"
                onPress={() => handleReservationScreen()}
                color="#fff"
            />
            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <Text>
                        Teste223123
            </Text>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
    
}
