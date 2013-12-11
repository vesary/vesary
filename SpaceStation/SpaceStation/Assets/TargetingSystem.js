#pragma strict



var shootSound : AudioClip;

//var rockEntered : boolean = false;
var target : Transform;

var innerRing : GameObject;
var outerRing : GameObject;
var launcher : GameObject;
var currentTarget : GameObject;

var rockScript : AsteroidMovement;
var radarScript : Radar;
var radarIndicatorScript : Indicator;
var drawRayScript : DrawRay;
var drawTrajScript : DrawTraj;

var hudObject : GameObject;
var shootScript:Shoot;

var rockCount : int;
var rockArray : Array;


var damping = 6.0;

var aimPoint : Vector3;
var Torpedo : GameObject;
var bulletSpeed : float = 10.0;

var calcTimer : float = 0.5;  //give the system some time to aim before shooting
var calcTimerAtStart : float;
var randomEventTimer : float = 30;
var randomRock : GameObject;
//var randomEventR1 : float;
//var randomEventR2 : float;
var randomEvent : float;
var rockFound : boolean = false;

//var random : float = Random.Range(10.0, 20.0);

//var antenna : GameObject;


var drawRayTimer : float = -1;
var resultMessageTimer : float =-1;
var rockWillCome : boolean = false;

var projection : Vector3;

function Start () {
//shootScript = GameObject.Find("Launcher").GetComponent(Shoot);
innerRing = GameObject.Find("InnerRing");
outerRing = GameObject.Find("OuterRing");
launcher = GameObject.Find("Launcher");
radarScript = GameObject.Find("RadarZone").GetComponent(Radar);
hudObject = GameObject.Find("GUI Text");
radarIndicatorScript = GameObject.Find("RadarIndicator").GetComponent(Indicator);
//antenna = GameObject.Find("Antenna");
drawRayScript =  GameObject.Find("Antenna").GetComponent(DrawRay);

calcTimerAtStart = calcTimer;
rockArray = new Array();
randomEvent = Random.Range(5.0, 10.0);


}

function Update () {

resultMessageTimer -= Time.deltaTime;

if(resultMessageTimer>0 && rockWillCome){
hudObject.guiText.text = "Rock is bound to enter safe zone! Shooting... (closest distance " + projection.magnitude+") ";

}
else if (resultMessageTimer>0 && !rockWillCome){
hudObject.guiText.text = "False alarm. (closest distance " + projection.magnitude+") ";

}

if(drawRayTimer<=0){
randomEventTimer -= Time.deltaTime;

if(rockFound){

if(randomRock!=null){

if(DoesTrajectoryEnterSafetyZone(randomRock.transform.position, randomRock.rigidbody.velocity)){


radarScript.rocksInRadar.Remove(randomRock);
rockArray.Add(randomRock);
rockWillCome = true;
}
else{
rockWillCome = false;
}
resultMessageTimer = 4.0;

}
rockFound = false;

}

drawRayScript.drawLineNow = false;

if(randomRock!=null){
drawTrajScript = randomRock.GetComponent(DrawTraj);
drawTrajScript.drawLineNow = false;
}

}

if(drawRayTimer>0){
drawRayTimer -= Time.deltaTime;
if(randomRock != null){																//draw lines



drawRayScript.drawLineNow = true;

if(randomRock!=null){
drawTrajScript = randomRock.GetComponent(DrawTraj);
drawTrajScript.drawLineNow = true;
}

//Debug.DrawRay(antenna.position, randomRock.transform.position, Color.green, 0.04, false);
//Debug.DrawRay(randomRock.transform.position, randomRock.transform.TransformDirection(Vector3.forward) * 50, Color.magenta, 0.04, false);
//Debug.DrawRay(randomRock.transform.position, -randomRock.transform.TransformDirection(Vector3.forward) * 50, Color.magenta, 0.04, false);


//Debug.DrawRay(projection, antenna.position, Color.cyan, 0.04, false);
hudObject.guiText.text = "Detecting rock..";
}


}



if(randomEventTimer<randomEvent || randomEventTimer<0){
RandomEvent();
randomEventTimer = 15.0;
randomEvent = Random.Range(5.0, 10.0);
}

rockCount = rockArray.length;

SearchNewTarget();


if(target != null){

calcTimer -= Time.deltaTime;

AimAtTarget();



//if(!rockScript.hasBeenShotAt && calcTimer<=0){
if(calcTimer<=0){
Fire ();
calcTimer = calcTimerAtStart;

}

}
else
calcTimer = calcTimerAtStart;

//LookAtOuter();
if (Input.GetButtonDown("Fire2")){
if(target != null)
Destroy(target.gameObject);

}


}


function RandomEvent(){

if(radarScript.rocksInRadar.length>0){

var randomRockInt : int = Random.Range(0, radarScript.rocksInRadar.length-1);
randomRock = radarScript.rocksInRadar[randomRockInt];
rockScript = randomRock.GetComponent(AsteroidMovement);

if(!rockScript.beenShotWithRay){
//Debug.DrawRay(antenna.position, randomRock.transform.position, Color.green, 4.0, false);
drawRayTimer = 5.0;
rockScript.beenShotWithRay = true;
rockFound = true;
}

}



}

function DoesTrajectoryEnterSafetyZone(objectPosition : Vector3, objectVelocity : Vector3) : boolean{

var point2origin : Vector3 = objectPosition - transform.position;
projection = point2origin - Vector3.Dot(point2origin,objectVelocity.normalized) * objectVelocity.normalized;

if(projection.magnitude<=40){
return true;
}
else
return false;

}

function LookAtInner() {

if(target != null){

var targetRock = aimPoint;

var dir = targetRock-innerRing.transform.position;

//var newQuaternion = Quaternion.LookRotation(dir,Vector3.up);
var newQuaternion = Quaternion.LookRotation(dir,innerRing.transform.up);

newQuaternion.z = 0.0;
newQuaternion.y = 0.0;

innerRing.transform.rotation = newQuaternion;

var baseRotation = transform.rotation; //transform.parent.rotation;

innerRing.transform.rotation = baseRotation*newQuaternion;

//innerRing.transform.rotation = Quaternion.Slerp(innerRing.transform.rotation, baseRotation*newQuaternion, Time.deltaTime * damping);
LookAtOuter();
yield; 

}

}

function LookAtOuter() {


var targetRock = aimPoint;

var dir = targetRock-outerRing.transform.position;

var newQuaternion = Quaternion.LookRotation(dir,outerRing.transform.up);

newQuaternion.z = 0.0;
newQuaternion.x = 0.0;

outerRing.transform.rotation = newQuaternion;

var baseRotation = innerRing.transform.rotation; //transform.parent.rotation;

outerRing.transform.rotation = baseRotation*newQuaternion;

//innerRing.transform.rotation = Quaternion.Slerp(innerRing.transform.rotation, baseRotation*newQuaternion, Time.deltaTime * damping);



}


function AimAtTarget()
{
	if(target != null){
	
    
    var shooterPosition : Vector3 = launcher.transform.position;
	var targetPosition : Vector3 = target.position;
	
	var shooterVelocity : Vector3 =  launcher.rigidbody.velocity ;
	var targetVelocity : Vector3=  target.rigidbody.velocity ;
	
	aimPoint = FirstOrderIntercept
(
	shooterPosition,
	shooterVelocity,
	bulletSpeed,
	targetPosition,
	targetVelocity
);
	
    LookAtInner();
    yield;
    }
    
    
}



function OnTriggerEnter (other : Collider){
if (other.CompareTag ("Debris")) {
radarIndicatorScript.indicateNow = true;
rockArray.Add(other.gameObject);
radarScript.rocksInRadar.Remove(other.gameObject);

rockScript = other.gameObject.GetComponent(AsteroidMovement);
rockScript.isInSafeZone = true;
//SearchNewTarget();

//target = other.transform;
//rockEntered = true;
}


}

function OnTriggerExit (other : Collider){

if (other.CompareTag ("Debris")) {
rockArray.Remove(other.gameObject);
radarScript.rocksInRadar.Add(other.gameObject);
rockScript = other.gameObject.GetComponent(AsteroidMovement);
rockScript.isInSafeZone = false;

//SearchNewTarget();
}

}

function OnDrawGizmosSelected () {

    if(target != null) {

        // Draws a blue line from this transform to the target

        Gizmos.color = Color.blue;

    //    Gizmos.DrawLine (launcher.transform.position, target.position);
    Gizmos.DrawLine (launcher.transform.position, aimPoint);
    

    }

}

function FirstOrderIntercept
(
	shooterPosition : Vector3,
	 shooterVelocity : Vector3,
	 shotSpeed : float,
	 targetPosition: Vector3,
	 targetVelocity : Vector3
) : Vector3  
{
	var targetRelativePosition : Vector3 = targetPosition - shooterPosition;
	 var targetRelativeVelocity  : Vector3= targetVelocity - shooterVelocity;
	var t :float  = FirstOrderInterceptTime
	(
		shotSpeed,
		targetRelativePosition,
		targetRelativeVelocity
	);
	return targetPosition + t*(targetRelativeVelocity);
}

function FirstOrderInterceptTime
(
	shotSpeed : float,
	targetRelativePosition : Vector3,
	targetRelativeVelocity : Vector3
) : float

  {
	var velocitySquared  : float = targetRelativeVelocity.sqrMagnitude;
	if(velocitySquared < 0.001f)
		return 0f;
 
	var a: float = velocitySquared - shotSpeed*shotSpeed;
 
	//handle similar velocities
	if (Mathf.Abs(a) < 0.001f)
	{
		var t : float = -targetRelativePosition.sqrMagnitude/
		(
			2f*Vector3.Dot
			(
				targetRelativeVelocity,
				targetRelativePosition
			)
		);
		return Mathf.Max(t, 0f); //don't shoot back in time
	}
 
	var b : float = 2f*Vector3.Dot(targetRelativeVelocity, targetRelativePosition);
	var c : float = targetRelativePosition.sqrMagnitude;
	var determinant : float = b*b - 4f*a*c;
 
	if (determinant > 0f) { //determinant > 0; two intercept paths (most common)
		var	t1 : float = (-b + Mathf.Sqrt(determinant))/(2f*a);
		var t2 : float = (-b - Mathf.Sqrt(determinant))/(2f*a);
		if (t1 > 0f) {
			if (t2 > 0f)
				return Mathf.Min(t1, t2); //both are positive
			else
				return t1; //only t1 is positive
		} else
			return Mathf.Max(t2, 0f); //don't shoot back in time
	} else if (determinant < 0f) //determinant < 0; no intercept path
		return 0f;
	else //determinant = 0; one intercept path, pretty much never happens
		return Mathf.Max(-b/(2f*a), 0f); //don't shoot back in time
}


function Fire () {

//if (Input.GetButtonDown("Fire1")) {
//if(targetSys.target && !projLaunched){

rockScript = target.gameObject.GetComponent(AsteroidMovement);
//if (!rockScript.hasBeenShotAt){

var clone : GameObject;

clone = Instantiate(Torpedo, launcher.transform.position, launcher.transform.rotation);
clone.transform.LookAt(aimPoint);
var dir = clone.transform.up;
dir.Normalize();
clone.rigidbody.AddForce(launcher.transform.TransformDirection(Vector3.up) * bulletSpeed, ForceMode.VelocityChange);
audio.PlayOneShot(shootSound,1);

//clone.rigidbody.AddForce(aimPoint * torpedoSpeed, ForceMode.Impulse);
//clone.rigidbody.velocity = 
dir += clone.transform.position;		
clone.transform.LookAt(dir);


rockArray.Remove(target.gameObject); //remove target from array after being shot at


//rockScript.hasBeenShotAt = true;

//target = null;
//}
//SearchNewTarget();

//}
}


function SearchNewTarget(){
if(rockCount>0){

currentTarget = GetClosestRock();

//print(currentTarget.rigidbody.velocity.magnitude);

target = currentTarget.transform;

//calcTimer = calcTimerAtStart;
//rockScript = target.gameObject.GetComponent(AsteroidMovement);
//rockScript.isInShootRange = true;
}
else
target = null;
}

function GetClosestRock() : GameObject
{
    var closestRock : GameObject;
    for (var hit : GameObject in rockArray) {
    
    //	rockScript = hit.GetComponent(AsteroidMovement);
         
        if(!closestRock)
        {
           closestRock = hit;
        }
        //compares distances
      //  if(closestMonster!=null){
     //   if(Vector3.Distance(transform.position, hit.transform.position) <= Vector3.Distance(transform.position, closestRock.transform.position) && !rockScript.hasBeenShotAt)
      if(Vector3.Distance(transform.position, hit.transform.position) <= Vector3.Distance(transform.position, closestRock.transform.position))
        {	
           	closestRock = hit;
        }
     //   }
    }
    return closestRock;
}



