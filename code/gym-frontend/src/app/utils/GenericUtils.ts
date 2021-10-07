export function enumToArrayOfValues(e: any): any[] {
  return Object.values(e);
}

export enum CRUDAction {
  CREATE,
  UPDATE,
  DELETE,
}
