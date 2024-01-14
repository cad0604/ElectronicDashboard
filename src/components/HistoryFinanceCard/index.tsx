import React from 'react';

import { Container, Tag, Small, H5 } from './styles';

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
      <Small className=''>{subTitle}</Small>
    </div>
    <h5>{amount}</h5>
    <H5>{title}</H5>
  </Container>
);

export default HistoryFinanceCard;
