import { FindParameters, GetParameters, UpdateParameters } from './requests';
import { getMock } from './mocks';

/* Airtable Wrappers */
// Fetch - returns an array of record objects.
export async function fetch<T>(params: GetParameters<T>): Promise<T[]> {
  // FOR BWBP
  return [];
}

export async function findRecord<T>(params: FindParameters<T>): Promise<T> {
  const { tableName } = params;
  const record: unknown = getMock(tableName);
  return record as T;
}

export async function updateRecord<T>(params: UpdateParameters<T>): Promise<T> {
  return findRecord<T>(params);
}
