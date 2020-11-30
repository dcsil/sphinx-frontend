import { Box, Button, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import { auth } from '../../redux/actions/auth';
import { traffic } from '../../redux/actions/traffic';
import { connect } from 'react-redux';
import DataLoader from './DataLoader';

const MenuItems = props => {
  const { children, isLast, to = '/', active, ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      color={active ? 'primary.600' : 'primary.700'}
      fontWeight={active ? '500' : 'normal'}
      padding={2}
      borderBottomWidth={active ? 2 : 0}
      {...rest}
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
  const show = true;
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const time = setInterval(() => {
      setCount(count + 1);
    }, 10000);
    return () => clearInterval(time);
  });
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
          align={['center', 'center', 'center']}
          justify={['center', 'center', 'center']}
          direction={['row', 'row', 'row']}
          pt={[0, 0, 0]}
        >
          {/* <MenuItems to="/dashboard" active={active === 0} onClick={() => setActive(0)}>
            Dashboar
          </MenuItems> */}
          <MenuItems to="/dashboard/analytics" active={props.path === '/dashboard/analytics'}>
            Analytics
          </MenuItems>
          {/* <MenuItems to="/dashboard/diagram" active={active === 2} onClick={() => setActive(2)}>
            Diagram
          </MenuItems> */}
          <MenuItems to="/dashboard/cluster" active={props.path === '/dashboard/cluster'}>
            Real-time Clustering
          </MenuItems>
          <MenuItems to="/dashboard/event_log" active={props.path === '/dashboard/event_log'}>
            Event Logs
          </MenuItems>
          <MenuItems to="/" isLast>
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
      <DataLoader time={count} />
    </Flex>
  );
};

const actionCreator = {
  logout: auth.logout,
  random: traffic.random,
};
export default connect(null, actionCreator)(Header);