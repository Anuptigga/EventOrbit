import XLSX from 'xlsx'
// export function parseStudentsFromExcel(buffer){
//     const workbook=XLSX.read(buffer,{type:"buffer"})
//     const sheetName=workbook.SheetNames[0]
//     const sheet=workbook.Sheets[sheetName]
//     return XLSX.utils.sheet_to_json(sheet);
// }
export function parseStudentsFromExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rawData = XLSX.utils.sheet_to_json(sheet)

  const standardizedData = rawData.map((row) => {
    const student = {}
    const nameKey = Object.keys(row).find(
      (key) => key.toLowerCase().trim() === 'name'
    )
    student.name = nameKey ? row[nameKey] : null
    const emailKey = Object.keys(row).find(
      (key) => key.toLowerCase().trim() === 'email'
    )
    student.email = emailKey ? row[emailKey] : null
    const phoneKey = Object.keys(row).find((key) =>
      ['phone', 'mobile', 'contact'].some((term) =>
        key.toLowerCase().trim().includes(term)
      )
    )
    student.phoneNumber = phoneKey ? row[phoneKey] : null

    return student
  })
  const validStudents = standardizedData.filter(
    (student) => student.name && student.email && student.phoneNumber
  )

  if (validStudents.length === 0) {
    throw new Error(
      'No valid student records found (required: name, email, phone)'
    )
  }

  return validStudents
}