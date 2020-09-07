# 1951coffee

_Last Updated 4/29/2020_

## Setup

### Expo Quickstart

We use two airtable bases to differentiate between dev and prod. When you develop locally, Expo automatically switches to the dev airtable. When the app is built and published, we use Expo's [release-channel](https://docs.expo.io/versions/latest/distribution/release-channels) to automatically switch to the production credentials.

1. Clone the repo
2. If you don't have expo installed globally, run `npm i -g expo`.
3. Run `expo install`
4. Place `google-service.json` and `env.ts` in the root folder. Both can be retrieved from Notion.
5. Run `expo start` to test the app using the dev Airtable.

### Setting up push notifications

1. Clone [Branch](https://github.com/averyyip/airtable-expo-push/tree/avery/1951coffee) and place it in your own github repository
2. Go to Heroku and create a new Nodejs app
3. Under `Deploy -> Deployment Method`, click connect to Github and point it to your repo. Your heroku instance will now always be loaded with the code in your repo.
4. Go to `Settings -> Config Vars`. Your credentials and settings can all be placed here.

| Key              | Value Description                                            |
| ---------------- | ------------------------------------------------------------ |
| AIRTABLE_API_KEY | Airtable API Key                                             |
| AIRTABLE_BASE_ID | Airtable Base Id                                             |
| NODE_ENV         | Set value to 'production'                                    |
| SECONDS_INTERVAL | The frequency at which this app will check for new messages. |

### Setting up airtable

If you want to repurpose this app for your own usecase. You can clone the following airtable template and change the API key and base key in the steps above.

- Clone https://airtable.com/shrsHZWBPVjqiNt02

### Linter and Prettier

- [Install vscode extension for eslint and prettier](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)

## Updating app

You can perform an [OTA updates](https://docs.expo.io/versions/latest/guides/configuring-ota-updates/) via `expo publish --release-channel prod`

Not all updates can be submitted via OTA. You can read more about the limitations [here](https://docs.expo.io/workflow/publishing/#limitations).

If you do need to submit a new build to the app store, you will need to perform the following steps.

- Go to `app.json` and make sure to modify/increment `expo.version`, `expo.android.versionCode`, `expo.ios.buildNumber`. These are used to keep track of the app versions submitted to the stores. If a build with the same versionCode or buildNumber exists already, the app store will reject your submission.
- Run `expo push:android:upload --api-key <firebase cloud messaging api key>` to support Android push notifications. More info found [here](https://docs.expo.io/versions/latest/guides/using-fcm/)

## Production Accounts

| Service           | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| Firebase          | Handles expo push notification service for androids        |
| Heroku            | Monitors airtable and sends push requests for new messages |
| Expo              | Expo account for OTA updates                               |
| Android Playstore | Android App store account                                  |
| Apple App store   | iOS App store account                                      |

## Introduction to Airtable API

For the 1951 Dashboard App, we host our data in Airtable, using its internal generated API to read and update records from our base. We use the Airtable.js package to interact directly with the database and generate promises. From there, we typecheck and reformat our records before updating our component state.

### `fetch.js`

`airtable/fetch.js` is responsible primarily for interacting directly with Airtable API calls to list all, retrieve, or update records. We pass in parameters -- `tableName`, `filters`, and a `format` callback.

#### Methods

**`fetch<T>`**
Requests the Airtable base and retrieves all records in a given `tableName` that matches all `filters` critera. Formats data and attaches linked records into a user-defined record type `T`.

```
export async function fetch<T>(params: GetParameters<T>): Promise<T[]> {
  const { tableName, filters, format, linkfn } = params;
  const records: T[] = [];

  await base(tableName)
    .select(filters)
    .eachPage((page, fetchNextPage) => {
      page.forEach(record => {
        const row: unknown = record;
        const formatted = format(row as Row);
        records.push(formatted);
      });
      fetchNextPage();
    });

  if (typeof linkfn != 'undefined') return Promise.all(records.map(linkfn));
  return records;
}
```

**`findRecord<T>`**
Requests the Airtable base and finds a unique record in a given `tableName` that matches `recordId`. Formats data into a user-defined record type `T`. If a record is not found, return a mock record of type `T` instead.

```
export async function findRecord<T>(params: FindParameters<T>): Promise<T> {
  const { tableName, recordId, format } = params;
  const id = typeof recordId != 'undefined' ? recordId : '';

  if (id) {
    const record: unknown = await base(tableName).find(id);
    return format(record as Row);
  } else {
    const record: unknown = getMock(tableName);
    return record as T;
  }
}
```

**`updateRecord<T>`**
Requests the Airtable base and updates a record and its fields in a given `tableName` that matches `recordId`. Updates record according to callback function `updateFields`.

```
export async function updateRecord<T>(params: UpdateParameters<T>): Promise<T> {
  const { tableName, recordId, updateFields } = params;

  const match = await findRecord<T>(params);
  const fields = updateFields(match);
  await base(tableName).update([{ id: recordId, fields }]);
  return findRecord<T>(params);
}
```

#### Parameters (some optional)

**`tableName`** _- string_
the name of the table to fetch records from.

**`filters`** _- Airtable.Select_
an object definining Airtable filters similar to SQL queries, including sort, limit, and where clauses.

**`linkfn`** _- function_
a callback function to handle linked records in Airtable, which are sent back as a reference string `recordId` to the record data. Performs a `find` call and appends to record data.

**`format`** _- function_
a callback function to handle post processing for retrieved records from Airtable. Handles missing or undefined values, and into an object to be passed into our component state.

**`recordId`** _- string_
a string referencing a record in a table. Primarily used for finding linked records from their reference string.

**`updateFields`** _- function_
a callback function that takes in an Airtable record object, modifies its fields, and returns it.

### Schema

`airtable/schema.js` handles creating `schemas` with column names destructured from type `T` and formatting data from Airtable requests into objects to be passed into our component state.

#### Example:

```
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
```

#### Methods

**`getSchema<T>`**
fetches a schema given a `TableName` as `key`

**`getField`**
fetches a `field` given by a schema key from an Airtable Record using `.get()`

**`transformRecord<T>`**
takes in a mock of type `T` with default values and gets its fields via `getField` according to `schema`. If a field value is undefined, we leave the mock value as is.

**`formatRecord<T>`**
function wrapper to fetch `schema`, `mock` and call `transformRecord` with these parameters.

### Mocks

`airtable/mocks` creates mocks. Airtable record data comes in one of three types -- string, booleans, or arrays. Mocks assign default values of `'', false, or []` to column names of record type `T`. Mocks are use primarily in record transformation in `airtable/schema` or as backups for undefined linked records.

#### Example -

```
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
```

### Interface

`airtable/interface.ts` creates and defines record types for each table in Airtable. Note: not all columns in Airtable are used in our interface.

#### Types

**`UserRecord`**
**`ClassRecord`**
**`ClassEventRecord`**
**`JobRecord`**
**`MessageRecord`**
**`ConatactRecord`**
**`VideoRecord`**
**`PDFRecord`**

### Requests

`airtable/requests.ts` is responsible primarily for generating the parameters necessary for a proper `fetch`, `findRecord`, or `updateRecord` call and returns a record object of type `T` to pass into our component state.

This is the highest order function in our backend pipeline.

#### Example

```
export async function getJobs(): Promise<JobRecord[]> {
  const params = {
    ...
  };

  return fetch<JobRecord>(params);
}
```

### Use in Components

To use in components, call the the request promise in an `await` block and update state. Attach this call as a listener to our `navigation` prop.

```
  fetchRecords = async (): Promise<void> => {
  ...
    const messages: MessageRecord[] = await getMessages(this.context.user);
  ...
  }

  componentDidMount(): void {
    this.props.navigation.addListener('focus', this.fetchRecords);
  }
```

### Modifying Airtable

The following are instructions when creating or modifying tables or their columns.

#### New Tables

- Create new record type interface and add to TableRecord type
- Add to table name to Tables type
- Create new schema
- Create new mock
- Create formatter to call `transformRecord<T>`
- Create a new request with correct parameters
- Fetch promise in `componentDidMount` and update state.

#### New or Modified Column Names

- Update schema and mock
- Update record type interface
- Update references in components

## Figma Mock

[![Figma Link](https://i.imgur.com/tZahoff.png)](https://www.figma.com/file/TQwn53VbvnXAnpWlFs8VT6/1951-Coffee?node-id=6678%3A1788)

## Appendix

### Push Notifications

Push notification is hosted as a separate service on heroku. The script checks for new messages every 5 seconds and maintains a history of previously sent messages to prevent duplication.The script can be ran continuously 24/7 on the Heroku free plan which provides 1000 hours of computation per month.

We have moved off of Integromat due to the 1000 actions cap which limits us to checking for new messages once per hour.

### Android Push Notifications

We currently use Firebase Cloud Messaging (FCM) to handle the push notifications to android. `google-services.json` contains the FCM credentials.

### Apple Push Notifications

Credentials are handled by expo.
