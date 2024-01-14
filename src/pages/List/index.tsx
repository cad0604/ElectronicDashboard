import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuid_v4 } from 'uuid';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import ListOfMonths from '../../utils/months';
import { UsageSummary } from "../../../shared";
import { Container, Content, SnipperDiv } from './styles';
import HistoryFinanceCardHead from '../../components/HistoryFinanceCardHead';
import { SpinnerCircularSplit } from 'spinners-react';

interface iRoutesParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<iRoutesParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const [loading, setLoading] = useState<boolean>(true);

  const [serverResp, setServerResp] = useState<UsageSummary | undefined>(
    undefined
  );

  const historydata: IData[] = [];

  const movimentType = match.params.type;

  const pageData = useMemo(() => {
    return movimentType === 'total'
      ? {
        title: 'Total Amount',
        lineColor: '#4E41F0',
        data: [],
      }
      : {
        title: 'Peak Amount',
        lineColor: '#E44C4E',
        data: [],
      };
  }, [movimentType]);

  const years = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const yearArray = [];
    for (let i = 0; i < 20; i++) {
      yearArray.push(i);
    }
    return yearArray.map((year, index) => {
      return {
        value: currentYear - year,
        label: currentYear - year,
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

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('invalid year value. Is accept integer number.');
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const urlAddress = "/api/usage/" + ListOfMonths[monthSelected - 1].slice(0, 3) + "-" + yearSelected.toString();
      const resp = await fetch(urlAddress);
      const data: UsageSummary = await resp.json();
      setServerResp(data);
      setLoading(false);
    })();
  }, [monthSelected, yearSelected, movimentType]);

  useEffect(() => {
    const ListOfDays = [];
    let index = 0;
    if (serverResp !== undefined) {
      const startDate = new Date(serverResp.startDate);
      const endDate = new Date(serverResp.endDate);
      const gainStartDate = startDate.getDate();
      const gainEndDate = endDate.getDate();
      for (let i = gainStartDate; i <= gainEndDate; i++) {
        ListOfDays.push(i);
      }
      let totalAmount = 0;
      let peakAmount = 0;
      let indexDate;
      let hourlyAverageAmount = 0;
      let peakTime;

      ListOfDays.map((_, day) => {
        totalAmount = Number(serverResp.days[index].totalKwh);
        peakAmount = Number(serverResp.days[index].usagePeak?.kw);
        indexDate = new Date(serverResp.days[index].date);
        hourlyAverageAmount = Number(serverResp.days[index].averageHourlyKwh);
        if (serverResp.days[index].usagePeak?.hour === undefined) peakTime = "";
        else peakTime = serverResp.days[index].usagePeak?.hour;
        index++;
        if (movimentType === 'total') {
          historydata.push({
            id: uuid_v4(),
            description: (Math.round(hourlyAverageAmount * 100) / 100).toString(),
            amountFormatted: (Math.round(totalAmount * 100) / 100).toString() + " KWh",
            frequency: 'recorrente',
            dateFormatted: indexDate.getFullYear().toString() + "-" + (indexDate.getMonth() + 1).toString() + "-" + indexDate.getDate().toString(),
            tagColor: '#4E41F0'
          });
        } else {
          historydata.push({
            id: uuid_v4(),
            description: peakTime === undefined ? "" : peakTime,
            amountFormatted: (Math.round(peakAmount * 100) / 100).toString() + " KW",
            frequency: 'eventual',
            dateFormatted: indexDate.getFullYear().toString() + "-" + (indexDate.getMonth() + 1).toString() + "-" + indexDate.getDate().toString(),
            tagColor: '#E44C4E'
          });
        }
      });

      setData(historydata);
    }
  }, [serverResp]);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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
        <HistoryFinanceCardHead
          title={movimentType}
        />
        {loading === true ? (
          <SnipperDiv>
            <SpinnerCircularSplit size={200} />
          </SnipperDiv>
        ) : (
          <div>
            {data.length > 0 ? (
              <>
                {data.map((item) => (
                  <HistoryFinanceCard
                    key={item.id}
                    tagColor={item.tagColor}
                    title={item.description}
                    subTitle={item.dateFormatted}
                    amount={item.amountFormatted}
                  />
                ))}
              </>
            ) : (
              <SnipperDiv><h2>No Data!</h2></SnipperDiv>
            )}
          </div>
        )}
      </Content>
    </Container>
  );
};

export default List;
