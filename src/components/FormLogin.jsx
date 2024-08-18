import styles from "../components/formlogin.module.css";
import sura from "../img/sura.png"
import evi from "../img/evi.png"
import { IconButton, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import instance from '../utils/instance'

export function FormLogin() {
    const navigate = useNavigate()
    let [show, setShow] = useState(false)
    const toast = useToast()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => setShow(!show)

    const login = () => {
        if (!email, !password) {
            toast({
                title: 'Error.',
                description: "Debes llenar todos los datos!.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }

        const payload = { email, password }

        instance.post('auth/login', payload).then((result) => {
            let data = result.data.data
            Cookies.set("name", data.user.name)
            Cookies.set("email", data.user.email)
            Cookies.set("id", data.user.id)
            Cookies.set("role", data.user.role)
            Cookies.set("token", data.token)
            Cookies.set("sesion", true)
            Cookies.set("empresaId", data.user.empresaId)
            Cookies.set("moneda", data.user.moneda)
            Cookies.set("sucursalId", data.user.sucursalId)
            navigate("/home")
        }).catch((e) => {
            toast({
                title: 'Error.',
                description: e.request.response,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.loginContainer}>
                    <div className={styles.loginHeader}>
                        <img src={sura} alt="Logo Izquierda" className={styles.logoLeft} />
                        <img src={evi} alt="Logo Derecha" className={styles.logoRight} />
                    </div>
                    <div className={styles.loginForm}>
                        <div>
                            <label htmlFor="username">USUARIO </label>
                            <Input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Usuario"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <label htmlFor="password">CLAVE </label>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Clave'
                                    bg={'gray.100'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <InputRightElement >
                                    <IconButton onClick={handleClick} aria-label='Search database' icon={show ? <FaEye /> : <FaEyeSlash />} />
                                </InputRightElement>
                            </InputGroup>
                        </div>
                        <div>
                            <button type="submit" onClick={() => login()}>INICIAR SESÍON</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}