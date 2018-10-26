<template>
  <div class="container">
    <ul class="week-table">
      <li
        v-for="week in dataInfo.weekTable.en" :key="week"
        class="week-item">
        {{week}}
      </li>
    </ul>
    <ul class="date-table">
      <li
        v-for="dateItem in dataInfo.dateList" :key="dateItem.dateStamp"
        class="date-item">
        {{dateItem.date}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  computed: {
    dataInfo () { return this.$store.getters.getDateInfo }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-size: .16rem;
  background: #303030;
  color: #fff;
  width: 7rem;
  padding: 0 .25rem;
  .week-table,
  .date-table {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: .3rem;
  }
  .week-item,
  .date-item {
    flex: none;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
  }
  .date-table {
    flex-wrap: wrap;
    .date-item {
      will-change: transfrom;
      margin-bottom: .4rem;
    }
  }
}
</style>
