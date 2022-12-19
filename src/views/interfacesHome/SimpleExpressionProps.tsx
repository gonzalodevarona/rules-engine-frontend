import IColumn from "./IColumn";

export default interface SimpleExpressionProps {
    id:Number,
    columns: IColumn[],
    selfDeleteFunction : any,
    isNextViewTriggered : boolean,
    handleExpressionsInfoChange : any

  }