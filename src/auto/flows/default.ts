import { table } from "table";
import { resolve } from "node:path";
import { Workbook } from "exceljs";
import { AutoFlow } from "../../types";
import { addStartAndEnd } from "../../util/addStartAndEnd";

export const defalutAutoFlow: AutoFlow = async (xlsxs) => {
    for (let i = 0; i < xlsxs.length; i++) {
        const { workbookUrl, sheetName } = xlsxs[i];
    
        const cols = xlsxs[i].cols
          ? xlsxs[i].cols
          : addStartAndEnd(xlsxs[i].colStart, xlsxs[i].colEnd);
    
        const rows = xlsxs[i].rows
          ? xlsxs[i].rows
          : addStartAndEnd(xlsxs[i].rowStart, xlsxs[i].rowEnd);
    
        const wb = new Workbook();
    
        const xlsx = await wb.xlsx.readFile(
          resolve(__dirname, `../assets/${workbookUrl}.xlsx`)
        );
    
        const data: string[][] = [];
    
        xlsx.getWorksheet(`${sheetName}`)?.eachRow((row, index) => {
          if (rows!.find((val) => val === index)) {
            data.push(cols!.map((value) => `${row.getCell(value)}`));
          }
        });
    
        console.log(table(data));
      }
}