const textarea1 = document.querySelector('.content .textarea1')
const textarea2 = document.querySelector('.content .textarea2')

const resultOne = document.querySelector('.result-one span')
const resultTwo = document.querySelector('.result-two span')

let res1 = ''
let res2 = ''

const modal = document.querySelector('.modal')

textarea1.addEventListener('input', function () {
	let text = this.value
	res1 = text.trim().length
	res2 = text.split(' ').join('').split('\n').join('').trim().length
	textarea2.innerHTML = text.split(' ').join('').split('\n').join('')
	resultOne.innerHTML = res1
	resultTwo.innerHTML = res2

	// копирование текста в буфер обмена
	const input = document.createElement('input')
	document.querySelector('body').append(input)
	input.value = res1
	input.select()    
	document.execCommand("copy")
	input.remove()

	modal.classList.add('animation')
	setTimeout(function() {
		modal.classList.remove('animation')
	}, 1500)
})

const addData = document.querySelector('.addData')
const table = document.querySelector('.table table')
addData.addEventListener('click', function () {
	const tr = document.createElement('tr')
	const td1 = document.createElement('td')
	const td2 = document.createElement('td')
	const td3 = document.createElement('td')

	td1.textContent = 1
	td2.textContent = res1
	td3.textContent = res2

	tr.appendChild(td1)
	tr.appendChild(td2)
	tr.appendChild(td3)
	table.appendChild(tr)


})
