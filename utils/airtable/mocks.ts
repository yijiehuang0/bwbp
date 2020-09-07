import {
  TableRecord,
  UserRecord,
  MessageRecord,
  ContactRecord,
  JobRecord,
  ClassRecord,
  ClassEventRecord,
  PDFRecord,
  VideoRecord,
} from './interface';
import { Map } from './schema';

export const UserMock: UserRecord = {
  rid: '',
  uname: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  cohort: '',
  cohortName: '',
  location: '',
  graduated: false,
  admin: false,
};

const ContactMock: ContactRecord = {
  rid: '',
  name: '',
  imageRef: [],
  role: '',
  phone: '',
};

const MessagesMock: MessageRecord = {
  rid: '',
  body: '',
  date: '',
  subject: '',
  isEvent: false,
  sender: ContactMock,
  senderRef: '',
  eventDate: '',
  eventTime: '',
  eventAddress: '',
  eventCity: '',
  eventState: '',
  eventZipcode: '',
};

const JobsMock: JobRecord = {
  rid: '',
  storeName: '',
  jobName: '',
  jobDescription: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  hours: '',
  schedule: [],
  timeOfDay: [],
  filled: false,
  users: [],
};

const ClassMock: ClassRecord = {
  rid: '',
  name: '',
  address: '',
  startDate: '',
  endDate: '',
  classStartTime: '',
  classEndTime: '',
  classEventRefs: [],
  classEvents: [],
};

const ClassEventMock: ClassEventRecord = {
  rid: '',
  eventType: '',
  date: '',
  startTime: '',
  endTime: '',
};

const PDFMock: PDFRecord = {
  rid: '',
  name: '',
  type: '',
  file: [],
  filename: '',
  url: '',
  answerKey: '',
};

const VideoMock: VideoRecord = {
  rid: '',
  name: '',
  link: '',
  description: '',
};

const mocks: Map<TableRecord> = {
  User: UserMock,
  Messages: MessagesMock,
  POC: ContactMock,
  Jobs: JobsMock,
  Classes: ClassMock,
  ClassEvents: ClassEventMock,
  PDFs: PDFMock,
  Videos: VideoMock,
};

export function getMock<T extends TableRecord>(key: string): T {
  return mocks[key] as T;
}
