import { NonEmptyInput } from "./NonEmptyInput";

test('Should not throw errors', async () => {  
    expect(() => {
        NonEmptyInput({
            any: 'anything'
        })
    }).not.toThrow()
})

test('Should throw errors', async () => {
    expect(() => {
        NonEmptyInput({})
    }).toThrow('OBJETO INVÁLIDO')
})