import { PickerData } from '../../shared/datepicker-range/datepicker-range.component';

export interface Classroom {
  students: string[];
  name: string;
}

export interface Classes {
  classes: Classroom[];
}

export interface Activity {
  content: string;
  attempts: {
    weeks: string[];
    values: string[];
  };
  student: string;
  time: string;
  skill: string;
  type: string;
}

export interface Activities {
  data: Activity[];
}

export interface Filter {
  className: string | null;
  studentName: string | null;
  daterange: PickerData | null;
  lastChange: 'classroom' | 'student' | 'daterange' | null;
}

export interface FormattedData {
  content: string;
  date: string;
  value: number;
  student: string;
  time: string;
  skill: string;
  type: string;
  strength: Strength;
}

export enum Strength {
  excellent = 'excellent',
  good = 'good',
  ok = 'ok',
  weak = 'weak',
}

export interface Stats {
  categories: {
    [key: string]: number;
  };
  tot: number;
}

export interface BarChartData {
  name: string;
  value: number;
}

export const normalizeData = (
  filter: Filter,
  data: Activity[],
  classes: Classroom[]
) => {
  // tslint:disable-next-line: no-non-null-assertion
  const students = classes.find((c) => c.name === filter.className)!.students;
  // tslint:disable-next-line: no-non-null-assertion
  const { from, to } = getDateObjs(filter.daterange!);

  const formattedData: FormattedData[] = [];
  data.forEach((act) => {
    if (students.includes(act.student)) {
      act.attempts.weeks.forEach((date, index) => {
        if (checkDates(date, from, to)) {
          const value = +act.attempts.values[index];
          formattedData.push({
            content: act.content,
            date,
            value,
            student: act.student,
            time: act.time,
            skill: act.skill,
            type: act.type,
            strength: strenthLevels(value),
          });
        }
      });
    }
  });
  // console.log(formattedData);
  return formattedData;
};

const createDateObj = (year: number, month: number, day: number) => {
  let newYr = year;
  if (year.toString().length < 4) {
    newYr += 2000;
  }
  return new Date(newYr, month - 1, day);
};

export const getDateObjs = ({ from, to }: PickerData) => {
  return {
    from: createDateObj(from.year, from.month, from.day),
    to: createDateObj(to.year, to.month, to.day),
  };
};

const checkDates = (activityDateStr: string, from: Date, to: Date) => {
  // console.log(new Date(activityData))
  const [day, month, year] = activityDateStr.split('/');
  const activityDateObj = createDateObj(+year, +month, +day);
  return from <= activityDateObj && activityDateObj <= to;
};

const strenthLevels = (val: number) => {
  switch (true) {
    case 90 <= val:
      return Strength.excellent;
    case 80 <= val && 90 > val:
      return Strength.good;
    case 60 <= val && 80 > val:
      return Strength.ok;
    default:
      return Strength.weak;
  }
};

export const getBarChartData = (data: FormattedData[]): BarChartData[] => {
  const initObj = Object.keys(Strength).reduce((acc, val) => {
    if (!acc.hasOwnProperty(val)) {
      acc[val] = 0;
    }
    return acc;
  }, {} as { [key: string]: number });

  const stat = data.reduce(
    (acc, val) => {
      acc.categories[val.strength] += val.value;
      acc.tot += val.value;
      return acc;
    },
    { categories: initObj, tot: 0 }
  );
  const results: BarChartData[] = [];
  for (const [cat, value] of Object.entries(stat.categories)) {
    results.push({
      name: cat,
      value: stat.tot ? Math.round((value / stat.tot) * 100) : 0,
    });
  }

  return results;
};
