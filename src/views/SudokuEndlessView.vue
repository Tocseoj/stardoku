<script setup>
import { computed } from "vue";
import { useSudokuEndlessStore } from "@/stores/sudokuEndless";
import { useConsole } from "@/stores/console";
import { range, enumerate } from "@/modules/generators";
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

// Styling
const dynamicGridSize = computed(() => ({
  gridTemplateColumns: `repeat(${store.gridSize.columns}, auto)`,
  gridTemplateRows: `repeat(${store.gridSize.rows}, auto)`,
}));

function styleByHouse(houseIndex) {
  const darkBackground = "bg-slate-800";
  const lightBackground = "bg-slate-700";

  const houseColumn = getHouseColumn(houseIndex);
  const houseRow = getHouseRow(houseIndex);

  const backgroundColor = (houseColumn + (houseRow % 2)) % 2 ? darkBackground : lightBackground;
  return [backgroundColor];
}

function gridColumnsOnBlur(event) {
  console.log("New Columns", event.target.value);
  let updatedGridSize = store.gridSize;
  updatedGridSize.columns = event.target.value;
  store.setGridSize(updatedGridSize);
}

for (const [index, s] of enumerate(range(10, 0, -2))) {
  console.log("generator", index, s, typeof s);
}
</script>

<template>
  <main>
    <div id="game-area" class="my-5">
      <div class="grid place-content-center place-items-center gap-0" :style="dynamicGridSize">
        <div
          v-for="cell in store.cells"
          :key="cell.id"
          class="w-10 h-10 text-4xl text-green-400 focus-within:bg-green-500 focus-within:text-slate-900"
          :class="styleByHouse(cell.house)"
        >
          <div class="text-center">
            <label class="inline-block w-10 h-10">
              {{ cell.value }}
              <input
                @input="cell.value = $event.data.toUpperCase()"
                type="text"
                class="absolute opacity-0 -z-50 w-10 h-10 bg-slate-700"
                tabindex="0"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div id="interface-area">
      <label>
        Grid Columns
        <input class="m-5 text-slate-900" @blur="gridColumnsOnBlur" :value="store.gridSize.columns" />
      </label>
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
