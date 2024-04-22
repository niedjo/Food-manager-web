import React, { useState, useRef } from 'react';
import './bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css';
import './App.css';
import Appli from './Appli';

function App() {

  const [Isconnexion, setIsconnexion] = useState(true)
  const [Iscoucou, setIscoucou] = useState(true)
  const [Nom, setNom] = useState([])
  const nom = useRef(null)
  const mot_de_pass = useRef(null)


  const handleClick = () => {
    if (nom.current.value === "lynda kuitche" && mot_de_pass.current.value === "codec@fournir23") {
      setIsconnexion(false)
      setNom([nom.current.value.toString(), nom.current.value.toString(), 34])
    }
    
    else{
      alert('erreur de login et/ou de mot de passe; veillez reessayer')
    }
  }


  if (Isconnexion) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xs-4 col-ls-4 col-lg-4 box">
            <span style={{color : "#fa3434", fontSize : 19}}>Food Manager</span>
            <span style={{fontSize : 17}}>Fournisseur de recette</span>
            <span style={{color : "#fa3434"}}>Connexion</span>
            <div className="form-group">
              <label htmlFor="Nom">NOM</label><br />
              <input type="text" ref={nom}/><br />
              <label htmlFor="Nom">MOT DE PASSE</label><br />
              <input type="password" ref={mot_de_pass}/><br />
              <button onClick={handleClick}>Se connecter</button><br />
              <span style={{marginLeft : 80, opacity : 0.7}} onClick={() => alert('veillez contacter horizon')}>Mot de passe oubliee ?</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

    else {
      if (Iscoucou) {
        setTimeout( async ()=> {
          setIscoucou(false)
        }, 5000)
        return (
          <center>
            <div className='col-md-4 col-xs-4 col-ls-4 col-lg-4' 
              style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", padding : 10, borderRadius : 10, background : "#ff9e9e", color : "#fff"}}> 
              la connexion s'est effectuee avec sucses ! bonjour {Nom[0]}
            </div>
          </center>
        )
      }
      return (
        <Appli nom={Nom[0]}/>
      )
    }
}

export default App;
