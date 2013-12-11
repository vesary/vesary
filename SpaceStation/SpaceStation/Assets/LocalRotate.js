#pragma strict

var rand : int;
var rand2 : int;
function Start () {
rand = Random.Range(1,3);
rand2 = Random.Range(40,60);

}

function Update () {



if(rand==1)
transform.Rotate(Vector3.right, Time.deltaTime*rand2);

if(rand==2)
transform.Rotate(Vector3.up, Time.deltaTime*rand2);

if(rand==3)
transform.Rotate(-Vector3.right, Time.deltaTime*rand2);




}