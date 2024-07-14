import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    useToast,
    Image,
} from '@chakra-ui/react'
import { useState } from 'react'
import instance from '../utils/instance'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate()
    const toast = useToast()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
        <Box position={'relative'}>
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>

                    </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <Image src='https://suramericacargo.com/images/logo.png' />
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>

                            Bienvenid@
                            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                                !
                            </Text>
                        </Heading>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
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
                            <Input
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Clave"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />

                        </Stack>
                        <Button
                            onClick={() => login()}
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                boxShadow: 'xl',
                            }}>
                            Iniciar Sesion
                        </Button>
                    </Box>

                </Stack>
            </Container>
        </Box>
    )
}