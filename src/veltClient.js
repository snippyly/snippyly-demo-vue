import { BehaviorSubject } from 'rxjs';

/**
 * @type {Subject<import('@veltdev/types').Velt>}
 */
const subject = new BehaviorSubject(null);

export const VeltClient = {
  setClient: (client) => subject.next(client),
  getClient: () => subject.asObservable()
};
