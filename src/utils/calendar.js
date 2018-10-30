class Calendar {
  constructor () {
    this.dateTable = {
      cnWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      cnWeekShort: ['日', '一', '二', '三', '四', '五', '六'],
      enWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      enMonth: [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
      ]
    }
    this.oneDayMilliseconds = 86400000
  }

  // 获取每月的天数
  getOneMonthDays (year, month) {
    return new Date(year, month, 0).getDate()
  }

  // 获取星期数
  getDayOfWeek (year, month, day) {
    return new Date(year, month - 1, day).getDay()
  }

  // 将时间格式化成(xx/xx/xx)
  localDay (dateStr) {
    const date = dateStr ? new Date(dateStr) : new Date()
    return `${date.getFullYear()}/${this.zeroize(date.getMonth() + 1)}/${this.zeroize(date.getDate())}`
  }
  // 补零
  zeroize (num) {
    num = parseInt(num, 10)
    return num < 10 ? `0${num}` : num
  }
  // 获取距离某天n天之后的日期
  getDaySpace (date, days) {
    const targetDays = new Date(date).getTime()
    return this.localDay(new Date(targetDays + (days * this.oneDayMilliseconds)))
  }

  setDateListItem ({ year, month, date, dateTableIndex }) {
    return {
      dateStamp: this.localDay(`${year}-${month}-${date}`),
      date,
      cnWeek: this.dateTable.cnWeek[dateTableIndex],
      cnWeekShort: this.dateTable.cnWeekShort[dateTableIndex],
      enWeek: this.dateTable.enWeek[dateTableIndex],
      enMonth: this.dateTable.enMonth[month - 1]
    }
  }
  setDateList (year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
    const currentMonthDays = this.getOneMonthDays(year, month)
    const firstDayInCurrentMonth = this.getDayOfWeek(year, month, 1)
    const dateList = []

    // 如果当前月不是从星期日开始，从上个月补全
    if (firstDayInCurrentMonth !== 0) {
      const isPrveYear = (month - 1) === 0
      const prevMonth = isPrveYear ? 12 : month - 1
      const currentYear = isPrveYear ? year - 1 : year
      const prveMonthDays = this.getOneMonthDays(currentYear, prevMonth)
      for (let i = firstDayInCurrentMonth - 1; i >= 0; i -= 1) {
        const index = this.getDayOfWeek(currentYear, prevMonth, prveMonthDays - i)
        dateList.push(
          this.setDateListItem({
            year: currentYear,
            month: prevMonth,
            date: prveMonthDays - i,
            dateTableIndex: index
          })
        )
      }
    }
    // 当月日期添加
    for (let i = 0; i < currentMonthDays; i += 1) {
      const index = this.getDayOfWeek(year, month, 1 + i)
      dateList.push(
        this.setDateListItem({
          year,
          month,
          date: i + 1,
          dateTableIndex: index
        })
      )
    }

    const currentDateListLen = dateList.length
    // 当月结束时未填满整个行
    if (currentDateListLen % 7) {
      const total = currentDateListLen + (7 - (currentDateListLen % 7))
      const diff = total - currentDateListLen
      const isNextYear = (month + 1) > 12
      const nextMonth = isNextYear ? 1 : month + 1
      const currentYear = isNextYear ? year + 1 : year
      for (let i = 0; i < diff; i += 1) {
        const index = this.getDayOfWeek(currentYear, nextMonth, 1 + i)
        dateList.push(
          this.setDateListItem({
            year: currentYear,
            month: nextMonth,
            date: i + 1,
            dateTableIndex: index
          })
        )
      }
    }

    return dateList
  }
}

export default Calendar
