import React from 'react';
import { Alert, Text, TextInput, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
 
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    label: 'Red',
                    value: 'Red',
                },
                {
                    label: 'Orange',
                    value: 'Orange',
                },
                {
                    label: 'Blue',
                    value: 'Blue',
                },
                {
                    label: 'Blue',
                    value: 'Blue',
                },
                {
                    label: 'Blue',
                    value: 'Blue',
                },
                {
                    label: 'Blue',
                    value: 'Blue',
                },
                {
                    label: 'Blue',
                    value: 'Blue',
                },
            ],    
        };
    }

    
    render() {
        this.state
    
        return (

                <View>
                <RNPickerSelect
                    placeholder={{
                        label: 'Select a color...',
                        value: null,
                    }}
                    style={pickerSelectStyles.android} 
                    items={this.state.items}
                    value={this.state.favColor}
                    onValueChange={(value) => {this.setState({favColor: value})}}             
                    useNativeAndroidPickerStyle={true} //android only
                   
                />
                <Text style={styles.combo}>{this.state.favColor}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    combo:{
        top:-36,
        left:10,
        fontSize:18,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 0,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    android:{
        color:'#000',
    }
});