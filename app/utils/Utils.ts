export function isValidPhoneNumber(phone: string): boolean {
  var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regex.test(phone);
}

export function isFieldEmpty(name: string) {
  return typeof name === 'string' && name.trim().length == 0;
}
