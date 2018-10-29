<template>
  <div class="container">
    <div class="year-bar">{{dateArr[0]}}</div>
    <div class="month-bar">
      <svg class="icon" aria-hidden="true" @click="toggleMonth('prev')">
        <use xlink:href="#i-left" />
      </svg>
      <p class="month-text">{{dateTable.enMonth[dateArr[1] - 1]}}</p>
      <svg class="icon" aria-hidden="true" @click="toggleMonth('next')">
        <use xlink:href="#i-right" />
      </svg>
    </div>
    <ul>
      <li class="date-row">
        <div
          v-for="week in dateTable.enWeek" :key="week"
          class="week-item">
          {{week}}
        </div>
      </li>
      <li
        v-for="(date, index) in formattedDate" :key="`row-${date[index].dateStamp}`"
        class="date-row">
        <div
          v-for="(dateItem, subindex) in date" :key="dateItem.dateStamp"
          :class="[
            'date-item',
            isSelected(index * 7 + subindex)
          ]"
          @click="selectDate(index * 7 + subindex)">
          {{dateItem.date}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Calendar from '@/utils/calendar'

const calendar = new Calendar()

export default {
  name: 'Calendar',
  data () {
    return {
      dateList: calendar.setDateList(),
      dateTable: calendar.dateTable,
      startDate: '',
      endDate: '',
      initDate: calendar.localDay(new Date()),
      currentDate: ''
    }
  },
  computed: {
    formattedDate () {
      const newDateList = this.formatDate(this.dateList)
      return newDateList
    },
    dateArr () {
      const { initDate, currentDate } = this.$data
      return (currentDate || initDate).split('/')
    }
  },
  mounted () {
    this.initSelectedDate()
  },
  methods: {
    formatDate (dateArr = []) {
      let newDateArr = []
      for (let i = 0; i < dateArr.length; i += 7) {
        newDateArr.push(dateArr.slice(i, i + 7))
      }
      return newDateArr
    },
    initSelectedDate () {
      const date = new Date()
      let startIndex = 0
      this.dateList.some((value, index) => {
        if (value.dateStamp === calendar.localDay(date)) {
          startIndex = index
          return true
        }
      })
      this.startDate = startIndex
      this.endDate = startIndex + 1
    },
    isSelected (index) {
      switch (true) {
        case index === this.startDate && index === this.endDate:
        case index === this.startDate && !this.endDate:
          return 'selected selected-alone'
        case index === this.startDate:
          return 'selected selected-start'
        case (this.startDate < index) && (index < this.endDate):
          return 'selected'
        case index === this.endDate:
          return 'selected selected-end'
        default:
          return ''
      }
    },
    toNumber (dateStr) {
      return parseInt(dateStr.split('/').join(''), 10)
    },
    selectDate (index) {
      const { startDate, endDate } = this.$data

      if (startDate !== null && endDate !== null) {
        this.startDate = index
        this.endDate = null
        return
      }
      if (startDate !== null && !endDate && (startDate > index)) {
        this.startDate = index
        this.endDate = startDate
        return
      }
      if (startDate !== null && !endDate) {
        this.endDate = index
        return
      }
      if (!startDate && !endDate) {
        this.startDate = index
      }
    },
    toggleMonth (type) {
      const { initDate, currentDate } = this.$data
      let [year, month, date] = (currentDate || initDate).split('/')
      year = parseInt(year, 10)
      month = parseInt(month, 10)
      date = parseInt(date, 10)
      if (type === 'prev') {
        const isPrevYear = (month - 1) === 0
        year = isPrevYear ? year - 1 : year
        month = isPrevYear ? 12 : month - 1
      }
      if (type === 'next') {
        const isNextYear = (month + 1) > 12
        year = isNextYear ? year + 1 : year
        month = isNextYear ? 1 : month + 1
      }
      this.dateList = calendar.setDateList(year, month)
      this.currentDate = `${year}/${month}/${date}`
      if (`${year}/${month}/${date}` !== initDate) {
        this.startDate = null
        this.endDate = null
      } else {
        this.initSelectedDate()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  font-size: .16rem;
  background: #303030;
  color: #fff;
  .year-bar,
  .month-bar {
    color: #a74536;
    font-size: .2rem;
    line-height: .5rem;
  }
  .year-bar {
    padding-top: .1rem;
  }
  .month-bar {
    box-shadow: 0 1rem 1rem .5rem #242424;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: .1rem;
    .month-text {
      margin: 0 .5rem;
      width: 1rem;
    }
  }
  .date-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .2rem 0;
    .week-item,
    .date-item {
      flex: none;
      text-align: center;
      width: .45rem;
    }
    .date-item {
      line-height: .45rem;
    }
    .disable {
      color: #cccccc7a;
      pointer-events: none;
    }
    .selected {
      background: #f45851;
      &-start {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
      &-end {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
      &-alone {
        border-radius: 50%;
      }
    }
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
