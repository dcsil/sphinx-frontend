import { Box, Button, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import { auth } from '../../redux/actions/auth';
import { traffic } from '../../redux/actions/traffic';
import { connect } from 'react-redux';
import DataLoader from './DataLoader';
import { Popover } from 'antd';

const MenuItems = props => {
  const { children, isLast, to = '/', active, ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      color={active ? 'primary.600' : 'primary.700'}
      fontWeight={active ? 'bold' : 'normal'}
      padding={2}
      borderBottomWidth={active ? 2 : 0}
      borderBottomColor={active ? 'primary.600' : 'transparent'}
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const DropDown = props => {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <Popover
        content={
          <div>
            <HeaderButtoon disabled={props.rate === 10} onClick={props.onClickSlower}>
              Slower
            </HeaderButtoon>
            <span style={{ fontSize: 17, fontWeight: 'bold', margin: 10 }}>{props.rate}</span>
            <span style={{ color: '#666', marginRight: 10 }}> sec / update </span>
            <HeaderButtoon disabled={props.rate === 1} onClick={props.onClickFaster}>
              Faster
            </HeaderButtoon>
          </div>
        }
        title="Modify update rate"
        trigger="click"
        visible={show}
        onVisibleChange={setShow}
      >
        <HeaderButtoon>Sampling Rate</HeaderButtoon>
      </Popover>
    </div>
  );
};

const Control = props => {
  const [saved, setSaved] = React.useState(999 * 999);
  return (
    <HeaderButtoon
      onClick={() => {
        props.setState(saved);
        setSaved(props.rate);
      }}
    >
      {props.rate < 999 * 999 ? 'Pause' : 'Resume'}
    </HeaderButtoon>
  );
};

const HeaderButtoon = props => {
  return (
    <Button
      size="sm"
      rounded="md"
      marginRight="1rem"
      color={['primary.500', 'primary.500', 'white', 'white']}
      bg={['white', 'white', 'primary.500', 'primary.500']}
      _hover={{
        bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
      }}
      disabled={props.disabled}
      onClick={() => {
        // props.logout();
        props.onClick();
      }}
    >
      {props.children}
    </Button>
  );
};

const Header = props => {
  const show = true;
  const [count, setCount] = React.useState(50);
  const [rate, setRate] = React.useState(1000);
  React.useEffect(() => {
    const time = setInterval(() => {
      setCount(count + 1);
    }, rate);
    return () => clearInterval(time);
  }, [rate, count]);

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
          <MenuItems to="/dashboard/analytics" active={props.path === '/dashboard/analytics'}>
            Monitoring
          </MenuItems>
          <MenuItems to="/dashboard/cluster" active={props.path === '/dashboard/cluster'}>
            Analytics
          </MenuItems>
          <MenuItems to="/dashboard/event_log" active={props.path === '/dashboard/event_log'}>
            Event Logs
          </MenuItems>
        </Flex>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '25%',
        }}
      >
        <DataLoader time={count} />
        <Control setState={setRate} rate={rate} />
        <DropDown
          rate={rate / 1000}
          onClickSlower={() => setRate(rate + 1000)}
          onClickFaster={() => setRate(rate - 1000)}
        />
        <MenuItems to="/" isLast>
          <HeaderButtoon onClick={props.logout}>Logout</HeaderButtoon>
        </MenuItems>
      </div>
    </Flex>
  );
};

const actionCreator = {
  logout: auth.logout,
  random: traffic.random,
};
export default connect(null, actionCreator)(Header);
