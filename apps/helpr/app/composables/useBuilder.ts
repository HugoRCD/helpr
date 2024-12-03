let dragActionIndex = -1
let targetActionIndex = -1

export function startDrag(event: DragEvent, index: number) {
  dragActionIndex = index
}

export function endDrag() {
  dragActionIndex = -1
  targetActionIndex = -1
}

export function onDrop() {
  const flowStore = useFlowStore()
  if (dragActionIndex >= 0 && targetActionIndex >= 0 && dragActionIndex !== targetActionIndex) {
    flowStore.moveAction(dragActionIndex, targetActionIndex)
  }
}

export function onDragEnter(event: DragEvent, index: number) {
  if (dragActionIndex >= 0 && dragActionIndex !== index) {
    targetActionIndex = index
  }
}

export function onDragOver(event: DragEvent) {
  event.preventDefault()
}
