import { Workbook } from "exceljs";
import { table } from "table";
import { resolve } from "node:path";
import { evaluate } from "mathjs";
import { MixinAutoFLow } from "../../types";
import { addStartAndEnd } from "../../util/addStartAndEnd";

export const mixinAutoFlow: MixinAutoFLow = async (xlsxs, mixins) => {
  for (let i = 0; i < xlsxs.length; i++) {
    const mixin = mixins.find((val) => val.excelIndex.find((v) => v === i + 1));

    const { workbookUrl, sheetName } = xlsxs[i];

    const cols = xlsxs[i].cols
      ? xlsxs[i].cols
      : addStartAndEnd(xlsxs[i].colStart, xlsxs[i].colEnd);

    if (mixin) {
      cols!.push(mixin.colExpression);
    }

    const rows = xlsxs[i].rows
      ? xlsxs[i].rows
      : addStartAndEnd(xlsxs[i].rowStart, xlsxs[i].rowEnd);

    const wb = new Workbook();

    const xlsx = await wb.xlsx.readFile(
      resolve(__dirname, `../../../assets/${workbookUrl}.xlsx`)
    );

    const data: string[][] = [];

    xlsx.getWorksheet(`${sheetName}`)?.eachRow((row, index) => {
      if (rows!.find((val) => val === index)) {
        data.push(
          cols!.map((value) => {
            if (typeof value === "string" && mixin?.colExpression) {
              const reg = mixin.colExpression.replace(" ", "");
              const left = Number(reg.match(/[0-9]*/g)![0]);
              const symbol = reg.match(/\/|\+|\-|\*/g)![0];

              const right = Number(
                reg.match(/(\/|\+|\-|\*) *[0-9]*/g)![0].slice(0)
              );

              const result = row.getCell(left) + symbol + row.getCell(right);

              return result.match(/\d+(\.)?\d+[\+|\-|\*|\/]\d+(\.)?\d+/g)
                ?.length
                ? `${evaluate(result)}`
                : mixin.colHeader;
            }
            return `${row.getCell(value)}`;
          })
        );
      }
    });

    console.log(table(data));
  }
};
