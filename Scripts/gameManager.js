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

    checkEnding(ending) 
    {
        let gameList = gameManagerMain.getList();
        let i;
        for(i=0; i < ending.length; i++) 
            {
            if (gameList[i] !== ending[i]) 
                {
                print("Requirements not met for ending");
                return false;
                }
            }
        print("Ending requirements met")
        return true;
    }
}

//Track what voice lines player has heard
//Track what order they hear them
//Track if theyve compleated the game