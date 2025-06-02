class gameManager 
{
    constructor() { 
        this.compleatedList = [];
    }

    update(audio) 
    {
        append(this.compleatedList, audio);
    }

    printList() 
    {
         print(this.compleatedList);
    }

    getList() 
    {
        return this.compleatedList;
    }
}

//Track what voice lines player has heard
//Track what order they hear them
//Track if theyve compleated the game