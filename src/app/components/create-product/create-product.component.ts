import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ProductsService} from '../../services/products.service'
import {ModalService} from '../../services/modal.service'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {
  }


  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  ngOnInit(): void {
  }

  submit() {
    this.productService.create({
      title: this.form.value.title as string,
      price: this.form.value.price as number,
      description: this.form.value.description as string,
      // image: this.form.value.title as string,
      category: this.form.value.category as string,
      rating: this.form.value.rating as number,
    }).subscribe(() => {
      this.modalService.close()
    })
  }

}
