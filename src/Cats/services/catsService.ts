import { taskEither } from 'fp-ts';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/function';
import { failure, RemoteData, success } from '@devexperts/remote-data-ts';

const BASE_URL = 'https://api.thecatapi.com';
const MY_API_KEY = import.meta.env.VITE_CATS_API_KEY as string;

export interface Cat {
  breeds: string[];
  categories: {
    id: number;
    name: string;
  }[];
  id: string;
  url: string;
}


const fetchCats: taskEither.TaskEither<Error, Cat[]> = taskEither.tryCatch(
  () =>
    fetch(`${BASE_URL}/v1/images/search?limit=6&category_ids=1`, {
      headers: { 'x-api-key': MY_API_KEY },
    }).then(res => res.json()),
  reason => new Error(String(reason))
);

export const getCats = pipe(
  fetchCats,
  TE.fold<Error, Cat[], RemoteData<Error, Cat[]>>(
    err => T.of(failure(err)),
    cats => T.of(success(cats))
  )
);
