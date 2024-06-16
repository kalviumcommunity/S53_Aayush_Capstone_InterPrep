import React from 'react'
import Footer from '../components/Footer/Footer'
import { Flex, Image } from '@chakra-ui/react'
import Logo2 from '../assets/Logo2.png'
import InterviewSignup from '../components/Signup/Interviewer/InterviewSignup'

function IntSignUp() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Flex justifyContent={"center"} m={5}>
        <Image src={Logo2} width="70px" m={5}/>
      </Flex>
      <div style={{ flex: 1 }}>
        <InterviewSignup />
      </div>
      <Footer />
    </div>
  )
}

export default IntSignUp

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