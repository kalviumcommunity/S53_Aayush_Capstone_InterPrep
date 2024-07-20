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
} from "@chakra-ui/react";
import { FiHome, FiUsers, FiBookmark } from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { GiReceiveMoney } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import Logo from "../assets/Logo.png";
import { memo } from "react";
import { Link } from "react-router-dom";
import Circ from "./Circ";

const LinkItems = [
  { name: "Home", icon: FiHome, to: "/" },
  { name: "Commmunity", icon: FiUsers, to: "" },
  { name: "Saved", icon: FiBookmark, to: "" },
  { name: "Freelance", icon: GiReceiveMoney, to: "/gigs" },
  { name: "Jobs", icon: MdWork, to: "/jobs" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={{ base: "#1D1D1D", md: "black" }}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      color={"white"}
      padding={{ base: "2rem 2rem", xsm: "1rem 1rem", md: "2rem 2rem" }}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to={"/"}>
          <img src={Logo} id="logo-img" draggable="false" />
        </Link>
        <CloseIcon
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          w={4}
          h={4}
          color="white"
        />
      </Flex>
      <br />
      <br />
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
      <Circ
        color={"#3A387B"}
        width={"9rem"}
        blur={"blur(45px)"}
        top={"30vh"}
        left={14}
        zind={-1}
      />
      <Circ
        color={"#984382"}
        width={"10rem"}
        blur={"blur(80px)"}
        top={"55vh"}
        zind={-1}
        left={0}
        sec={"6"}
      />
    </Box>
  );
};

const NavItem = ({ to, icon, children, ...rest }) => {
  return (
    <Box
      as={Link}
      to={`${to}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontFamily="Didact Gothic"
        _hover={{
          bg: "#ffffff20",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="22"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      pt={{ base: 0, xsm: "1rem", md: "2rem" }}
      px={{ base: 0, xsm: "1rem", md: "2rem" }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("black")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="unstyled"
        aria-label="open menu"
        icon={<HamburgerIcon w={6} h={6} color="white" />}
      />
      <Link to={"/"}>
        <Image
          src={Logo}
          id="logo-img"
          draggable="false"
          display={{ base: "block", md: "none" }}
          padding="0.2rem 0.2rem"
        />
      </Link>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="md" color="white" fontFamily="Didact Gothic">
                    {" "}
                    Justina Clark
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    fontFamily="Didact Gothic"
                  >
                    Admin
                  </Text>
                </VStack>
                <Avatar
                  size={{ base: "md" }}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </HStack>
            </MenuButton>
            <MenuList
              bg={"#FFFFFF40"}
              backdropFilter={"blur(10px)"}
              border={"none"}
              fontFamily={"Didact Gothic"}
              color={"white"}
            >
              <MenuItem
                bg={""}
                fontWeight={"bold"}
                _hover={{ bg: "#ffffff20" }}
                transition="all 0.3s"
              >
                Profile
              </MenuItem>
              <MenuItem
                bg={""}
                fontWeight={"bold"}
                _hover={{ bg: "#ffffff20" }}
                transition="all 0.3s"
              >
                Settings
              </MenuItem>
              <MenuItem
                bg={""}
                fontWeight={"bold"}
                _hover={{ bg: "#ffffff20" }}
                transition="all 0.3s"
              >
                Billing
              </MenuItem>
              <MenuDivider />
              <MenuItem
                bg={""}
                fontWeight={"bold"}
                _hover={{ bg: "#ffffff20" }}
                transition="all 0.3s"
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Sidebar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100%" bg={useColorModeValue("black")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default memo(Sidebar);
