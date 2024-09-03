import React, { useState } from 'react'
import './App.css'
import Button from './Components/Buttons/Button'
import Input from './Components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


export default function App() {

 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    //stop le comportement par defaut d'un composant/ici celui du formulaire
    e.preventDefault()
    const formData = new FormData();
    formData.set('email', email)
    formData.set('password', password)
    setIsLoading(true)

    const response = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/login`, formData)

   try {
    if (response.data.success) {

      toast.success(response.data.message)
      setIsLoading(false)
      setTimeout( function () {
        navigate('/dashboard') // Redirige après 3 secondes permettant ainsi de voir le message de succès avant

      }, 3000 )

    }else {
      toast.error("email ou mot de passe incorrect");
      console.log(response.data)
      setIsLoading(false)
    }
    
   } catch (e) {

    toast.error("email ou mot");
   
   }
  }
  return (
  
    <div>
       <ToastContainer stacked />
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} >
        <p>Renseigner vos informations de connexion pour vous connecter</p>
        <Input
          label={'Email'}
          type={'email'}
          reference={'email'}
          placeHolder={'Saisir l\'adresse e-mail ici...'}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }} />

        <Input
          label={'Mot de passe'}
          type={'password'}
          reference={'password'}
          placeHolder={'Saisir l\'adresse e-mail ici...'}
          value={password}
          onChange={onPasswordChange} />
        <br />

        <div>
        <Button
            disabled={isLoading}
            type={"submit"}
            text={isLoading ? "Chargement ..." : "Soumettre"}
          /><br />
          <Button type={'reset'} text={'Annuler'} />
        </div>
        <Link to={'/registration'} >S'inscrire</Link>
      </form>
    </div>

  )
}


