import * as Airtable from 'airtable';

import {
  MessageRecord,
  UserRecord,
  ContactRecord,
  JobRecord,
  ClassRecord,
  ClassEventRecord,
  PDFRecord,
  VideoRecord,
} from './interface';

import { fetch, findRecord, updateRecord } from './fetch';
import { getStoredUser } from './cache';
export { storeUser } from './cache';
import {
  Tables,
  formatUser,
  formatMessage,
  formatContact,
  formatJob,
  formatClass,
  formatClassEvent,
  formatPDF,
  formatPOC,
  formatVideo,
} from './schema';

import { Row } from './interface';
import axios from 'axios';

/* Messages */

interface Table<T> {
  tableName: string;
  format: (row: Row) => T;
}

export interface FindParameters<T> extends Table<T> {
  filters?: Airtable.SelectOptions;
  recordId: string;
}

export interface GetParameters<T> extends Table<T> {
  filters: Airtable.SelectOptions;
  linkfn?: (record: T) => Promise<T>;
}

export interface UpdateParameters<T> extends Table<T> {
  recordId: string;
  updateFields: (record: T) => {};
}

export async function findContact(senderRef: string): Promise<ContactRecord> {
  const params: FindParameters<ContactRecord> = {
    tableName: Tables.POC,
    recordId: senderRef,
    format: formatContact,
    filters: {
      view: 'main',
    },
  };

  const contact = await findRecord<ContactRecord>(params);
  const imageRef = contact.imageRef;
  const thumbnail = imageRef.length > 0 ? imageRef[0].thumbnails : undefined;
  const image = typeof thumbnail != 'undefined' ? thumbnail.full.url : '';
  return { ...contact, image };
}

export async function getUser(user: UserRecord, cached = false): Promise<UserRecord | null> {
  console.log('Fetching user');

  // FOR BWBP
  // NOTE: Please do not alter anything here or you may be disqualified.
  const testUser: UserRecord = {
    admin: false,
    cohort: 'recJUdvrGp9a6SXKG',
    cohortName: 'jan2020_oak',
    firstName: 'Jen',
    lastName: 'Hoang',
    location: 'Seattle',
    password: 'coldbrew02',
    phone: '',
    rid: 'recKoO9X3HKXFXh6B',
    uname: 'jenhoang',
    graduated: true,
  };

  return testUser;

  // FOR THOSE WHO ARE INTERESTED IN HOW IT'S ACTUALLY IMPLEMENTED
  if (cached) {
    return getStoredUser();
  }

  const params: GetParameters<UserRecord> = {
    tableName: Tables.User,
    format: formatUser,
    filters: {
      view: 'main',
      maxRecords: 1,
      filterByFormula: `AND(uname = '${user.uname}', password = '${user.password}')`,
    },
  };

  const users = await fetch<UserRecord>(params);
  return users.length > 0 ? users[0] : null;
}

export async function getMessages(user: UserRecord): Promise<MessageRecord[]> {
  if (!user.cohortName) {
    return [];
  }

  const formula = !user.admin ? `(FIND("${user.cohortName}", recipients) > 0)` : '';
  const filters: Airtable.SelectOptions = {
    view: 'main',
    filterByFormula: formula,
    sort: [
      {
        field: 'timePosted',
        direction: 'desc',
      },
    ],
  };

  const params: GetParameters<MessageRecord> = {
    tableName: Tables.Messages,
    format: formatMessage,
    filters,
    linkfn: async (record: MessageRecord) => {
      const sender = await findContact(record.senderRef);
      return { ...record, sender };
    },
  };

  const messages = await fetch<MessageRecord>(params);
  return messages;
}

export function getJobs(): JobRecord[] {
  // FOR BWBP
  // NOTE: Please do not alter anything here or you may be disqualified.
  const jobs: JobRecord[] = [
    {
      address: 'College Ave',
      city: 'San Francisco',
      filled: false,
      hours: '15',
      jobDescription: 'Visit https://sightglasscoffee.com/ for more info.',
      jobName: 'Barista',
      rid: 'recoKaTzmKjY7ikol',
      schedule: ['Monday', 'Wednesday'],
      state: 'CA',
      storeName: 'Sightglass Coffee',
      timeOfDay: ['Afternoon', 'Evening'],
      users: ['recyT2W7MOQFSzACj', 'recY21K9DWYhhBIT3', 'recyTo1uAWZoHqc85'],
      zipcode: '94869',
    },
    {
      address: 'College Ave',
      city: 'Oakland',
      filled: false,
      hours: '24',
      jobDescription: 'Barista position at the Rockridge Market',
      jobName: 'Barista',
      rid: 'rec4wFo8fcllSNzcd',
      schedule: ['Monday', 'Wednesday', 'Friday'],
      state: 'CA',
      storeName: 'Highwire Coffee Company',
      timeOfDay: ['Morning', 'Afternoon'],
      users: ['recY21K9DWYhhBIT3'],
      zipcode: '94869',
    },
    {
      address: 'College Ave',
      city: 'Oakland',
      filled: false,
      hours: '15',
      jobDescription: 'Barista position at Blue Bottle Coffee',
      jobName: 'Barista ',
      rid: 'recQJ190y5Pk4bqu2',
      schedule: ['Tuesday', 'Thursday'],
      state: 'CA',
      storeName: 'Blue Bottle Coffee',
      timeOfDay: ['Morning', 'Afternoon'],
      users: ['recY21K9DWYhhBIT3', 'recKoO9X3HKXFXh6B'],
      zipcode: '94869',
    },
    {
      address: 'College Ave',
      city: 'San Francisco',
      filled: false,
      hours: '8',
      jobDescription: 'Barista position at Highwire Coffee Company',
      jobName: 'Barista',
      rid: 'recNgeUMcYhWUxw8b',
      schedule: ['Thursday'],
      state: 'CA',
      storeName: 'Highwire Coffee Company',
      timeOfDay: ['Morning', 'Afternoon'],
      users: [],
      zipcode: '94869',
    },
    {
      address: 'Joshua Ave',
      city: 'San Jose',
      filled: false,
      hours: '40',
      jobDescription: 'Barista position at Starbucks',
      jobName: 'Barista',
      rid: 'recNgeUMcYhWUxw8b',
      schedule: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      state: 'CA',
      storeName: 'Starbucks Coffee',
      timeOfDay: ['Morning', 'Afternoon'],
      users: [],
      zipcode: '94269',
    },
  ];
  return jobs;

  // FOR THOSE WHO ARE INTERESTED IN HOW IT'S ACTUALLY IMPLEMENTED
  const params: GetParameters<JobRecord> = {
    tableName: Tables.Jobs,
    format: formatJob,
    filters: {
      view: 'main',
      sort: [
        {
          field: 'timePosted',
          direction: 'desc',
        },
      ],
    },
  };

  return fetch<JobRecord>(params);
}

export async function findClassEvent(classEventRef: string): Promise<ClassEventRecord> {
  const params: FindParameters<ClassEventRecord> = {
    tableName: Tables.ClassEvents,
    recordId: classEventRef,
    format: formatClassEvent,
    filters: {
      view: 'main',
      sort: [
        {
          field: 'date',
          direction: 'asc',
        },
      ],
    },
  };

  return await findRecord<ClassEventRecord>(params);
}

export async function getClasses(): Promise<ClassRecord[]> {
  const params: GetParameters<ClassRecord> = {
    tableName: Tables.Classes,
    format: formatClass,
    filters: {
      view: 'main',
      sort: [{ field: 'startDate', direction: 'desc' }],
    },
    linkfn: async (record: ClassRecord) => {
      const promises = record.classEventRefs.map(async ref => await findClassEvent(ref));
      const classEvents = await Promise.all(promises);
      return { ...record, classEvents };
    },
  };

  return fetch<ClassRecord>(params);
}

export async function updateJob(ridJob: string, user: UserRecord): Promise<JobRecord> {
  const params: UpdateParameters<JobRecord> = {
    tableName: Tables.Jobs,
    recordId: ridJob,
    format: formatJob,
    updateFields: job => {
      job.users = job.users.filter(u => u != user.rid);
      job.users.push(user.rid);
      return { users: job.users };
    },
  };
  return updateRecord<JobRecord>(params);
}

type PDF = 'Brew Guide' | 'Worksheet' | 'Interview Guide';
async function getPDFs(type: PDF): Promise<PDFRecord[]> {
  const params: GetParameters<PDFRecord> = {
    tableName: Tables.PDFs,
    format: formatPDF,
    filters: {
      view: 'main',
    },
  };
  let records = await fetch<PDFRecord>(params);
  if (records.length <= 0) return [];
  records = records
    .filter(record => record.type === type)
    .map(record => {
      const file = record.file.length > 0 ? record.file[0] : null;
      const filename = file ? file.filename.replace(/ /g, '') : '';
      const url = file ? file.url : '';
      const answerKeyFile = record.answerKey.length > 0 ? record.answerKey[0] : null;
      const answerKey = answerKeyFile ? answerKeyFile.url : '';
      return { ...record, filename, url, answerKey };
    });

  return records;
}

export async function getBrewGuide(): Promise<PDFRecord[]> {
  return getPDFs('Brew Guide');
}

export async function getWorksheets(): Promise<PDFRecord[]> {
  return getPDFs('Worksheet');
}

export async function getInterviewGuide(): Promise<PDFRecord[]> {
  return getPDFs('Interview Guide');
}

export async function getVideos(): Promise<VideoRecord[]> {
  async function getThumbnail(url: string): Promise<string> {
    const metadataUrl = `http://www.youtube.com/oembed?url=${url}&format=json`;
    const response = await axios.get(metadataUrl);
    const data = response.data;
    return data.thumbnail_url;
  }

  const params: GetParameters<VideoRecord> = {
    tableName: Tables.Videos,
    format: formatVideo,
    filters: {
      view: 'main',
    },
  };
  const videos = await fetch<VideoRecord>(params);
  const promises = await videos.map(async video => {
    video.thumbnailUrl = await getThumbnail(video.link);
    return video;
  });
  return Promise.all(promises);
}

// POCs - future task to refactor POC data
type ContactGroup = {
  [key: string]: ContactRecord[];
};

function groupPOCsByRole(records: ContactRecord[]): ContactGroup {
  const groups: ContactGroup = {};
  records.forEach(rec => {
    if (rec.role in groups) groups[rec.role].push(rec);
    else groups[rec.role] = [rec];
  });
  return groups;
}

export async function getContacts(): Promise<ContactGroup> {
  const params: GetParameters<ContactRecord> = {
    tableName: Tables.POC,
    format: formatPOC,
    filters: {
      view: 'main',
    },
  };
  const records = await fetch<ContactRecord>(params);
  return groupPOCsByRole(records);
}
