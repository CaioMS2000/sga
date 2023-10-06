export function getCurrentTimestamp(){
    const now = new Date()

    const _hour = now.getHours().toString()
    const _minute = now.getMinutes().toString()
    const _second = now.getSeconds().toString()

    const hour = _hour.length == 1? `0${_hour}` : _hour
    const minute = _minute.length == 1? `0${_minute}` : _minute
    const second = _second.length == 1? `0${_second}` : _second

    return `${hour}:${minute}:${second}`
}

export function print(text: any) {
    // Códigos ANSI para definir as cores do texto no console
    const timestampColorCode = "\x1b[34m";
    const argumentColorCode = "\x1b[33m";
    const resetColorCode = "\x1b[0m"; // Reseta a cor para a cor padrão do console
  
    const coloredText = `${timestampColorCode}${getCurrentTimestamp()}|${resetColorCode} ${argumentColorCode}${text}${resetColorCode}`;
  
    console.log(coloredText);
  }
  