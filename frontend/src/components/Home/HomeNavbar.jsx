import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Link as ChakraLink,
  background,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

export default function HomeNavbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box padding={{ xsm: "1rem 0rem", sm: "1rem 0rem", md: "2rem 4rem" }}>
      <Flex
        bg={useColorModeValue("black", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
        fontFamily="Didact Gothic"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          bg="transparent"
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={4} h={4} color="white" />
              ) : (
                <HamburgerIcon w={6} h={6} color="white" />
              )
            }
            variant="unstyled"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems="center"
        >
          <img src={Logo} id="logo-img" draggable="false" />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={Link}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"16px"}
            width="140px"
            height="40px"
            color={"white"}
            bg={"black"}
            to={'/'}
            borderRadius="38"
            borderBottom={"2px solid #00E0FF"}
            _hover={{
              bg: "black",
              boxShadow: "0 6px 12px 0 #00E0FF70",
            }}
            fontFamily="Didact Gothic"
            fontWeight="bold"
          >
            Get started
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("#999999");
  const linkHoverColor = useColorModeValue("#fffff2 ");
  const popoverContentBgColor = useColorModeValue("#FFFFFF40");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                p={2}
                fontSize={"1.2rem"}
                letterSpacing="0.5px"
                fontWeight={"bold"}
                color={linkColor}
                fontFamily={"Didact Gothic"}
          transition={"all .3s ease"}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                  cursor: navItem.children ? "pointer" : "default",
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                backdropFilter= "blur(8px)"
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}

              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};


const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      to={`/${href}`}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      bg={"#FFFFFF15"}
      _hover={{ bg: useColorModeValue("white") }}
      fontFamily="Didact Gothic"
      fontWeight="bold"
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            color={"#ffffff"}
            transition={"all .3s ease"}
            fontWeight={"bold"}
            fontFamily="Didact Gothic"
          >
            {label}
          </Text>
          <Text fontSize={"0.9rem"} color={"#ffffff"}fontFamily="Didact Gothic">
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"white"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};


const MobileNav = () => {
  return (
    <Stack bg={"#FFFFFF15"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        as={children ? Box : ChakraLink}
        to={href}
        fontFamily="Didact Gothic"
        fontWeight="bold"
      >
        <Text fontWeight={"bold"} color={"#FFFFFF"} fontFamily="Didact Gothic">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            color={"white"}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack pl={4} fontFamily="Didact Gothic" fontWeight="bold" borderLeft={1} mb={4} borderStyle={"solid"} borderColor={"#FFFFFF90"} color={"#FFFFFF"} align={"start"}>
          {children &&
            children.map((child) => (
              <ChakraLink key={child.label} py={2} to={child.href} fontFamily="Didact Gothic" fontWeight="bold">
                {child.label}
              </ChakraLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Features",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "jobs",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "jobs",
      },
    ],
  },
  {
    label: "Openings",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "jobs",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "jobs",
      },
    ],
  },
  {
    label: "FAQ",
    href: "#",
  },
];
