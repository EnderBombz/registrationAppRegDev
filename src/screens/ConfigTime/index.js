import React, { useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { Avatar, Button, Appbar, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'

export default () => {

    const navigation = useNavigation()
    const LeftContent = props => < Avatar.Icon {...props}
        icon="folder" />

    const renderItem = ({ item }) => (<Item title={item.title}
    />
    );

    const handleTimeLine = () => {
        navigation.reset({
            routes: [{ name: 'MainTab' }]
        })
    }
    const handleConfigTime = () => {
        navigation.reset({
            routes: [{ name: 'ConfigTime' }]
        })
    }

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (

        <SafeAreaView >
            <Appbar.Header theme={
                { colors: { primary: '#3D2554', underlineColor: '#3D2554' } }} >
                < Appbar.BackAction onPress={
                    () => handleTimeLine()}
                />
                <Appbar.Content title="Reserva" subtitle="de salas" />
            </Appbar.Header>

            <View>
                <View >
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Show time picker!" />
                </View>
                <View>
                    {
                        show && (<DateTimePicker testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                        )
                    }

                </View>

            </View>

            <Button
                icon="check"
                mode="contained"
                style={
                    { margin: 15 }}
                onPress={handleTimeLine()}>Reservar</Button>

        </SafeAreaView>


    )

}