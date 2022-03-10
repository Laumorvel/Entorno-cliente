import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Joke } from '../Interfaces/interfaces';
import { Jokes } from '../Interfaces/interface';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore, private httpClient: HttpClient) {}

  private urlBase = 'https://api.chucknorris.io/jokes/';

  /**
   * Consigue un chiste aleatorio de la api
   * @returns
   */
  getRandomJoke() {
    return this.httpClient.get<Joke>(`${this.urlBase}random`);
  }

  getJokeByCategory(category: string) {
    return this.httpClient.get<Joke>(
      `${this.urlBase}random?category={${category}}`
    );
  }

  getSpecificJoke(id: string){
    return this.httpClient.get<Joke>(`${this.urlBase}${id}`);
  }

  getCategories() {
    return this.httpClient.get<string[]>(`${this.urlBase}categories`);
  }

  getJokesBySearch(search: string) {
    const params = new HttpParams().set('query', search).set('limit', 10);

    return this.httpClient.get<Jokes>(`${this.urlBase}search`, {
      params: params,
    });
  }

  getJokes(): Observable<Joke[]> {
    const jokeRef = collection(this.firestore, 'notes');
    return collectionData(jokeRef, { idField: 'id' }) as Observable<Joke[]>;
  }

  getJokeById(id): Observable<Joke> {
    const jokeDocRef = doc(this.firestore, `jokes/${id}`);
    return docData(jokeDocRef, { idField: 'id' }) as Observable<Joke>;
  }

  addFavourite(joke: Joke) {
    const jokeRef = collection(this.firestore, 'jokes');
    return addDoc(jokeRef, joke);
  }

  deleteJoke(joke: Joke) {
    const jokeRef = doc(this.firestore, `jokes/${joke.id}`);
    return deleteDoc(jokeRef);
  }

  updateJoke(joke: Joke) {
    const jokeDocRef = doc(this.firestore, `jokes/${joke.id}`);
    return updateDoc(jokeDocRef, { value: joke.value });
  }

  getFavouriteJokes(): Observable<Joke[]>{
    const jokeRef = collection(this.firestore, 'jokes');
    return collectionData(jokeRef, {idField: 'id'}) as Observable<Joke[]>;
  }

}
