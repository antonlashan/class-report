import { FormattedData, Strength } from '../reporting';
import { FilterStudentsPipe } from './filter.pipe';

const mockData: FormattedData[] = [
  {
    content: 'Pile Up',
    date: new Date('2018-10-07'),
    value: 43,
    student: 'Student 0',
    time: '30m',
    skill: 'Count to 10',
    type: 'Activity',
    strength: Strength.weak,
  },
  {
    content: 'Pile Up',
    date: new Date('2018-10-07'),
    value: 67,
    student: 'Student 0',
    time: '30m',
    skill: 'Count to 10',
    type: 'Activity',
    strength: Strength.ok,
  },
  {
    content: 'Pile Up',
    date: new Date('2018-10-07'),
    value: 49,
    student: 'Student 1',
    time: '30m',
    skill: 'Count to 10',
    type: 'Activity',
    strength: Strength.excellent,
  },
];

describe('FilterStudentsPipe', () => {
  const pipe = new FilterStudentsPipe();

  it('should have filtered students', () => {
    expect(pipe.transform(mockData, 'Student 0')).toHaveLength(2);
  });

  it('should have not students', () => {
    expect(pipe.transform(mockData, 'Student 10')).toHaveLength(0);
  });

  it('should return initial data', () => {
    expect(pipe.transform(mockData, null)).toHaveLength(3);
  });
});
