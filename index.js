function generate() {
    let symbols = [
        '+', '-', '*'
    ]

    let number_1 = Math.floor(Math.random() * 499) + 1;
    let number_2 = Math.floor(Math.random() * 499) + 1;
    let symbol = symbols[Math.floor(Math.random() * 3)];

    return `${number_1}${symbol}${number_2}`
}

window.onload = function () {
    let main = document.querySelector('main')
    function resultats(json) {
        let html_code = `<p>Результаты теста:</p><div class="answers">`

        for (let index = 0; index < 5; index++) {
            const element = json[`num${index + 1}`];

            let correct_answer = eval(element.example)
            if (`${correct_answer}` === `${element.answer}`) status = `<span class="correct">Верно</span>`
            else status = `<span class="no-correct">Неверно</span>`
            let code

            if (!element?.example) example = "0+0"
            if (element?.answer) code = `<table>
            <tr>
                <th>Вопрос №${index + 1}</th>
                <th>Пример: ${element.example}</th>
            </tr>
            <tr>
                <td>Ваш ответ</td>
                <td>${element.answer}</td>
            </tr>
            <tr>
                <td>Правильный ответ:</td>
                <td>${correct_answer}</td>
            </tr>
            <tr>
                <td>Статус ответа</td>
                <td>${status}</td>
            </tr>
        </table>
        <br>`
            else code = ``

            html_code += code
            if (index >= 4) html_code += `</div><input type="submit" value="Заново" id="reload">`
        }

        main.innerHTML = html_code

        let reload_btn = document.querySelector('#reload')
        reload_btn.addEventListener('click', function () {
            document.location.reload()
        })
    }


    let example = document.querySelector('.example')
    let number = document.querySelector('.example-number')
    let input = document.querySelector('#answer')
    let button = document.querySelector('#submit')

    example.textContent = generate()

    button.addEventListener('click', function () {
        if (!input.value) return
        if (input.getAttribute('type') != 'number') return
        if (isNaN(input.value)) return

        button.setAttribute(`value`, `Засчитано!`)
        button.setAttribute(`disabled`, true)

        eval(`this.example_${number.textContent} = "${example.textContent}"`)
        eval(`this.answer_${number.textContent} = "${input.value}"`)

        let json = {
            "num1": {
                example: this.example_1,
                answer: this.answer_1
            },
            "num2": {
                example: this.example_2,
                answer: this.answer_2
            },
            "num3": {
                example: this.example_3,
                answer: this.answer_3
            },
            "num4": {
                example: this.example_4,
                answer: this.answer_4
            },
            "num5": {
                example: this.example_5,
                answer: this.answer_5
            }
        }
        if (Number(number.textContent) > 4) return setTimeout(() => { resultats(json) }, 2000)

        setTimeout(() => {
            button.setAttribute(`value`, `Дальше`)
            button.removeAttribute(`disabled`)

            number.textContent = Number(number.textContent) + 1;
            example.textContent = generate()
            input.value = ``
        }, 2000);
    })
}