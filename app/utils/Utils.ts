export function isValidPhoneNumber(phone: string): boolean {
  var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regex.test(phone);
}

export function isFieldEmpty(name: string) {
  return typeof name === 'string' && name.trim().length == 0;
}

export function formatUri(uri?: String) {
  return uri?.replace('file://', '');
}

export function getCurrentDate(): string {
  const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
  const options: Intl.DateTimeFormatOptions = {
    timeZone: vietnamTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const date = new Date().toLocaleString('en-US', options);
  return date;
}

export function getCurrentTime(): string {
  const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
  const options: Intl.DateTimeFormatOptions = {
    timeZone: vietnamTimeZone,
    hour: '2-digit',
    minute: '2-digit',
  };

  const time = new Date().toLocaleString('en-US', options);
  return time;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
