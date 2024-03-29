import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Image, Heading, Stack, Text } from '@chakra-ui/core';

export default function Hero({ title, subtitle, image, ctaLink, ctaText, ...rest }) {
  return (
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      wrap="no-wrap"
      minH="60vh"
      px={8}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: '80%', md: '40%' }}
        align={['center', 'center', 'flex-start', 'flex-start']}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={['center', 'center', 'left', 'left']}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left', 'left']}
        >
          {subtitle}
        </Heading>
        <Link to={ctaLink}>
          <Button
            variantColor="primary"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            rightIcon="chevron-right"
          >
            {ctaText}
          </Button>
        </Link>
        <Text fontSize="xs" mt={2} textAlign="center" color="primary.800" opacity="0.6">
          No credit card required.
        </Text>
      </Stack>
      <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
        <Image
          alt={'safeguard'}
          src={image}
          size="100%"
          rounded="1rem"
          // shadow="2xl"
        />
      </Box>
    </Flex>
  );
}
