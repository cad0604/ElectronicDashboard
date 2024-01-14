import React, { useState, useMemo, useCallback, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import HistoryBox from '../../components/HistoryBox';

import { UsageSummary } from "../../../shared";

import ListOfMonths from '../../utils/months';

import { Container, Content } from './styles';
import WalletBoxPeak from '../../components/WalletBoxPeak';

interface IHistoryProps {
  year: string;
  month: number;
  totalAmount: number;
  peakAmount: number;
}

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

  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  const[averageAmount, setAverageAmount] = useState<number>(0);

  const[maxPeak, setMaxPeak] = useState<number>(0);

  const [historyBoxData, setHistoryBoxData] = useState<IHistoryProps[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const historydata: IHistoryProps[] = [];

  useEffect(() => {
    const ListOfDays = [];
    let index = 0;
    if (serverResp !== undefined) {
      let tempTotalAmount = 0;
      let tempAverageAmount = 0;
      let tempMaxAmount = 0;
      const startDate = new Date(serverResp.startDate);
      const endDate = new Date(serverResp.endDate);
      const gainStartDate = startDate.getDate();
      const gainEndDate = endDate.getDate();
      for (let i = gainStartDate; i <= gainEndDate; i++) {
        ListOfDays.push(i);
      }
      ListOfDays.map((_, day) => {
        let totalAmount = 0;
        let peakAmount = 0;
        
        totalAmount = Number(serverResp.days[index].totalKwh);
        tempTotalAmount += totalAmount;
        peakAmount = Number(serverResp.days[index].usagePeak?.kw);
        if(peakAmount > tempMaxAmount) tempMaxAmount = peakAmount;
        index++;
        historydata.push({
          year:serverResp.startDate.toString(),
          month: day+1,
          totalAmount:Math.round(totalAmount * 100) / 100,
          peakAmount:Math.round(peakAmount * 100) / 100,
        });
      });
      tempAverageAmount = Math.round(tempTotalAmount / index * 100) / 100;
      setTotalAmount(tempTotalAmount);
      setAverageAmount(tempAverageAmount);
      setMaxPeak(tempMaxAmount);
      setHistoryBoxData(historydata);
    }
  }, [serverResp]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const urlAddress = "/api/usage/" + ListOfMonths[monthSelected-1].slice(0,3) + "-" + yearSelected.toString();
      const resp = await fetch(urlAddress);
      const data: UsageSummary = await resp.json();
      setServerResp(data);
      setLoading(false);
    })();
  }, [monthSelected, yearSelected]);

  const years = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const yearArray = [];
    for(let i = 0; i < 20; i++) {
      yearArray.push(i);
    }
    return yearArray.map((year, index) => {
      return {
        value: currentYear-year,
        label: currentYear-year,
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
          amount={totalAmount}
          icon="dolar"
          footerLabel="Display the total amount of electricity used"
        />

        <WalletBox
          title="Average Amount"
          color="#F7931B"
          amount={averageAmount}
          icon="arrowUp"
          footerLabel="Display the average daily amount of electricity used"
        />

        <WalletBoxPeak
          title="Usage Peak"
          color="#E44C4E"
          amount={maxPeak}
          icon="arrowDown"
          footerLabel="Display the peak amount of electricity used"
        />

        <HistoryBox
         data = {historyBoxData}

          // data=[{month:1, totalAmount:304, peakAmount:19}]
          lineColorTotalAmount= "#f7931b"
          lineColorPeakAmount="#e44c4e"
          loading={loading}
        />

      </Content>
    </Container>
  );
};

export default Dashboard;
