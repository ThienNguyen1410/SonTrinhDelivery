export interface DriverRepository {
  getDriverGeneralInfo(uid: string): Promise<any>;
}
