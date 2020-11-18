import { Box, Button, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
// import theme from '../../utils/theme';
import { auth } from '../redux/actions/auth';
import { connect } from 'react-redux';

const MenuItems = props => {
  const { children, isLast, to = '/', active = false, onClick, ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
      color={active ? 'primary.600' : 'primary.700'}
      fontWeight={active ? '500' : 'normal'}
      padding={2}
      borderBottomWidth={active ? 2 : 0}
      onClick={onClick}
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

// const CloseIcon = () => (
//   <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//     <title>Close</title>
//     <path
//       fill="white"
//       d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
//     />
//   </svg>
// );

// const MenuIcon = () => (
//   <svg width="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="white">
//     <title>Menu</title>
//     <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//   </svg>
// );

const Header = props => {
  const [active, setActive] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p="10px 30px"
      shadow="md"
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
      <Flex align="center">
        <Logo w="100px" color={['white', 'white', 'primary.500', 'primary.500']} />
      </Flex>

      {/* <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box> */}

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/dashboard" active={active === 0} onClick={() => setActive(0)}>
            Dashboard
          </MenuItems>
          <MenuItems to="/dashboard/anomaly" active={active === 1} onClick={() => setActive(1)}>
            Anomaly
          </MenuItems>
          <MenuItems to="/dashboard/diagram" active={active === 2} onClick={() => setActive(2)}>
            Diagram
          </MenuItems>
          <MenuItems to="/dashboard/event_log" active={active === 3} onClick={() => setActive(3)}>
            Event Log
          </MenuItems>
          <MenuItems to="/" active={active === 4} onClick={() => setActive(4)} isLast>
            <Button
              size="sm"
              rounded="md"
              color={['primary.500', 'primary.500', 'white', 'white']}
              bg={['white', 'white', 'primary.500', 'primary.500']}
              _hover={{
                bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
              }}
              onClick={() => {
                props.logout();
              }}
            >
              Logout
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  );
};

const actionCreator = {
  logout: auth.logout,
};

export default connect(null, actionCreator)(Header);
