import figlet from "figlet";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { AutoConfig } from "../types";
import { defalutAutoFlow, mixinAutoFlow } from "./flows";

async function main() {
  const jsonFile = await readFile(
    resolve(__dirname, "../../config/auto.yaml"),
    "utf-8"
  );

  const autoConfig = parse(jsonFile) as AutoConfig;

  const { mode, isShowBanner, xlsxs, mixins } = autoConfig;

  if (isShowBanner) {
    console.log(figlet.textSync("Excel Exporter"));
  }

  // 根据 mode 执行不同的 flow
  switch (mode) {
    case "mixin":
      mixinAutoFlow(xlsxs, mixins);
      break;

    default:
      defalutAutoFlow(xlsxs);
      break;
  }
}

main();
