#pragma strict

var Timer : float = 0;
var indicateNow: boolean = false;
var startScale;
private var speed : float = 50;

function Start () {
gameObject.GetComponent(MeshRenderer).enabled = false;
startScale = transform.localScale;
}

function Update () {

Timer -= Time.deltaTime;

if(Timer<0){
Timer=0;
transform.localScale = startScale;
gameObject.GetComponent(MeshRenderer).enabled = false;
}

if (Timer>0){
transform.localScale += Vector3.one * speed * Time.deltaTime;
}


if(indicateNow){
gameObject.GetComponent(MeshRenderer).enabled = true;
Timer = 0.13;
indicateNow = false;
}

}