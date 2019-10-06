import { Action } from "@ngrx/store";
import { Product } from "../product";

//import { <name> } this is the export class, interface, etc name.
//import * as fromProduct from "../product"
//if you do import * as fromProduct with '*' you can retrieve anything
//and do fromProduct.<name>  of export. That's if you want multiple things
//from that file

export enum ProductActionTypes { //this is the default
  ToggleProductCode = "[Product] Toggle Product Code",
  SetCurrentProduct = "[Product] Set Current Product",
  ClearCurrentProduct = "[Product] Clear Current Product",
  InitializeCurrentProduct = "[Product] Initialize Current Product",
  Load = "[Product] Load",
  LoadSuccess = "[Product] Load Success",
  LoadFail = "[Product] Load Fail",
  UpdateProduct = "[Product] Update Product",
  UpdateProductSuccess = "[Product] Update Product Success",
  UpdateProductFail = "[Product] Update Product Fail "
}

//action creator
//this gets called right before the reducer is called
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode; //"[Product] Toggle Product Code",
  //typescript provides "payload" variable with public constructor
  //payload: boolean;

  constructor(public payload: boolean) {
    this.log();
  }

  log() {
    console.log("action called");
  }
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
  //typescript provides default constructor for us
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

//has no payload because it has no data
export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;

  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;

  constructor(public payload: string) {}
}

//we do a union of these classes, into a union type
export type ProductActions =  //this is type
  | ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFail;
