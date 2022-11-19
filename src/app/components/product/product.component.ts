import {Component, Input} from '@angular/core'
import { ProductsService } from 'src/app/services/products.service'
import {IProduct} from '../../models/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  constructor(
    public productsService: ProductsService,
  ){}
  @Input()
  product!: IProduct
  deleteProduct(_id: string) {
    console.log('deleteProduct', _id)
    this.productsService.delete(_id)
  }
  details = false
}
