import {addStartAndEnd} from './addStartAndEnd'

describe("feature: addStartAndEnd", () => {
    test("should the value is from 1 to 5, when give 1 and 5", () => {
        const result = addStartAndEnd(1,5)
        expect(result).toEqual([1,2,3,4,5])
    })

    test("should throw an error, when give 5 and 1", () => {
        expect(()=>addStartAndEnd(5,1)).toThrow(TypeError)
    })
})