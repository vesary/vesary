var junkObjects : GameObject[];  //The different types of objects to spawn
var totalObjects : int = 100;    //The amount of objects to spawn
var size = Vector3(10,10,10);    //The initial size of the spawn area
var useRandomRotation : boolean = true; //Random rotation at spawn

var station : Transform;

var clearDistance : float = 20;

var timer : float = 20.0;


private var pos;
 
function Start () {

SpawnDebris();
 
 				
}

function Update(){

timer -= Time.deltaTime;

if(timer<=0){
SpawnDebris();
timer = 20.0;
}

}
 
function OnDrawGizmosSelected () {
    Gizmos.color = Color (1,0,0,.5);
    Gizmos.DrawCube (transform.position, Vector3 (size.x,size.y,size.z));
}

function SpawnDebris(){


       for(i=0; i<totalObjects; i++) {
       
       
       var randomX : int = Random.Range(-size.x/2, size.x/2);
         var randomY : int = Random.Range(-size.y/2, size.y/2);
         var randomZ : int = Random.Range(-size.z/2, size.z/2);
              
         
         pos = transform.position+Vector3(randomX, randomY, randomZ);
         var junkObject = Random.Range(0,junkObjects.length);
         if(useRandomRotation){
         if(Vector3.Distance(station.position, pos)>clearDistance){
          Instantiate(junkObjects[junkObject], pos, Random.rotation);
          }  
         } else {
         if(Vector3.Distance(station.position, pos)>clearDistance){
          Instantiate(junkObjects[junkObject], pos, Quaternion.identity);
          } 
         }
       }

}


