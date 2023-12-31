export enum Role {
  Admin = "Admin",
  Analyst = "Analyst",
  Auditor = "Auditor",
  Requester = "Requester",
  StoreKeeper = "StoreKeeper",
  Manager = "Manager",
}

export enum Status {
  Waiting = "Waiting",//laranja
  Separation = "Separation",//amarelo
  InProgress = "InProgress",//azul
  Concluded = "Concluded",//verde
}

export enum OrderStatus {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
}

const { Admin, Analyst, Auditor, Requester, StoreKeeper, Manager } = Role;
const { Waiting, Separation, InProgress, Concluded } = Status;
const { Approved, Rejected, Pending } = OrderStatus;

export {
  Admin,
  Analyst,
  Auditor,
  Requester,
  StoreKeeper,
  Manager,
  Waiting,
  Separation,
  InProgress,
  Concluded,
  Approved,
  Rejected,
  Pending,
};
