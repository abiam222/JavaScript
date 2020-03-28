export interface IStocks{
  name: String;
  value: Number;//ive seen capital and one capital here
}

export interface IUser {
  name: String;
  lastName: String;
  stocks?: Array<IStocks>;
}
