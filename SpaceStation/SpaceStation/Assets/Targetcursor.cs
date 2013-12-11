using UnityEngine;
using System.Collections;

public class Targetcursor : MonoBehaviour {
	
	void Update () {
		
		Vector3 target = GameObject.Find("target").transform.position;
		Vector3 dir = target-transform.position;
		Quaternion newQuaternion = Quaternion.LookRotation(dir,Vector3.up);
		newQuaternion.z = 0.0f;
		newQuaternion.y = 0.0f;
		
		transform.rotation = newQuaternion;
		
		Quaternion baseRotation = transform.parent.rotation;
		transform.rotation = baseRotation*newQuaternion;
	}
}
