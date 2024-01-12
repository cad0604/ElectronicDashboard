import React from 'react';

import { Container, Tag } from './styles';

interface HistoryFinanceCardProps {
  tagColor: string;
  title: string;
  subTitle: string;
  amount: string;
}

const HistoryFinanceCard: React.FC<HistoryFinanceCardProps> = ({
  tagColor,
  title,
  subTitle,
  amount,
}) => (
  <Container>
    <Tag color={tagColor} />
    <div>
      <small>{subTitle}</small>
    </div>
    <h3>{amount}</h3>
  </Container>
);

export default HistoryFinanceCard;
