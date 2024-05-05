import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    Icon,
    Text,
    Drawer,
    DrawerContent,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useDisclosure,
    Image,
  } from '@chakra-ui/react'
  import {
    FiHome,
    FiTrendingUp,
    FiUsers,
    FiBookmark,
    FiMenu,
  } from 'react-icons/fi'
  import { 
    MdOutlineHistoryToggleOff 
  } from "react-icons/md";
  import {
    HamburgerIcon,
    CloseIcon
  } from "@chakra-ui/icons";
  import Logo from "../assets/Logo.png"
import { memo } from 'react';

  const LinkItems = [
    { name: 'Home', icon: FiHome },
    { name: 'History', icon: MdOutlineHistoryToggleOff },
    { name: 'Commmunity', icon: FiUsers },
    { name: 'Saved', icon: FiBookmark },
    { name: 'Stats', icon: FiTrendingUp },
  ];
  
  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        bg={{base:'#1D1D1D', md:'black'}}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        color={'white'}
        padding={{base:"2rem 2rem", xsm:'1rem 1rem', md:'2rem 2rem'}}
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img src={Logo} id="logo-img" draggable="false" />
          <CloseIcon display={{ base: 'flex', md: 'none' }} onClick={onClose} w={4} h={4} color="white"/>
        </Flex>
        <br /><br />
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
  }
  
  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Box
        as="a"
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        >
        <Flex
          align="center"
          p="4"
          mx="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#ffffff20',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="22"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  }
  
  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        pt={{base:0, xsm:"1rem", md:"2rem"}}
        px={{ base:0, xsm:"1rem", md:"2rem"}}
        height="20"
        alignItems="center"
        bg={useColorModeValue('black')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="unstyled"
          aria-label="open menu"
          icon={<HamburgerIcon w={6} h={6} color="white" />}
        />
  
        <Image src={Logo} id="logo-img" draggable="false" display={{ base: 'block', md: 'none' }} padding='1rem 1rem'/>
  
        <HStack spacing={{ base: '0', md: '6' }} >
          <Flex alignItems={'center'}
        >
            <Menu
            >
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}
              
              >
                <HStack>
                <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                    
                    >
                    <Text fontSize="md" color="white">Justina Clark</Text>
                    <Text fontSize="sm" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Avatar
                    size={{base:"md"}}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  }
  
  const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Box minH="100vh" bg={useColorModeValue('black')} >
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
      </Box>
    );
  }
  
  export default memo(Sidebar);