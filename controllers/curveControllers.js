// Para encontrar el miércoles anterior a la fecha actual. Se modifica el número que suma para encontrar diferentes días de la semana.
const temp = new Date()
temp.setDate(temp.getDate() - (temp.getDay() + 4) % 7);