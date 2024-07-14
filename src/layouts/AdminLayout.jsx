import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Image,
  } from '@chakra-ui/react';
  import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiChevronDown,
  } from 'react-icons/fi';
  import { Outlet, Link, useNavigate } from 'react-router-dom';
  import Cookies from 'js-cookie';
  import { FaBuilding } from 'react-icons/fa';
  import PasswordModal from '../components/PasswordModal';
  
  // Define the different LinkItems for each role
  const linkItemsByRole = {
    1: [
      { name: 'Inicio', icon: FiHome, path: '/home' },
      { name: 'Empresas', icon: FaBuilding, path: '/empresas' },
    ],
    2: [
      { name: 'Inicio', icon: FiHome, path: '/home' },
      { name: 'Sucursales', icon: FaBuilding, path: '/sucursales' },
      { name: 'Tasas', icon: FiHome, path: '/tasas' },
      { name: 'Usuarios', icon: FiHome, path: '/usuarios' },
    ],
    3: [
      { name: 'Inicio', icon: FiHome, path: '/home' },
    ],
  };
  
  const logout = (navigate) => {
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('id');
    Cookies.remove('role');
    Cookies.remove('token');
    Cookies.remove('sesion');
  
    navigate('/');
  };
  
  const perfil = (navigate) => {
    navigate('/profile');
  };
  
  const SidebarContent = ({ onClose, linkItems, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Image src={'https://suramericacargo.com/images/logo.png'} />
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {linkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
  };
  
  const NavItem = ({ icon, children, path, ...rest }) => {
    return (
      <Link to={path} style={{ textDecoration: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };
  
  const MobileNav = ({ onOpen, navigate, onPasswordChange, logout, ...rest }) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Image src={'https://suramericacargo.com/images/logo.png'} display={{ base: 'flex', md: 'none' }} w={'30%'} />
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{Cookies.get('name')}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {Cookies.get('role') == 1 && <>Super Admin</>}
                      {Cookies.get('role') == 2 && <>Administrador</>}
                      {Cookies.get('role') == 3 && <>Operario</>}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem onClick={() => perfil(navigate)}>Perfil</MenuItem>
                <MenuItem onClick={onPasswordChange}>Cambiar Clave</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };
  
  const AdminLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const role = Cookies.get('role');
    const linkItems = linkItemsByRole[role] || [];
  
    const updatePassword = (newPassword) => {
      // Lógica para actualizar la contraseña
      console.log(`Updating password to ${newPassword}`);
    };
  
    return (
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} linkItems={linkItems} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} linkItems={linkItems} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} navigate={navigate} onPasswordChange={onOpen} logout={() => logout(navigate)} />
        <PasswordModal isOpen={isOpen} onClose={onClose} onSubmit={updatePassword} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Outlet />
        </Box>
      </Box>
    );
  };
  
  export default AdminLayout;
  