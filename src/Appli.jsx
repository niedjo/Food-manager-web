import React, { useState, useRef } from 'react';
import './bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css';
import './App.css';

// firebase

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCQMJSLEpUpmmEMfixrpJbgrDLL4WPVbg4",
    authDomain: "food-manager-6944a.firebaseapp.com",
    projectId: "food-manager-6944a",
    storageBucket: "food-manager-6944a.appspot.com",
    messagingSenderId: "249401583817",
    appId: "1:249401583817:web:127f3727867ccffbc8c518",
    measurementId: "G-9140MJHXD3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Appli(props) {

  const image = useRef(null)
  const nomfood = useRef(null)
  const type = useRef(null)
  const categorie = useRef(null)
  const historique = useRef(null)
  const provenance = useRef(null)

  // on recupere les astuces et les procedures
  const procedure = useRef(null)
  const currentPro = useRef(procedure)
  const [Tabproc, setTabproc] = useState([])
  const astuce = useRef(null)
  const currentAstuce = useRef(astuce)
  const [Tabastuce, setTabastuce] = useState([])

  const [NombreProcedure, setNombreProcedure] = useState(1)
  const [TabProcedure, setTabProcedure] = useState([NombreProcedure])
  const [NombreAstuces, setNombreAstuces] = useState(1)
  const [TabAstuces, setTabAstuces] = useState([NombreAstuces])

  const addProcedure = (e) => {
    e.preventDefault(); 
    if (procedure.current.value === "") {
        alert("veillez remplir la procedure avant d'en ajouter une")
    }
    else{
        setNombreProcedure(n => n + 1); 
        setTabProcedure(c => [...c, NombreProcedure + 1]);
        // console.log(procedure.current.value)
        setTabproc(c => [...c, procedure.current.value])
    }
  }

  const addAstuces = (e) => {
      e.preventDefault(); 
    if (astuce.current.value === "") {
        alert("veillez remplir la procedure avant d'en ajouter une")
    }
    else{
        setNombreAstuces(n => n + 1); 
        setTabAstuces(c => [...c, NombreAstuces + 1]);
        // console.log(astuce.current.value)
        setTabastuce(c => [...c, astuce.current.value])
    }
  }

  const sendData = async () => {
      
        console.log( 
            "les donnees sont : ",
        image.current.value, 
        "", 
        nomfood.current.value, 
        type.current.value, 
        categorie.current.value, 
        historique.current.value,
        provenance.current.value,
        [...Tabproc, procedure.current.value], 
        [...Tabastuce, astuce.current.value])
        
        if (
            image.current.value === "" || 
            nomfood.current.value === "" || 
            type.current.value === "" ||
            categorie.current.value === "" ||
            historique.current.value === "" ||
            provenance.current.value === "" ||
            procedure.current.value === "" ||
            astuce.current.value === ""
            )
         {
            alert("veillez remplir tous les champs s'il vous plait")   
        }

        else{
            try {
                const docRef = doc(db, "repas", nomfood.current.value);
                console.log("document ecrie")
                await setDoc(docRef, {
                    id : Date.now().toString(),
                    urlImage : image.current.value,
                    urlVideo : "",
                    nom : nomfood.current.value,
                    avatar : type.current.value,
                    categorie : categorie.current.value,
                    historique : historique.current.value,
                    provenance : provenance.current.value,
                    precedure : [...Tabproc, procedure.current.value],
                    astuce : [...Tabastuce, astuce.current.value]
                });
                console.log("Document written with ID: ", docRef.id);
                alert(" le repas : " + docRef.id + 
                " a ete envoyee avec succes. VEILLEZ RECHARGER LA PAGE SI VOUS SOUHAITEZ REALIMENTER FOOD MANAGER")

                // image.current.value = ""  
                // nomfood.current.value = "" 
                // type.current.value = "" 
                // categorie.current.value = ""  
                // historique.current.value = ""
                // provenance.current.value = ""
                // procedure.current.value = "" 
                // astuce.current.value = ""
                // Tabproc[0] = procedure.current.value
                // // setTabproc([procedure.current.value])
                // setTabProcedure([1]);
                // setNombreProcedure(1); 

                // TabAstuces[0] = astuce.current.value
                // // setTabastuce([astuce.current.value])
                // setTabAstuces([1]);
                // setNombreAstuces(1); 

            } catch (e) {
                console.error("Error adding document: ", e);
            }

        }

        

  }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-7 col-xs-7 col-ls-7 col-lg-7">
                <form className="form-group">
                    <span style={{background : '#666', color : "#fff", padding : 10, borderRadius : 10}}>NOM : {props.nom}</span><br /><br /><br />
                    <label htmlFor="image">image</label><br />
                    <input type="text" className='form-control' ref={image}/><br />
                    <label htmlFor="nom">nom</label><br />
                    <input type="text" className='form-control' ref={nomfood}/><br />
                    <label htmlFor="type">type</label><br />
                    <input type="text" className='form-control' ref={type}/><br />
                    <label htmlFor="cathegorie">cathegorie</label><br />
                    <input type="text" className='form-control' ref={categorie}/><br />
                    <label htmlFor="provenance">provenance</label><br />
                    <input type="text" className='form-control' ref={provenance}/><br />
                    <label htmlFor="historique">historique</label><br />
                    <textarea type="text" className='form-control' ref={historique}/><br />
                    
                    <div className="add" style={{display : "flex", justifyContent : "space-between"}}>
                    <div className="col-md-6 col-xs-6 col-ls-6 col-lg-6">
                        <label htmlFor="procedure" style={{textTransform : "underline"}}>procedures</label><br />
                        {
                            TabProcedure.map(
                            (t, k) => 
                            <div key={k}>
                                <label htmlFor="procedure">procedure {t}</label>
                                <textarea type="text" className='form-control' ref={procedure}/>
                            </div>
                            )
                        }
                        <button className='btn btn-danger' style={{width : 100, fontSize : 20}} onClick={addProcedure}>+</button><br />
                    </div>
                    <div className="col-md-5 col-xs-5 col-ls-5 col-lg-5">
                        <label htmlFor="astuce" style={{textTransform : "underline"}}>astuces</label><br />
                        {
                            TabAstuces.map(
                            (t, k) => 
                            <div key={k}>
                                <label htmlFor="astuce">astuce {t}</label>
                                <textarea type="text" className='form-control' ref={astuce}/>
                            </div>
                            )
                        }
                        <button className='btn btn-danger' style={{width : 100, fontSize : 20}} onClick={addAstuces}>+</button><br />
                    </div>
                    </div>
                </form>
                </div>
            </div>
            {/* <div className="sap">nombre de procedure {JSON.stringify(Tabproc)}, nombre d'astuces : {JSON.stringify(Tabastuce)}</div> */}
            <span className="col-md-4 col-xs-4 col-ls-4 col-lg-4"></span>
            <div onClick={sendData} className='col-md-4 col-xs-4 col-ls-4 col-lg-4' style={{padding : 10, borderRadius : 10, background : "#ff4848", color : "#fff", textAlign : "center"}}>Alimenter Food manager en recette</div>
            <span className="col-md-4 col-xs-4 col-ls-4 col-lg-4"></span>
        </div>
    )
}