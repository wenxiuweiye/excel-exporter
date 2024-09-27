export type AutoConfig = {
    isShowBanner: boolean
    mode: "defalut" | "mixin"
    xlsxs: Xlsx[];
    mixins: Mixin []
  };
  
export type Xlsx = {
    workbookUrl: string;
    sheetName: string;
    colStart: number;
    colEnd: number;
    rowStart: number;
    rowEnd: number;
    cols?: Col[];
    rows?: number[];
};

type Col = string | number

export type Mixin = {
    excelIndex: number[]
    colExpression: string 
    colHeader: string
 }


export type AutoFlow = (xlsxs: Xlsx[]) => void

export type MixinAutoFLow = (xlsxs: Xlsx[], mixins: Mixin[]) => void

