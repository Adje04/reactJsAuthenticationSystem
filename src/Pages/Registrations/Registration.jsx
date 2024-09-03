import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import Button from '../../Components/Buttons/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


export default function Inscription() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setpasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false)

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (email.trim().length < 6 || email.trim().length > 32) {
      setError(true);
      const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (password.trim().length < 6 || password.trim().length > 32) {
      setError(true);
      const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (passwordConfirm.trim() != password.trim()) {
      setError(true);
      const errorMessage = "Les deux mot de passe sont différents";
      toast.error(errorMessage);
      return;
    }

    localStorage.setItem("email", email);

    setIsLoading(true);
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("passwordConfirm", passwordConfirm);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1.0.0/register",
      formData
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(function () {
        navigate("/otp-code/" + email);
      }, 3000);
    } else {
      console.log(response.data);

      if (response.data.data.name !== undefined) {
        toast.error(response.data.data.name[0]);
      } else if (response.data.data.email !== undefined) {
        toast.error(response.data.data.email[0]);
      } else if (response.data.data.password !== undefined) {
        toast.error(response.data.data.password[0]);
      } else if (response.data.data.passwordConfirm !== undefined) {
        toast.error(response.data.data.passwordConfirm[0]);
      }

      setIsLoading(false);
    }
  }

  return (
    <div>
      <ToastContainer />
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <p>Renseigner vos informations  pour vous inscrire</p>
        {/* {error && <Alert text={errorText} /> } */}
        <Input
          label={'Name'}
          type={'text'}
          reference={'name'}
          placeHolder={'Saisir le nom ici...'}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }} />
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
          placeHolder={'Saisir le mot de passe  ici...'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }} />

        <Input
          label={'Confirmer le mot de passe'}
          type={'password'}
          reference={'passwordConfirm'}
          placeHolder={'Confirmer le mot de passe  ici...'}
          value={passwordConfirm}
          onChange={(e) => {
            setpasswordConfirm(e.target.value)
          }} />
        <br />

        <div>
          <Button
            disabled={isLoading}
            type={"submit"}
            text={isLoading ? "Chargement ..." : "Soumettre"}
          /><br />
          <Button type={'reset'} text={'Annuler'} />
        </div>
        <Link to={'/'} >Se connecter</Link>
      </form>
    </div>
  )
}
