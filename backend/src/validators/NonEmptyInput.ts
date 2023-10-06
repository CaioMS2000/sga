export const NonEmptyInput = <Type>(inputObject: Type) => {
    const keys: string[] = Object.getOwnPropertyNames(inputObject);
    const obj = Object(inputObject);
    const limit = keys.includes('id')?keys.length-1: keys.length;

    let count = 0;

    keys.forEach(k => {
        if(k != 'id' && (obj[k] == null || obj[k] == undefined)){
            count++
        }
    });

    if(count >= limit){
        throw new Error('OBJETO INVÁLIDO')
    }
}