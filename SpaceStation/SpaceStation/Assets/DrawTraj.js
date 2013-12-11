#pragma strict

var lineRenderer : LineRenderer;
var dist : float = 100;


var targetScript : TargetingSystem;

var drawLineNow : boolean = false;
 

function Start () {

targetScript = GameObject.Find("Station").GetComponent(TargetingSystem);

lineRenderer = GetComponent(LineRenderer);
lineRenderer.SetPosition(0, transform.position);
lineRenderer.SetPosition(1, transform.position);
//lineRenderer.SetPosition(2, transform.position);
lineRenderer.SetWidth(0.05, 0.05);

//dist = Vector3.Distance(transform.position, destination.position);


}

function Update () {

if(drawLineNow){



lineRenderer.SetPosition(0, transform.position -transform.TransformDirection(Vector3.forward)*dist);
lineRenderer.SetPosition(1, transform.position +transform.TransformDirection(Vector3.forward)*dist);





}

else{
lineRenderer.SetPosition(0, transform.position);
lineRenderer.SetPosition(1, transform.position);
//lineRenderer.SetPosition(2, transform.position);
}


}

