import React from 'react';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

interface User {
  id: number;
  email: string;
  password: string;
  token?: string;
}

interface ProfileProps {
  user: User;
}

interface DecodedToken {
  id: number;
  email: string;
  password: string;
}


const CardContainer = styled.div`
  font-size: 18px;
  background-color: #f3f3f3;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto 0 auto;
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 16px;
  color: #205d3e;
  text-align: center;
`;

const PropertyLabel = styled.p`
  font-weight: bold;
  margin-bottom: 4px;
  color: #205d3e;
`;

const PropertyValue = styled.p`
  margin-bottom: 8px;
`;

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const decodedToken = jwt_decode<DecodedToken | undefined>(user?.token || '');

  return (
    <CardContainer>
      <Title data-testid="profile-title">Profile Page</Title>
      <PropertyLabel>ID:</PropertyLabel>
      <PropertyValue>{user.id}</PropertyValue>
      <PropertyLabel>Email:</PropertyLabel>
      <PropertyValue data-testid="user-email">{user.email}</PropertyValue>
      <PropertyLabel>Password:</PropertyLabel>
      <PropertyValue data-testid="user-password">{decodedToken?.password || 'Not available'}</PropertyValue>
    </CardContainer>
  );
};

export default Profile;
