#pragma strict

var lifetime : float = 30.0;


function Start () {

}

function Update () {
lifetime-=Time.deltaTime;

if(lifetime<=0)
Destroy (gameObject);

}

function OnTriggerEnter (other : Collider){
if (other.CompareTag ("Debris")) {
Destroy (gameObject);
}
}