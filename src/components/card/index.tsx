import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface CardProps {
  date: string;
  weight: string;
  title: string;
  skills: string[];
  headerImageUrl: string;
}

const CardContainer = styled.div`
  display: inline-flex;
  border-radius: 20px;
  background-color: #fff;
  margin: 20px;
  min-width: 300px;
  min-height: 300px;
  max-width: 300px;
  max-height: 300px;
  flex-direction: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  transition: 0.5s all ease;
  text-transform: capitalize;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardHeader = styled.div<{ headerImageUrl: string }>`
  color: #f0fef6;
  display: flex;
  height: 210px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('${props => props.headerImageUrl}');
  background-repeat: no-repeat;
  background-size: contains;
  background-position: center;
  border-radius: 20px 20px 0 0;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 25px;
`;

const CardContent = styled.div`
  padding: 10px 25px 15px 25px;
  display: flex;
  row-gap: 35px;
  flex-direction: column;
  justify-content: space-around;
`;

const CardTitle = styled.div`
  color: #205d3e;
  font-size: 1.5em;
  font-weight: bold;
`;

const CardSkills = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  color: #306d5e;
`;

const CardWeight = styled.div`
  background-color: #34d350;
  border-radius: 20px;
  padding: 2px 10px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card: React.FC<CardProps> = ({ date, weight, title, skills, headerImageUrl }) => {

  return (
    <Link to={`details/${title}`}>
      <CardContainer>
        <CardHeader headerImageUrl={headerImageUrl}>
          <span>{date}</span>
          <CardWeight>{weight}</CardWeight>
        </CardHeader>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardSkills>
            {skills.map((item, i) => (
              <span key={`${item}-${i}`}>#{item}</span>
            ))}
          </CardSkills>
        </CardContent>
      </CardContainer>
    </Link>
  );
};

const Cards: React.FC<{ records: { name: string; weight: number; skills: string[]; image: string }[] }> = ({ records }) => {
  return (
    <CardsContainer>
      {records?.map(item => (
        <Card key={item.name} date={'June 23th, 2023'} weight={`${item.weight / 10} kg`} title={item.name} skills={item.skills} headerImageUrl={item.image} />
      ))}
    </CardsContainer>
  );
};

export default Cards;
