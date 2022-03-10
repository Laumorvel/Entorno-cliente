import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Joke } from '../Interfaces/interfaces';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore, private httpClient: HttpClient) { }

  private urlBase = "https://api.chucknorris.io/jokes/";

     /**
      * Consigue un chiste aleatorio de la api
      * @returns
      */
     getRandomJoke(){
       return this.httpClient.get<Joke>(`${this.urlBase}random`);
     }


     getJokeByCategory(category:string){
      return this.httpClient.get<Joke>(`${this.urlBase}random?category={${category}}`);
     }

     getCategories(){
      return this.httpClient.get<string[]>(`${this.urlBase}categories`);
     }

     getJokesBySearch(search:string){
      const params = new HttpParams()
        .set('query', search)
        .set('limit', 10)

      return this.httpClient.get<string[]>(`${this.urlBase}search`);
     }


  getNote(): Observable<Note[]> {

    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  addFavourite(joke: Joke) {
    const jokeRef = collection(this.firestore, 'jokes');
    return addDoc(jokeRef, joke);
  }

  deleteJoke(joke: Joke) {
    const jokeRef = doc(this.firestore, `jokes/${joke.id}`);
    return deleteDoc(jokeRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, { title: note.title, text: note.text });
  }
}
