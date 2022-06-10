import { BehaviorSubject } from 'rxjs';

/**
 * @type {Subject<import('@snippyly/types').Snippyly>}
 */
const subject = new BehaviorSubject(null);

export const SnippylyClient = {
  setClient: (client) => subject.next(client),
  getClient: () => subject.asObservable()
};
