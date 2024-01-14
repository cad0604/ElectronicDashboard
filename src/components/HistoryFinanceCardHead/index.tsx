import React from 'react';

import { Container, Tag, Small, H5, HX, HP5, HPX } from './styles';

interface HistoryFinanceCardProps {
  title: string;
}

const HistoryFinanceCardHead: React.FC<HistoryFinanceCardProps> = ({
  title,
}) => {
  return (
    <Container>
      {title === 'total' ? (
        <>
          <Tag color='#4E41F0' />
          <div>
            <Small className=''>Date</Small>
          </div>
          <HX>Total Amount</HX>
          <H5>Hourly Average Amount</H5>
        </>
      ) : (
        <>
          <Tag color='#E44C4E' />
          <div>
            <Small className=''>Date</Small>
          </div>
          <HPX>Peak Amount</HPX>
          <HP5>Peak Hour</HP5>
        </>
      )}

    </Container>
  )
};

export default HistoryFinanceCardHead;
