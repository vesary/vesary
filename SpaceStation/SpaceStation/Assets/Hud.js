#pragma strict
var rocksCount : int;
var targetScript : TargetingSystem;
var radarScript : Radar;
var Hudtext : Hud;



var myFont : Font;
//var color : Color;

function Start () {

targetScript = GameObject.Find("Station").GetComponent(TargetingSystem);
radarScript = GameObject.Find("RadarZone").GetComponent(Radar);
//Hudtext = gameObject.GetComponent()
}

function Update () {

rocksCount = targetScript.rockCount + radarScript.rockCounter;

if(targetScript.resultMessageTimer<0 && targetScript.drawRayTimer<0)
gameObject.guiText.text = "Rocks inside radar : " + rocksCount.ToString();

}


 
/*function OnGUI () {
	//GUI.color = Color.white;
//	var myStyle : GUIStyle = new GUIStyle();
	//myStyle.fontSize = 40;
//	myFont.material.color = Color.white;
  //  myStyle.font = myFont;
    
    GUI.Label (Rect (10, 10, 400, 20),gameObject.guiText.text);
   // GUI.Label (Rect (10, 10, 400, 20), "Rocks inside Radar : " + rocksCount);
}*/