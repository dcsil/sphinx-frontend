import React from 'react';
import { Box, Text, Image } from '@chakra-ui/core';
import logo from './sphinx_icon.png';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        <img alt="landing-logo" src={logo} size="50%" rounded="1rem" />
      </Text>
    </Box>
  );
}
