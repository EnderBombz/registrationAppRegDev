import React from 'react'
import {Text,View} from 'react-native'

class Item {
    constructor(data,produto,quantidade,valor) {
        this.data = data;
        this.produto = produto;
        this.quantidade = quantidade;
        this.valor = valor;
    }
}

export default ()=>{

    var Card = []
    var item = new Item()

    return(
        <View>

        </View>
    )
}
