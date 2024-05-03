export function unformatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/(?!^\+)\D/g, '');
}
