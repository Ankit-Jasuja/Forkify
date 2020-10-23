import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }
     
    addItem(count,unit,ingredients){
     const item = {
         id:uniqid(),
         count:count,
         unit:unit,
         ingredients:ingredients
     }
     this.items.push(item);
     return this.items; //returning in this case is just good practice
    }

    deleteItem(id){
      const index = this.items.findIndex(el=>el.id===id);
      //splice mutates the original array but slice not.
      //splice returns the array after deleting elements.
      this.items.splice(index,1);
    }

    updateItemCount(id,newCount){
        this.items.find(el=>el.id===id).count = newCount;
    }


}