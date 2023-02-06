import db from "quick.db";

export async function getCacheField(
  keyName: string,
  field1: string,
  field2: string
) {
  return (await db.get(`${keyName}_${field1}_${field2}`)) || null;
}

export async function setCacheField(
  keyName: string,
  field1: string,
  field2: string,
  data: any
) {
  return await db.set(`${keyName}_${field1}_${field2}`, data);
}

export function deleteCacheField(
  keyName: string,
  field1: string,
  field2: string
) {
  return db.delete(`${keyName}_${field1}_${field2}`);
}
