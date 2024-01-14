import { promisify } from "util";
import { readFile } from "fs";
import {
  DailyUsage,
  DateString,
  TimeString,
  UsagePeak,
  UsageSummary,
} from '../shared';

const readFilePromise = promisify(readFile);

export async function loadUsage(dateFilter: string): Promise<UsageSummary> {
  const data = await readFilePromise(
    "data/example-04-vic-ausnetservices-email-17122014-MyPowerPlanner.csv"
  );

  const dataArr = data.toString().split(",");
  
  let foundDataIndex = dataArr.findIndex((element) => element.includes(dateFilter));

  if (foundDataIndex < 0) {
    return {
      startDate: "0000-00-00",
      endDate: "0000-00-00",
      totalKwh: 12,
      averageDailyKwh: 34,
      days: []
    };
  }

  const firstDay = Number(dataArr[foundDataIndex].slice(0, 2));
  let lastDay = 0;
  let day = firstDay;
  const days: DailyUsage[] = [];

  let loopVariable = true;
  while (loopVariable) {
    const date = dataArr[foundDataIndex];
    let totalKwh = 0;
    let peakKwh = 0;
    let peakHour = 0;
    // The csv file contains 48 items of usage data at 30-minute intervals from 00:00 to 23:30 and 
    // contains 5 items for "NMI,METER SERIAL NUMBER,CON/GEN,DATE,ESTIMATED". Thus total items is 53.

    for (let i = 0; i < 48; i++) {
      // But dataArr varieble has splited with ",", so the array has recognize that 
      // the ending item of row and starting item of next row are one element.
      // for example: ... ,0.384,0.083
      //              1111111111, ...
      // in above rows, "0.083'\n'1111111111" is recognized by dataArr to one element.
      // Therefore, we have to splite the element with '\n'.
      totalKwh += Number(dataArr[foundDataIndex + i + 2].split('\n')[0]);

      // for calculating the usage peak amount, we have to calculate the amount for 1 hours.
      // The csv file records usage at 30-minute intervals. so I added usages at '..:00' and '..:30'. 
      // at '..:30', i is odd and at '..:00', i is even.
      if (!(i % 2)) {
        if (peakKwh < Number(dataArr[foundDataIndex + i + 1].split('\n')[0]) + Number(dataArr[foundDataIndex + i + 2].split('\n')[0])) {
          peakKwh = Number(dataArr[foundDataIndex + i + 1].split('\n')[0]) + Number(dataArr[foundDataIndex + i + 2].split('\n')[0]);
          // peakHour must be a round number. Because i is odd, so, peakHour is round number.
          peakHour = (i - 1) / 2;
        }
      }

    }

    const usagePeak: UsagePeak = {
      hour: hourToString(peakHour),
      kw: peakKwh,
    };
    days.push({
      date: date,
      totalKwh: totalKwh,
      averageHourlyKwh: totalKwh / 24,
      usagePeak: usagePeak,
    });

    lastDay = Number(dataArr[foundDataIndex].slice(0, 2));
    // csv file contains 53 items in one row, but dataArr has recognize the 52 items in one row, because 
    // last item of row and first item of next row of csv file become one element of dataArr.
    foundDataIndex += 52;
    if (foundDataIndex > dataArr.length || !(dataArr[foundDataIndex].includes(dateFilter))) {
      loopVariable = false;
    }

  }

  const totalKwh = days.reduce((memo, e) => memo + e.totalKwh, 0);
  const averageDailyKwh = totalKwh / lastDay;

  return {
    startDate: dayNumToDateString(firstDay),
    endDate: dayNumToDateString(lastDay),
    totalKwh: totalKwh,
    averageDailyKwh: averageDailyKwh,
    days: days,
  };

  function hourToString(hour: number): TimeString {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  function dayNumToDateString(day: number): DateString {
    return dateFilter.split('/')[1] + '-' + dateFilter.split('/')[0] + `-${day.toString().padStart(2, '0')}`;
  }


}

