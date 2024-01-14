import React from 'react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import formatCurrency from '../../utils/formatCurrency';
import { SpinnerInfinity } from 'spinners-react';

import {
  Container,
  ChartHeader,
  LegendContainer,
  Legend,
  ChartContainer,
  SnipperDiv
} from './styles';

interface IHistoryBoxProps {
  data: {
    year: string;
    month: number;
    totalAmount: number;
    peakAmount: number;
  }[];
  lineColorTotalAmount: string;
  lineColorPeakAmount: string;
  loading: boolean;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColorTotalAmount,
  lineColorPeakAmount,
  loading,
}) => {
  let subTitle = "Daily Usage Data";
  if (data.length > 0) {
    subTitle += "(" + data[0].year.split('-')[1] + " " + data[0].year.split('-')[0] + ")";

  }
  return (
    <Container>
      <ChartHeader>
        {data.length > 0 ? (<h2>{subTitle}</h2>) : (<h2>Daily Usage Data</h2>)}

        <LegendContainer>
          <Legend color={lineColorTotalAmount}>
            <div></div>
            <span>Average</span>
          </Legend>
          <Legend color={lineColorPeakAmount}>
            <div></div>
            <span>Peak</span>
          </Legend>
        </LegendContainer>
      </ChartHeader>

      <ChartContainer>
        {loading === true ? (
          <><SnipperDiv>
            <SpinnerInfinity size={200} />
          </SnipperDiv>
           <ResponsiveContainer width="100%" height={140}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
           </ResponsiveContainer>
           </>
        ) : (
          <ResponsiveContainer width="100%" height={300}>

            {data.length !== 0 ? (
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                <XAxis dataKey="month" stroke="#cecece" />
                <Tooltip
                  formatter={(value: number) => formatCurrency(Number(value))}
                />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  name="Total Amount"
                  stroke={lineColorTotalAmount}
                  strokeWidth={5}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="peakAmount"
                  name="Peak Amount"
                  stroke={lineColorPeakAmount}
                  strokeWidth={5}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>)
              :
              <SnipperDiv><h2>No Data!</h2></SnipperDiv>
            }
          </ResponsiveContainer>
        )}


      </ChartContainer>
    </Container>
  )
};

export default HistoryBox;
