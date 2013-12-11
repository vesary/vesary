#pragma strict

var rockCounter : int;
var rocksInRadar : Array;

var rockScript : AsteroidMovement;


function Start () {
rocksInRadar = new Array();
}

function Update () {
rockCounter = rocksInRadar.length;
}


function OnTriggerEnter (other : Collider){
if (other.CompareTag ("Debris")) {
rocksInRadar.Add(other.gameObject);
rockScript = other.gameObject.GetComponent(AsteroidMovement);
//rockScript.isInShootRange = true;
//SearchNewTarget();

rockScript.isInRadar = true;
//target = other.transform;
//rockEntered = true;
}


}

function OnTriggerExit (other : Collider){
if (other.CompareTag ("Debris")) {
rocksInRadar.Remove(other.gameObject);
rockScript = other.gameObject.GetComponent(AsteroidMovement);
rockScript.isInRadar = false;
//rockScript.isInShootRange = false;

//SearchNewTarget();
}

}