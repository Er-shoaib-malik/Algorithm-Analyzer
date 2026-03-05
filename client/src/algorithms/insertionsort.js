
export function insertionsort(arr){
    let animations = [] ;
    let comparisons = 0 ;
    let swaps = 0 ;

    let a = [...arr] ;

    for(let i = 1 ; i < a.length ; i++){
        let key = a[i] ;
        let j = i -1 ;

        while(j >= 0){

            animations.push({type: "compare" , indices : [j,j+1] }) ;


            if(a[j] > key){
                swaps++ ;
                animations.push({type : "overwrite" , indices: [j+1] , value :a[j]}) ;
                a[j+1] = a[j] ;
                j-- ;
            }
            else{
                break
            }
        }
        animations.push({type: "overwrite" , indices : [j+1] , value : key}) ;
        a[j+1] = key ;

        animations.push({type: "sorted" , index : i}) ;
    }

    return {animations,comparisons,swaps} ;

}