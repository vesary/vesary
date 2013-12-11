using UnityEngine;
using System.Collections;

public class Clicker : MonoBehaviour {
	
	public Transform target;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetMouseButtonDown(0))
		{
			//Fire a ray through the scene at the mouse position and place the target where it hits
			RaycastHit hit;
			if (Physics.Raycast	(Camera.main.ScreenPointToRay (Input.mousePosition), out hit, 200)) {
				target.position = hit.point;
			}
		}
	
	}
}
