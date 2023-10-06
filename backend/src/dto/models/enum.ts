import {Role, Status} from '@prisma/client';

const { Admin, Analyst, Auditor, Requester, StoreKeeper } = Role;
const { Waiting, Separation, InProgress, Concluded } = Status;

export {Admin, Analyst, Auditor, Requester, StoreKeeper, Waiting, Separation, InProgress, Concluded}