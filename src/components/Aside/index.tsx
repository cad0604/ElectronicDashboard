import React from 'react';
import { Link } from 'react-router-dom';

import {
  MdDashboard,
  MdArrowUpward,
  MdArrowDownward,
} from 'react-icons/md';

import {
  Container,
  Header,
  LogoImg,
  Title,
  MenuContainer,
  MenuItemLink,
} from './styles';

import LogoImage from '../../assets/logo.svg';

const Aside: React.FC = () => {

  return (
    <Container>
      <Header>
        <LogoImg src={LogoImage} alt="Logo Your Company" />
        <Title>Your Company Name</Title>
      </Header>

      <MenuContainer>
        <Link style={{ textDecoration: 'none' }} to="/">
          <MenuItemLink>
            <MdDashboard />
              Dashboard
          </MenuItemLink>
        </Link>

        <Link style={{ textDecoration: 'none' }} to="/list/total">
          <MenuItemLink>
            <MdArrowUpward />
            Daily Total Amount
          </MenuItemLink>
        </Link>

        <Link style={{ textDecoration: 'none' }} to="/list/peak">
          <MenuItemLink>
            <MdArrowDownward />
            Daily Peak Amount
          </MenuItemLink>
        </Link>

      </MenuContainer>
    </Container>
  );
};

export default Aside;
