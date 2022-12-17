import IColumn from "./IColumn";

export default interface SimpleExpressionProps {
    id:Number,
    columns: IColumn[],
    deleteFunction : any
  }