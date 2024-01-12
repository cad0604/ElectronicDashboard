import React, { useState, useMemo, useCallback, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import HistoryBox from '../../components/HistoryBox';

import { UsageSummary } from "../../../shared";

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import ListOfMonths from '../../utils/months';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );
  const [serverResp, setServerResp] = useState<UsageSummary | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/usage");
      const data: UsageSummary = await resp.json();
      setServerResp(data);
    })();
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return ListOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount, amount must be number.');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount, amount must be number.');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const historydata = useMemo(() => {
    const ListOfDays = [];
    let index = 0;
    if (serverResp !== undefined) {
      console.log('start work.');
      const startDate = new Date(serverResp.startDate);
      const endDate = new Date(serverResp.endDate);
      const gainStartDate = startDate.getDay();
      const gainEndDate = endDate.getDay();
      for (let i = gainStartDate; i <= gainEndDate; i++) {
        ListOfDays.push(i);
      }
      console.log(ListOfDays);


      return ListOfDays.map((_, day) => {
        let amountEntry = 0;
        let amountOutPut = 0;
        amountEntry = serverResp.days[index].totalKwh;
        index++;
        return {
          monthNumber: day,
          month: ListOfMonths[day],
          amountEntry,
          amountOutPut,
        };
      }).filter((item) => {
        // const currentMonth = new Date().getMonth();
        const currentMonth = 11;
        const currentYear = new Date().getFullYear();

        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });

    } else {
      console.log('end work');
      return ListOfMonths.map((_, month) => {
        let amountEntry = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch {
              throw new Error(
                'AmountEntry is invalid. Amountentry must be valid number.'
              );
            }
          }
        });

        let amountOutPut = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutPut += Number(expense.amount);
            } catch {
              throw new Error(
                'AmountOutPut is invalid. AmountOutPut must be valid number.'
              );
            }
          }
        });
        return {
          monthNumber: month,
          month: ListOfMonths[month].substr(0, 3),
          amountEntry,
          amountOutPut,
        };
      }).filter((item) => {
        // const currentMonth = new Date().getMonth();
        const currentMonth = 11;
        const currentYear = new Date().getFullYear();

        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
    }
  }, [yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('invalid year value. Is accept integer number.');
    }
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7921b">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WalletBox
          title="Total Amount"
          color="#4E41F0"
          amount={totalBalance}
          icon="dolar"
          footerLabel="Display the total amount of electricity used"
        />

        <WalletBox
          title="Average Amount"
          color="#F7931B"
          amount={totalGains}
          icon="arrowUp"
          footerLabel="Display the average daily amount of electricity used"
        />

        <WalletBox
          title="Usage Peak"
          color="#E44C4E"
          amount={totalExpenses}
          icon="arrowDown"
          footerLabel="Display the peak amount of electricity used"
        />

        <HistoryBox
          data={historydata}
          lineColorAmountEntry="#f7931b"
          lineColorAmountOutPut="#e44c4e"
        />

      </Content>
    </Container>
  );
};

export default Dashboard;
