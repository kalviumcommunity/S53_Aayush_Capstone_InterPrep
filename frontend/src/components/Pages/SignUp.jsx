'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react'

import SignUpImg from '../../assets/SignUp.png'

// const Blur = (props) => {
//     return (
//       <Icon
//         width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
//         zIndex={useBreakpointValue({ base: 0, md: 0, lg: 0 })}
//         height="560px"
//         viewBox="0 0 528 560"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         {...props}>
//         <circle cx="71" cy="61" r="111" fill="#F56565" />
//         <circle cx="244" cy="106" r="139" fill="#ED64A6" />
//         <circle cy="291" r="139" fill="#ED64A6" />
//         <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
//         <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
//         <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
//         <circle cx="426.5" cy="100.5" r="101.5" fill="#4299E1" />
//       </Icon>
//     )
//   }

export default function SignUp() {
  return (
    <Stack minHeight={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        {/* <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} /> */}
    <Stack direction={{ base: 'column', md: 'row' }} zIndex={"3"}>
        <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={SignUpImg}
        />
      </Flex>
      <Flex p={[8, 8, 0]} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
      
    </Stack>
  )
}