export function addStartAndEnd(start: number, end: number): number[] {
    if (start >= end) throw new TypeError("传递参数异常，检查传递参数")

    const result: number[] = [];

    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}
