// reorder-items.js

// change order of
// project lists, todo list items, and todo checklist items via index
// remove? or repurpose for selecting specific location via dropdown
export function reorderItems(array, indexA, indexB) {
  let temporary = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temporary;
}

// move selected item 1 position "lower" in the array
// left for project cards
// up for todo list item cards
export function moveHigher(array, index) {
  if (index <= 0 || index >= array.length) return; // prevent out-of-bounds
  const temp = array[index - 1];
  array[index - 1] = array[index];
  array[index] = temp;
}

// move selected item 1 position "higher" in the array
// right for project cards
// down for todo list item cards
export function moveLower(array, index) {
  if (index < 0 || index >= array.length - 1) return; // prevent out-of-bounds
  const temp = array[index + 1];
  array[index + 1] = array[index];
  array[index] = temp;
}

// move todo list item cards to different project list array
export function moveItemByIndex(sourceArray, targetArray, index) {
  if (index >= 0 && index < sourceArray.length) {
    const [removed] = sourceArray.splice(index, 1);
    targetArray.push(removed);
    return true;
  }
  return false;
}
