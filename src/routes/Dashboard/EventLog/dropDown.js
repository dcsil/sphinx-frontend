import {
  DownOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Menu, Dropdown } from 'antd';

const ACTIONS = [
  {
    key: 1,
    text: 'Mark as Benign',
    component: () => <CheckCircleOutlined style={{ color: 'seagreen', fontSize: 20 }} />,
  },
  {
    key: 2,
    text: 'Mark as Malicious',
    component: () => <ExclamationCircleOutlined style={{ color: 'red', fontSize: 20 }} />,
  },
  {
    key: 3,
    text: 'Mark as Unknown',
    component: () => <QuestionCircleOutlined style={{ color: 'grey', fontSize: 20 }} />,
  },
];

const CustomDropDown = ({ handleMenuClick, disabled }) => {
  return (
    <Dropdown
      disabled={disabled}
      overlay={
        <Menu onClick={handleMenuClick}>
          {ACTIONS.map(a => (
            <Menu.Item
              key={a.key.toString()}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              {a.component()}
              {a.text}
            </Menu.Item>
          )).flat(Infinity)}
        </Menu>
      }
    >
      <Button>
        Actions <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default CustomDropDown;
