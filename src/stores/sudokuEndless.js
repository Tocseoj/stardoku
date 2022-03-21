import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, reactive } from "vue";

export const useSudokuEndlessStore = defineStore("sudokuEndless", () => {
  const numberOfHouseColumns = computed(() => {
    return Math.floor(gridSize.columns / gridSize.house.width);
  });
  const numberOfHouseRows = computed(() => {
    return Math.floor(gridSize.rows / gridSize.house.height);
  });

  const gridSize = {
    columns: 9,
    rows: 9,
    house: {
      width: 3,
      height: 3,
      columns: numberOfHouseColumns,
      rows: numberOfHouseRows,
    },
  };

  function setGridSize(newGridSize) {
    if (newGridSize.columns % newGridSize.house.width || newGridSize.rows % newGridSize.house.height) {
      throw new Error(
        "Can't fit integer number of houses. (horizontal: ",
        (newGridSize.columns % newGridSize.house.width ? "failed" : "succeeded") +
          ", vertical: " +
          (newGridSize.rows % newGridSize.house.height ? "failed" : "succeeded") +
          ")"
      );
    }
    this.gridSize = newGridSize;
    this.cells = generateGridCells();
  }

  function cellByPosition(row, column) {
    return row * gridSize.columns + column;
  }

  function houseByPosition(row, column) {
    const houseRow = Math.floor(row / gridSize.house.height);
    const houseColumn = Math.floor(column / gridSize.house.width);

    return houseRow * numberOfHouseColumns.value + houseColumn;
  }

  function generateGridCells() {
    const tempGridCells = [];
    for (let row = 0; row < gridSize.rows; row++) {
      for (let column = 0; column < gridSize.columns; column++) {
        const house = houseByPosition(row, column);
        const id = cellByPosition(row, column);
        const cell = {
          row,
          column,
          house,
          id,
          value: house.toString(),
        };
        tempGridCells.push(cell);
      }
    }
    return tempGridCells;
  }

  const cells = reactive(generateGridCells());

  return {
    gridSize,
    setGridSize,
    cells,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSudokuEndlessStore, import.meta.hot));
}
