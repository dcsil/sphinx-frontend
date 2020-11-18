import React from 'react';
import { Flex } from '@chakra-ui/core';
import Header from './Header';
// import Footer from "../sections/Footer";

export default function DashboardLayout(props) {
  return (
    <Flex direction="column" align="center" w="100%" m="0 auto" {...props}>
      <Header />
      {props.children}
      {/* <Footer /> */}
    </Flex>
  );
}
