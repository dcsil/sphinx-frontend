import React from 'react';
import { Box, Text, Image } from '@chakra-ui/core';
import logo from './sphinx_icon.png';
export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        <Image src={logo} size="70%" rounded="1rem" />
      </Text>
    </Box>
  );
}
