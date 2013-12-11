using UnityEngine;

public class FreeLook : MonoBehaviour 
{
    public float rotationSpeed = 0.05f;
    public float normalSpeed = 10;
    public float highSpeed = 20;

    private bool _ownCursor = false;

    private void Start()
    {
        if (!Screen.lockCursor && Screen.showCursor)
        {
            Screen.lockCursor = true;
            Screen.showCursor = false;
            _ownCursor = true;
        }
    }

    private void OnDisable()
    {
        if (_ownCursor)
        {
            Screen.lockCursor = false;
            Screen.showCursor = true;
        }
    }

    private void Update()
    {
        Vector3 dp = Vector3.zero;

        if (Input.GetKey(KeyCode.W)) dp.z = 1;
        if (Input.GetKey(KeyCode.S)) dp.z = -1;
        if (Input.GetKey(KeyCode.A)) dp.x = -1;
        if (Input.GetKey(KeyCode.D)) dp.x = 1;
        if (Input.GetKey(KeyCode.Q)) dp.y = -1;
        if (Input.GetKey(KeyCode.E)) dp.y = 1;

        var speed = normalSpeed * (Input.GetKey(KeyCode.LeftShift) ? 5 : 1);

        dp.Normalize();
        dp *= speed * Time.deltaTime;
        camera.transform.Translate(dp.x, dp.y, dp.z, Space.Self);

        float rotY = rotationSpeed * Input.GetAxis("Mouse X");
        float rotX = -rotationSpeed * Input.GetAxis("Mouse Y");

        float toTop = Vector3.Angle(camera.transform.forward, Vector3.up);
        if (rotX < 0)
            rotX = -Mathf.Min(Mathf.Abs(rotX), Mathf.Max(0, toTop - 20));
        else
            rotX = Mathf.Min(Mathf.Abs(rotX), Mathf.Max(0, 160 - toTop));

        camera.transform.RotateAround(Vector3.up, rotY);
        camera.transform.RotateAround(camera.transform.right, rotX);
    }
}