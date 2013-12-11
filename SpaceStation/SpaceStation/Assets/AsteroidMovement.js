#pragma strict

var speedMin : float = 0.5;
var speedMax : float = 1.0;

var speed : float;

var lifetime : float = 60.0;

//var hasBeenShotAt : boolean = false;

var isInSafeZone : boolean = false;
var isInRadar : boolean = false;

var targetScript : TargetingSystem;
var radarScript : Radar;

var forceAdded : boolean = false;
var playerControlled : boolean = false;
var beenShotWithRay : boolean = false;

private var timer : float = 1.0;
//var currentSpeed : float;

function Start () {

targetScript = GameObject.Find("Station").GetComponent(TargetingSystem);
radarScript = GameObject.Find("RadarZone").GetComponent(Radar);


}

function Update () {

lifetime-=Time.deltaTime;
timer -= Time.deltaTime;
//currentSpeed = transform.rigidbody.velocity.magnitud

if(!forceAdded && !playerControlled && timer <0){
speed = Random.Range(speedMin, speedMax);
//transform.rigidbody.AddForce(transform.TransformDirection(Vector3.forward) * speed, ForceMode.Impulse);
transform.rigidbody.AddForce(transform.forward * speed, ForceMode.Impulse);
forceAdded = true;

}

if(lifetime<=0 && !isInRadar){

Destroy(gameObject);

}



}

function OnTriggerEnter (other : Collider){
if (other.CompareTag ("Torpedo")) {
Destroy (gameObject);
}
}

function OnDestroy () {
if(isInSafeZone){
targetScript.rockArray.Remove(gameObject);
}
if(isInRadar){
radarScript.rocksInRadar.Remove(gameObject);

}


}

