const textarea1 = document.querySelector('.textarea1')
const textarea2 = document.querySelector('.textarea2')

const resultOne = document.querySelector('.result-one span')
const resultTwo = document.querySelector('.result-two span')

const clipboardStatus = document.querySelector('.clipboard-status span')

let res1 = ''
let res2 = ''

const modal = document.querySelector('.modal')

textarea1.addEventListener('input', function () {
  // let text = this.value

  // numChar = text.trim().length
  // numCharWithoutSpaces = text
  //   .split(' ')
  //   .join('')
  //   .split('\n')
  //   .join('')
  //   .trim().length

  // textarea2.innerHTML = text.split(' ').join('').split('\n').join('')
  // resultOne.innerHTML = numChar
  // resultTwo.innerHTML = numCharWithoutSpaces

  let [numChar, numCharWithoutSpaces] = countChar()

  // копирование текста в буфер обмена
  //   const input = document.createElement('input')
  //   document.querySelector('body').append(input)
  //   input.value = res1

  //   input.select()
  //   document.execCommand('copy')

  let resultClipboard = ''
  navigator.clipboard
    .writeText(numChar)
    .then(() => {
      resultClipboard = `В буфер обмена скопировано кол-во симвлов: ${numChar}`
    })
    .catch(err => {
      resultClipboard = `Что-то пошло не так. Ошибка: ${err}`
    })
    .finally(() => {
      showModal(resultClipboard)
      navigator.clipboard.writeText(numChar)
    })

  //   input.remove()
})

// const addData = document.querySelector('.addData')
// const table = document.querySelector('.table table')
// addData.addEventListener('click', function () {
//   const tr = document.createElement('tr')
//   const td1 = document.createElement('td')
//   const td2 = document.createElement('td')
//   const td3 = document.createElement('td')

//   td1.textContent = 1
//   td2.textContent = res1
//   td3.textContent = res2

//   tr.appendChild(td1)
//   tr.appendChild(td2)
//   tr.appendChild(td3)
//   table.appendChild(tr)
// })

const сlipboardPastCopy = document.querySelector('.сlipboardPastCopy')

сlipboardPastCopy.addEventListener('click', () => {
  ;(async function main() {
    await clipboardRead()
    let result = await clipboardWrite()
    await showModal(result)
  })()
})

const сlipboardPast = document.querySelector('.сlipboardPast')
сlipboardPast.addEventListener('click', () => {
  clipboardRead().then(res => showModal(res))
})

const сlipboardCopy = document.querySelector('.сlipboardCopy')
сlipboardCopy.addEventListener('click', () => {
  clipboardWrite().then(res => showModal(res))
})

function showModal(content) {
  modal.innerHTML = `<p>${content}</p>`
  modal.classList.add('animation')
  setTimeout(function () {
    modal.classList.remove('animation')
  }, 1500)
}

// Подсчет символов
function countChar() {
  let text = textarea1.value
  let numChar = text.trim().length
  let numCharWithoutSpaces = text
    .split(' ')
    .join('')
    .split('\n')
    .join('')
    .trim().length
  textarea2.innerHTML = text.split(' ').join('').split('\n').join('')
  resultOne.innerHTML = numChar
  resultTwo.innerHTML = numCharWithoutSpaces

  return [numChar, numCharWithoutSpaces]
}

// Вставка из буфера обмена
function clipboardRead() {
  return new Promise(function (resolve, reject) {
    navigator.clipboard
      .readText()
      .then(text => {
        result = 'Текст успешно вставлен'
        textarea1.value = text
        resolve(result)
      })
      .catch(err => {
        result = `Что-то пошло не так. Ошибка: ${err}`
        reject(result)
      })
  })
}

// Копирование в буфер обмена
function clipboardWrite() {
  return new Promise(function (resolve, reject) {
    let [numChar] = countChar()
    navigator.clipboard
      .writeText(numChar)
      .then(() => {
        resultClipboard = `В буфер обмена скопировано кол-во симвлов: ${numChar}`
        navigator.clipboard.writeText(numChar)
        resolve(resultClipboard)
      })
      .catch(err => {
        resultClipboard = `Что-то пошло не так. Ошибка: ${err}`
        reject(resultClipboard)
      })
  })
}

const btnShow = document.querySelector('#btn-show')
const textResult = document.querySelector('.text-result')

btnShow.addEventListener('click', function () {
  textResult.style.display =
    textResult.style.display == 'block' ? 'none' : 'block'

  this.innerHTML =
    textResult.style.display == 'block'
      ? 'Скрыть получившийся текст'
      : 'Показать получившийся текст'
})

// Проверка того что находится в буфере обмена
setInterval(() => {
  let [numChar] = countChar()
  navigator.clipboard.readText().then(text => {
    if (text == numChar && numChar != 0) {
      clipboardStatus.textContent = 'кол-во символов'
    } else if (text.length == 0) {
      clipboardStatus.textContent = 'пусто'
    } else {
      clipboardStatus.textContent = 'какой-то текст'
    }
  })
}, 1000)
