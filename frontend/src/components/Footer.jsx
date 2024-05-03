'use client'

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
import { ReactNode } from 'react'
import LogoImg from '../assets/Logo.png'

const Logo = () => {
  return (
    <img src={LogoImg} id="logo-img"/>
  )
}

export default function Footer() {
  return (
    <Box
      bg={"black"}
      color={useColorModeValue('gray.300', 'gray.200')}>
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
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2024 InterPrep. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}