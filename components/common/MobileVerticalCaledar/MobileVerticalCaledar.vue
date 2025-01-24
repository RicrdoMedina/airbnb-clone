<template>
  <div class="w-full">
    <div class="w-full pb-2 px-4">
      <ul class="w-full h-8 flex items-center justify-between px-6">
        <li class="text-sm text-bold">Lun.</li>
        <li class="text-sm text-bold">Mar.</li>
        <li class="text-sm text-bold">Mié.</li>
        <li class="text-sm text-bold">Jue.</li>
        <li class="text-sm text-bold">Vié.</li>
        <li class="text-sm text-bold">Sáb.</li>
        <li class="text-sm text-bold">Dom.</li>
      </ul>
    </div>

    <section
      class="w-full pb-4 border-t border-custom-gray-300 overflow-x-hidden overflow-y-auto scrollbar-none"
      style="max-height: 30vh"
    >
      <div
        class="w-full py-4"
        v-for="(month, monthIndex) in months"
        :key="monthIndex"
      >
        <h4 class="text-bold text-base font-medium px-6">{{ month }}</h4>
        <div class="w-full flex items-center justify-center px-6">
          <table style="border-spacing: 0px 2px">
            <tbody>
              <tr
                v-for="(week, weekIndex) in items[monthIndex]"
                :key="weekIndex"
              >
                <td v-for="(day, dayIndex) in week" :key="dayIndex">
                  <div
                    :class="cellDynamicClasses(day.id).value"
                    style="width: 38px; height: 38px"
                    @click.stop.prevent="handleSelectDate(day)"
                  >
                    {{ day.value }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-full mt-4 px-6">
        <DefaultButton
          class="text-bold font-medium w-full h-12 rounded-lg border border-black flex items-center justify-center"
          @onClick="handleClick"
        >
          Carga más fechas
        </DefaultButton>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { getMonth, getYear, format } from "date-fns";
import { es } from "date-fns/locale";
import { useDynamicClasses } from "~/components/composables/useDynamicClasses";
import {
  generateMonthDays,
  calculateFutureDate,
  compareDates,
} from "~/utils/dateUtils";
import DefaultButton from "~/components/common/DefaultButton/DefaultButton.vue";

const months = ref([]);
const items = ref([]);
const generatorInstance = monthGenerator();

const date = ref([]);

const props = defineProps({
  selectedDateId: {
    type: Array,
    default: [],
  },
  dateRange: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits([
  "handleSelectedDateId",
  "handleRangeStart",
  "handleRangeEnd",
]);

const cellDefaultClasses = "flex items-center justify-center rounded-full";
const cellActiveClasses = "bg-black text-white font-medium";
const cellInactiveClasses = "bg-transparent text-black";

const cellDynamicClasses = (id) =>
  useDynamicClasses(
    () => props.selectedDateId.includes(id),
    cellDefaultClasses,
    cellActiveClasses,
    cellInactiveClasses
  ).dynamicClasses;

function monthRows(monthDays) {
  return computed(() => {
    const rows = [];
    let currentWeek = Array(7).fill({
      id: "",
      value: "",
      date: "",
      active: "",
      isLastDayOfWeek: "",
    });

    monthDays.forEach((day, index) => {
      currentWeek[day.key] = day;
      if (day.isLastDayOfWeek) {
        rows.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      rows.push(currentWeek);
    }

    return rows;
  });
}

function handleSelectDate({ date: newDate, id }) {
  if (date.value.length > 1) {
    handleSelectedDateId([id]);
    const updatedDateArr = [newDate];
    date.value = updatedDateArr;
    handleRangeStart(updatedDateArr);
    return;
  }
  if (date.value.length === 1) {
    if (
      compareDates(newDate, date.value[0], {
        comparisonType: "before",
        ignoreTime: true,
      })
    ) {
      handleSelectedDateId([id]);
      const updatedDateArr = [newDate];
      date.value = updatedDateArr;
      handleRangeStart(updatedDateArr);
      return;
    }
  }
  if (!date.value.length) {
    handleSelectedDateId(id);
    const updatedDateArr = [newDate];
    date.value = updatedDateArr;
    handleRangeStart(updatedDateArr);
    return;
  }

  const startDate = date.value[0];
  const beforeId = props.selectedDateId[0];
  const updatedDateArr = [startDate, newDate];
  handleSelectedDateId([beforeId, id]);
  date.value = updatedDateArr;
  handleRangeEnd(updatedDateArr);
}

function* monthGenerator() {
  let count = 0;

  while (true) {
    const date = calculateFutureDate(count);
    const monthIndex = getMonth(date);
    const monthText = format(date, "LLLL", { locale: es });
    const year = getYear(date);
    const result = generateMonthDays(monthIndex, year);
    const daysOfMonth = monthRows(result);
    const monthName = `${monthText} ${year}`;

    yield { monthName, daysOfMonth: daysOfMonth.value };
    count++;
  }
}

function runRenerator() {
  let counter = 0;

  while (counter < 5) {
    const { value, done } = generatorInstance.next();

    if (done) break;

    const { monthName, daysOfMonth } = value;
    months.value.push(monthName);
    items.value.push(daysOfMonth);

    counter++;
  }
}

function handleClick() {
  runRenerator();
}

function handleRangeStart(value) {
  emit("handleRangeStart", value, "MIN");
}

function handleRangeEnd(value) {
  emit("handleRangeEnd", value, "MAX");
}

function handleSelectedDateId(val) {
  emit("handleSelectedDateId", val);
}

onMounted(() => {
  runRenerator();
});

watch(
  () => props.dateRange,
  async (newValue, oldVulue) => {
    if (newValue.length === 0) {
      handleSelectedDateId([]);
      date.value = [];
    }
  }
);
</script>
