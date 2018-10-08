import { action } from "mobx";
const addProbabilityActions = state => {
  state.percentTrue = percent => {
    return Math.random() <= percent / 100;
  };
  state.percentPicker = arr => {
    debugger;
    const pick = Math.random();
    return arr
      .reduce((acc, cur = {}) => {
        debugger;
        return [
          ...acc,
          {
            ...cur,
            count:
              cur.chance + (acc[acc.length - 1] ? acc[acc.length - 1].count : 0)
          }
        ];
      }, [])
      .map((option, int, array) => {
        const totalCount = array[array.length - 1].count;
        debugger;
        return {
          ...option,
          rangeTop: option.count / totalCount,
          rangeBottom: (option.count - option.chance) / totalCount,
          probability: option.chance / totalCount
        };
      })
      .find(obj => {
        debugger;
        return obj.rangeBottom <= pick && pick <= obj.rangeTop;
      });
  };
};
export default addProbabilityActions;
