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
  Row,
} from './interface';
import { getMock } from './mocks';

type Tables = string & ('User' | 'Messages' | 'POC' | 'Jobs' | 'Classes' | 'ClassEvents' | 'PDFs' | 'Videos');

export type Map<T> = {
  [k: string]: T;
};
type Schema<T> = {
  [key in keyof T]: string;
};

export const Tables: Map<Tables> = {
  User: 'User',
  Messages: 'Messages',
  POC: 'POC',
  Jobs: 'Jobs',
  Classes: 'Classes',
  ClassEvents: 'ClassEvents',
  PDFs: 'PDFs',
  Videos: 'Videos',
};

const UserSchema: Schema<UserRecord> = {
  rid: 'id',
  uname: 'uname',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  cohort: 'cohort',
  cohortName: 'cohortName',
  location: 'location',
  graduated: 'graduated',
  admin: 'admin',
};

export const MessageSchema: Schema<MessageRecord> = {
  rid: 'id',
  body: 'body',
  date: 'timePostedFormatted',
  subject: 'subject',
  isEvent: 'isEvent',
  senderRef: 'sender',
  eventDate: 'eventDateFormatted',
  eventTime: 'eventTimeFormatted',
  eventAddress: 'eventAddress',
  eventCity: 'eventCity',
  eventState: 'eventState',
  eventZipcode: 'eventZipcode',
};

const ContactSchema: Schema<ContactRecord> = {
  rid: 'id',
  name: 'name',
  imageRef: 'image',
  role: 'role',
  phone: 'phone',
};

const JobSchema: Schema<JobRecord> = {
  rid: 'id',
  storeName: 'storeName',
  jobName: 'jobName',
  jobDescription: 'jobDescription',
  address: 'address',
  city: 'city',
  state: 'state',
  zipcode: 'zipcode',
  hours: 'hours',
  schedule: 'schedule',
  timeOfDay: 'timeOfDay',
  filled: 'filled',
  users: 'users',
};

const ClassSchema: Schema<ClassRecord> = {
  rid: 'id',
  name: 'cohortFormatted',
  address: 'address',
  startDate: 'startDateFormatted',
  endDate: 'endDateFormatted',
  classStartTime: 'startTime',
  classEndTime: 'endTime',
  classEventRefs: 'classEvents',
};

const ClassEventSchema: Schema<ClassEventRecord> = {
  rid: 'id',
  eventType: 'eventType',
  date: 'dateFormatted',
  startTime: 'startTime',
  endTime: 'endTime',
};

const PDFSchema: Schema<PDFRecord> = {
  rid: 'id',
  file: 'file',
  type: 'type',
  name: 'name',
  answerKey: 'answerKey',
};

const VideoSchema: Schema<VideoRecord> = {
  rid: 'id',
  name: 'name',
  link: 'link',
  description: 'description',
};

const schemas: Map<Schema<TableRecord>> = {
  User: UserSchema,
  Messages: MessageSchema,
  POC: ContactSchema,
  Jobs: JobSchema,
  Classes: ClassSchema,
  ClassEvents: ClassEventSchema,
  PDFs: PDFSchema,
  Videos: VideoSchema,
};

export function getSchema<T extends TableRecord>(key: string): Schema<T> {
  return schemas[key] as Schema<T>;
}

export function getField(row: Row, field: string): unknown {
  // return default value if field not found
  return field === 'rid' ? row.getId() : row.get(field);
}

function transformRecord<T extends TableRecord>(row: Row, mockRecord: T, schema: Schema<T>): T {
  // need to test actual functionality of mock
  const tRecord = { ...mockRecord };
  Object.keys(schema).forEach(key => {
    const k = key as keyof T;
    const value = getField(row, schema[k]) as T[keyof T]; //if cell is empty -> return undefined
    if (typeof value !== 'undefined') tRecord[k] = value;
  });
  tRecord.rid = row.getId();
  return tRecord;
}

function formatRecord<T extends TableRecord>(row: Row, table: string): T {
  const schema: Schema<T> = getSchema<T>(table);
  const mock: T = getMock(table);

  return transformRecord(row, mock, schema);
}

export function formatUser(row: Row): UserRecord {
  return formatRecord<UserRecord>(row, Tables.User);
}

export function formatMessage(row: Row): MessageRecord {
  return formatRecord<MessageRecord>(row, Tables.Messages);
}

export function formatContact(row: Row): ContactRecord {
  return formatRecord<ContactRecord>(row, Tables.POC);
}

export function formatJob(row: Row): JobRecord {
  return formatRecord<JobRecord>(row, Tables.Jobs);
}

export function formatClass(row: Row): ClassRecord {
  return formatRecord<ClassRecord>(row, Tables.Classes);
}

export function formatClassEvent(row: Row): ClassEventRecord {
  return formatRecord<ClassEventRecord>(row, Tables.ClassEvents);
}

export function formatPDF(row: Row): PDFRecord {
  return formatRecord<PDFRecord>(row, Tables.PDFs);
}

export function formatVideo(row: Row): VideoRecord {
  return formatRecord<VideoRecord>(row, Tables.Videos);
}

export function formatPOC(row: Row): ContactRecord {
  const poc = formatRecord<ContactRecord>(row, Tables.POC);
  poc.image = typeof poc.imageRef[0].thumbnails != 'undefined' ? poc.imageRef[0].thumbnails.large.url : '';
  return poc;
}
