<template>
  <div class="month-picker" :style="{ '--angle': angle }">
    <div class="month-picker--item-1"></div>
    <div class="month-picker--item-2"></div>
    <div class="month-picker--item-3">
      <div class="month-picker--item-3--el-1 font-semibold">
        {{ selectedMonth }}
      </div>
      <div class="month-picker--item-3--el-2 font-medium">Meses</div>
    </div>
    <div class="month-picker--item-4"></div>

    <span
      v-for="(dot, index) in dots"
      :key="index"
      class="dot"
      :class="[`dot-${dot}`, { active: isActive(dot) }]"
      @click="toggleMonth(dot)"
    ></span>

    <svg
      aria-hidden="true"
      class="bar"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="trackBackground">
          <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
          <circle
            cx="50%"
            cy="50%"
            fill="none"
            r="115"
            stroke="white"
            stroke-width="60"
          ></circle>
          <path
            fill="black"
            filter="blur(10px)"
            :d="getPathTrackBackground(selectedMonth)"
          ></path>
        </mask>
        <radialGradient id="trackBackgroundInnerShadow">
          <stop offset="56%" stop-color="rgba(188, 0, 55, 0.6)"></stop>
          <stop offset="62%" stop-color="transparent"></stop>
          <stop offset="66%" stop-color="transparent"></stop>
          <stop offset="89%" stop-color="rgba(188, 0, 55, 0.4)"></stop>
        </radialGradient>
        <mask id="trackForeground">
          <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
          <path
            fill="white"
            stroke="white"
            :d="getPathTrackForeground(selectedMonth)"
          ></path>
        </mask>
        <radialGradient id="trackForegroundFill">
          <stop offset="69%" stop-color="#cb005e"></stop>
          <stop offset="100%" stop-color="#ff234b"></stop>
        </radialGradient>
        <filter id="trackForegroundDropShadow1" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="0.5"
            stdDeviation="20"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundDropShadow2" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#41000c"
            flood-opacity="0.9"
            stdDeviation="3"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundDropShadow3" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="1"
            stdDeviation="6"
          ></feDropShadow>
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="0.5"
            stdDeviation="6"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundInsetShadow1">
          <feOffset dx="0" dy="-10"></feOffset>
          <feGaussianBlur
            stdDeviation="10"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="#ffc0cb"
            flood-opacity="0.7"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
        <filter id="trackForegroundInsetShadow2">
          <feOffset dx="0" dy="-2"></feOffset>
          <feGaussianBlur
            stdDeviation="4"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="#cf0020"
            flood-opacity="1"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
        <filter id="trackForegroundInsetShadow3">
          <feOffset dx="0" dy="-10"></feOffset>
          <feGaussianBlur
            stdDeviation="5"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="white"
            flood-opacity="0.1"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
      </defs>

      <circle
        cx="50%"
        cy="50%"
        fill="url(#trackBackgroundInnerShadow)"
        filter="blur(10px)"
        mask="url(#trackBackground)"
        r="145"
      ></circle>

      <!-- <path
        fill="#ff234b"
        filter="url(#trackForegroundDropShadow1)"
        mask="url(#trackBackground)"
        :d="getPath(selectedMonth)"
      ></path>

      <path
        fill="#ff234b"
        filter="url(#trackForegroundDropShadow1)"
        mask="url(#trackBackground)"
        :d="getPath(selectedMonth)"
      ></path> -->

      <circle
        cx="50%"
        cy="50%"
        fill="url(#trackForegroundFill)"
        mask="url(#trackForeground)"
        r="145"
      ></circle>

      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow1)"
        stroke="#ff234b"
        :d="getPath(selectedMonth)"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow2)"
        stroke="#ff234b"
        :d="getPath(selectedMonth)"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow3)"
        stroke="#ff234b"
        :d="getPath(selectedMonth)"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDateFromMonth, getNextYear } from "../utils/dateUtils";
import { isEmpty } from "../utils/helpers";

const props = defineProps({
  starDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  value: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["handleChange"]);

const dots = Array.from({ length: 12 }, (_, i) => i);
const selectedMonth = ref(0);
const angle = ref(0);

const pathValues = [
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 228.89927408074675 35.70905068117548 A 26 26 0 0 1 228.89927408074664 35.7090506811754 A 26 26 0 0 1 202.38322973891107 80.44046461435899 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336059 86.5000000000001 A 26 26 0 0 1 279.10958193360585 86.50000000000001 A 26 26 0 0 1 234.07626093681506 112.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 298 157.00000000000003 A 26 26 0 0 1 298 157 A 26 26 0 0 1 246 157.00000000000003 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.5 279.10958193360585 A 26 26 0 0 1 227.5 279.10958193360585 A 26 26 0 0 1 201.5 234.07626093681503 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 156.99999999999997 298 A 26 26 0 0 1 157 298 A 26 26 0 0 1 156.99999999999997 246 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 86.49999999999994 279.1095819336058 A 26 26 0 0 1 86.50000000000003 279.10958193360585 A 26 26 0 0 1 112.49999999999996 234.076260936815 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 34.89041806639416 227.5 A 26 26 0 0 1 34.89041806639415 227.5 A 26 26 0 0 1 79.92373906318497 201.5 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 16 156.99999999999997 A 26 26 0 0 1 16 157.00000000000003 A 26 26 0 0 1 68 157 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 34.89041806639415 86.50000000000001 A 26 26 0 0 1 34.89041806639416 86.49999999999999 A 26 26 0 0 1 79.92373906318495 112.5 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 86.50000000000003 34.89041806639415 A 26 26 0 0 1 86.49999999999994 34.89041806639419 A 26 26 0 0 1 112.50000000000003 79.92373906318495 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 157 16 A 26 26 0 0 1 156.99999999999997 16 A 26 26 0 0 1 157 68 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
];

const pathTrackBackground = [
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 334 157 L 334 334 L 157 334 L 157 157 L 273.6726188957804 40.32738110421967 L 334 40.32738110421967 L 334 157 L 157 157",
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 334 157 L 334 334 L 157 334 L 157 157 L 316.37776133769626 114.29485755808408 L 334 114.29485755808408 L 334 157 L 157 157",
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 316.37776133769626 199.70514244191594 L 316.37776133769626 334 L 157 334 L 157 157",
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 273.6726188957804 273.6726188957803 L 273.6726188957804 334 L 157 334 L 157 157",
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 199.70514244191594 316.37776133769626 L 199.70514244191594 334 L 157 334 L 157 157",
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 114.29485755808406 316.37776133769626 L -20 316.37776133769626 L -20 157 L 157 157",
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 40.32738110421967 273.6726188957804 L -20 273.6726188957804 L -20 157 L 157 157",
  "M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L -2.3777613376962563 199.70514244191597 L -20 199.70514244191597 L -20 157 L 157 157",
  "M 157 157 L -2.3777613376962847 114.29485755808415 L -2.3777613376962847 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157",
  "M 157 157 L 40.327381104219626 40.32738110421967 L 40.327381104219626 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157",
  "M 157 157 L 114.29485755808409 -2.3777613376962847 L 114.29485755808409 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157",
  "M 157 157",
];

const pathTrackForeground = [
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.49999999999994 34.89041806639413 A 26 26 0 0 1 227.5 34.89041806639416 A 26 26 0 0 1 201.49999999999997 79.92373906318494 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336059 86.5000000000001 A 26 26 0 0 1 279.10958193360585 86.50000000000001 A 26 26 0 0 1 234.07626093681506 112.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 298 157.00000000000003 A 26 26 0 0 1 298 157 A 26 26 0 0 1 246 157.00000000000003 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 279.1095819336058 227.50000000000006 A 26 26 0 0 1 279.10958193360585 227.5 A 26 26 0 0 1 234.076260936815 201.50000000000006 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.5 279.10958193360585 A 26 26 0 0 1 227.5 279.10958193360585 A 26 26 0 0 1 201.5 234.07626093681503 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 156.99999999999997 298 A 26 26 0 0 1 157 298 A 26 26 0 0 1 156.99999999999997 246 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 86.49999999999994 279.1095819336058 A 26 26 0 0 1 86.50000000000003 279.10958193360585 A 26 26 0 0 1 112.49999999999996 234.076260936815 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 34.89041806639416 227.5 A 26 26 0 0 1 34.89041806639415 227.5 A 26 26 0 0 1 79.92373906318497 201.5 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 16 156.99999999999997 A 26 26 0 0 1 16 157.00000000000003 A 26 26 0 0 1 68 157 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 34.89041806639415 86.50000000000001 A 26 26 0 0 1 34.89041806639416 86.49999999999999 A 26 26 0 0 1 79.92373906318495 112.5 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 86.50000000000003 34.89041806639415 A 26 26 0 0 1 86.49999999999994 34.89041806639419 A 26 26 0 0 1 112.50000000000003 79.92373906318495 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
  "M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 1 1 157 16 A 26 26 0 0 1 156.99999999999997 16 A 26 26 0 0 1 157 68 A 89 89 0 1 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z",
];

function toggleMonth(monthIndex) {
  const monthUpdated = monthIndex + 1;
  selectedMonth.value = monthUpdated;
  const nextYear = getNextYear();
  const endDate = getDateFromMonth(monthUpdated, nextYear);
  emit("handleChange", [props.starDate, endDate]);
  angle.value = monthIndex * 30;
}

function isActive(monthIndex) {
  return selectedMonth.value === monthIndex;
}

function getPath(monthIndex) {
  return pathValues[monthIndex - 1];
}

function getPathTrackBackground(monthIndex) {
  return pathTrackBackground[monthIndex - 1];
}

function getPathTrackForeground(monthIndex) {
  return pathTrackForeground[monthIndex - 1];
}

onMounted(() => {
  if (!isEmpty(props.value)) {
    const endDate = props.value[1].getMonth();
    selectedMonth.value = endDate;
  } else {
    const endDate = props.endDate.getMonth();
    selectedMonth.value = endDate;
  }
});
</script>

<style lang="css" scoped>
.month-picker {
  border-radius: 50%;
  -webkit-tap-highlight-color: transparent;
  aspect-ratio: 1;
  display: flex;
  height: auto;
  max-height: 290px;
  max-width: 290px;
  min-height: 230px;
  min-width: 230px;
  position: relative;
  width: 100%;
  container-type: inline-size;
  flex-grow: 0;
  flex-shrink: 1;
}

.month-picker--item-1 {
  background: #e6e6e6;
  border-radius: 50%;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.2), 0 5px 5px #ffffff,
    inset 0 -20px 30px #ffffffe5, inset 0 10px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 100%;
  position: absolute;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  aspect-ratio: 1;
  display: flex;
  height: auto;
  max-height: 290px;
  max-width: 290px;
  min-height: 230px;
  min-width: 230px;
  position: relative;
}

.month-picker--item-2 {
  filter: blur(5px);
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  color: #222222;
  text-align: left;
}

.month-picker--item-2:before {
  border-radius: 50%;
  background: conic-gradient(
    from -33deg at 50% 50%,
    transparent 0deg,
    rgba(255, 0, 46, 0.4) 52deg,
    rgba(255, 0, 46, 0.4) calc(var(--angle) / 2 + 38deg),
    transparent calc(var(--angle) / 2 + 38deg + 0.5deg),
    transparent 100%
  );
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
  pointer-events: none;
  -webkit-tap-highlight-color: transparent;
  text-align: left;
}

.month-picker--item-2:after {
  border-radius: 50%;
  background: conic-gradient(
    from calc((var(--angle) / 2) + 5deg - 0.5deg) at 50% 50%,
    rgba(255, 0, 46, 0.4) 0deg,
    rgba(255, 0, 46, 0.4) calc((var(--angle) / 2) + 2deg),
    transparent calc(var(--angle) / 2 + 35deg),
    transparent 100%
  );
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  text-align: left;
}

.month-picker--item-3 {
  background: #f7f7f7;
  border-radius: 50%;
  box-shadow: 0 -5px 5px rgba(255, 255, 255, 0.4),
    inset 0 5px 3px rgba(255, 255, 255, 0.8),
    inset 0 -5px 5px rgba(0, 0, 0, 0.2), 0 11px 18px rgba(0, 0, 0, 0.18),
    0 -20px 30px rgba(255, 255, 255, 0.8);
  right: 60px;
  left: 60px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  top: 60px;
  bottom: 60px;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  -webkit-user-select: none;
  user-select: none;
}

.month-picker--item-3--el-1 {
  background: #f7f7f7;
  border-radius: 50%;
  font-size: 76px;
  line-height: 76px;
  text-align: center;
}

.month-picker--item-3--el-2 {
  font-size: 12px;
  line-height: 16px;
  color: #222222;
  font-weight: 800;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}

.month-picker--item-4 {
  left: 50%;
  transform: translate(-50%, 8px) rotate(var(--angle));
  cursor: grab;
  margin: 0;
  transform-origin: center bottom;
  height: calc(50% + -8px);
  pointer-events: none;
  position: absolute;
  top: 0;
  touch-action: none;
  width: 44px;
  z-index: 2;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  color: #222222;
  text-align: left;
}

/* .month-picker--item-4::before {
  right: 0;
  transform: rotate(calc(-1* var(--angle)));
  background: #e9e9e9;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(225, 0, 35, 0.5),
    inset 0 -1px 2px rgba(0, 0, 0, 0.35), inset 0 2px 2px #ffffff;
  transition: scale 0.2s cubic-bezier(0.2, 0, 0, 1);
  content: "";
  height: 44px;
  pointer-events: auto;
  position: absolute;
  width: 44px;
  cursor: grab;
  text-align: left;
}

.month-picker--item-4::after {
  background: linear-gradient(180deg, #d5d5d5 0%, #ffffff 83.75%);
  transform: translate(2px, 2px) rotate(calc(-1* var(--angle)));
  border-radius: 50%;
  transition: scale 0.2s cubic-bezier(0.2, 0, 0, 1);
  content: "";
  height: 40px;
  pointer-events: auto;
  position: absolute;
  width: 40px;
} */

.dot-0 {
  top: 45.4071px;
  left: 202.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot::before {
  background: #717171;
  border-radius: 50%;
  content: "";
  display: block;
  height: 4px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
}

.dot-1 {
  top: 87.5px;
  left: 244.593px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-2 {
  top: 145px;
  left: 260px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-3 {
  top: 202.5px;
  left: 244.593px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-4 {
  top: 244.593px;
  left: 202.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-5 {
  top: 260px;
  left: 145px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-6 {
  top: 244.593px;
  left: 87.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-7 {
  top: 202.5px;
  left: 45.4071px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-8 {
  top: 145px;
  left: 30px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-9 {
  top: 87.5px;
  left: 45.4071px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-10 {
  top: 45.4071px;
  left: 87.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-11 {
  top: 30px;
  left: 145px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot.dot-11::before {
  background: transparent;
}

.bar {
  right: -12px;
  left: -12px;
  height: calc(100% + 12px * 2);
  top: -12px;
  bottom: -12px;
  pointer-events: none;
  position: absolute;
  width: calc(100% + 12px * 2);
  -webkit-tap-highlight-color: transparent;
  text-align: left;
}
</style>
