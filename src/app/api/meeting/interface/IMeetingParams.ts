export interface IMeetingParams {
  title: string;
  content?: string | null;
  global?: boolean | false;
  start?: Date | null;
  end?: Date | null;
  allDay: boolean | false;
  daysOfWeek?: number[] | null;
  startTime?: string | null;
  endTime?: string | null;
}
