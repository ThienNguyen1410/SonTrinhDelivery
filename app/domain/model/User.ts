export class User {
  name: string;
  uid: string;
  phone: number;
  date: any;
  photoUrl?: string;

  constructor(
    name: string,
    uid: string,
    phone: number,
    date: any,
    photoUrl: string,
  ) {
    this.name = name;
    this.uid = uid;
    this.phone = phone;
    this.date = date;
    this.photoUrl = photoUrl;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setPhone(phone: number) {
    this.phone = phone;
  }

  public getPhone(): number {
    return this.phone;
  }

  public setDate(date: any) {
    this.date = date;
  }

  public getDate(): string {
    return this.date;
  }

  public setPhotoUrl(photoUrl: string) {
    this.photoUrl = photoUrl;
  }

  public getPhotoUrl(): string {
    return this.photoUrl as string;
  }
}
