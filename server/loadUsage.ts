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
    for (let i = 0; i < 47; i++) {
      totalKwh += Number(dataArr[foundDataIndex + i + 2]);
      if (!(i % 2)) {
        if (peakKwh < Number(dataArr[foundDataIndex + i + 1]) + Number(dataArr[foundDataIndex + i + 2])) {
          peakKwh = Number(dataArr[foundDataIndex + i + 1]) + Number(dataArr[foundDataIndex + i + 2]);
          peakHour = Math.round((i - 1) / 2);
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

