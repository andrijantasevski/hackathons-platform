export type EventTypes = {
  name: string;
  email: string;
  phoneNumber: string;
  academy: string;
  group: string;
  availability: AvailabilityEnum;
  presence: PresenceEnum;
};

export enum AvailabilityEnum {
  yes = "Yes",
  no = "No",
  other = "Other",
}

export enum PresenceEnum {
  online = "Online",
  inPerson = "In person",
  other = "Other",
}
