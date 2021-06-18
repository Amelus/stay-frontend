export interface IAppointmentVm {
  createdAt?: Date | null;
  updatedAt?: Date | null;
  id?: string | null;
  extendedProps: {
    creator: string,
    content?: string | null,
    global: boolean,
  };
  title: string;
  start?: Date | null;
  end?: Date | null;
  allDay: boolean;
  daysOfWeek?: number[] | null;
  startTime?: string | null;
  endTime?: string | null;
  startRecur?: Date | null;
  endRecur?: Date | null;
}
