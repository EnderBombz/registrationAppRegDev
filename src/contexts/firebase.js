import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import config from '../components/Firebase';

export const TodasSalasContext = React.createContext([]);


export const SalasReservadasProvider = ({ children }) =>  {

    useEffect(() => {
        if (!firebase.apps.length) {
            try {
                firebase.initializeApp(config)
            } catch (err) {
                console.log(err)
            }
        }
        watchPersonData()
    },[])

    const [todasSalasReservadas, setTodasSalasReservadas] = useState([]);

    const db = firebase.database().ref();
    const tabelaSalas = db.child('Salas');

    const watchPersonData = () => {
        tabelaSalas.on("child_added", snap => {
            let f = snap.val();
            f.key = snap.key;
            if (f.ocupado === 'sim') {
                setTodasSalasReservadas(salas => [...salas, f])
            }
        })
      }
  
    const updateBd = () => {
        tabelaSalas.on("child_added", snap => {
            let f = snap.val();
            f.key = snap.key;
            if (f.ocupado == 'sim') {
                setTodasSalasReservadas(salas => [...salas, f])
            } else {
        
            }
        });
    }

    const removerReserva = (selectedSalaKey, handleTimeLine) => {
        const db2 = firebase.database().ref();
        const salaReservada = db2.child("Salas/" + selectedSalaKey);
        salaReservada.update({
            ocupado: "nao",
            data: "...",
            horaInicio: "...",
            horaTermino: "...",
        });
        updateBd();
        handleTimeLine();
    }
      return (
        <TodasSalasContext.Provider value={{todasSalasReservadas,removerReserva,updateBd,watchPersonData }}>
          {children}
        </TodasSalasContext.Provider>
      )
  
}