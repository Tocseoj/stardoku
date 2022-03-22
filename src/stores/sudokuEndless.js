import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, reactive, ref } from "vue";
import { xor } from "@/modules/logic";
import { error } from "../modules/exceptions";
// import { useConsole } from "@/stores/console.js";
// const console = useConsole();

export const useSudokuEndlessStore = defineStore("sudokuEndless", () => {
  const numberOfHouseColumns = computed(() => {
    if (gridSize.house.width === 0) {
      return 0;
    }
    return Math.floor(gridSize.columns / gridSize.house.width);
  });
  const numberOfHouseRows = computed(() => {
    if (gridSize.house.height === 0) {
      return 0;
    }
    return Math.floor(gridSize.rows / gridSize.house.height);
  });

  const gridSize = reactive({
    columns: 9,
    rows: 9,
    house: {
      width: 3,
      height: 3,
      columns: numberOfHouseColumns,
      rows: numberOfHouseRows,
    },
  });

  const isPicross = ref(false);

  function cellByPosition(column, row) {
    return row * gridSize.columns + column;
  }

  function houseByPosition(column, row) {
    if (gridSize.house.height < 1 || gridSize.house.width < 1) {
      return null;
    }

    const houseColumn = Math.floor(column / gridSize.house.width);
    const houseRow = Math.floor(row / gridSize.house.height);

    return houseRow * numberOfHouseColumns.value + houseColumn;
  }

  function generateGridCells() {
    cells.splice(0);
    for (let row = 0; row < gridSize.rows; row++) {
      for (let column = 0; column < gridSize.columns; column++) {
        const house = houseByPosition(column, row);
        const id = cellByPosition(column, row);
        const cell = {
          column,
          row,
          house,
          id,
          value: house?.toString(16) ?? "_",
        };
        cells.push(cell);
      }
    }
    return cells;
  }

  let cells = reactive([]);
  generateGridCells();

  function validateDimensions(columns, rows, houseWidth, houseHeight) {
    if (houseWidth < 0 || houseHeight < 0 || columns < 0 || rows < 0) {
      throw error("Can't have a negative dimension.", { columns, rows, houseWidth, houseHeight });
    }
    if (columns % houseWidth || rows % houseHeight) {
      const horizontal = columns % houseWidth ? "failed" : "succeeded";
      const vertical = rows % houseHeight ? "failed" : "succeeded";
      throw error("Can't fit integer number of houses.", { horizontal, vertical });
    }
    if (xor(houseWidth, houseHeight) || xor(columns, rows)) {
      throw error("Can't have a lone zero dimension.", { columns, rows, houseWidth, houseHeight });
    }
    return true;
  }

  function setGridDimensions(columns, rows, houseWidth = null, houseHeight = null) {
    houseWidth = houseWidth ?? gridSize.house.width;
    houseHeight = houseHeight ?? gridSize.house.height;

    // Validation; throws Errors
    validateDimensions(columns, rows, houseWidth, houseHeight);

    gridSize.columns = columns;
    gridSize.rows = rows;
    gridSize.house.width = houseWidth;
    gridSize.house.height = houseHeight;

    generateGridCells();
  }

  function setHouseDimensions(columns, rows, width = null, height = null) {
    setGridDimensions(columns * width, rows * height, width, height);
  }

  return {
    gridSize,
    isPicross,
    cellByPosition,
    houseByPosition,
    setGridDimensions,
    setHouseDimensions,
    cells,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSudokuEndlessStore, import.meta.hot));
}
