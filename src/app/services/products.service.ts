import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http'
import {catchError, delay, Observable, retry, tap, throwError} from 'rxjs'
import {IProduct} from '../models/product'
import {ErrorService} from './error.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  products: IProduct[] = []

  getAll(): Observable<IProduct[]> {
    return this.http.get<[IProduct]>('http://localhost:3000/product', {
      params: new HttpParams({
        // fromObject: {limit: 5}
      })
    }).pipe(
      delay(200),
      retry(2),
      // @ts-ignore
      tap(products =>  this.products = products.productData ),
      catchError(this.errorHandler.bind(this))
    )
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:3000/product', product)
      .pipe(
        // @ts-ignore
        tap(prod => this.products.push(prod.newProduct))
      )
  }

  delete(id: string): void {
    this.http.delete(`http://localhost:3000/product/${id}`)
    .subscribe({
      next: data => {
        this.products = this.products.filter(p => p._id !== id)
      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
