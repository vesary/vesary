#pragma strict

var lineRenderer : LineRenderer;
var counter : float;
var dist : float;

//var origin : Transform;
//var destination : Transform;

var lineDrawSpeed = 20;

var targetScript : TargetingSystem;

var drawLineNow : boolean = false;


 

function Start () {

targetScript = GameObject.Find("Station").GetComponent(TargetingSystem);

lineRenderer = GetComponent(LineRenderer);
lineRenderer.SetPosition(0, transform.position);
lineRenderer.SetWidth(0.05, 0.05);

//dist = Vector3.Distance(transform.position, destination.position);


}

function Update () {

if(drawLineNow){


//draws animated line, wont work obiously if object moves
/*dist = Vector3.Distance(transform.position, targetScript.randomRock.position); 


if(counter < dist){
counter += 0.1 / lineDrawSpeed;

var x : float = Mathf.Lerp(0, dist, counter);

var pointAlongLine : Vector3 = x*Vector3.Normalize(destination.position - transform.position) + transform.position;*/
if(targetScript.randomRock !=null)
lineRenderer.SetPosition(1, targetScript.randomRock.transform.position);

}
else
lineRenderer.SetPosition(1, transform.position);


}

