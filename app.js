
document.querySelector('#toggle').onclick = () => {
    document.body.classList.toggle('light')
}

const month_picker = document.querySelector('#month-picker')
const days = document.querySelector('#calendar-days')
const year = document.querySelector('#year')

const prevBtn = document.querySelector('#prev-year')
const nextBtn = document.querySelector('#next-year')

const month_list = document.querySelector('#month-list')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (m, y) => {

    month_picker.textContent = month_names[m]
    month_picker.onclick = () => {
        month_list.classList.add('show')
    }

    year.textContent = y

    const day_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    days.innerHTML = ''

    const first_day = new Date(y, m, 1)
    const current_day = new Date()

    for (i = 0; i <= day_of_month[m] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        day.classList.add('calendar-day-hover')

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`

            if (i - first_day.getDay() + 1 === current_day.getDate() &&
            m === current_day.getMonth() && y === current_day.getFullYear() ) {
                day.classList.add('curr-day')
            }
        }

        days.appendChild(day)

    }

    if(month_list.querySelector(`div[data-index='${m}']`)) {
        month_list.querySelectorAll('div[data-index]').forEach(item => {
            item.classList.remove('active')
        })
        month_list.querySelector(`div[data-index='${m}']`).classList.add('active')
    }

}

start = () => {
    const date = new Date()

    let month = date.getMonth()
    let year = date.getFullYear()

    generateCalendar(month, year)

    prevBtn.onclick = () => {
        --year
        generateCalendar(month, year)
    }

    nextBtn.onclick = () => {
        ++year
        generateCalendar(month, year)
    }

    month_names.forEach((month, index) => {
        const div = document.createElement('div')
        div.dataset.index = index
        div.textContent = month

        div.onclick = () => {
            month_list.classList.remove('show')
            month = index
            generateCalendar(month, year)
            
        }

        month_list.appendChild(div)
    })

    document.querySelector('#btn-restart').onclick = () => {

        generateCalendar(date.getMonth(), date.getFullYear())
    }

}

start()
