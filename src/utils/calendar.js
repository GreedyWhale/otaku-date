class Calendar {
  constructor () {
    this.weekTable = {
      cn: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      cns: ['日', '一', '二', '三', '四', '五', '六'],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
    this.currentDate = this.getDateArr()
  }

  // 获取每月的天数
  getMonthDays (year, month) {
    return new Date(year, month, 0).getDate()
  }

  // 获取星期数
  getWeekday (year, month, day) {
    return new Date(year, month - 1, day).getDay()
  }

  // 获取日期数组
  getDateArr (dateStr) {
    const date = dateStr ? new Date(dateStr) : new Date()
    return [date.getFullYear(), this.zeroize(date.getMonth() + 1), this.zeroize(date.getDate())]
  }

  zeroize (num) {
    num = parseInt(num, 10)
    return num < 10 ? `0${num}` : num
  }

  setDataList (year = this.currentDate[0], month = this.currentDate[1]) {
    const currentMonthDays = this.getMonthDays(year, month)
    const firstDayInCurrentMonth = this.getWeekday(year, month, 1)
    const dateList = []

    // 如果当前月不是从星期日开始，从上个月补全
    if (firstDayInCurrentMonth !== 0) {
      const isPrveYear = (month - 1) === 0
      const prevMonth = isPrveYear ? 12 : month - 1
      const currentYear = isPrveYear ? year - 1 : year
      const prveMonthDays = this.getMonthDays(currentYear, prevMonth)
      for (let i = firstDayInCurrentMonth - 1; i >= 0; i -= 1) {
        const index = this.getWeekday(currentYear, prevMonth, prveMonthDays - i)
        dateList.push({
          dateStamp: this.getDateArr(`${currentYear}-${prevMonth}-${prveMonthDays - i}`).join('/'),
          date: prveMonthDays - i,
          cn: this.weekTable.cn[index],
          cns: this.weekTable.cns[index],
          en: this.weekTable.en[index]
        })
      }
    }
    // 当月日期添加
    for (let i = 0; i < currentMonthDays; i += 1) {
      const index = this.getWeekday(year, month, 1 + i)
      dateList.push({
        dateStamp: this.getDateArr(`${year}-${month}-${i + 1}`).join('/'),
        date: i + 1,
        cn: this.weekTable.cn[index],
        cns: this.weekTable.cns[index],
        en: this.weekTable.en[index]
      })
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
        const index = this.getWeekday(currentYear, nextMonth, 1 + i)
        dateList.push({
          dateStamp: this.getDateArr(`${currentYear}-${nextMonth}-${i + 1}`).join('/'),
          date: i + 1,
          cn: this.weekTable.cn[index],
          cns: this.weekTable.cns[index],
          en: this.weekTable.en[index]
        })
      }
    }

    return dateList
  }
}

export default Calendar
