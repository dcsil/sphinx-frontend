import React from 'react';
import { Text, Image, Flex } from '@chakra-ui/core';
import logo from '../assets/sphinx_icon.png';
export default function Logo(props) {
  return (
    <Flex {...props} flexDirection="row" alignItems="center">
      <Image src={logo} size="40%" rounded="1rem" marginRight="15px" />
      <Text color="primary.700" fontSize="20px">
        Sphinx
      </Text>
    </Flex>
  );
}
