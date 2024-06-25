import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react'
import logo from "../../assets/Logo.png";
import { Link } from 'react-router-dom';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'900'} fontSize={'1.3rem'} mb={2} fontFamily="Didact Gothic">
      {children}
    </Text>
  )
}

export default function LargeWithLogoCentered() {
  return (
    <Box
      bg={'#FFFFFF15'}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} color={'gray.200'}>
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Box as={Link} to={"/jobs"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Overview
            </Box>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
                Features
              </Box>
              <Tag
                size={'sm'}
                bg={"#ffffff40"}
                ml={2}
                color={'white'}
                fontFamily="Didact Gothic" fontWeight={'bold'}>
                New
              </Tag>
            </Stack>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Tutorials
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Pricing
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Releases
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              About Us
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Press
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Careers
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Contact Us
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Partners
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Cookies Policy
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Privacy Policy
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Terms of Service
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Law Enforcement
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Status
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Follow Us</ListHeader>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Facebook
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Twitter
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Dribbble
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              Instagram
            </Box>
            <Box as={Link} to={"/"} fontFamily="Didact Gothic" fontWeight={'bold'}>
              LinkedIn
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <img src={logo} alt="Logo" width="100" height="100" />
        </Flex>
        <Text pt={6} fontSize={"md"} textAlign={"center"} fontFamily="Didact Gothic" fontWeight={'bold'} color={'gray.200'}>
          Â© 2024 InterPrep. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}