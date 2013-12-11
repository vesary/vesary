#pragma strict
var projectile : GameObject;

var speedModifier : float;
var fireRate :float = 0.5;
var nextFire :float = 0.0;
var buttonPressed : boolean = false;
var clone : GameObject;
var rockScript : AsteroidMovement;

//var offset : Vector3= Vector3(0,0,3);

function Start () {

}

function Update () {

//print(speedModifier);

if (Input.GetButtonDown("Fire1")){



if(!buttonPressed){
clone = Instantiate(projectile, transform.position, transform.rotation);
rockScript = clone.GetComponent(AsteroidMovement);
rockScript.playerControlled = true;
buttonPressed = true;
}



}

if (Input.GetButtonUp("Fire1")){
buttonPressed = false;
if(clone != null)
clone.rigidbody.AddForce(transform.TransformDirection(Vector3.forward) * speedModifier*20, ForceMode.Impulse);
speedModifier = 0;
}

if(Input.GetButton("Fire1")){
speedModifier += Time.deltaTime;
}

}