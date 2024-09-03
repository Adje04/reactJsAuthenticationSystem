import React, { useState } from 'react'
import Input from '../../Components/Inputs/Input'
import Button from '../../Components/Buttons/Button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
export default function OtpCode() {

    const [otpCode, setOtpCode] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();

        formData.set("code", otpCode);
        formData.set("email", params.email);

        const response = await axios.post(
            "http://127.0.0.1:8000/api/v1.0.0/otp-code",
            formData
        );

        if (response.data.success) {
            navigate('/dashboard');
            setIsLoading(false)
        } else {
            toast.error(response.data.message);
            setIsLoading(false)
        }
    };
    return (
        <div>
             <ToastContainer />
            <p>Un code vous a été envoyé dans votre boîte email({localStorage.getItem('email')}). Verifiez-le et saisissez-le</p>
            <form onSubmit={handleSubmit}>
                <Input
                    label={'Code de confirmation'}
                    type={'text'}
                    reference={'otp'}
                    placeHolder={'Saisisser le code ici ...'}
                    value={otpCode}
                    onChange={(e) => {
                        setOtpCode(e.target.value)
                    }}
                />
                <Button
                    disabled={isLoading}
                    text={isLoading ? "Chargement ..." : "Soumettre"}
                    type={"submit"}
                />
            </form>
        </div>
    )
}
