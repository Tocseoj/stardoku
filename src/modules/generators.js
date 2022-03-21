// import {...} from "@/modules/generators";

export function* range(start = 0, end = null, step = 1) {
  if (end == null) {
    end = start;
    start = 0;
  }

  for (let value = start; start < end ? value < end : value > end; value += step) {
    yield value;
  }
}

export function* enumerate(generator) {
  let index = 0;
  for (const value of generator) {
    yield [index, value];
    index += 1;
  }
}

export default {
  range,
  enumerate,
};
