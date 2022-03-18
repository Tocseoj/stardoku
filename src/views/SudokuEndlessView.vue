<script setup>
import { reactive, computed } from "vue";

// Grid functions
const gridSize = reactive({ columns: 9, rows: 9, house: { width: 3, height: 3 } });
if (gridSize.columns % gridSize.house.width) console.error("Can't fit integer number of houses (horizontally)");
if (gridSize.rows % gridSize.house.height) console.error("Can't fit integer number of houses (vertically)");

const numberOfHouseColumns = computed(() => {
  return Math.floor(gridSize.columns / gridSize.house.width);
});
const numberOfHouseRows = computed(() => {
  return Math.floor(gridSize.rows / gridSize.house.height);
});

function getHouseColumn(houseIndex) {
  return houseIndex % numberOfHouseColumns.value;
}
function getHouseRow(houseIndex) {
  return Math.floor(houseIndex / numberOfHouseColumns.value);
}

function getHouse(row, column) {
  const houseRow = Math.floor(row / gridSize.house.height);
  const houseColumn = Math.floor(column / gridSize.house.width);

  return houseRow * numberOfHouseColumns.value + houseColumn;
}

// Styling
const defaultCellStyle = [
  "aspect-square",
  "w-10",
  "h-10",
  "text-3xl",
  "text-green-400",
  "hover:bg-slate-600",
  "focus:bg-green-400",
  "focus:text-slate-900",
];

function houseStyling(houseIndex) {
  const darkBackground = "bg-slate-800";
  const lightBackground = "bg-slate-700";

  const houseColumn = getHouseColumn(houseIndex);
  const houseRow = getHouseRow(houseIndex);

  const houseStyle = [(houseColumn + (houseRow % 2)) % 2 ? darkBackground : lightBackground];
  return houseStyle;
}

const dynamicGridSize = reactive({
  gridTemplateColumns: `repeat(${gridSize.columns}, auto)`,
  gridTemplateRows: `repeat(${gridSize.rows}, auto)`,
});

// Setup Grid
const gridCells = reactive([]);
for (let row = 0; row < gridSize.rows; row++) {
  for (let column = 0; column < gridSize.columns; column++) {
    const cellIndex = row * gridSize.columns + column;
    const house = getHouse(row, column);
    const cell = {
      row,
      column,
      house,
      value: house,
      id: cellIndex,
      class: [...defaultCellStyle, ...houseStyling(house)],
    };
    gridCells.push(cell);
  }
}

// Debug
console.log("Grid setup", {
  cells: {
    count: gridSize.rows * gridSize.columns,
    rows: gridSize.rows,
    columns: gridSize.columns,
  },
  houses: {
    count: numberOfHouseRows.value * numberOfHouseColumns.value,
    rows: numberOfHouseRows.value,
    columns: numberOfHouseColumns.value,
    size: gridSize.house.width + "x" + gridSize.house.height,
  },
});
</script>

<template>
  <main>
    <div id="game-area" class="my-5">
      <div class="grid place-content-center place-items-center gap-1" :style="dynamicGridSize">
        <div v-for="cell in gridCells" :key="cell.id" :class="cell.class">
          <div class="text-center">
            <input type="number" class="w-10 h-10 bg-transparent" :value="cell.value" />
          </div>
        </div>
      </div>
    </div>
    <div id="interface-area"></div>
  </main>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
