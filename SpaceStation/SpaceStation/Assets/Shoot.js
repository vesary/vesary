/*#pragma strict

var Torpedo : GameObject; //prefab goes here
var torpedoSpeed : float = 10;
var targetSys : TargetingSystem;
var rockScript : AsteroidMovement;
//var aimPoint : Vector3;
//var projLaunched : boolean = false;



function Start () {
targetSys = GameObject.Find("Station").GetComponent(TargetingSystem);
}

function Update () {
aimPoint = targetSys.aimPoint;
if(targetSys.target){
rockScript = targetSys.target.gameObject.GetComponent(AsteroidMovement);
if(!rockScript.hasBeenShotAt)
Fire ();
}
}

function Fire () {

//if (Input.GetButtonDown("Fire1")) {
//if(targetSys.target && !projLaunched){

var clone : GameObject;

clone = Instantiate(Torpedo, transform.position, transform.rotation);
clone.transform.LookAt(aimPoint);
var dir = clone.transform.up;
dir.Normalize();
clone.rigidbody.AddForce(transform.TransformDirection(Vector3.up) * torpedoSpeed, ForceMode.VelocityChange);
//clone.rigidbody.AddForce(aimPoint * torpedoSpeed, ForceMode.Impulse);
//clone.rigidbody.velocity = 
dir += clone.transform.position;		
clone.transform.LookAt(dir);
rockScript.hasBeenShotAt = true;

//}
}*/