export function addTaskList(oldTaskLists, newTaskList){
     if(('id' in newTaskList) === false){
        newTaskList.id = performance.now().toFixed(0);
     }
    return [...oldTaskLists, newTaskList];
}