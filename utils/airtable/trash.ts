// things to work on LMAO sorry
export async function getStoredUser(): Promise<Interface.UserRecord> {
  const promise = await AsyncStorage.getItem('user');
  return JSON.parse(promise);
}

export async function storeUser(user: Interface.UserRecord): Promise<void> {
  try {
    user.password = '';
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.log('Login: Could not save login');
  }
}

/* POC Data */
function getPOC(record: any): Interface.POC {
  return {
    name: record.get('name') || '',
    image: record.get('image')[0].thumbnails.full.url || '',
    role: record.get('role') || '',
    phone: record.get('phone') || '',
  };
}

// Potential Refactor
function groupPOCsByRole(recordObjects) {
  const groups = {};
  recordObjects.forEach(recordObject => {
    if (!(recordObject.role in groups)) {
      groups[recordObject.role] = [recordObject];
    } else {
      groups[recordObject.role].push(recordObject);
    }
  });
  return groups;
}

// Potential Refactor
export async function fetchPOCs() {
  // const recordObjects = await fetch('POC', getPOC);
  // return groupPOCsByRole(recordObjects);
}

/* Messages */
const getMessage = async (record: any): Promise<Interface.MessageRecord> => {
  const recordData: Interface.MessageRecord = {
    ...getMessageData(record),
    ...getInterface(record),
    ...getEventDetails(record),
  };
  recordData.sender = await fetchMessagePOC(recordData.senderRef);
  return recordData;
};

const getMessageData = (record): Interface.Message => {
  const messageData: Interface.Message = {
    body: record.get('body') || '',
    date: record.get('timePostedFormatted') || '',
    subject: record.get('subject') || '',
    users: record.get('users') || '',
  };
  return messageData;
};

const fetchMessagePOC = (recordId: string): Interface.POC => {
  return findRecord('POC', recordId, getPOC);
};

const getInterface = (record): Interface.Metadata => {
  const metadata: Interface.Metadata = {
    rid: record.id,
    isEvent: record.get('isEvent') || false,
    isRead: false,
    send: record.get('send') || true,
    senderRef: record.get('sender') || '',
  };
  return metadata;
};

const getEventDetails = (record): Interface.EventDetails => {
  const eventDetails: Interface.EventDetails = {
    eventDate: record.get('eventDateFormatted') || '',
    eventTime: record.get('eventTimeFormatted') || '',
    eventAddress: record.get('eventAddress') || '',
    eventCity: record.get('eventCity') || '',
    eventState: record.get('eventState') || '',
    eventZipcode: record.get('eventZipcode') || '',
  };
  return eventDetails;
};

export const getMessages async (user: any): Promise<Interface.Message[]> => {
  const queryParams = {
    view: 'main',
    filterByFormula: `(FIND("${user.cohortName}", recipients) > 0)`,
  };
  const messages: Interface.Message[] = await fetch('Messages', getMessage, queryParams);
  return Promise.all(messages);
};

/* Jobs */
const getJob = (record: any): Interface.JobRecord => {
  return {
    rid: record.getId(),
    storeName: record.get('storeName') || '',
    jobName: record.get('jobName') || '',
    jobDescription: record.get('jobDescription') || '',
    address: record.get('address') || '',
    city: record.get('city') || '',
    state: record.get('state') || '',
    zipcode: record.get('zipcode') || '',
    hours: record.get('hours') || '',
    schedule: record.get('schedule') || [],
    timeOfDay: record.get('timeOfDay') || [],
    filled: record.get('filled') || false,
    users: record.get('users') || [],
  };
};

export function getJobs: Promise<Interface.JobRecord[]> {
  return fetch('Jobs', getJob);
}

export const updateJob = async (user: Interface.UserRecord, job: Interface.JobRecord): Promise<void> => {
  const currJob = await findRecord('Jobs', job.rid, getJob);
  let { users } = currJob;
  users = users.filter(currUser => currUser.rid != user.rid);
  users.push(user.rid);
  const updatedFields = { users };
  updateRecord('Jobs', job.rid, updatedFields);
};

/* Classes */
const getClassEvent = (record: any): Interface.ClassEvent => {
  const classEvent: Interface.ClassEvent = {
    eventType: record.get('eventType') || '',
    date: record.get('dateFormatted') || '',
    startTime: record.get('startTime') || '',
    endTime: record.get('endTime') || '',
  };
  return classEvent;
};

function fetchClassEvent(recordId: string): Promise<Interface.ClassEvent> {
  return findRecord('ClassEvents', recordId, getClassEvent);
}

const getClass = async (record: any): Promise<Interface.ClassRecord> => {
  const classData: Interface.ClassRecord = {
    rid: record.id,
    name: record.get('cohortFormatted') || '',
    address: record.get('address') || '',
    startDate: record.get('startDateFormatted') || '',
    endDate: record.get('endDateFormatted') || '',
    classStartTime: record.get('startTime'),
    classEndTime: record.get('endTime'),
    classEventRefs: record.get('classEvents') || [],
  };
  classData.classEvents = await Promise.all(classData.classEventRefs.map(fetchClassEvent));
  return classData;
};

export async function getClasses: Promise<Interface.ClassRecord[]> {
  const classes: Interface.ClassRecord[] = await fetch('Classes', getClass);
  return Promise.all(classes);
}

/* Brew Guide */
function getBrewGuide(record: any): Interface.BrewGuide {
  return {
    filename: record.get('file')[0].filename.replace(/ /g, '') || '',
    url: record.get('file')[0].url || '',
  };
}

export async function getBrewGuide: Promise<Interface.BrewGuide> {
  const recordObjects: Interface.BrewGuide[] = await fetch('BrewGuide', getBrewGuide);
  return recordObjects[0];
}
