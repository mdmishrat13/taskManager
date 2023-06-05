import ListItem from "./ListItem";

interface List{
    items:ListItem[],
    load():void,
    save():void,
    clearList():void,
    addToList(itemObj:ListItem):void,
    removeFromList(id:string):void
}

export default class FullList implements List{
    static instance:FullList= new FullList()
   private constructor(private _list:ListItem[]=[]){}

   get list():ListItem[]{
    return this._list
   }

   load(): void {
        const storedList:string|null= localStorage.getItem('myList')
        if(typeof storedList !=='string') return
        const parsedList:{_id:string,_name:string,_checked:boolean}[]=JSON.parse(storedList)
        parsedList.forEach(itemObj=>{
            const newListItem = new ListItem(itemObj._id,itemObj._name,itemObj._checked)
            FullList.instance.addToList(newListItem)
        })
   }
   save(): void {
       localStorage.setItem('myList',JSON.stringify(this._list))
   }

   clearList(): void {
       this._list=[]
       this.save()
   }

   addToList(itemObj: ListItem): void {
       this._list.push(itemObj)
       this.save()
   }

   removeFromList(id: string): void {
       this._list = this._list.filter(item=>item.id!==id)
       this.save()
   }
}