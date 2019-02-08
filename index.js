const PDFDocument = require('pdfkit')
const fs = require('fs')

// This is in inches
const paperSize = { w: 36, h: 48 }

const inchToPoints = 72
const margin = 1 * inchToPoints
const size = [paperSize.w * inchToPoints, paperSize.h * inchToPoints]
const gridSize = 0.485 * inchToPoints

const doc = new PDFDocument({
  margin,
  size
})

doc.pipe(fs.createWriteStream(`sticker chart ${paperSize.w}x${paperSize.h}.pdf`))

doc.fontSize(8)
doc.font('Helvetica')

let rows = Math.floor((size[1] - (2 * margin)) / gridSize)
let columns = Math.floor((size[0] - (2 * margin)) / gridSize)

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    let x = margin + col * gridSize
    let y = margin + row * gridSize

    doc
      .lineJoin('miter')
      .lineWidth(2)
      .rect(
        x,
        y,
        gridSize,
        gridSize
      )
      .stroke()

    let cellNumber = (row * columns) + (col + 1)

    // Place the number of the cell in the cell
    doc.text(cellNumber.toLocaleString('en'),
      x,
      y + gridSize * 0.45,
      {
        width: gridSize,
        align: 'center',
        lineBreak: false
      })

    doc.save()
  }
}

doc.end()
