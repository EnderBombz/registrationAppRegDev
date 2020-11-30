import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import config from '../components/Firebase';

export const TodasSalasContext = React.createContext([]);

export const SalasReservadasProvider = ({ children }) => {

    useEffect(() => {
        if (!firebase.apps.length) {
            try {
                firebase.initializeApp(config)
            } catch (err) {
                console.log(err)
            }
        }
        watchPersonData()
        todasSalasSolicitadasUpdate()
    }, [])

    const [todasSalasReservadas, setTodasSalasReservadas] = useState([]);
    const [todasSalasSolicitadas, setTodasSalasSolicitadas] = useState([]);
    const [todasSalasLivres, setTodasSalaLivres] = useState([]);
    const [contas,setContas] = useState([]);
    
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
    const todasSalasSolicitadasUpdate = () =>{
        setTodasSalasSolicitadas([]);
        tabelaSalas.on("child_added", snap => {
            let f = snap.val();
            f.key = snap.key;
            if (f.ocupado === 'pendente') {
                setTodasSalasSolicitadas(salas => [...salas, f])
            }
        })
    }

    const updateBd = () => {
        setTodasSalasReservadas([]);
        tabelaSalas.on("child_added", snap => {
            let f = snap.val();
            f.key = snap.key;
            if (f.ocupado == 'sim') {
                setTodasSalasReservadas(salas => [...salas, f])
            } else {

            }
        });
    }
    const reservaLivre = () =>{
        setTodasSalaLivres([]);
        tabelaSalas.on("child_added", snap => {
            let f = snap.val();
            f.key = snap.key;
            if (f.ocupado == 'nao') {
                setTodasSalaLivres(salas => [...salas, f])
            } else {

            }
        });
    }
  
    const removerReserva = (selectedSalaKey, handleTimeLine,hideModal1,hideModal2) => {
        const db2 = firebase.database().ref();
        const salaReservada = db2.child("Salas/" + selectedSalaKey);
        salaReservada.update({
            ocupado: "nao",
            curso:"...",
            data:"...",
            disciplina:"...",
            horaInicio:"...",
            horaTermino:"...",
            reservaDe:"..."
        });
        updateBd();
        handleTimeLine();
        hideModal1();
        hideModal2();
    }

   

    const permitirReserva = (selectedSalaKey, handleTimeLine,hideModal1,hideModal2) => {
        const db2 = firebase.database().ref();
        const salaReservada = db2.child("Salas/" + selectedSalaKey);
        salaReservada.update({
            ocupado: "sim",
        });
        todasSalasSolicitadasUpdate();
        updateBd();
        handleTimeLine();
        hideModal1();
        hideModal2();
    }
    const negarReserva = (selectedSalaKey, handleTimeLine,hideModal1,hideModal2) => {
        const db2 = firebase.database().ref();
        const salaReservada = db2.child("Salas/" + selectedSalaKey);
        salaReservada.update({
            ocupado: "nao",
            curso:"...",
            data:"...",
            disciplina:"...",
            horaInicio:"...",
            horaTermino:"...",
            reservaDe:"..."
        });
        todasSalasSolicitadasUpdate();
        updateBd();
        handleTimeLine();
        hideModal1();
        hideModal2();
    }


    return ( 
        <TodasSalasContext.Provider value={{ todasSalasReservadas, removerReserva, updateBd, watchPersonData,db,todasSalasSolicitadasUpdate,todasSalasSolicitadas, permitirReserva,negarReserva }}>{children}</TodasSalasContext.Provider>
    )

}