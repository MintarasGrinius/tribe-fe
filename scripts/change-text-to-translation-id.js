const fs = require('fs')
const prompt = require('prompt-sync')({ sigint: true })

const generateCSV = (csvRows, title) => {
  let csvContent = ''
  title = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()

  csvRows.forEach((rowArray) => {
    let row = rowArray.join(',')
    csvContent += row + '\r\n'
  })

  fs.writeFileSync(`scripts/generated/${title}.csv`, csvContent)
}

const changeTextToTranslationId = () => {
  const fileLocation = process.argv[2]

  if (fileLocation) {
    const searching = true

    let file = fs.readFileSync(fileLocation, 'utf-8')
    let newFile = ''
    let csv = [['content_id', 'text']]
    let write = false

    console.log('Do you want to automatically save file? (y/n):')
    write = prompt().toLowerCase().includes('y')

    while (searching) {
      const matched = file.match(/(["'])(?:(?!\1)[^\\]|\\.)*\1/)
      if (!matched) {
        newFile += file
        break
      }

      const matchStringIndex = matched.index
      const matchedString = matched[0]

      let newContentId = ''

      if (!matchedString.includes('@')) {
        console.log(
          `\n---\nMatched string:\n${matchedString}\nType in content ID (empty if you want to skip):\n`
        )

        newContentId = prompt()
      }

      if (newContentId) {
        csv.push([`"${newContentId}"`, `"${matchedString.slice(1, -1)}"`])
      }

      newFile +=
        file.substring(0, matchStringIndex) +
        (newContentId ? `t('${newContentId}')` : matchedString)

      file = file.substring(
        matchStringIndex + matchedString.length,
        file.length
      )
    }

    generateCSV(csv, fileLocation)

    console.clear()
    console.log('\nFinished and CSV created.\n\n---\n')

    if (write) {
      fs.writeFileSync(fileLocation, newFile)
      console.log('File was written and saved.')
    } else {
      console.log(newFile)
    }

    console.log('\n---')
  } else {
    console.error('No file location')
  }
}

changeTextToTranslationId()
