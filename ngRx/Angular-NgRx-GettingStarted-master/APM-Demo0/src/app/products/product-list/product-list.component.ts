import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription, Observable } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store, select } from "@ngrx/store";

import * as fromProduct from "../state/product.reducer";
import * as productActions from "../state/product.actions";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  componentActive: boolean = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromProduct.State>, //type global state
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => (this.selectedProduct = selectedProduct)
    // );
    //replace above with the following
    this.store
      .pipe(select(fromProduct.getCurrentProduct))
      .subscribe(currentProduct => {
        console.log('ngOnInit getCurrentProduct in list-store')
        console.log(currentProduct);
        (this.selectedProduct = currentProduct)
      });

    //changing this for effects
    // this.productService
    //   .getProducts()
    //   .subscribe(
    //     (products: Product[]) => (this.products = products),
    //     (err: any) => (this.errorMessage = err.error)
    //   );
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new productActions.Load());
    this.store
      .pipe(
        select(fromProduct.getProducts),
        takeWhile(() => this.componentActive)//unsubscribe
      )
      .subscribe((products: Product[]) => {
        console.log('ngOnInit getProducts in list-store')
        console.log(products);
        (this.products = products)
      });

    //or with async pipe
    //I think products$ is the async pipe in the html
    //this.products$ = this.store.pipe(select(fromProduct.getProducts));

    //Since we have exported and createded new selectors we can
    //write this method differently
    // TODO: Unsubscribe
    // this.store.pipe(select("products")).subscribe(products => {
    //   //we don't need this anymore because we set a default value for
    //   //our state. Hence it will never be undefined. It will be defined
    //   //by our defaults. And it makes the code look nicer
    //   //if (products) this.displayCode = products.showProductCode;
    //   this.displayCode = products.showProductCode;
    // });

    //like this
    this.store
      .pipe(select(fromProduct.getShowProductCode)) //getting selector (strip)
      //i think when we subscribe is when we call our reducer
      .subscribe(showProductCode => {
        console.log("ngOnInit getShowProductCode in list-store");
        console.log(showProductCode);
        this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;

    //doing the action dispacth to call our reducer
    //and tell it that we have a change
    //when the action is dispatch, this is then processed by the reducer
    //as of now we can't get any type of errors (i.e. type, spelling, etc) (there is no type)
    // this.store.dispatch({
    //   type: "TOGGLE_PRODUCT_CODE",
    //   payload: value
    // }); //this creates an object

    //or you can create an object here too but with a class
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    //this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
