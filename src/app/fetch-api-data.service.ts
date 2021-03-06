import { Injectable } from '@angular/core';

// HttpClient returns an observable
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// declaring api url that will provide data to the app
const apiUrl = 'https://myflixdb2000.herokuapp.com/';

// available everywhere in the app
@Injectable({
  providedIn: 'root'
})

/**
 * API endpoints for MyFlix movies and user data
 */
export class FetchApiDataService {

    /**
   * Inject the HttpClient module to the constructor params
   * Provides HttpClient to the entire class, making it available via this.http
   * @param http
   */
  constructor(private http: HttpClient) { }

  /* ----- USER ENDPOINTS, REGISTRATION, LOGIN ----- */

  /**
   * Making the api call for the user registration endpoint
   * @param userDetails 
   * @returns url with userDetails object
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * User Login, passing details to query params in the URL
   * @param userDetails 
   * @returns url with username and password
   */
  public userLogin(userDetails: any): Observable<any> {
    const params = new HttpParams()
      .set('Username', userDetails.Username)
      .set('Password', userDetails.Password); 
    const body = JSON.stringify(userDetails);

    return this.http.post(apiUrl + 'login', body, { 'params': params } ).pipe(
    catchError(this.handleError)
    );
  }

  /* ----- MOVIES ENDPOINTS, ALL MOVIES, ONE MOVIE, DIRECTOR, GENRE ----- */

  /**
   * Get All Movies passing token in header
   * @returns url to get movie data
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get One Movie with token in header
   * @returns data on movie by title with url
   */
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get Director data with token in header
   * @returns data on director by name with url
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Get Genre data with token in header
   * @returns data on genre by name with url
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/:Genre', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /* ------ GET USER DATA, UPDATE USER, ADD/REMOVE FAVORITE MOVIES ------*/


  /**
   * Get User object from API with token in header
   * @returns user data object with url
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Update User data with token in header
   * @param userDetails 
   * @returns url to update user data
   */
    updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete User with token in header
   * @returns url to delete user by username
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Add movie to favorites
   * @param id Movie id
   * @returns url to post movie id to users favorites
   */
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/Movies/${id}`, id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete movie from favorites
   * @param id movie id
   * @returns url with username and movie id
   */
  removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/Movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Non-typed response extraction
   * @param res 
   * @returns 
   */
  private extractResponseData(res: Response | Object ): any {
    const body = res;
    return body || {};
  }

  /**
   * handleError function, returns messages in console 
   * @param error 
   * @returns throwerror
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Status Text: ${error.statusText}`);
    }
    return throwError(error.message);
  }

}
