<script setup>
import { computed, ref } from "vue";
import { useSudokuEndlessStore } from "@/stores/sudokuEndless";
import { useConsole } from "@/stores/console";
import { range, enumerate } from "@/modules/generators";
import { max } from "@/modules/math";
const console = useConsole();
console.log(console);

const store = useSudokuEndlessStore();

// Grid functions
function getHouseColumn(houseIndex) {
  return houseIndex % store.gridSize.house.columns;
}
function getHouseRow(houseIndex) {
  return Math.floor(houseIndex / store.gridSize.house.columns);
}

const isPicross = ref(true);

// Styling
const dynamicGridSize = computed(() => {
  let templateColumns = store.gridSize.columns + max(0, store.gridSize.house.columns - 1);
  let templateRows = store.gridSize.rows + max(0, store.gridSize.house.rows - 1);

  // For the Picross numbers
  if (isPicross.value) {
    templateColumns += 1;
    templateRows += 1;
  }

  return {
    gridTemplateColumns: `repeat(${templateColumns}, auto)`,
    gridTemplateRows: `repeat(${templateRows}, auto)`,
  };
});

function backgroundGrid(cell) {
  const darkBackground = "bg-slate-800";
  const lightBackground = "bg-slate-700";

  // Checker by house
  // const houseColumn = getHouseColumn(cell.house);
  // const houseRow = getHouseRow(cell.house);
  // const backgroundColor = (houseColumn + (houseRow % 2)) % 2 ? darkBackground : lightBackground;

  // Checker by cell
  const backgroundColor = (cell.column + (cell.row % 2)) % 2 ? darkBackground : lightBackground;
  return [backgroundColor];
}

for (const [index, s] of enumerate(range(10, 0, -2))) {
  console.log("generator", index, s, typeof s);
}

const gridColumns = ref(store.gridSize.columns);
const gridRows = ref(store.gridSize.rows);
const houseWidth = ref(store.gridSize.house.width);
const houseHeight = ref(store.gridSize.house.height);
const houseColumns = ref(store.gridSize.house.columns);
const houseRows = ref(store.gridSize.house.rows);

function onUpdateGrid() {
  store.setGridDimensions(gridColumns.value, gridRows.value, houseWidth.value, houseHeight.value);
}
function onUpdateHouse() {
  store.setHouseDimensions(houseColumns.value, houseRows.value, houseWidth.value, houseHeight.value);
}
</script>

<template>
  <main>
    <div id="game-area" class="my-5 pb-3 w-screen overflow-x-scroll overflow-y-hidden">
      <div class="grid place-content-center place-items-center gap-0 w-max mx-1" :style="dynamicGridSize">
        <template v-for="cell in store.cells" :key="cell.id">
          <template v-if="isPicross && cell.row === 0 && cell.column === 0">
            <div class="space w-1 h-1"></div>
            <template v-for="number in store.gridSize.rows" :key="number">
              <div v-if="number - 1 !== 0 && (number - 1) % store.gridSize.house.width === 0" class="w-1 h-1"></div>
              <div class="text-xs text-center">
                <code class="block">1</code>
                <code class="block">2</code>
                <code class="block">11</code>
                <code class="block">1</code>
              </div>
            </template>
          </template>
          <div v-if="cell.column !== 0 && cell.id % store.gridSize.house.width === 0" class="w-1 h-1"></div>
          <template v-if="cell.row !== 0 && cell.row % store.gridSize.house.height === 0 && cell.column === 0">
            <div
              v-for="space in store.gridSize.columns + store.gridSize.house.columns - (isPicross ? 0 : 1)"
              :key="space"
              class="w-1 h-1"
            ></div>
          </template>
          <div v-if="isPicross && cell.column === 0" class="text-xs text-right">
            <code class="pr-1">1</code>
            <code class="pr-1">11</code>
            <code class="pr-1">2</code>
            <code class="pr-1">1</code>
          </div>
          <div
            class="w-10 h-10 text-4xl text-green-400 focus-within:bg-green-500 focus-within:text-slate-900"
            :class="backgroundGrid(cell)"
          >
            <div class="text-center">
              <input
                @input="cell.value = $event.data"
                type="text"
                class="absolute opacity-0 -z-50 w-10 h-10 bg-slate-700"
                tabindex="0"
              />
              <label class="inline-block w-10 h-10">
                {{ cell.value }}
              </label>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div id="interface-area">
      <div class="border border-1 border-green-200 m-2 p-2">
        <label>
          Grid Columns
          <input class="m-5 text-slate-900" v-model.number="gridColumns" type="number" />
        </label>
        <label>
          Grid Rows
          <input class="m-5 text-slate-900" v-model.number="gridRows" type="number" />
        </label>
        <label>
          House Width
          <input class="m-5 text-slate-900" v-model.number="houseWidth" type="number" />
        </label>
        <label>
          House Height
          <input class="m-5 text-slate-900" v-model.number="houseHeight" type="number" />
        </label>
        <button
          @click="onUpdateGrid"
          class="m-4 p-2 bg-green-400 hover:bg-green-300 active:bg-green-600 text-slate-800"
        >
          Update Grid Dimensions
        </button>
      </div>
      <div class="border border-1 border-green-200 m-2 p-2">
        <label>
          House Columns
          <input class="m-5 text-slate-900" v-model.number="houseColumns" type="number" />
        </label>
        <label>
          House Rows
          <input class="m-5 text-slate-900" v-model.number="houseRows" type="number" />
        </label>
        <label>
          House Width
          <input class="m-5 text-slate-900" v-model.number="houseWidth" type="number" />
        </label>
        <label>
          House Height
          <input class="m-5 text-slate-900" v-model.number="houseHeight" type="number" />
        </label>
        <button
          @click="onUpdateHouse"
          class="m-4 p-2 bg-green-400 hover:bg-green-300 active:bg-green-600 text-slate-800"
        >
          Update House Dimensions
        </button>
      </div>

      <button
        @click="console.log('Clicked!')"
        class="block m-4 p-2 bg-green-400 hover:bg-green-300 active:bg-green-600 text-slate-800"
      >
        Print to Console
      </button>
      <button
        @click="console.hidden = !console.hidden"
        class="block m-4 p-2 bg-green-400 hover:bg-green-300 active:bg-green-600 text-slate-800"
      >
        Toggle Console
      </button>
      Console Hidden: {{ console.hidden }}
    </div>
  </main>
</template>
